
import globalSlice from "@/redux/globalSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

function Table() {
    //const col:string[] = ['STT','Mã hóa đơn','Mã căn hộ','Họ tên chủ hộ',,'Đợt thu','Phí quản lí','Phí dịch vụ','Trạng thái','Ngày đóng','Xóa']
    const data:{stt:number,mch:string,hoten:string,dientich:number,soluong:number,phuongtien:number}[] = [
        {
            stt : 1,
            mch : '15.02',
            hoten : 'Nguyen Phuc An Khang',
            dientich : 120,
            soluong : 7,
            phuongtien : 6
           
        },
        {
            stt : 2,
            mch : '16.02',
            hoten : 'Nguyen An Khanh',
            dientich : 120,
            soluong : 7,
            phuongtien : 6
            
        },
        {
            stt : 3,
            mch : '16.03',
            hoten : "Chưa có",
            dientich : 120,
            soluong : 0,
            phuongtien : 6
            
        }
    ]
    const dispatch = useDispatch();
    return (
    <div className="w-full p-4 border-black border-2 h-[700px]">
        <div className="flex justify-between">
            <div>
                <div className="text-xl font-bold">Danh sách nhân khẩu</div>
                <div className="pt-2">
                    <div className="flex space-x-2">
                        <div className="text-sm">Hiển thị</div>
                        <select className="border-gray-200 boder-2 bg-gray-200 text-sm">
                            <option>10</option>
                            <option>11</option>
                        </select>
                        <div className="text-sm">hàng</div>
                    </div>
                </div>
            </div>
        </div>


        <div className="mt-2">
            <table className="w-full">
                <tr className="border-b-2 border-black mb-2 text-center">
                        <th className="p-2 w-fit">STT</th>
                        <th className="p-2 w-fit">Mã căn hộ</th>
                        <th className="p-2 w-[200px]">Họ tên chủ hộ</th>
                        <th className="p-2">Diện tích</th>
                        <th className="p-2">Số nhân khẩu</th>
                        <th className="p-2">Số phương tiện</th>
                        <th className="p-2">Hành động</th>
                        
                        </tr>
                {
                    data.map((val)=> {
                        const [more, setMore] = useState(false);
                        return (
                            <tr className="align-top hover:bg-[#68d3cc1c] text-center ">
                                <td className="p-1">{val.stt}</td>
                                <td className="p-1">{val.mch}</td>
                                <td className="p-1 w-[200px]">{val.hoten}</td>
                                <td className="p-1">{val.dientich}</td>
                                <td className="p-1">
                                    {(val.soluong).toLocaleString('de-DE')}
                                </td>
                                <td className="p-1">{(val.phuongtien).toLocaleString('de-DE')}</td>
                                <td className="p-1">
                                    <button className="bg-[#1e83a5] hover:bg-[#176b87] pl-2 pr-2 rounded-xl text-white "
                                    onClick={()=>dispatch(globalSlice.actions.hgd_chitiet_action(true))}>Xem chi tiết</button>
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

export default Table;   