import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFilter } from "../chungcu/useFilter";
import MonthYearPicker from "@/app/components/MonthYearPicker";
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

const Filter: React.FC = () => {
    const dispatch = useAppDispatch()
    const [statuses, setStatuses] = useState<{ code: string; name: string; enumName: string }[]>([]);
    const [floordata,setFloordata] = useState<floors[]>([])
    const [apartmentdata,setApartmentdata] = useState<apartments[]>([])
    const [floorid,setFloorid] = useState('');
    const [apartid,setApartid] = useState('');
    const [state,setState] = useState('');
    const [keyword,setKeyword] = useState('');

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
            const fetchedData = response.data.content.map((item: any) => ({
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

    function cancelFilter(): void {
            setFloorid('')
            setApartid('')
            setKeyword('')
            setApartmentdata([])
            setDate('')
            dispatch(globalSlice.actions.set_filter_apart(''))
            dispatch(globalSlice.actions.set_filter_floor(''))
            dispatch(globalSlice.actions.set_filter_keyword(''))
            dispatch(globalSlice.actions.set_filter_status(''))
            dispatch(globalSlice.actions.set_filter_dot(''))
        }
    
        function doFilter(): void {
            dispatch(globalSlice.actions.set_filter_apart(apartid))
            dispatch(globalSlice.actions.set_filter_floor(floorid))
            dispatch(globalSlice.actions.set_filter_keyword(keyword))
            dispatch(globalSlice.actions.set_filter_status(state))
            dispatch(globalSlice.actions.set_filter_dot(date))
        }

    useEffect(() => {
        const fetchInit = async () => {
            const response = await axiosInstance.post("/api/v1/floors/search",{
                pageSize : 999,
            })
            if (response.data && response.data.content) {
                const fetchedData = response.data.content.map((item: any) => ({
                    
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
        const fetchStatuses = async () => {
            const statusResponse = await axiosInstance.get("/api/v1/enum/invoice-statuses");
            setStatuses(statusResponse.data); // Giả sử API trả về một mảng các đối tượng

        };
        fetchStatuses();
        dispatch(globalSlice.actions.set_filter_apart(''))
        dispatch(globalSlice.actions.set_filter_floor(''))
        dispatch(globalSlice.actions.set_filter_keyword(''))

    }, []);
    const [date,setDate] = useState('')
    // alert(date)
    return (
        <div className="flex">
            <div className="p-3 w-[250px] border-black border-2">
                <div className="text-xl mb-3 p-2 italic">Bộ lọc</div>
                {/* <MonthYearPicker setDate={setDate} date={date}/> */}
                <div className="p-2">CHỌN ĐỢT THU</div>
                <input className="p-2 w-full border-2 border-black rounded-xl mb-2" type="month" onChange={(e)=>setDate(e.target.value)} value={date}/>

                <select className="p-2 w-full text-l border-black border-2 mb-2 rounded-xl" onChange={(e) => setState(e.target.value)} value={state}>
                    <option value="">CHỌN TRẠNG THÁI</option>
                    {statuses.map((status) => (
                        <option key={status.code} value={status.name}>
                            {status.name}
                        </option>
                    ))}
                </select>
                
                <select className="p-2 w-full text-l border-black border-2 mb-2 rounded-xl" onChange={(e) => {handleFloor(e.target.value),setFloorid(e.target.value)}} value={floorid}>
                    <option value={''}>CHỌN TẦNG</option>
                        {
                            floordata.map((val,index) => {
                                return (
                                    <option value={val.id} key={index}>Tầng {val.floorNumber}</option>
                                )
                            })
                        }
                </select>

                <select className="p-2 w-full text-l border-black border-2 mb-2 rounded-xl" onChange={(e) => setApartid(e.target.value)} value={apartid}>
                    <option value={''}>CHỌN CĂN HỘ</option>
                    {
                            apartmentdata.map((val,index) => {
                                return (
                                    <option value={val.id} key={index}> Căn hộ {val.code}</option>
                                )
                            })
                        }
                </select>

                {/* <input type="text" placeholder="Tìm kiếm.." className="text-black text-l w-full p-2 border-black border-2 mb-2 rounded-xl" onChange={(e) => setName(e.target.value)} value={name} /> */}

                <div className="flex mt-2 justify-end">
                    <button className="border-black border-2 p-2 rounded-xl hover:bg-gray-200" onClick={cancelFilter}>HỦY LỌC</button>
                    <button className="ml-4 p-2 bg-[#1e83a5] hover:bg-[#176b87] text-white rounded-xl" onClick={doFilter}>ÁP DỤNG</button>
                </div>
            </div>
        </div>
    );
};

export default Filter;
