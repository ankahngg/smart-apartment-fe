import { useAppSelector } from "@/redux/hooks";
import axiosInstance from "@/utils/axiosConfig";
import { useEffect, useState } from "react";

interface newbox {
    onShow : (show : boolean) => void,
    onShow2 : (show : boolean) => void,
}

interface role {
    code: number,
    name: string,
    enumName: string,
}

 

const Xoa:React.FC<newbox> =({onShow,onShow2}) => {
    const cr_res = useAppSelector((state) =>state.global.cr_res)
    const [name,setName] = useState('')
    
    useEffect(()=>{
        const fetchResi = async () => {
            const response = await axiosInstance.get(`/api/v1/residents/${cr_res.macd}`, {
            });
            setName(response.data.fullName)
        };

        fetchResi(); // Gọi hàm fetchInvoices mỗi khi `currentPage` thay đổi
    },[])

    async function handleDel() {
        await axiosInstance.get(`/api/v1/residents/remove-from-apartment/${cr_res.macd}`)
        onShow(false)
        onShow2(false)
    }

    return (
        <div className="w-full h-full fixed z-10">
            <div className="absolute left-1/2 -translate-x-1/2  border-2 w-[500px] bg-white ">
                <div className="flex justify-end">
                    <button className="bg-[#1e83a5] hover:bg-[#176b87] p-1 text-white"
                    onClick={()=>onShow(false)}
                    >X</button>
                </div>
                <div className="text-center">
                    <div className="text-xl font-bold">Xác nhận xóa cư dân</div>
                    <div>{name}</div>
                </div>
                <div className="flex justify-center p-2">
                    <button className="bg-red-600 hover:bg-red-700 p-1 text-white rounded-xl" onClick={()=>handleDel()}>XÁC NHẬN</button>
                </div>

            </div>
        </div>
    );
}

export default Xoa;