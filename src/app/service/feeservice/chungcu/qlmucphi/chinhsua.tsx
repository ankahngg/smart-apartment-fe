function Chinhsua() {
    return (
        <div className="fixed w-full h-full">
            <div className="absolute top-[0px] left-[600px] border-2 bg-[white]">
                <div className="flex justify-end">
                    <button className="bg-[#1e83a5] hover:bg-[#176b87] p-1 text-white"
                    // onClick={()=>dispatch(globalSlice.actions.chinhsua_fee(false))}
                    >X</button>
                </div>
                <div className="p-3">
                    <div className="flex">
                        <div>Mã hóa đơn</div>
                        <div className="font-bold ml-2">HD1002</div>
                    </div>
                    <div className="flex">
                        <div>Mã căn hộ</div>
                        <div className="font-bold ml-2">15.02</div>
                    </div>
                    <div className="flex">
                        <div>Đợt thu</div>
                        <div className="font-bold ml-2">11-2024</div>
                    </div>
                    <div className="flex">
                        <div>Họ và tên chủ hộ</div>
                        <div className="font-bold ml-2"> Nguyễn Phúc An Khang</div>
                    </div>
                    
                    <div className="flex justify-between mt-2">
                        <div>
                            <div>Trạng thái</div>
                            <div>
                                <select className="border-2 border-black rounded-xl p-1">
                                    <option>Đã Đóng</option>
                                    <option>Chưa đóng</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <div>Ngày đóng</div>
                            <input type="date" />
                        </div>
                    </div>
                    

                    <div className="flex justify-center">
                        <button className="border-2 p-2 mt-3 rounded-xl bg-[#1e83a5] hover:bg-[#176b87] text-white">ĐỒNG Ý</button>
                    </div>

                </div>
            </div>

        </div>
      );
}

export default Chinhsua;