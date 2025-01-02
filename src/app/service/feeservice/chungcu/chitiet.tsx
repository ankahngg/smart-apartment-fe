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
}


const Chitiet:React.FC<newbox> =  ({onShow,id}) => {
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
            };
            console.log(feedata.data.content[0])
            console.log(fetchedData)
            setData(fetchedData)
           
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
                    <div className="font-bold w-[150px]">Mã hóa đơn</div>
                    <div>{data?.invoiceCode}</div>
                </div>
                <div>
                    {
                        data?.fees.map((val,index) =>{
                            return (
                                <div className="flex">
                                    <div className="font-bold w-[150px]">
                                        {val.feeName} 
                                    </div>
                                    <div >
                                        {val.feeAmount} 
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="flex">
                    <div className="font-bold w-[150px]">Tổng tiền</div>
                    <div>{data?.totalAmount} đồng</div>
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