'use client'
import { useState } from 'react';
import Hogiadinh from './hogiadinh/hogiadinh';
import Cutru from './cutru/cutru';
function Page() {
    const [page,setPage] = useState("hogiadinh")
    return (
    <div>
        <div className="flex items-center">
            <div className="text-2xl font-bold p-5">Cổng dịch vụ công</div>
            <div className="text-xl font-bold p-5">
                <select className="border-2 border-black rounded-xl p-2" value={page} onChange={(e)=>{setPage(e.target.value)}}>
                    <option value="hogiadinh">
                        Quản lí Hộ Gia Đình
                    </option>
                    <option value="cutru">
                        Quản lí Cư Trú
                    </option>
                </select>
                </div>
        </div>
        {
            page == "hogiadinh" ?
            <Hogiadinh />
            :
            <Cutru />
        }
    </div>
    );
}

export default Page;