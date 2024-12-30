import axiosInstance from "@/utils/axiosConfig";
import { useEffect, useState } from "react";
import Chinhsua2 from "./chinhsua2";
import Chinhsua1 from "./chinhsua1";

function Setting() {
    const [change1,setChange1] = useState(false);
    const [change2,setChange2] = useState(false);
    useEffect(() =>{
        // const fetchFeeType = async () =>{
        //     const response = await axiosInstance.post("/api/v1/fee-types/search",{
        //         pageSize:999,
        //     });
        //     console.log(response)
        // }
        // const fetchVehicleType = async () =>{
        //     const response = await axiosInstance.get("/api/v1/vehicles/vehicle-types");
        //     console.log(response)
        // }
        // fetchFeeType();
        // fetchVehicleType();
    })
    return (
        <div className="p-5 pt-0 h-[600px]">
            {/* row1 */}
            <div className="flex items-center">
                <div className="w-[300px]">
                    <div className="text-lg italic">
                        Phí bắt buộc
                    </div>
                    <div className="flex">
                        <div className="mr-2">
                            Ngày thay đổi
                        </div>
                        <div>20-10-2024</div>
                    </div>
                    
                    <div className="flex">
                        <div className="w-[150px]">Phí quản lý :</div>
                        <div>3000 VND/m^2</div>
                    </div>
                    <div className="flex">
                        <div className="w-[150px]">Phí dịch vụ :</div>
                        <div>4000 VND/m^2</div>
                    </div>
                </div>
                <div className="ml-20">
                    <button className="bg-[#1e83a5] hover:bg-[#176b87] text-white p-1 rounded-xl"
                    onClick={()=>setChange1(true)}
                    >Chỉnh sửa phí bắt buộc</button>
                </div>
                
            </div>
            {
                change1?
                <Chinhsua1 onShow={setChange1}/>
                :
                <></>
            }
            {
                    change2?
                    <Chinhsua2 onShow={setChange2}/>
                    :
                    <></>
                }
            <div className="mt-2 flex items-center">   
                <div className="w-[300px]">
                    <div className="text-lg italic">
                        Phí gửi xe
                    </div>
                    <div className="flex">
                        <div className="mr-2">
                            Ngày thay đổi
                        </div>
                        <div>20-10-2024</div>
                    </div>
                    
                    <div className="flex">
                        <div className="w-[150px]">Phí gửi ô tô :</div>
                        <div>3000 VND/m^2</div>
                    </div>
                    <div className="flex">
                        <div className="w-[150px]">Phí gửi xe máy :</div>
                        <div>4000 VND/m^2</div>
                    </div>
                    <div className="flex">
                        <div className="w-[150px]">Phí gửi xe đạp :</div>
                        <div>4000 VND/m^2</div>
                    </div>
                    <div className="flex">
                        <div className="w-[150px]">Phí gửi khác :</div>
                        <div>4000 VND/m^2</div>
                    </div>
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