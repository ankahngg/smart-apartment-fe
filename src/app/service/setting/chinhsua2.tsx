import axiosInstance from "@/utils/axiosConfig";
import { useState } from "react";

interface newbox {
    onShow : (show : boolean) => void,
    vehifee:vehifee[]
}
interface vehifee{
    vehicleTypeId: number,
    feeCategory: string,
    unitPrice: number
}
const Chinhsua2:React.FC<newbox> = ({onShow,vehifee}) => {
    const [otofee,setOtofee] = useState(0);
    const [xemayfee,setXemayfee] = useState(0);
    const [xedapfee,setXedapfee] = useState(0);
    const [otherfee,setOtherfee] = useState(0);

    async function handleChange() {
        if(!otofee || !xedapfee || !xemayfee ||!otherfee){ alert("Các khoản phí phải khác 0"); return;}
        for (const item of vehifee) {
            if(item.feeCategory=="PARKING_CAR") await axiosInstance.put(`/api/v1/fee-types/${item.feeCategory}`,{
                vehicleTypeId: item.vehicleTypeId,
                feeCategory: item.feeCategory,
                unitPrice: otofee
            })
            if(item.feeCategory=="PARKING_MOTORCYCLE") await axiosInstance.put(`/api/v1/fee-types/${item.feeCategory}`,{
                vehicleTypeId: item.vehicleTypeId,
                feeCategory: item.feeCategory,
                unitPrice: xemayfee
            })
            if(item.feeCategory=="PARKING_BICYCLE") await axiosInstance.put(`/api/v1/fee-types/${item.feeCategory}`,{
                vehicleTypeId: item.vehicleTypeId,
                feeCategory: item.feeCategory,
                unitPrice: xedapfee
            })
            if(item.feeCategory=="PARKING_OTHER") await axiosInstance.put(`/api/v1/fee-types/${item.feeCategory}`,{
                vehicleTypeId: item.vehicleTypeId,
                feeCategory: item.feeCategory,
                unitPrice: otherfee
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
                    <div className="text-center font-bold text-xl">CHỈNH SỬA PHÍ GỬI XE</div>
                    <div className="flex items-center mt-4">
                        <div className="w-[150px]">Phí gửi ô tô :</div>
                        <input type="number" className="p-1 border-2 w-[100px] ml-2 mr-2" onChange={(e)=>setOtofee(parseInt(e.target.value))} value={otofee}/>
                        <div>VND/m^2</div>
                    </div>
                    <div className="flex items-center mt-4">
                        <div className="w-[150px]">Phí gửi xe máy :</div>
                        <input type="number" className="p-1 border-2 w-[100px] ml-2 mr-2" onChange={(e)=>setXemayfee(parseInt(e.target.value))} value={xemayfee}/>
                        <div>VND/m^2</div>
                    </div>
                    <div className="flex items-center mt-4">
                        <div className="w-[150px]">Phí gửi xe đạp :</div>
                        <input type="number" className="p-1 border-2 w-[100px] ml-2 mr-2" onChange={(e)=>setXedapfee(parseInt(e.target.value))} value={xedapfee}/>
                        <div>VND/m^2</div>
                    </div>
                    <div className="flex items-center mt-4">
                        <div className="w-[150px]">Phí gửi khác :</div>
                        <input type="number" className="p-1 border-2 w-[100px] ml-2 mr-2" onChange={(e)=>setOtherfee(parseInt(e.target.value))} value={otherfee}/>
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

export default Chinhsua2;