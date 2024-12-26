'use client';

import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosConfig"

export default function LoginPage() {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleLogin = async () => {
        if (!username || !password) {
            alert('Please enter both username and password.');
            return;
        }

        setLoading(true);

        try {
            const { data } = await axiosInstance.post('/api/v1/auth/login', {
                username,
                password,
            });
            console.log(data);

            if (data) {
                console.log(data);
                localStorage.setItem('accessToken', data);
            }


            // Redirect to dashboard
            router.push('/');
        } catch (error: any) {
            handleLoginError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleLoginError = (error: any) => {
        if (error.response) {
            console.log(error.response.data.message || 'Login failed');
        } else if (error.request) {
            console.log('No response from server. Please try again.');
        } else {
            console.log('An unexpected error occurred. Please try again.');
        }
    };


    return (
        <div className="flex justify-center border-2 h-screen bg-[#c5f6f1]">
            <title>LOGIN</title>
            <div className="bg-[#6fd0c9] w-[32rem] h-fit border-2 mt-40 flex flex-col rounded-xl p-6 space-y-6 ">
                <p>anh</p>
                <input type="text" onChange={(e) => setUsername(e.target.value)} value={username} placeholder="Ma dang nhap" className="bg-[#e1fffc] p-4 rounded-xl text-[#6fd0c9] text-xl" />
                <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Mat khau" className="bg-[#e1fffc] p-4 rounded-xl text-[#6fd0c9] text-xl" />
                <button className="bg-[#287f94] p-4 rounded-xl text-2xl text-center hover:bg-[#226a7b]" onClick={handleLogin}>Đăng nhập</button>
                <div className="flex justify-center">
                    <button className="p-4 w-3/4 text-2xl text-[#287f94] text-center font-bold border-t-2 hover:text-white">Quên mật khẩu</button>
                </div>
            </div>

        </div>
    )

}