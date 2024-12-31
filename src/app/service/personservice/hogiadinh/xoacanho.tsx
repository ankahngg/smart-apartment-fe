import axiosInstance from "@/utils/axiosConfig";
import { useEffect, useState } from "react";

interface newbox {
    onShow : (show : boolean) => void,
    apartId : number,
    apartCode:string,
}


 

const Xoacanho:React.FC<newbox> =({onShow,apartId,apartCode}) => {
    const [resiId,setResiId] = useState([])
    const [vehiId,setVehiId] = useState([])
    useEffect(()=>{
        const fetchResi = async () => {
            const response = await axiosInstance.post("/api/v1/residents/search", {
                pageSize:999,
                filters : [
                    {
                        name : "apartmentId",
                        value : apartId,
                        operation : "eq"
                    }
                ]
            });
            console.log('API Response:', response.data);  // Log the response for debugging
            // const tmp = new Array(response.data.content.size).fill(false)
            if (response.data && response.data.content) {
                const fetchedData = response.data.content.map( (item: any, index: number) => {
                        return item.residentId;
                    })
                
                setResiId(fetchedData); // Update state with the resolved data
                console.log("Fetched Data:", fetchedData); // Log fetched data for debugging
            } else {
                setResiId([]); // Update state with an empty array if no data is available
            }
        };
        const fetchVehi = async () => {
            const response = await axiosInstance.post("/api/v1/vehicles/search", {
                pageSize:999,
                filters : [
                    {
                        name : "apartmentId",
                        value : apartId,
                        operation : "eq"
                    }
                ]
            });
            console.log('API Response:', response.data);  // Log the response for debugging
            // const tmp = new Array(response.data.content.size).fill(false)
            if (response.data && response.data.content) {
                const fetchedData = response.data.content.map( (item: any, index: number) => {
                        return item.vehicleId;
                    })
                
                setVehiId(fetchedData); // Update state with the resolved data
                console.log("Fetched Data:", fetchedData); // Log fetched data for debugging
            } else {
                setVehiId([]); // Update state with an empty array if no data is available
            }
        };

        fetchResi(); // Gọi hàm fetchInvoices mỗi khi `currentPage` thay đổi
        fetchVehi();
    },[])

    async function handleDel() {
        resiId.forEach(async (val,index) =>{
            await axiosInstance.get(`/api/v1/residents/remove-from-apartment/${val}`)
        })
        vehiId.forEach(async (val,index) =>{
            await axiosInstance.delete(`/api/v1/vehicles/${val}`)
        })

        onShow(false)
    }

    return (
        <div className="w-full h-full fixed z-10">
            <div className="absolute left-1/2 -translate-x-1/2 top-1/4  -translate-y-1/3 border-2 w-[500px] bg-white ">
                <div className="flex justify-end">
                    <button className="bg-[#1e83a5] hover:bg-[#176b87] p-1 text-white"
                    onClick={()=>onShow(false)}
                    >X</button>
                </div>
                <div className="text-center">
                    <div className="text-xl font-bold">Xác nhận xóa căn hộ</div>
                    <div>{apartCode}</div>
                </div>
                <div className="flex justify-center p-2">
                    <button className="bg-red-600 hover:bg-red-700 p-1 text-white rounded-xl" onClick={()=>handleDel()}>XÁC NHẬN</button>
                </div>

            </div>
        </div>
    );
}

export default Xoacanho;