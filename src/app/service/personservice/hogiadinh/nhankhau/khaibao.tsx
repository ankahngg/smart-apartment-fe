import { useAppSelector } from "@/redux/hooks";
import axiosInstance from "@/utils/axiosConfig";
import { useEffect, useState } from "react";

interface newbox {
    onShow : (show : boolean) => void,
}

interface changetype {
    code:number,
    name:string,
    enumName:string,
}

 

const Khaibao:React.FC<newbox> =({onShow}) => {
    const cr_res = useAppSelector((state) =>state.global.cr_res)
    const [changetype,setChangetype] = useState<changetype[]>([]);
    const [changetypechoose,setChangetypechoose] = useState('')
    const [notekb,setNotekb] = useState('');
    const [changedate,setChangedate] = useState('');
    useEffect(()=>{
        const fetchChangeType = async() => {
            const response = await axiosInstance.get("/api/v1/enum/living-type");
            setChangetype(response.data)
            setChangetypechoose(response.data[0].enumName)
        }
        fetchChangeType()
    },[])
    
    async function handleKhaibao(){
        if(changedate=='') {alert("Không được để trống ngày"); return;}
        await axiosInstance.post(`/api/v1/residents/change-living-type?residentId=${cr_res.macd}`,{
            newLivingType:changetypechoose,
            notes:notekb,
            changeDate : changedate
        })
        onShow(false)
    }

    return (
        <div className="w-full h-full fixed z-10">
            <div className="absolute right-5  border-2 w-fit bg-white p-2">
            <div className='text-sm'>
                <div className="flex justify-end">
                    <button className="bg-[#1e83a5] hover:bg-[#176b87] p-1 text-white"
                    onClick={()=>onShow(false)}
                    >X</button>
                </div>
                <div className='flex items-center'>
                    <div>
                        <div className='font-bold'>Chọn trạng thái</div>
                        <select className='p-2 border-2 border-black' onChange={(e)=>setChangetypechoose(e.target.value)} value={changetypechoose}>
                            {
                                changetype.map((val,index) =>{
                                    return (
                                        <option value={val.enumName}>{val.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className='ml-2'>
                        <div className='font-bold'>Chọn ngày</div>
                        <div>
                            <input className='border-2 p-2 border-black' type='date' placeholder='dd-mm-yyyy' onChange={(e)=>setChangedate(e.target.value)} value={changedate}/>
                        </div>
                    </div>
                </div>
                <div>
                    <div>Ghi chú</div>
                    <input type="text" className='border-2 border-black p-2 w-full' value={notekb} onChange={(e)=>setNotekb(e.target.value)} />
                </div>
                <div className='mt-4'>
                    <button className='bg-[#1e83a5] hover:bg-[#176b87] p-1 text-white rounded-xl'
                    onClick={()=>handleKhaibao()}
                    >KHAI BÁO</button>
                </div>
            </div>
        
                

            </div>
        </div>
    );
}

export default Khaibao;