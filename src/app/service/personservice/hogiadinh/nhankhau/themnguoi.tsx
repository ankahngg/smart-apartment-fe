
interface newbox {
    onShow : (show : boolean) => void
}
const Themnguoi:React.FC<newbox> =({onShow}) => {
    return (
        <div className="w-full h-full fixed z-10">
            <div className="absolute left-1/2 -translate-x-1/2  border-2 w-[500px] bg-white ">
                <div className="flex justify-end">
                    <button className="bg-[#1e83a5] hover:bg-[#176b87] p-1 text-white"
                    onClick={()=>onShow(false)}
                    >X</button>
                </div>
                <div className="text-center text-xl font-bold">THÊM NHÂN KHẨU</div>
                <div className="p-3">
                    {/* row1 */}
                    <div className="flex items-top justify-between">
                        <div className="w-">
                            <div>Họ và tên</div>
                            <input type="text" className="border-2 p-2 border-black rounded-xl"/>
                        </div>
                        <div>
                            <div>Giới tính</div>
                            <select className="border-2 p-2 border-black rounded-xl">
                                <option>Nam</option>
                                <option>Nữ</option>
                            </select>
                        </div>
                        <div>
                            <div>Vai trò</div>
                            <input type="text" className="border-2 p-2 border-black rounded-xl w-[100px]"/>
                        </div>

                    </div>
                    {/* row2 */}
                    <div className="flex justify-between">
                        <div>
                            <div>Mã số cccd</div>
                            <input type="string" className="border-2 p-2 border-black rounded-xl"/>
                        </div>
                        <div>
                            <div>Ngày sinh</div>
                            <input type="date" className="border-2 p-2 border-black rounded-xl"/>
                        </div>
                    </div>
                    {/* row3 */}
                    <div className="flex justify-between">
                        <div>
                            <div>Quê quán</div>
                            <input type="string" className="border-2 p-2 border-black rounded-xl w-[150px]"/>
                        </div>
                        <div>
                            <div>Liên hệ</div>
                            <input type="string" className="border-2 p-2 border-black rounded-xl  w-[150px]"/>
                        </div>
                        <div>
                            <div>Nghề nghiệp</div>
                            <input type="string" className="border-2 p-2 border-black rounded-xl  w-[150px]"/>
                        </div>
                    </div>
                    {/* row4 */}
                    <div className="mt-10 flex justify-center">
                        <button className="p-2 rounded-xl bg-[#1e83a5] hover:bg-[#176b87] text-white">THÊM</button>
                    </div>
                </div>
                

            </div>
        </div>
    );
}

export default Themnguoi;