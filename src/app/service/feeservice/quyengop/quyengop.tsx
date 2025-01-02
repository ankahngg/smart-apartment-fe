import axiosInstance from "@/utils/axiosConfig";
import { useEffect, useState } from "react";

interface newbox {
    onShow : (show : boolean) => void,

}

const getFormattedDate = (): string => {
    const now = new Date();
  
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(now.getUTCDate()).padStart(2, "0");
  
    const hours = String(now.getUTCHours()).padStart(2, "0");
    const minutes = String(now.getUTCMinutes()).padStart(2, "0");
    const seconds = String(now.getUTCSeconds()).padStart(2, "0");
    const milliseconds = String(now.getUTCMilliseconds()).padStart(3, "0");
  
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}+00:00`;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };
  interface Chiendich{
    maqg:number,tenqg:string,tongtien:number,tgbd:string,tgkt:string
}
interface Canho{
    id : number,
    mach:string,
    name:string,
}


const Quyengop:React.FC<newbox> = ({onShow}) => {
    const [data, setData] = useState<Chiendich[]>([]);
    const [apartdata,setApartdata] = useState<Canho[]>([])
    const [state,setState] = useState('all')
    const [qgchoose,setQgchoose] = useState(0)
    const [chchoose,setChchoose] = useState(0)
    const [datechoose,setDatechoose] = useState('')
    const [amount,setAmount] = useState(0)
    useEffect(() =>{
        var close_filters :{name:string,operation:string,value:string,type:string}[]= [
            {
                name:"endDate",operation:"lt",value:getFormattedDate(),type:"string"
            }
        ]
        var all_filters :{name:string,operation:string,value:string,type:string}[]= [
            
        ]
        var open_filters :{name:string,operation:string,value:string,type:string}[]= [
            {
                name:"endDate",operation:"gt",value:getFormattedDate(),type:"string"
            }
        ]
        const fetchCampaigns = async () => {
            const response = await axiosInstance.post("/api/v1/campaigns/search", {
                pageSize : 999,
                filters : (state=='all'? all_filters: state=='open'?open_filters:close_filters),
                sorts: [
                    { property: "createdAt", direction: "desc" }]
                });
                console.log('API Response:', response.data);  // Log the response for debugging
            
            if (response.data && response.data.content) {
                const fetchedData = response.data.content.map((item: any, index: number) => {
                    return ({
                        maqg: item.id,
                        tenqg: item.name,
                        tongtien: (item.total?item.total:0),
                        tgbd : formatDate(item.startDate),
                        tgkt : formatDate(item.endDate),
                    })})
                setData(fetchedData); // Cập nhật state `data`
                setQgchoose(fetchedData[0].maqg)
                console.log('Fetched Data:', fetchedData);  // Log fetched data for debugging
            } else {
                setData([]); // Cập nhật state `data` với mảng rỗng nếu không có dữ liệu
            }
        };

        const fetchApart = async () => {
            const res = await axiosInstance.post("/api/v1/apartments/search",
                {
                    pageSize:999,
                }
            )
            const fetchedData = res.data.content.map((item:any,index:any) =>{
                return {
                    id : item.apartmentId,
                    mach:item.code,
                    name:item.owner.fullName||"Chưa có"
                }
            })
            console.log("Fetched data apart:",fetchedData)
            setChchoose(fetchedData[0].id)
            setApartdata(fetchedData)
        }
        fetchApart();
        fetchCampaigns(); // Gọi hàm fetchInvoices mỗi khi `currentPage` thay đổi
    },[state])

    async function handleAdd() {
        await axiosInstance.post("/api/v1/donations",{
            amount: amount,
            donationDate: datechoose,
            apartmentId: chchoose,
            campaignId: qgchoose
        })
        onShow(false)
    }

    async function handleSearch(keyword:string) {
        const res = await axiosInstance.post("/api/v1/apartments/search",{
            keyword: keyword,
            pageSize: 999,
        })
        console.log(res.data.content)
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
                    <div className="text-center font-bold text-xl">QUYÊN GÓP</div>
                    <div className="flex items-center mt-5">
                        <div className="font-bold   w-[150px]">Lọc quyên góp</div>
                        <div className="">
                            <select className="border-2 border-black p-2 rounded-xl mr-2" onChange={(e)=>setState(e.target.value)}>
                                <option value='all'>TẤT CẢ</option>
                                <option value='open'>VẪN CÒN THU</option>
                                <option value='close'>ĐÃ ĐÓNG ĐƠN</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex items-center mt-2">
                        <div className="font-bold   w-[150px]" >Chọn quyên góp</div>
                        <div className="w-[300px] mt-2">
                            <select className="border-2 border-black p-2 rounded-xl mr-2 w-full" onChange={(e)=>setQgchoose(parseInt(e.target.value))} value={qgchoose}>
                                {
                                    data.map((val,index) => {
                                        return (
                                            <option value={val.maqg}>
                                            {val.tenqg}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="flex mt-2 items-center">
                        <div className="font-bold mr-2">Thời gian chiến dịch</div>
                        {
                            data.map((val,index) =>{
                                if(val.maqg == qgchoose)
                                return (
                                    <div>{val.tgbd}</div>
                                )
                            })
                        }
                        <div className="font-bold ml-2 mr-2">&rarr;</div>
                        {
                            data.map((val,index) =>{
                                if(val.maqg == qgchoose)
                                return (
                                    <div>{val.tgkt}</div>
                                )
                            })
                        }
                    </div>

                    <div className="flex mt-2 items-center">
                        <div className="font-bold w-[150px]">Mã căn hộ</div>
                        <div className="ml-2">
                            <select className="border-2 border-black p-2 rounded-xl w-[100px]" onChange={(e)=>setChchoose(parseInt(e.target.value))} value={chchoose}>
                                {
                                    apartdata.map((val,index) => {
                                        return (
                                            <option value={val.id}>
                                            {val.mach}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="flex mt-2">
                        <div className="font-bold w-[150px]">Tên chủ hộ</div>
                        <div className=" ml-2">
                            {
                                apartdata.map((item,index) => {
                                    if(item.id == chchoose) return <>{item.name}</>
                                    
                                })
                            }
                        </div>
                    </div>

                    <div className="flex mt-2 items-center">
                        <div className="font-bold mr-2 w-[150px]">Số tiền</div>
                        <div>
                            <input type="number" className="p-1 border-black border-2 w-[100px]" onChange={(e)=>setAmount(parseInt(e.target.value))} value={amount}/>
                        </div>
                        <div className="ml-2">VND</div>
                    </div>
                    <div className="flex mt-2 items-center">
                        <div className="font-bold mr-2 w-[150px]">Ngày đóng</div>
                        <div>
                            <input type="date" className="p-1 border-black border-2 " onChange={(e)=>setDatechoose(e.target.value)} value={datechoose}/>
                        </div>
                    </div>
                    <div className="flex justify-center mt-5 mb-2">
                        <button className="bg-[#1e83a5] hover:bg-[#176b87] p-1 text-white rounded-xl" onClick={()=>handleAdd()}>QUYÊN GÓP</button>
                    </div>
                        
                </div>
            </div>
        </div>
        
    );
}

export default Quyengop;