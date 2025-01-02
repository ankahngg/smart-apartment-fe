import { useEffect, useState } from "react";
import Qgfilter from "./qgfilter";
import axiosInstance from "@/utils/axiosConfig";
import { useAppDispatch } from "@/redux/hooks";
import globalSlice from "@/redux/globalSlice";

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
    const dispatch = useAppDispatch()
    const [floordata,setFloordata] = useState<floors[]>([])
    const [apartmentdata,setApartmentdata] = useState<apartments[]>([])
    const [floorid,setFloorid] = useState('');
    const [apartid,setApartid] = useState('');
    const [keyword,setKeyword] = useState('');

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
        // doFilter();
        
    },[])

    function cancelFilter(): void {
        setFloorid('')
        setApartid('')
        setKeyword('')
        setApartmentdata([])
        dispatch(globalSlice.actions.set_filter_apart(''))
        dispatch(globalSlice.actions.set_filter_floor(''))
        dispatch(globalSlice.actions.set_filter_keyword(''))
    }

    function doFilter(): void {
        dispatch(globalSlice.actions.set_filter_apart(apartid))
        dispatch(globalSlice.actions.set_filter_floor(floorid))
        dispatch(globalSlice.actions.set_filter_keyword(keyword))
    }
    

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
                id: item.apartmentId,
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
                    onChange={(e)=>{handleFloor(e.target.value),setFloorid(e.target.value)}}
                    value={floorid}
                    >
                        <option value={'default'}>CHỌN TẦNG</option>
                        {
                            floordata.map((val) => {
                                return (
                                    <option value={val.id}>Tầng {val.floorNumber}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <div className="flex-1 ml-2">
                    <select id="status" name="status" className="p-2 w-full  text-l border-black border-2 rounded-xl" onChange={(e)=>setApartid(e.target.value)} value={apartid}>
                        <option value={'default'}>CHỌN CĂN HỘ</option>
                        {
                            apartmentdata.map((val) => {
                                return (
                                    <option value={val.id}> Căn hộ {val.code}</option>
                                )
                            })
                        }
                    </select>
                </div>
            </div>
            

            <Qgfilter cancleFilter={cancelFilter} doFilter={doFilter}/>
        </div>
    );
}

export default Filter;