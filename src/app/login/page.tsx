'use client';

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page()
{
    const [username,setUsername] = useState<string>('');
    const [pass,setPass] = useState<string>('');
    async function handleClick() {
        console.log(username,pass); 
        setUsername('');
        setPass('');
        
        const response = await fetch('',{
            method : 'POST',
            headers : {

            },
            body : JSON.stringify({username:username,pass:pass})
        });

        const res = await response.json();
        console.log(res);
        //redirect('/dashboard')
    }

    return (
        <div className="flex justify-center border-2 h-screen bg-[#c5f6f1]">
            <title>LOGIN</title>
            <div className="bg-[#6fd0c9] w-[32rem] h-fit border-2 mt-40 flex flex-col rounded-xl p-6 space-y-6 ">
                <p>anh</p>
                <input type="text" onChange={(e)=>setUsername(e.target.value)} value={username}  placeholder="Ma dang nhap" className="bg-[#e1fffc] p-4 rounded-xl text-[#6fd0c9] text-xl"/> 
                <input type="password" onChange={(e)=>setPass(e.target.value)} value={pass} placeholder="Mat khau" className="bg-[#e1fffc] p-4 rounded-xl text-[#6fd0c9] text-xl"/>
                <button className="bg-[#287f94] p-4 rounded-xl text-2xl text-center hover:bg-[#226a7b]" onClick={handleClick}>Dang nhap</button>
                <div className="flex justify-center">
                    <button className="p-4 w-3/4 text-2xl text-[#287f94] text-center font-bold border-t-2 hover:text-white">Quen mat khau</button>
                </div>
            </div>

        </div>
    )

}