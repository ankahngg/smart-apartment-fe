
interface newbox {
    onShow : (show : boolean) => void,
}
const Chinhsua2:React.FC<newbox> = ({onShow}) => {
    return (
        
        <div className="w-full h-full fixed z-10">
            <div className="absolute left-1/2 -translate-x-1/2  border-2 w-[500px] bg-white ">
                <div className="flex justify-end">
                    <button className="bg-[#1e83a5] hover:bg-[#176b87] p-1 text-white"
                    onClick={()=>onShow(false)}
                    >X</button>
                </div>
                <div className="p-2">
                    <div className="text-center font-bold text-xl">CHỈNH SỬA PHÍ GỬI XE</div>
                    <div className="flex items-center mt-4">
                        <div className="w-[150px]">Phí gửi ô tô :</div>
                        <input type="number" className="p-1 border-2 w-[100px] ml-2 mr-2"/>
                        <div>VND/m^2</div>
                    </div>
                    <div className="flex items-center mt-4">
                        <div className="w-[150px]">Phí gửi xe máy :</div>
                        <input type="number" className="p-1 border-2 w-[100px] ml-2 mr-2"/>
                        <div>VND/m^2</div>
                    </div>
                    <div className="flex items-center mt-4">
                        <div className="w-[150px]">Phí gửi xe đạp :</div>
                        <input type="number" className="p-1 border-2 w-[100px] ml-2 mr-2"/>
                        <div>VND/m^2</div>
                    </div>
                    <div className="flex items-center mt-4">
                        <div className="w-[150px]">Phí gửi khác :</div>
                        <input type="number" className="p-1 border-2 w-[100px] ml-2 mr-2"/>
                        <div>VND/m^2</div>
                    </div>
                    <div className="flex justify-center mt-4 p-2">
                        <button className="bg-[#1e83a5] hover:bg-[#176b87] p-2 text-white rounded-xl">Xác nhận</button>
                    </div>
                        
                </div>
            </div>
        </div>
        
    );
}

export default Chinhsua2;