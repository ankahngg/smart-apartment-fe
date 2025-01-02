interface newbox {
    onShow : (show : boolean) => void,
}

const Doimatkhau:React.FC<newbox> = ({onShow}) => {
    return (
        <div className="w-full h-full fixed z-10">
            <div className="absolute left-1/2 -translate-x-1/2  border-2 w-[500px] bg-white ">
                <div className="flex justify-end">
                    <button className="bg-[#1e83a5] hover:bg-[#176b87] p-1 text-white"
                    onClick={()=>onShow(false)}
                    >X</button>
                </div>
                <div className="text-center font-bold text-xl">ĐỔI MẬT KHẨU</div>
                <div className="p-2 flex flex-col justify-center items-center">
                    <div>
                        <div>Nhập mật khẩu cũ</div>
                        <input type="password" className="p-1 border-2 border-black rounded-xl"></input>
                    </div>
                    <div>
                        <div>Nhập mật khẩu mới</div>
                        <input type="password" className="p-1 border-2 border-black rounded-xl"></input>
                    </div>
                    <div className="mt-4 flex justify-center">
                        <button className="bg-[#1e83a5] hover:bg-[#176b87] p-1 text-white rounded-xl">
                            XÁC NHẬN
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Doimatkhau;