import axiosInstance from "@/utils/axiosConfig";
import { useEffect, useState } from "react";

interface newbox {
    onShow : (show : number) => void,
    id:number,
}

interface invoice {
    invoiceCode:string,
    fees:{
        feeName: string, feeAmount: number, feeDescription: string
    }[],
    totalAmount:number,
    waterFee: {
        feeName: string,
        feeAmount: number,
        feeDescription: string,
    },
    electricityFee: {
        feeName: string,
        feeAmount: number,
        feeDescription: string
    },
    internetFee: {
        feeName: string,
        feeAmount: number,
        feeDescription: string
    },
   
}


const Chitiet:React.FC<newbox> =  ({onShow,id}) => {
    const [total,setTotal] = useState(0)
    const [data,setData] = useState<invoice>()
    useEffect(() => {
        const  fetchInvoice = async () => {
            const feedata = await axiosInstance.post("/api/v1/invoices/search",{
                pageSize:999,
                filters:[
                    {
                        name: "id",
                        value: id,
                        operation: "eq",
                    }
                ]
            }
            )
            const fetchedData =  
            {
                invoiceCode:feedata.data.content[0].invoiceCode,
                fees:feedata.data.content[0].fees,
                totalAmount:feedata.data.content[0].totalAmount,
                waterFee:feedata.data.content[0].waterFee,
                electricityFee:feedata.data.content[0].electricityFee,
                internetFee:feedata.data.content[0].internetFee
            };
            console.log(feedata.data.content[0])
            console.log(fetchedData)
            setData(fetchedData)
            var tong = 0;
            tong += feedata.data.content[0].totalAmount+feedata.data.content[0].waterFee.feeAmount+feedata.data.content[0].electricityFee.feeAmount+feedata.data.content[0].internetFee.feeAmount
            setTotal(parseInt(tong.toFixed(0)))
        }
        fetchInvoice()

    },[])
    
    return (
        <div className="w-full h-full fixed z-10">
        <div className="absolute left-1/2 -translate-x-1/2  border-2 w-[500px] bg-white ">
            <div className="flex justify-end">
                <button className="bg-[#1e83a5] hover:bg-[#176b87] p-1 text-white"
                onClick={()=>onShow(-1)}
                >X</button>
            </div>
            <div className="text-xl text-center font-bold">Chi tiết</div>
            <div className="p-4">

                <div className="flex">
                    <div className="font-bold w-[300px]">Mã hóa đơn</div>
                    <div>{data?.invoiceCode}</div>
                </div>
                <div>
                    {
                        data?.fees.map((val,index) =>{
                            return (
                                <div className="flex">
                                    <div className="font-bold w-[300px]">
                                        {val.feeName} 
                                    </div>
                                    <div >
                                        {val.feeAmount.toLocaleString("de-DE")} VND
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="flex">
                    <div className="font-bold w-[300px]">{data?.waterFee.feeName}</div>
                    <div>{data?.waterFee.feeAmount.toLocaleString("de-DE")} VND</div>
                </div>
                <div className="flex">
                    <div className="font-bold w-[300px]">{data?.electricityFee.feeName}</div>
                    <div>{data?.electricityFee.feeAmount.toLocaleString("de-DE")} VND</div>
                </div>
                <div className="flex">
                    <div className="font-bold w-[300px]">{data?.internetFee.feeName}</div>
                    <div>{data?.internetFee.feeAmount.toLocaleString("de-DE")} VND</div>
                </div>

                <div className="flex">
                    <div className="font-bold w-[300px]">Tổng tiền</div>
                    <div> {total.toLocaleString("de-DE")} VND</div>
                </div>
            </div>
            {/* {
                data.map((item:any,index:any) => {
                    <div>
                        <div></div>
                    </div>
                })
            } */}
        </div>
    </div>
    )
}
export default Chitiet;