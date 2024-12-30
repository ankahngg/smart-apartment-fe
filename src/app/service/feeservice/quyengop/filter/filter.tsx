import { useEffect, useState } from "react";
import Qgfilter from "./qgfilter";
import axiosInstance from "@/utils/axiosConfig";

interface floors {
    id : number, 
    name : string,
    floorNumber : number,
}

interface apartments {
    id : number,
    name : string,
    code : string,
}

function Filter() {
    const [floordata,setFloordata] = useState<floors[]>([])
    const [apartmentdata,setApartmentdata] = useState<apartments[]>([])

    useEffect(() => {
        const fetchInit = async () => {
            const response = await axiosInstance.post("/api/v1/floors/search",{
                pageSize : 999,
            })
            if (response.data && response.data.content) {
                const fetchedData = response.data.content.map((item: any, index: number) => ({
                    
                    id: item.id,
                    name: item.name,
                    floorNumber: item.floorNumber,
                }));
                setFloordata(fetchedData); // Cập nhật state `data`
                console.log('Fetched Data:', fetchedData);  // Log fetched data for debugging
            } else {
                setFloordata([]); // Cập nhật state `data` với mảng rỗng nếu không có dữ liệu
            }
        }
        fetchInit();
        
    },[])
    

    async function handleFloor(id:string) {
        const response = await axiosInstance.post("/api/v1/apartments/search",{
            pageSize : 999,
            filters : [
                {
                    name:"floorId",operation:"eq",value:id
                }
            ]
        })
        if (response.data && response.data.content) {
            const fetchedData = response.data.content.map((item: any, index: number) => ({
                id: item.id,
                name: item.name,
                code: item.code,
            }));
            setApartmentdata(fetchedData); // Cập nhật state `data`
            console.log('Fetched Data:', fetchedData);  // Log fetched data for debugging
        } else {
            setApartmentdata([]); // Cập nhật state `data` với mảng rỗng nếu không có dữ liệu
        }
    }

    return (
        <div className="border-2 p-2 border-black h-full">
            <div className="p-2 italic text-xl ">Bộ lọc</div>
            <div className="flex mb-2">

                <div className="flex-1">
                    <select id="status" name="status" className="p-2 w-full  text-l border-black border-2 rounded-xl"
                    onChange={(e)=>handleFloor(e.target.value)}
                    >
                        <option value={'default'}>CHỌN TẦNG</option>
                        {
                            floordata.map((val) => {
                                return (
                                    <option value={val.id}> {val.name}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <div className="flex-1 ml-2">
                    <select id="status" name="status" className="p-2 w-full  text-l border-black border-2 rounded-xl" >
                        <option value={'default'}>CHỌN CĂN HỘ</option>
                        {
                            apartmentdata.map((val) => {
                                return (
                                    <option value={val.id}> {val.name}</option>
                                )
                            })
                        }
                    </select>
                </div>
            </div>
            <input type="text" placeholder="NHẬP TÊN CHỦ HỘ" className="text-black text-l w-full p-2 border-black border-2 mb-2 rounded-xl" />

            <Qgfilter />
        </div>
    );
}

export default Filter;