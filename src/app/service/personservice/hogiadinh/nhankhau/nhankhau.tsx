import { use, useState } from "react";
import Themnguoi from "./themnguoi";
import Phantrang from "../../phantrang";
import Lichsubd from "./lichsubd";

function Nhankhau() {
    const data:{stt:number, macd:string,hoten:string,gioitinh:string,ngaysinh:string,cccd:string,quequan:string,nghenghiep:string,lienhe:string,trangthai:string,vaitro:string}[] = [
        {
            stt : 1,
            macd : 'CD101',
            hoten : 'Nguyen Phuc An Khang',
            gioitinh : "nam",
            ngaysinh : "27-07-2004",
            cccd : "03123415159",
            quequan : "hai phong",
            nghenghiep : "sinh vien",
            lienhe : "0934518490",
            trangthai : "Thường trú",
            vaitro : "Chủ hộ"
        },
        
        
    ]
    const maxpage = 6;
    const [page,setPage] = useState(1);
    const [add,setAdd] = useState(false);
    const [xemls,setXemls] = useState(false);
    return (
        <div>
            {
                add ?
                <Themnguoi onShow={setAdd} />
                :
                <></>
            }
            {
                xemls ?
                <Lichsubd onShow={setXemls}/>
                :
                <></>
                
            }
            <div className="flex justify-end">
                <button className="italic mr-4 underline"
                onClick={()=>setXemls(true)}
                >XEM LỊCH SỬ BIẾN ĐỘNG</button>
                <button className="p-2 bg-[#1e83a5] hover:bg-[#176b87] text-white rounded-xl text-sm"
                onClick={()=>setAdd(true)}
                >THÊM NHÂN KHẨU</button>
            </div>
            <div className="h-[300px] overflow-y-scroll">
                <table className="w-full">
                    <tr className="border-b-2 border-black mb-2 text-center bg-white ">
                        <th>STT</th>
                        <th className="p-2">MCD</th>
                        <th className="p-2 w-[200px]">Họ và tên</th>
                        <th className="p-2">Giới tính</th>
                        <th className="p-2">Ngày sinh</th>
                        <th className="p-2">Mã số CCCD</th>
                        <th className="p-2">Quê quán</th>
                        <th className="p-2">Nghề nghiệp</th>
                        <th className="p-2">Liên hệ</th>
                        <th className="p-2">Trạng thái</th>
                        <th className="p-2">Vai trò</th>
                        <th className="p-2">Xóa</th>
                    </tr>
                        {
                            data.map((val,index)=> {
                                var crpage = page;
                                const [more, setMore] = useState(false);
                                if(index >= (crpage-1)*maxpage && index < crpage*maxpage)
                                return (
                                    <tr className="align-top hover:bg-[#68d3cc1c] text-center">
                                        <td className="p-2">{val.stt}</td>
                                        <td className="p-2">{val.macd}</td>
                                        <td className="text-center w-[200px] p-2">{val.hoten}</td>
                                        <td className="p-2">{val.gioitinh}</td>
                                        <td className="p-2">{val.ngaysinh}</td>
                                        <td className="p-2">{val.cccd}</td>
                                        <td className="p-2">{val.quequan}</td>
                                        <td className="p-2"> {(val.nghenghiep)}</td>
                                        <td className="p-2"> {(val.lienhe)}</td>
                                        <td className="p-2">{val.trangthai}</td>
                                        {
                                            index == 0 ?
                                            <td className="font-bold p-2"> {(val.vaitro)}</td>
                                            :
                                            <td className="p-2"> {(val.vaitro)}</td>

                                        }
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

export default Nhankhau;