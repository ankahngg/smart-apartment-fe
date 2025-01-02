import axiosInstance from "@/utils/axiosConfig";
import { useEffect, useState } from "react";
import Chinhsua2 from "./chinhsua2";
import Chinhsua1 from "./chinhsua1";

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

interface vehifee{
    vehicleTypeId: number,
    feeCategory: string,
    unitPrice: number
}

function Setting() {
    const [change1,setChange1] = useState(false);
    const [change2,setChange2] = useState(false);
    const [fee,setFee] = useState<fee[]>([])
    const [vehifee,setVehifee] = useState<vehifee[]>([])
    useEffect(() =>{
        const fetchFeeType = async () =>{
            const response = await axiosInstance.post("/api/v1/fee-types/search",{
                pageSize:999,
            });
            setFee(response.data.content)
        }
        const fetchVehicleType = async () =>{
            const response = await axiosInstance.get("/api/v1/vehicles/vehicle-types");
            console.log(response)
            setVehifee(response.data)
        }
        fetchFeeType();
         fetchVehicleType();
    },[change1,change2])
    return (
        <div className="p-5 pt-0 h-[600px]">
            {/* row1 */}
            <div className="flex items-center">
                <div className="w-[300px]">
                    <div className="text-lg italic">
                        Phí bắt buộc
                    </div>
                    {
                        fee.map((val,index)=>{
                            return (
                                <div className="flex">
                                    <div className="w-[150px] font-bold">{val.category.name} :</div>
                                    <div>{val.unitPrice} VND/m^2</div>
                                </div>
                            )
                        })
                    }
                    
                </div>
                <div className="ml-20">
                    <button className="bg-[#1e83a5] hover:bg-[#176b87] text-white p-1 rounded-xl"
                    onClick={()=>setChange1(true)}
                    >Chỉnh sửa phí bắt buộc</button>
                </div>
                
            </div>
            {
                change1?
                <Chinhsua1 onShow={setChange1} fee = {fee}/>
                :
                <></>
            }
            {
                    change2?
                    <Chinhsua2 onShow={setChange2} vehifee={vehifee}/>
                    :
                    <></>
                }
            <div className="mt-2 flex items-center">   
                <div className="w-[300px]">
                    <div className="text-lg italic">
                        Phí gửi xe
                    </div>
                    {
                        vehifee.map((val,index) =>{
                            return (
                                <div className="flex">
                                    <div className="w-[150px] font-bold">Phí gửi {val.feeCategory =="PARKING_CAR" ? "Ô tô" :
                                            val.feeCategory =="PARKING_MOTORCYCLE" ? "Xe máy" :
                                            val.feeCategory =="PARKING_BICYCLE" ? "Xe đạp" :"Khác"}:</div>
                                    <div className="w-[150px]">{val.unitPrice} / pt</div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="ml-20">
                    <button className="bg-[#1e83a5] hover:bg-[#176b87] text-white p-1 rounded-xl"
                    onClick={()=>setChange2(true)}
                    >Chỉnh sửa phí gửi xe</button>
                </div>
            </div>
                

            
        </div>
        );
}

export default Setting;