
interface newbox {
    onShow : (show : boolean) => void,
}
const Chinhsua:React.FC<newbox> = ({onShow}) => {

    function handleChange() {

    }

    return (
        
        <div className="w-full h-full fixed z-10">
            <div className="absolute left-1/4 -translate-x-1/2  border-2 w-[600px] bg-white ">
                <div className="flex justify-end">
                    <button className="bg-[#1e83a5] hover:bg-[#176b87] p-1 text-white"
                    onClick={()=>onShow(false)}
                    >X</button>
                </div>
                <div className="p-2">
                    <div className="text-center font-bold text-xl">CHỈNH SỬA QUYÊN GÓP</div>
                    <div className="flex mt-2 items-center">
                        <div className="font-bold mr-2">Tên quyên góp</div>
                        <div>Quỹ trẻ em nghèo vượt khó</div>
                    </div>
                    <div className="flex mt-2 items-center">
                        <div className="font-bold mr-2">Thời gian chiến dịch</div>
                        <div>20-10-2024 </div>
                        <div className="font-bold ml-2 mr-2">&rarr;</div>
                        <div>20-11-2024 </div>
                    </div>
                    <div className="flex mt-2 items-center">
                        <div className="font-bold mr-2 w-[100px]">Mã căn hộ</div>
                        <div>
                            <input type="text" className="p-1 border-black border-2 w-[100px]"/>
                        </div>
                        <div className="font-bold ml-2">Tên chủ hộ</div>
                        <div className=" ml-2">Nguyen Phuc An Khang</div>
                    </div>
                    <div className="flex mt-2 items-center">
                        <div className="font-bold mr-2 w-[100px]">Số tiền</div>
                        <div>
                            <input type="number" className="p-1 border-black border-2 w-[100px]"/>
                        </div>
                        <div className="ml-2">VND</div>
                    </div>
                    <div className="flex mt-2 items-center">
                        <div className="font-bold mr-2 w-[100px]">Ngày đóng</div>
                        <div>
                            <input type="date" className="p-1 border-black border-2 "/>
                        </div>
                        <div className="ml-2">
                            <button className="bg-red-600 hover:bg-red-700 p-1 text-white rounded-xl">XÓA</button>
                        </div>
                    </div>
                    <div className="flex justify-center mt-5 mb-2">
                        <button className="bg-[#1e83a5] hover:bg-[#176b87] p-1 text-white rounded-xl" onClick={()=>handleChange()}>CHỈNH SỬA</button>
                    </div>
                        
                </div>
            </div>
        </div>
        
    );
}

export default Chinhsua;