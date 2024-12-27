import { useState } from "react";
import Themphuongtien from "./themphuongtien";
import Lichsubd from "../nhankhau/lichsubd";

function Phuongtien() {
    const phuongtien_data:{stt:number,tenpt:string,loaipt:string,bienso:string,ngaythem:string}[] = [
    {  
        stt : 1,
        tenpt : "camry 300",
        loaipt : "o to",
        bienso : "15B3-72372",
        ngaythem : "15-10-2024"
    },
    {  
        stt : 2,
        tenpt : "air blade 2024",
        loaipt : "xe may",
        bienso : "15B1-48612",
        ngaythem : "20-10-2024"
    },
    ]
    const [add,setAdd] = useState(false);
    const [xemls,setXemls] = useState(false);
    return (
        <div>
            {
                add ?
                <Themphuongtien onShow={setAdd}/>:
                <></>
            }
           
            <div className="flex justify-end">
                <button className="p-2 bg-[#1e83a5] hover:bg-[#176b87] text-white rounded-xl text-sm"
                onClick={()=>setAdd(true)}
                >THÊM PHƯƠNG TIỆN</button>
            </div>
            <div className="h-[300px]">
                <table className="w-full">
                    <tr className="border-b-2 border-black mb-2 text-center ">
                        <th className="w-fit">STT</th>
                        <th className="p-2">Tên phương tiện</th>
                        <th className="p-2">Loại phương tiện</th>
                        <th className="p-2">Biển số</th>
                        <th className="p-2">Ngày thêm</th>
                        <th className="p-2">Xóa</th>
                    </tr>
                        {
                            phuongtien_data.map((val,index)=> {
                                const [more, setMore] = useState(false);
                                return (
                                    <tr className="align-top hover:bg-[#68d3cc1c] text-center">
                                        <td className="p-2">{val.stt}</td>
                                        <td className="w-[150px] p-2">{val.tenpt}</td>
                                        <td className="p-2 ">{val.loaipt}</td>
                                        <td className="p-2 w-[150px]">{val.bienso}</td>
                                        <td className="p-2">{val.ngaythem}</td>
                                        <td className="p-2">
                                            <button className="bg-[#1e83a5] hover:bg-[#176b87] pl-2 pr-2 rounded-xl text-white"
                                            >Xóa</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                </table>
            </div>
        </div>
    );
}

export default Phuongtien;