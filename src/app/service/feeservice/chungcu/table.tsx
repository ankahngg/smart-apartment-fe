import { useState } from "react";
import { useDispatch } from "react-redux";
import globalSlice from "../../../../redux/globalSlice";

function Table() {
    //const col:string[] = ['STT','Mã hóa đơn','Mã căn hộ','Họ tên chủ hộ',,'Đợt thu','Phí quản lí','Phí dịch vụ','Trạng thái','Ngày đóng','Xóa']
    const data:{stt:number,mhd:string,mch:string,hoten:string,dotthu:string,phiql:number,phidv:number,phigx:number,phish:number,state:string,ngaydong:string}[] = [
        {
            stt : 1,
            mhd : 'HD1002',
            mch : '15.02',
            hoten : 'Nguyen Phuc An Khang',
            dotthu : 'Thang 10',
            phiql : 100000,
            phidv : 100000,
            phigx : 1000000,
            phish : 2000000,
            state : 'da dong',
            ngaydong : '20-10-2023'
        },
        {
            stt : 2,
            mhd : 'HD1001',
            mch : '15.02',
            hoten : 'Nguyen Phuc An Khang',
            dotthu : 'Thang 10',
            phiql : 100000,
            phidv : 100000,
            phigx : 1000000,
            phish : 2000000,
            state : 'da dong',
            ngaydong : '20-10-2023'
        }
    ]
    const dispatch = useDispatch();
    return (
    <div className="w-full p-4 border-black border-2">
        <div className="flex justify-between">
            <div>
                <div className="text-xl font-bold">Danh sách hóa đơn</div>
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
            <div className="flex items-center">
                <div className="mr-5">
                    <button className="border-2 p-2 bg-[#1e83a5] hover:bg-[#176b87] rounded-xl text-white"
                    onClick={()=>dispatch(globalSlice.actions.dongtien(true))}
                    >ĐÓNG TIỀN</button>
                </div>
                <div>
                    <div className="text-xl font-bold">Thời hạn đóng phí</div>
                    <div className="">
                        <span className="text-l italic">Tháng 11</span>
                        <span className="text-l italic">- 2025</span>
                    </div>
                </div>

            </div>
        </div>


        <div className="mt-2">
            <table className="w-full">
                <tr className="border-b-2 border-black mb-2">
                        <th className="p-2 text-center w-fit">STT</th>
                        <th className="p-2 text-center w-fit">Mã hóa đơn</th>
                        <th className="p-2 text-center w-fit">Mã căn hộ</th>
                        <th className="p-2 text-center w-[200px]">Họ tên chủ hộ</th>
                        <th className="p-2 text-center">Đợt thu</th>
                        <th className="p-2 text-center">Phí dịch vụ</th>
                        <th className="p-2 text-center">Phí quản lý</th>
                        <th className="p-2 text-center">Phí gửi xe</th>
                        <th className="p-2 text-center">Phí sinh hoạt</th>
                        <th className="p-2 text-center">Trạng thái</th>
                        <th className="p-2 text-center">Ngày đóng</th>
                        <th className="p-2 text-center">Xóa</th>
                </tr>
                {
                    data.map((val)=> {
                        const [more, setMore] = useState(false);
                        return (
                            <tr className="align-top hover:bg-[#68d3cc1c]">
                                <td className="text-center">{val.stt}</td>
                                <td className="text-center">{val.mhd}</td>
                                <td className="text-center">{val.mch}</td>
                                <td className="text-center w-[200px]">{val.hoten}</td>
                                <td className="text-center">{val.dotthu}</td>
                                <td className="text-center">{(val.phidv).toLocaleString('de-DE')}</td>
                                <td className="text-center"> {(val.phiql).toLocaleString('de-DE')}</td>
                                <td className="text-center"> {(val.phigx).toLocaleString('de-DE')}</td>
                                <td className="text-center"> 
                                    <button onClick={()=>setMore(!more)}>
                                        {(val.phish).toLocaleString('de-DE')}
                                    </button>
                                    {
                                        more == true ?
                                        (<div>
                                            <div className="text-left text-sm">Tiền điện 100k</div>
                                            <div className="text-left text-sm">Tiền nước 200k</div>
                                            <div className="text-left text-sm">Tiền mạng 100k</div>
                                        </div>
                                        )

                                        :
                                        (<div></div>)
                                    }
                                </td>
                                <td className="text-center">{val.state}</td>
                                <td className="text-center">{val.ngaydong}</td>
                                <td className="text-center">
                                    <button className="hover:bg-red-500 pl-2 pr-2 rounded-xl">Xóa</button>
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