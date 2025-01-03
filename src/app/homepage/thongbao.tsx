function ThongBao() {
    const list:{Ngay:string,Gio:number,NoiDung:string}[] = [
        {
            Ngay : '27/10/2024',
            Gio : 14,
            NoiDung : 'Kế hoạch kiểm tra hệ thống PCCC định kì hàng tháng'
        },
        {
            Ngay : '03/10/2024',
            Gio : 14,
            NoiDung : 'Kế hoạch thu phí dịch vụ và phí quản lí chung cư'
        }
    ]
    return ( 
        <div className="flex justify-center mt-10 bg-[#f0f0f0] p-5">
            <div className="w-[1000px]">
                <div className="flex">
                    <p className="font-bold text-2xl border-b-2 border-[#d78325]">THÔNG BÁO QUAN TRỌNG</p>
                </div>
                <div>
                    {
                        list.map((item,index) => {
                            let ngay = item.Ngay;
                            var tmp = ngay.split("/");
                            
                            return (
                                <div className="flex " key={index}>
                                    <div className="flex flex-col items-center p-5"> 
                                        <p className="text-2xl font-bold">Tháng {tmp[1]}</p>
                                        <p>{tmp[0]}</p>
                                    </div>      
                                    <div className="p-5">
                                        <p className="text-xl"><strong>[Thông Báo]</strong> {item.NoiDung}</p>
                                        <p className="text-base italic">{item.Gio}h {item.Ngay}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default ThongBao;