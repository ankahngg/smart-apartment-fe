import globalSlice from "@/redux/globalSlice";
import { useAppDispatch } from "../../../../redux/hooks";

function Dongtien() {
    const dispatch = useAppDispatch();
    return (
        <div className="fixed w-full h-full">
            <div className="absolute top-[100px] left-[600px] border-2 bg-[white]">
                <div className="flex justify-end">
                    <button className="bg-[#1e83a5] hover:bg-[#176b87] p-1 text-white"
                    onClick={()=>dispatch(globalSlice.actions.dongtien(false))}
                    >X</button>
                </div>
                <div className="p-3">
                    <div className="text-center mb-3">Nhập mã hóa đơn</div>
                    <div>
                        <input type="text" className="border-2 p-2 text-center rounded-xl" placeholder=""/>
                    </div>
                    <div className="flex justify-center">
                        <button className="border-2 p-2 mt-3 rounded-xl bg-[#1e83a5] hover:bg-[#176b87] text-white">ĐÓNG TIỀN</button>
                    </div>

                </div>
            </div>

        </div>

    );
}

export default Dongtien;