import globalSlice from "@/redux/globalSlice";
import { useAppDispatch } from "@/redux/hooks";
import axiosInstance from "@/utils/axiosConfig";
import axios from "axios";
import { useState } from "react";
import { start } from "repl";

function Themchiendich() {
    const [name,setName] = useState('');
    const [tgbd,setTgbd] = useState('');
    const [tgkt,setTgkt] = useState('');

    async function hanlde() {
        alert("click")
        await axiosInstance.post("/api/v1/campaigns",{
            name : name,
            startDate : tgbd,
            endDate : tgkt
        })
        
        

    }
    
    const dispatch = useAppDispatch()
    return (
        <div className="fixed w-full h-full">
            <div className="absolute top-[30px] left-[30px] border-2 bg-[white] w-[400px]">
                <div className="flex justify-end">
                    <button className="bg-[#1e83a5] hover:bg-[#176b87] p-1 text-white"
                    onClick={()=>dispatch(globalSlice.actions.themchiendich(false))}
                    >X</button>
                </div>
                <div className="p-3">
                    <div className="text-center mb-3">Nhập tên chiến dịch</div>
                    <div>
                        <input type="text" value={name} className="border-2 p-2  rounded-xl w-full" placeholder="" onChange={(e)=>setName(e.target.value)}/>
                    </div>

                    <div className="mt-3">
                        <label className="mr-3">Ngày bắt đầu : </label>
                        <input type="date" onChange={(e)=>(setTgbd(e.target.value))}/>
                    </div>

                    <div className="mt-3">
                        <label className="mr-3">Ngày kết thúc : </label>
                        <input type="date" onChange={(e)=>(setTgkt(e.target.value))}/>
                    </div>

                    <div className="flex justify-center">
                        <button className="border-2 p-2 mt-3 rounded-xl bg-[#1e83a5] hover:bg-[#176b87] text-white"
                        onClick={()=>hanlde()}
                        >THÊM CHIẾN DỊCH</button>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Themchiendich;