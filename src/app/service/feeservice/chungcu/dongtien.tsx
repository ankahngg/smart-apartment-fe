import globalSlice from "@/redux/globalSlice";
import { useAppDispatch } from "../../../../redux/hooks";
import axiosInstance from "@/utils/axiosConfig";

function Dongtien() {
    const dispatch = useAppDispatch();
    
    async function taohoadon() {
        await axiosInstance.get("/api/v1/invoices/create-monthly");
        alert("Tạo hóa đơn thành công")
        dispatch(globalSlice.actions.dongtien(false))
    }
        const date = new Date();
    return (
        <div className="fixed w-full h-full">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 bg-[white] w-[400px]">
                <div className="flex justify-end">
                    <button className="bg-[#1e83a5] hover:bg-[#176b87] p-1 text-white"
                    onClick={()=>dispatch(globalSlice.actions.dongtien(false))}
                    >X</button>
                </div>
                <div className="flex flex-col justify-center items-center p-2 text-xl">
                    <div>Tạo hóa đơn cho đợt thu Tháng {date.getMonth()+1} - {date.getFullYear()}</div>
                    <div>
                        <button className="bg-[#1e83a5] hover:bg-[#176b87] p-1 text-white rounded-xl mt-2" onClick={()=>taohoadon()}>Xác nhận</button>
                    </div>

                </div>
            </div>

        </div>

    );
}

export default Dongtien;