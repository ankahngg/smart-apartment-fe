import Image from "next/image";
function Footer() {
    const thongtin:{icon:string,noidung:string}[] = [
        {
            icon : '/footer/diachi.png',
            noidung : 'Khu dân cư số 2 - Phường Khương Đình - Quận Hà Đông'
        },
        {
            icon : '/footer/sdt.png',
            noidung : '0937112549 - 0223405808'
        },
        {
            icon : '/footer/email.png',
            noidung : 'BlueMoonApartMent2024@gmail.com'
        }
    ]

    return (
        <div className="flex bg-[#176b87] p-5">
            <div className="flex-1 justify-center flex items-center">
                <div className="">
                    <Image
                        src="/logo_footer.png"
                        width={250}
                        height={250}
                        alt="logo_footer"
                    />

                </div>
            </div>
            <div className="flex-1">
                <p className="text-white font-bold text-xl">Liên hệ</p>
                <p className="text-white mt-5 mb-5">BAN QUẢN LÍ CHUNG CƯ CAO CẤP BLUEMOON</p>
                <div>
                    {
                        thongtin.map((item,index) => {
                            return (
                                <div className="flex p-2 items-center" key={index}>
                                    <Image 
                                        src={item.icon}
                                        width={50}
                                        height={50}
                                        alt='icon'
                                    />
                                    <p className="text-white ml-5">{item.noidung}</p>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </div> 
    );
}

export default Footer;