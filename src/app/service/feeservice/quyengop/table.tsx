import Dongtien from "./dongtien";

function Table() {

    const data:{stt:number,mqg:string,tenqg:string,tgbd:string, tgkt:string,mch:string,hoten:string,sotien:number,ngaydong:string}[] = [
        {
            stt:1,
            mqg:"qg101",
            tenqg:"Quy tre em hiem ngheo vuot kho",
            tgbd:"20-10-2024",
            tgkt:"20-10-2025",
            mch:"12.01",
            hoten:"Nguyen Phuc An Khang",
            sotien : 100000,
            ngaydong : "20-11-2024"

        },
        {
            stt:1,
            mqg:"qg101",
            tenqg:"Quy tre em hiem ngheo vuot kho",
            tgbd:"20-10-2024",
            tgkt:"20-10-2025",
            mch:"12.01",
            hoten:"Nguyen Phuc An Khang",
            sotien : 100000,
            ngaydong : "20-11-2024"

        }
    ]
    return (
    <div className="p-2 border-2 h-[800px] border-black">
        <div className="flex justify-between">
            <div>
                <div className="text-xl font-bold">Danh sách quyên góp</div>
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
            <div className="mr-5">
                    <button className="border-2 p-2 bg-[#1e83a5] hover:bg-[#176b87] rounded-xl text-white"
                    >QUYÊN GÓP</button>
                </div>
        </div>
        <div className="mt-2">
            <table className="w-full">
                <tr className="border-b-2 border-black mb-2 align-top text-center">
                        <th className="p-2 w-fit">STT</th>
                        <th className="p-2 w-fit">MQG</th>
                        <th className="p-2 w-[180px]">Tên quyên góp</th>
                        <th className="p-2 ">Thời gian bắt đầu</th>
                        <th className="p-2">Thời gian kết thúc</th>
                        <th className="p-2 w-fit">Mã căn hộ</th>
                        <th className="p-2 w-[180px]">Họ tên chủ hộ</th>
                        <th className="p-2">Số tiền</th>
                        <th className="p-2">Ngày đóng</th>
                        <th className="p-2">Hành động</th>
                </tr>
                {
                    data.map((val)=> {
                        return (
                            <tr className="align-top hover:bg-[#68d3cc1c] text-center">
                                <td className="">{val.stt}</td>
                                <td className="">{val.mqg}</td>
                                <td className="">{val.tenqg}</td>
                                <td className="">{val.tgbd}</td>
                                <td className="">{val.tgkt}</td>
                                <td className="">{val.mch}</td>
                                <td className="">{val.hoten}</td>
                                <td className="">{(val.sotien).toLocaleString('de-DE')}</td>
                                <td className="">{val.ngaydong}</td>
                                <td className="">
                                    <button className="bg-[#1e83a5] hover:bg-[#176b87] pl-2 pr-2 rounded-xl text-white">XÓA</button>
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