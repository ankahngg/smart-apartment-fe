import clsx from "clsx";
import Phantrang from "../../phantrang";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import axiosInstance from "@/utils/axiosConfig";

interface newbox {
    onShow : (show : boolean) => void
}
interface biendong{
    stt : number,
    id : number,
    trangthai:string,
    ngay: string,
    ghichu: string,
    enumName:string,
    macd:string,
    hoten:string,
}

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };


const Lichsubd:React.FC<newbox> = ({onShow}) => {
    const cr_apart = useAppSelector((state) => state.global.cr_apart) 
    const [logdata,setLogdata] = useState<biendong[]>([])
    useEffect(() =>{
        const fetchChangelog = async () =>{
            const response = await axiosInstance.post("/api/v1/residents/change-log/search",{
                pageSize:999,
                filters: [
                    {
                        name:"apartmentId",
                        value:cr_apart.id,
                        operation:"eq",   
                    }
                ],
                sorts: [
                    {
                        property: "changeDate",
                        direction: "desc"
                    },
                ]
            });
        
            console.log('changelog Response:', response.data);
            if(response.data) {
                const fetchedData = response.data.content.map((item:any,index:any) =>{
                    return {
                        stt : index+1,
                        trangthai:item.changeType.name,
                        ngay:formatDate(item.changeDate),
                        ghichu:item.notes,
                        id : item.id,
                        enumName : item.changeType.enumName,
                        macd :item.resident?.residentId||"",
                        hoten:item.resident?.fullName||"",
                    }
                })
                console.log('fetchedData_changelog: ',fetchedData)
                setLogdata(fetchedData);
            }
            else setLogdata([])
        }
        fetchChangelog()

    },[])

    return (
        
        <div className="w-full h-full fixed z-10">
            <div className="absolute left-1/2 -translate-x-1/2 border-2 w-[700px] bg-white h-[400px]">
                <div className="flex justify-end">
                    <button className="bg-[#1e83a5] hover:bg-[#176b87] p-1 text-white"
                    onClick={()=>onShow(false)}
                    >X</button>
                </div>
                <div className="text-center text-xl font-bold">LỊCH SỬ BIẾN ĐỘNG</div>
                <div className="p-3 h-[300px] overflow-y-scroll">
                    <table className="w-full ">
                        <tr className="text-center sticky top-0 bg-white">
                            <th className="p-2">STT</th>
                            <th className="p-2 w-[200px]">Họ và tên</th>
                            <th className="p-2">Ngày biến động</th>
                            <th className="p-2">Loại biến động</th>
                        </tr>
                        {
                            logdata.map((val,index)=>{
                                return (
                                    <tr className="text-center" key={index}>
                                        <td className="p-2">{val.macd}</td>
                                        <td className="p-2">{val.hoten}</td>
                                       
                                        <td className="p-2">{val.ngay}</td>
                                        <td className="p-2"
                                        >{val.trangthai}</td>
                                    </tr>
                                )
                            })
                        }
                        
                        
                    </table>
                </div>

            </div>
        </div>
        
    );
}

export default Lichsubd;