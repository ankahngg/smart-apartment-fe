import globalSlice from "@/redux/globalSlice";
import { useAppDispatch } from "@/redux/hooks";
import axiosInstance from "@/utils/axiosConfig";
import { useEffect, useState } from "react";
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
    const [apartdata,setApartdata] = useState<apartments[]>([]);
    const [floorid,setFloorid] = useState('');
    const [apartid,setApartid] = useState('');
    const [keyword,setKeyword] = useState('');
    // const []
    useEffect(() =>{
        const fetchFloor = async () =>{
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
        fetchFloor()
        dispatch(globalSlice.actions.set_filter_apart(''))
        dispatch(globalSlice.actions.set_filter_floor(''))
        dispatch(globalSlice.actions.set_filter_keyword(''))
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
                id: item.apartmentId,
                name: item.name,
                code: item.code,
            }));
            setApartdata(fetchedData); // Cập nhật state `data`
            console.log('Fetched Data:', fetchedData);  // Log fetched data for debugging
        } else {
            setApartdata([]); // Cập nhật state `data` với mảng rỗng nếu không có dữ liệu
        }
    }

    function cancelFilter(): void {
        setFloorid('')
        setApartid('')
        setKeyword('')
        setApartdata([])
        dispatch(globalSlice.actions.set_filter_apart(apartid))
    }

    function doFilter(): void {
        dispatch(globalSlice.actions.set_filter_apart(apartid))
        dispatch(globalSlice.actions.set_filter_floor(floorid))
        dispatch(globalSlice.actions.set_filter_keyword(keyword))
    }
    return ( 
        <div className="border-2 p-2 border-black w-[300px]">
            <div className="p-2 italic text-xl ">Bộ lọc</div>
            <select id="status" name="status" className="p-2 w-full text-l border-black border-2 rounded-xl mb-2" onChange={(e)=>{handleFloor(e.target.value), setFloorid(e.target.value)}} value={floorid}>
                <option value={''}>CHỌN TẦNG</option>
                {
                    floordata.map((val)=>{
                        return (
                            <option value={val.id}> TẦNG {val.floorNumber}</option>
                        )
                    })
                }
            </select>
           
            <select id="status" name="status" className="p-2 w-full text-l border-black border-2 rounded-xl mb-2" onChange={(e)=>setApartid(e.target.value)} value={apartid}>
                <option value={''}>CHỌN CĂN HỘ</option>
                {
                    apartdata.map((val)=>{
                        return (
                            <option value={val.id}> TẦNG {val.code}</option>
                        )
                    })
                }
            </select>
            <input type="text" placeholder="NHẬP TÊN CHỦ HỘ" className="text-black text-l w-full p-2 border-black border-2 mb-2 rounded-xl" onChange={(e)=>setKeyword(e.target.value)} value={keyword}/> 
            
            <div className="flex mt-2 justify-end">
                <button className="border-black border-2 p-2 rounded-xl hover:bg-gray-200"
                onClick={()=>cancelFilter()}
                >HỦY LỌC</button>
                <button className="ml-4 p-2 bg-[#1e83a5] hover:bg-[#176b87] text-white rounded-xl"
                onClick={()=>doFilter()}
                >ÁP DỤNG</button>
            </div>
        </div>
        
    );
}

export default Filter;