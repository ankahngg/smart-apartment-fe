
import { useState } from "react";
import { useDispatch } from "react-redux";

function Table() {
    
    const data:{stt:number,mch:string,hoten:string,soluong:number,thuongtru:number,tamtru:number,tamvang:number}[] = [
        {
            stt : 1,
            mch : '15.02',
            hoten : 'Nguyen Phuc An Khang',
            soluong : 7,
            thuongtru : 5,
            tamtru : 1,
            tamvang : 1,
           
        },
        {
            stt : 2,
            mch : '15.02',
            hoten : 'Nguyen Phuc An Khang',
            soluong : 7,
            thuongtru : 5,
            tamtru : 1,
            tamvang : 1,
            
        },
        {
            stt : 3,
            mch : '15.02',
            hoten : 'Nguyen Phuc An Khang',
            soluong : 7,
            thuongtru : 5,
            tamtru : 1,
            tamvang : 1,
            
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
            {/* <div className="flex items-center">
                <div className="mr-5">
                    <button className="border-2 p-2 bg-[#1e83a5] hover:bg-[#176b87] rounded-xl text-white"
                    
                    >ĐÓNG TIỀN</button>
                </div>
                <div>
                    <div className="text-xl font-bold">Thời hạn đóng phí</div>
                    <div className="">
                        <span className="text-l italic">Tháng 11</span>
                        <span className="text-l italic">- 2025</span>
                    </div>
                </div>

            </div> */}
        </div>


        <div className="mt-2">
            <table className="w-full">
                <tr className="border-b-2 border-black mb-2 text-center">
                        <th className="p-2 w-fit">STT</th>
                        <th className="p-2 w-fit">Mã căn hộ</th>
                        <th className="p-2 w-[200px]">Họ tên chủ hộ</th>
                        <th className="p-2">Số nhân khẩu</th>
                        <th className="p-2">Số thường trú</th>
                        <th className="p-2">Số tạm trú</th>
                        <th className="p-2">Số tạm vắng</th>
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
                                <td className="p-1">{val.soluong}</td>
                                <td className="p-1">{val.thuongtru}</td>
                                <td className="p-1">{val.tamtru}</td>
                                <td className="p-1">{val.tamvang}</td>
                                <td className="p-1">
                                    <button className="bg-[#1e83a5] hover:bg-[#176b87] pl-2 pr-2 rounded-xl text-white ">XEM CHI TIẾT</button>
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