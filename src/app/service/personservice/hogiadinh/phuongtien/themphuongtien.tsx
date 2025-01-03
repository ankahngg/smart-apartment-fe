import { useAppSelector } from "@/redux/hooks";
import axiosInstance from "@/utils/axiosConfig";
import { useEffect, useState } from "react";

interface newbox {
    onShow : (show : boolean) => void
}
interface ptientype{
    vehicleTypeId: number,
    feeCategory: string,
    unitPrice: number,
}

const Themphuongtien:React.FC<newbox> = ({onShow}) => {
    const cr_apart = useAppSelector((state) =>state.global.cr_apart)
    const [vehitype,setVehitype] = useState<ptientype[]>([])
    const [name,setName] = useState('');
    const [date,setDate] = useState('');
    const [bienso,setBienso] = useState('');
    const [vehitypeid,setVehitypeid] = useState('');

    useEffect(()=>{

        const fetchVehiType = async () => {
            const response = await axiosInstance.get("/api/v1/vehicles/vehicle-types");
            console.log('API Response:', response.data);  // Log the response for debugging
            setVehitype(response.data)
            setVehitypeid(response.data[0].vehicleTypeId);
        };
        fetchVehiType(); // Gọi hàm fetchInvoices mỗi khi `currentPage` thay đổi
    },[])

    async function handleAdd() {
        if(name==''||date==''||bienso=='') {alert("Điền không hợp lệ"); return;}
        await axiosInstance.post("/api/v1/vehicles",{
            licensePlate: bienso,
            name: name,
            apartmentId: cr_apart.id,
            registerDate: date,
            vehicleTypeId: vehitypeid,
        });
        onShow(false)
    }

    return (  
        <div className="w-full h-full fixed z-10">
            <div className="absolute left-1/2 -translate-x-1/2 border-2 w-[400px] bg-white">
                <div className="flex justify-end">
                    <button className="bg-[#1e83a5] hover:bg-[#176b87] p-1 text-white"
                    onClick={()=>onShow(false)}
                    >X</button>
                </div>
                <div className="text-center text-xl font-bold">THÊM PHƯƠNG TIỆN</div>
                <div className="p-3">
                    {/* row1 */}
                    <div className="flex items-top justify-between">
                        <div className="">
                            <div>Tên phương tiện</div>
                            <input type="text" className="border-2 p-2 border-black rounded-xl" onChange={(e)=>setName(e.target.value)} value={name}/>
                        </div>
                        <div>
                            <div>Loại phương tiện</div>
                            <select className="border-2 p-2 border-black rounded-xl" onChange={(e)=>setVehitypeid(e.target.value)} value = {vehitypeid}>
                                {
                                    vehitype.map((val,index) =>{
                                        return (
                                            <option value={val.vehicleTypeId}>
                                                {
                                                    val.feeCategory =="PARKING_CAR" ? "Ô tô" :
                                                    val.feeCategory =="PARKING_MOTORCYCLE" ? "Xe máy" :
                                                    val.feeCategory =="PARKING_BICYCLE" ? "Xe đạp" :
                                                    "Khác"
                                                }
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    {/* row2 */}
                    <div className="flex justify-between mt-2">
                        <div>
                            <div>Biển số</div>
                            <input type="string" className="border-2 p-2 border-black rounded-xl" onChange={(e)=>setBienso(e.target.value)} value={bienso}/>
                        </div>
                    </div>
                    <div className="mt-2">
                        <div>Ngày thêm</div>
                        <input type="date" className="p-2 border-2 border-black rounded-xl" onChange={(e)=>setDate(e.target.value)} value={date}/>
                    </div>
                    
                    {/* row3 */}
                    <div className="mt-10 flex justify-center">
                        <button className="p-2 rounded-xl bg-[#1e83a5] hover:bg-[#176b87] text-white" onClick={()=>handleAdd()}>THÊM</button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Themphuongtien;