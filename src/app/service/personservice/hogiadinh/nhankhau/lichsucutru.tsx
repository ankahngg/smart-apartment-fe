import axiosInstance from "@/utils/axiosConfig"
import { useEffect, useState } from "react"
import Khaibao from "./khaibao";
import Chinhsua from "./chinhsua";
import Chinhsuacutru from "./chinhsuacutru";

interface newbox {
    resId : string
}


interface changelog{
    stt : number,
    trangthai:string,
    ngay: string,
    ghichu: string,
}


const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

const Lichsucutru:React.FC<newbox> = ({resId}) => {
    const [logdata,setLogdata] = useState<changelog[]>([])
    const [kbao,setKbao] = useState(false)
    const [csua,setCsua] = useState(false)
    useEffect(()=>{
        const fetchChangelog = async () =>{
            const response = await axiosInstance.post("/api/v1/residents/change-log/search",{
                pageSize:999,
                filters: [
                    {
                        name:"residentId",
                        value:resId,
                        operation:"eq",   
                    }
                ]
            });
            console.log('changelog Response:', response.data);
            if(response.data) {
                const fetchedData = response.data.content.map((item:any,index:any) =>{
                    return {
                        stt : index+1,
                        trangthai:item.changeType.name,
                        ngay:item.changeDate,
                        ghichu:item.notes,
                    }
                })
                console.log('fetchedData_changelog: ',fetchedData)
                setLogdata(fetchedData);
            }
            else setLogdata([])
        }

        fetchChangelog()
    },[kbao])

    return (
        <div className="pl-4">
            <div className=' flex items-center'>
                <div className='font-bold text-lg pt-2 pb-2 mr-4' >
                    LỊCH SỬ CƯ TRÚ
                </div>
                <div>
                    <button className='bg-[#1e83a5] hover:bg-[#176b87] p-1 text-white rounded-xl'
                    onClick={()=>setKbao(true)}
                    >KHAI BÁO</button>
                </div>
            </div>
            <div className='flex'>
                <div className='h-[200px] w-[550px] overflow-auto pr-2'>
                    <table className="w-full">
                        <tr className='text-center border-b-2 border-b-black sticky top-0 bg-white text-sm'>
                            <th className='w-[10px]'>STT</th>
                            <th className='p-2'>Trạng thái</th>
                            <th className='p-2'>Ngày khai báo</th>
                            <th className='p-2 w-[150px]'>Ghi chú</th>
                            <th className='p-2'>Hành động</th>
                        </tr>
                        {
                            logdata.map((val,index) =>{
                                return (
                                <tr className={`text-center text-sm hover:bg-[#68d3cc1c]`}>
                                    <td className='p-2'>{val.stt}</td>
                                    <td className='p-2'>{val.trangthai}</td>
                                    <td className='p-2'>{formatDate(val.ngay)}</td>
                                    <td className='p-2'>{val.ghichu} </td>
                                    <td className='p-2'>
                                        <button className='bg-[#1e83a5] hover:bg-[#176b87] p-1 text-white rounded-xl' 
                                        onClick={()=>setCsua(true)}
                                        >Chỉnh sửa</button>
                                    </td>
                                </tr>
                                )
                            })
                        }
                        
                        
                    </table>
                </div>
                {
                    kbao?
                    <Khaibao onShow={setKbao} resId={resId}/>
                    :
                    <></>
                }
                {
                    csua ?
                    <Chinhsuacutru onShow={setCsua} resId={resId}/>
                    :
                    <></>
                }
               
                    
                
            </div>
        </div>
)};

export default Lichsucutru;