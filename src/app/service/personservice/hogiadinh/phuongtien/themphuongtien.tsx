interface newbox {
    onShow : (show : boolean) => void
}

const Themphuongtien:React.FC<newbox> = ({onShow}) => {
    return (  
        <div className="w-full h-full fixed z-10">
            <div className="absolute left-1/2 -translate-x-1/2 border-2 w-[400px] bg-white">
                <div className="flex justify-end">
                    <button className="bg-[#1e83a5] hover:bg-[#176b87] p-1 text-white"
                    onClick={()=>onShow(false)}
                    >X</button>
                </div>
                <div className="text-center text-xl font-bold">THÊM PHƯƠNG TIỆN</div>
                <div className="p-3">
                    {/* row1 */}
                    <div className="flex items-top justify-between">
                        <div className="">
                            <div>Tên phương tiện</div>
                            <input type="text" className="border-2 p-2 border-black rounded-xl"/>
                        </div>
                        <div>
                            <div>Loại phương tiện</div>
                            <select className="border-2 p-2 border-black rounded-xl">
                                <option>Ô Tô</option>
                                <option>Xe Máy</option>
                                <option>Xe Đạp</option>
                                <option>Khác</option>
                            </select>
                        </div>
                    </div>
                    {/* row2 */}
                    <div className="flex justify-between mt-2">
                        <div>
                            <div>Biển số</div>
                            <input type="string" className="border-2 p-2 border-black rounded-xl"/>
                        </div>
                        
                    </div>
                    
                    {/* row3 */}
                    <div className="mt-10 flex justify-center">
                        <button className="p-2 rounded-xl bg-[#1e83a5] hover:bg-[#176b87] text-white">THÊM</button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Themphuongtien;