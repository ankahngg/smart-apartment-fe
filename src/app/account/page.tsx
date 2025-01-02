'use client'
import { useState } from "react";
import Doimatkhau from "./doimatkhau";

function Page() {

    const [doimk,setDoimk] = useState(false);


    return (
    <div className="h-[600px]">
        {
            doimk?
            <Doimatkhau onShow={setDoimk}/>
            :
            <></>
        }
        <div className="text-2xl font-bold p-5">Tài khoản quản trị</div>
        <div className="p-5">
            <div className=" text-lg flex items-center "> 
                <div className="font-bold w-[150px]">Họ và tên :</div>
                <div>Nguyen Phuc An Khang</div>
            </div>
            <div className=" text-lg flex items-center mt-2"> 
                <div className="font-bold w-[150px]">Ngày sinh :</div>
                <div>22-10-2022</div>
            </div>
            <div className=" text-lg flex items-center mt-2"> 
                <div className="font-bold w-[150px]">Email :</div>
                <div>ankhanghp2004@gmail.com</div>
            </div>
            <div className=" text-lg flex items-center mt-2"> 
                <div className="font-bold w-[150px]">Số điện thoại</div>
                <div>0981615155</div>
            </div>
            <div className=" text-lg flex items-center mt-2"> 
                <button className="bg-[#1e83a5] hover:bg-[#176b87] p-1 text-white rounded-xl">Chỉnh sửa</button>
                <button className="ml-4 text-lg italic underline hover:text-[#1e83a5]" onClick={()=>setDoimk(true)}>Đổi mật khẩu</button>
            </div>
        </div>
    </div> 
    );
}

export default Page;