import axiosInstance from "@/utils/axiosConfig";
import { useState } from "react";

interface newbox {
    onShow : (show : boolean) => void,
    fee : fee[]
}

interface fee {
    feeTypeId: number,
    category: {
        code: number,
        name: string,
        enumName: string
    },
    unitPrice: number,
    description: string
}


const Chinhsua1:React.FC<newbox> = ({onShow,fee}) => {
    const [dvufee,setDvufee] = useState(0);
    const [qlyfee,setQlyfee] = useState(0);
    async function handleChange() {
        if(!dvufee || !qlyfee ){ alert("Các khoản phí phải khác 0"); return;}
        for (const item of fee) {
            if(item.category.enumName=="SERVICE_FEE") await axiosInstance.put(`/api/v1/fee-types/${item.category.enumName}`,{
                vehicleTypeId: item.feeTypeId,
                feeCategory: item.category.enumName,
                unitPrice: dvufee
            })
            if(item.category.enumName=="MANAGEMENT_FEE") await axiosInstance.put(`/api/v1/fee-types/${item.category.enumName}`,{
                vehicleTypeId: item.feeTypeId,
                feeCategory: item.category.enumName,
                unitPrice: qlyfee
            })
            
        }
        onShow(false)
    }
    return (
        
        <div className="w-full h-full fixed z-10">
            <div className="absolute left-1/2 -translate-x-1/2  border-2 w-[500px] bg-white ">
                <div className="flex justify-end">
                    <button className="bg-[#1e83a5] hover:bg-[#176b87] p-1 text-white"
                    onClick={()=>onShow(false)}
                    >X</button>
                </div>
                <div className="p-2">
                    <div className="text-center font-bold text-xl">CHỈNH SỬA PHÍ BẮT BUỘC</div>
                    <div className="flex items-center mt-4">
                        <div className="w-[150px]">Phí dịch vụ :</div>
                        <input type="number" className="p-1 border-2 w-[100px] ml-2 mr-2" onChange={(e)=>setDvufee(parseInt(e.target.value))} value={dvufee}/>
                        <div>VND/m^2</div>
                    </div>
                    <div className="flex items-center mt-4">
                        <div className="w-[150px]">Phí quản lý :</div>
                        <input type="number" className="p-1 border-2 w-[100px] ml-2 mr-2" onChange={(e)=>setQlyfee(parseInt(e.target.value))} value={qlyfee}/>
                        <div>VND/m^2</div>
                    </div>
                    <div className="flex justify-center mt-4 p-2">
                        <button className="bg-[#1e83a5] hover:bg-[#176b87] p-2 text-white rounded-xl" onClick={()=>handleChange()}>Xác nhận</button>
                    </div>
                        
                </div>
            </div>
        </div>
        
    );
}

export default Chinhsua1;