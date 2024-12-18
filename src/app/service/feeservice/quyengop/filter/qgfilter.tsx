import globalSlice from "@/redux/globalSlice";
import { useAppDispatch } from "@/redux/hooks"

function Qgfilter() {
    const dispatch = useAppDispatch()
    const qg_data:{maqg:string,tenqg:string,tongtien:number,tgbd:string,tgkt:string}[] = [
        {
            maqg : "qg00",
            tenqg : "quy tre em hiem ngheo 2024 - 2025",
            tongtien : 100055,
            tgbd : "20-10-2024",
            tgkt : "30-10-2025"
        },
        {
            maqg : "qg00",
            tenqg : "quy tre em hiem nghedadada dadad qerrqr o 2024 - 2025",
            tongtien : 100055,
            tgbd : "20-10-2024",
            tgkt : "30-10-2025"
        },

    ]
    return (
        <div>
            <div className="flex justify-between items-center ">
                <div className="w-fit">
                    <select className="border-2 border-black p-2 rounded-xl mr-2">
                        <option>TẤT CẢ</option>
                        <option>VẪN CÒN THU</option>
                        <option>ĐÃ ĐÓNG ĐƠN</option>
                    </select>
                </div>
                <div className="w-full">
                    <input className="p-2 pb-1 border-2 border-black rounded-xl w-full" type="text" placeholder="TÌM KIẾM"/>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <button className="border-2 border-black rounded-xl p-1 bg-[#1e83a5] hover:bg-[#176b87] text-white mt-2"
                onClick={()=>dispatch(globalSlice.actions.themchiendich(true))}
                >THÊM CHIẾN DỊCH</button>
                <div>
                    <button className="italic mr-4 text-sm underline">Chọn hết </button>
                    <button className="italic text-sm underline">Bỏ chọn hết </button>
                </div>
            </div>
            <div className="mt-2">
                <table>
                    <tr className="text-sm align-top border-b-2 border-black">
                        <th className="p-1 w-fit">MQG</th>
                        <th className="p-1 w-[150px]">Tên quyên góp</th>
                        <th className="p-1 ">Tổng tiền thu</th>
                        <th className="p-1">Thời gian bắt đầu</th>
                        <th className="p-1">Thời gian kết thúc</th>
                        <th className="p-1">Hiển thị</th>
                    </tr>
                    {
                        qg_data.map((val) => {
                            return (
                            <tr className="text-center text-sm align-top hover:bg-[#68d3cc1c]">
                                <td>{val.maqg}</td>
                                <td>{val.tenqg}</td>
                                <td>{val.tongtien}</td>
                                <td>{val.tgbd}</td>
                                <td>{val.tgkt}</td>
                                <td>
                                    <input type="checkbox" className="p-4 text-xl" />
                                </td>
                            </tr>
                        )})
                    }

                </table>
            </div>
        </div>
    );
}

export default Qgfilter;