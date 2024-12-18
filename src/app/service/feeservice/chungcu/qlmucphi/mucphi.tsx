import { useState } from "react";
import Chinhsua from "./chinhsua";

function Mucphi() {
    const mucphis:{
        phidv : number,
        phiql : number,
        phiot : number,
        phixm : number,
        phidien: number,
        phinuoc: number,
        phimang : number,
        ngaytd : string,
    }[] = [
    {
        phidv : 10000,
        phiql : 10000,
        phiot : 1000000,
        phixm : 100000,
        phidien: 3000,
        phinuoc: 2000,
        phimang : 100000,
        ngaytd : "1-10-2024",
    },
    {
        phidv : 10000,
        phiql : 8000,
        phiot : 1200000,
        phixm : 100000,
        phidien: 3000,
        phinuoc: 2000,
        phimang : 100000,
        ngaytd : "1-11-2024",
    },
    ]
    mucphis.reverse()
    const [day,setDay] = useState(mucphis[0].ngaytd)

    function Chinhsua() {
        return (
            <div className="p-2 ml-10">
                <div className="flex p-1 items-center">
                    <div className="w-[200px] italic">Phí dịch vụ trên m^2 : </div>
                    <input type="number" className= "p-1 border-2 border-black" placeholder="Nhập tiền"/>
                </div>
                <div className="flex p-1 items-center">
                    <div className="w-[200px] italic">Phí quản lý trên m^2 : </div>
                    <input type="number" className= "p-1 border-2 border-black" placeholder="Nhập tiền"/>
                </div>
                <div className="flex p-1 items-center">
                    <div className="w-[200px] italic">Phí gửi xe ô tô : </div>
                    <input type="number" className= "p-1 border-2 border-black" placeholder="Nhập tiền"/>
                </div>
                <div className="flex p-1 items-center">
                    <div className="w-[200px] italic">Phí gửi xe máy : </div>
                    <input type="number" className= "p-1 border-2 border-black" placeholder="Nhập tiền"/>
                </div>
                <div className="flex p-1 items-center">
                    <div className="w-[200px] italic">Phí điện trên số : </div>
                    <input type="number" className= "p-1 border-2 border-black" placeholder="Nhập tiền"/>
                </div>
                <div className="flex p-1 items-center">
                    <div className="w-[200px] italic">Phí nước trên số : </div>
                    <input type="number" className= "p-1 border-2 border-black" placeholder="Nhập tiền"/>
                </div>
            </div>
        )
    }


    return (
    <div>
        <div className="font-bold text-xl p-2">Điều chỉnh mức phí</div>
        <div className="p-2 flex items-center">
            <div>Ngày thay đổi</div>
            <select className="p-2 border-2 border-black rounded-xl ml-5" onChange={(e)=>setDay(e.target.value)} value={day}>
                {
                    mucphis.map((val) =>{
                        return (
                            <>
                                <option value={val.ngaytd}>{val.ngaytd}</option>
                            </>
                        )
                    })
                }
            </select>
        </div>
        <div className="flex items-center   ">
            <div className="p-2">
                {mucphis.map((val) => {
                    return (
                        day == val.ngaytd ?
                        <>
                        <div className="flex p-1">
                            <div className="w-[200px] italic">Phí dịch vụ trên m^2 : </div>
                            <div className="font-bold">{val.phidv}</div>
                        </div>
                        <div className="flex p-1">
                            <div className="w-[200px] italic">Phí quản lý trên m^2 : </div>
                            <div className="font-bold">{val.phiql}</div>
                        </div>
                        <div className="flex p-1">
                            <div className="w-[200px] italic">Phí gửi xe ô tô : </div>
                            <div className="font-bold">{val.phiot}</div>
                        </div>
                        <div className="flex p-1">
                            <div className="w-[200px] italic"> Phí gửi xe máy : </div>
                            <div className="font-bold">{val.phixm}</div>
                        </div>
                        <div className="flex p-1">
                            <div className="w-[200px] italic">Phí điện trên số : </div>
                            <div className="font-bold">{val.phidien}</div>
                        </div>
                        <div className="flex p-1">
                            <div className="w-[200px] italic">Phí nước trên số : </div>
                            <div className="font-bold">{val.phinuoc}</div>
                        </div>
                        <div className="flex p-1">
                            <div className="w-[200px] italic">Phí mạng : </div>
                            <div className="font-bold">{val.phinuoc}</div>
                        </div>
                        </>
                        :
                        <></>
                        
                    )
                })}
            </div>
            <div className="text-2xl ml-10">&rarr;</div>
            <Chinhsua />
            <div className="p-2 ml-10">
                <button className="bg-[#1e83a5] hover:bg-[#176b87] p-2 text-white rounded-xl"   
                >Chỉnh sửa mức phí</button>
            </div>
        </div>
        <div>

        </div>

    </div>  
    );
}

export default Mucphi;