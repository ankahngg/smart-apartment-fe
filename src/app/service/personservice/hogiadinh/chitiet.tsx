import clsx from "clsx";
import { useState } from "react";
import Nhankhau from "./nhankhau/nhankhau";
import Phuongtien from "./phuongtien/phuongtien";
import { useAppDispatch } from "@/redux/hooks";
import globalSlice from "@/redux/globalSlice";

interface newbox {
    onShow : (show : boolean) => void,
    apartId:number
}

const Chitiet:React.FC<newbox> = ({onShow,apartId})=> {
    const [page,setPage] = useState(0)
    const dispatch = useAppDispatch()

    return (
        <div className="fixed w-screen h-screen top-0 left-0">
            <div className="absolute border-2 bg-[white] top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[520px]">
                <div>
                    <div className="flex justify-end">
                        <button className="bg-[#1e83a5] hover:bg-[#176b87] p-1 text-white"
                        onClick={()=>onShow(false)}
                        >X</button>
                    </div>
                </div>

                <div className="p-3">
                    {/* row1 */}
                    
                    <div className="flex items-end">
                        <div className="text-2xl">Mã căn hộ</div>
                        <div className="font-bold ml-2 text-2xl">15.02  </div>
                        <div className="font-bold ml-2 text-xl italic">- Nguyễn Phúc An Khang</div>
                    </div>
                    {/* row2 */}

                    <div className="mt-2">
                        <button 
                        className={clsx(
                            {'p-2 hover:bg-gray-200' : page==1},
                            {'p-2 bg-[#1e83a5] text-white' : page==0}
                        )}
                        onClick={()=>setPage(0)}
                        > NHÂN KHẨU</button>
                        <button 
                        className={clsx(
                            {'p-2 hover:bg-gray-200' : page==0},
                            {'p-2 bg-[#1e83a5] text-white' : page==1}
                        )}
                        onClick={()=>setPage(1)}
                        >PHƯƠNG TIỆN</button>
                    </div>
                    
                    <div className="mt-2">
                    {
                        page == 0 ?
                        <Nhankhau apartId={apartId}/>:
                        <></>
                        // <Phuongtien apartId={apartId}/>
                    }
                    </div>

                </div>
            </div>
        </div>

        
    );
}

export default Chitiet;