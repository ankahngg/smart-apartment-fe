import globalSlice from "@/redux/globalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import axiosInstance from "@/utils/axiosConfig";
import axios from "axios";
import { useEffect, useState } from "react";


interface state {
    code: number,
    name: string,
    enumName: string,
}

function Chinhsua() {
    const cr_invoice = useAppSelector((state) =>state.global.cr_invoice)
    const [stateData,setStateData] = useState<state[]>([])
    const [state,setState] = useState('')
    const [note,setNote] = useState('')

    useEffect(() =>{
        const stateFetch = async() =>{
            const res = await axiosInstance.get("/api/v1/enum/invoice-statuses") 
            const fetchedData = res.data;
            setStateData(fetchedData)
        }
        stateFetch()
        // if(cr_invoice.ngaydong!='') setDate(cr_invoice.ngaydong.split(''))
        if(cr_invoice.state == "Chưa thanh toán") setState("CHUA_THANH_TOAN")
        else setState("DA_THANH_TOAN")
        setNote(cr_invoice.note)

    },[])

    async function handleChange() {
        await axiosInstance.post(`/api/v1/invoices/update?id=${cr_invoice.id}`,{
            note: note,
            status: state
        })
        dispatch(globalSlice.actions.chinhsua_fee(false))
    }
    const dispatch = useAppDispatch()
    return (
        <div className="fixed w-full h-full">
            <div className="absolute top-[100px] left-[600px] border-2 bg-[white]">
                <div className="flex justify-end">
                    <button className="bg-[#1e83a5] hover:bg-[#176b87] p-1 text-white"
                    onClick={()=>dispatch(globalSlice.actions.chinhsua_fee(false))}
                    >X</button>
                </div>
                <div className="p-3">
                    <div className="flex">
                        <div className="w-[100px] ">Mã hóa đơn</div>
                        <div className="font-bold ml-2">{cr_invoice.mhd}</div>
                    </div>
                    <div className="flex">
                        <div className="w-[100px] ">Mã căn hộ</div>
                        <div className="font-bold ml-2">{cr_invoice.mch}</div>
                    </div>
                    <div className="flex">
                        <div className="w-[100px] ">Đợt thu</div>
                        <div className="font-bold ml-2">{cr_invoice.dotthu}</div>
                    </div>
                    <div className=" justify-between mt-2 items-center">
                        <div>
                            <div>Trạng thái</div>
                            <div>
                                <select className="border-2 border-black rounded-xl p-1" onChange={(e)=>setState(e.target.value)} value={state}>
                                    {
                                        stateData.map((item,index) => {
                                            return (
                                                <option value={item.enumName}>
                                                    {item.name}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="mt-2">
                            <div>Ghi chú</div>
                            <input type="text" className="border-2 p-1 border-black rounded-xl" value={note} onChange={(e)=>setNote(e.target.value)}/>
                        </div>
                    </div>
                    

                    <div className="flex justify-center">
                        <button className="border-2 p-2 mt-3 rounded-xl bg-[#1e83a5] hover:bg-[#176b87] text-white" onClick={() => handleChange()}>ĐỒNG Ý</button>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default Chinhsua;