import clsx from "clsx";
import Phantrang from "../../phantrang";
import { useState } from "react";

interface newbox {
    onShow : (show : boolean) => void
}
const Lichsubd:React.FC<newbox> = ({onShow}) => {
    const lichsu_data:{macd:string,hoten:string,vaitro:string,ngaybd:string,loaibd:string}[] = [
        {
            macd : 'CD101',
            hoten : "Nguyen Phuc An Khang",
            vaitro : "Chủ hộ",
            ngaybd : "20-10-2024",
            loaibd : "Thêm",
        },
        {
            macd : 'CD101',
            hoten : "Nguyen Phuc An Khaggng",
            vaitro : "Chủ hộ",
            ngaybd : "20-10-2024",
            loaibd : "Thêm",
        },
        {
            macd : 'CD101',
            hoten : "Nguyen Phuc An Khang",
            vaitro : "Chủ hộ",
            ngaybd : "20-10-2024",
            loaibd : "Xóa",
        },
        {
            macd : 'CD101',
            hoten : "Nguyen Phuc An Khang",
            vaitro : "Chủ hộ",
            ngaybd : "20-10-2024",
            loaibd : "Xóa",
        }
    ]
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
                            <th className="p-2">MCD</th>
                            <th className="p-2 w-[200px]">Họ và tên</th>
                            <th className="p-2">Vai trò</th>
                            <th className="p-2">Ngày biến động</th>
                            <th className="p-2">Loại biến động</th>
                        </tr>
                        {
                            lichsu_data.map((val,index)=>{
                                return (
                                    <tr className="text-center">
                                        <td className="p-2">{val.macd}</td>
                                        <td className="p-2">{val.hoten}</td>
                                        <td className="p-2">{val.vaitro}</td>
                                        <td className="p-2">{val.ngaybd}</td>
                                        <td className={clsx(
                                            'p-2 font-bold',
                                            {'text-red-500 ' : val.loaibd == "Xóa"},
                                            {'text-green-500' : val.loaibd == "Thêm"},
                                        )}
                                        >{val.loaibd}</td>
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