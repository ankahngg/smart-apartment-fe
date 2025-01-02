import globalSlice from "@/redux/globalSlice";
import { useAppDispatch } from "@/redux/hooks"
import axiosInstance from "@/utils/axiosConfig";
import { useEffect,useState } from "react";
import Themchiendich from "./themchiendich";

interface Chiendich{
    maqg:number,tenqg:string,tongtien:number,tgbd:string,tgkt:string
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
  
  console.log(getFormattedDate());
const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

function Qgfilter() {
    const [data, setData] = useState<Chiendich[]>([]);
    const [addcp,setAddcp] = useState(false)
    const [reload,setReload] = useState(false)
    const [state,setState] = useState('all')
    const [currentPage, setCurrentPage] = useState(1);
    const [choosen, setChoosen] = useState<boolean[]>([]);
    const [size,setSize] = useState(0)
    console.log("vcl",size)
    useEffect(() => {
        var close_filters :{name:string,operation:string,value:string,type:string}[]= [
            {
                name:"endDate",operation:"lt",value:getFormattedDate(),type:"date"
            }
        ]
        var all_filters :{name:string,operation:string,value:string,type:string}[]= [
            
        ]
        var open_filters :{name:string,operation:string,value:string,type:string}[]= [
            {
                name:"endDate",operation:"gt",value:getFormattedDate(),type:"date"
            }
        ]
        const fetchCampaigns = async (page: number) => {
            const response = await axiosInstance.post("/api/v1/campaigns/search", {
                pageSize : 999,
                filters : (state=='all'? all_filters: state=='open'?open_filters:close_filters),
                sorts: [
                    { property: "createdAt", direction: "desc" }]
                });
                console.log('API Response:', response.data);  // Log the response for debugging
            
            // const tmp = new Array(response.data.content.size).fill(false)
            setChoosen(new Array(response.data.content.length).fill(false))
            setSize(response.data.content.length)
            
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
                console.log('Fetched Data:', fetchedData);  // Log fetched data for debugging
            } else {
                setData([]); // Cập nhật state `data` với mảng rỗng nếu không có dữ liệu
            }
        };
        fetchCampaigns(currentPage); // Gọi hàm fetchInvoices mỗi khi `currentPage` thay đổi
    }, [reload,state,addcp]); // Các dependency bao gồm `currentPage` và `pageSize`
   
    function handleCheck(checked:boolean,index:number) {
        setChoosen(choosen.map((val,ind)=>{
            if(ind == index) return !val
            else return val
            }))
    }

    async function handleDelete() {
        for (const [i, val] of choosen.entries()) {
            if (val === true) {
                await axiosInstance.delete(`/api/v1/campaigns/${data[i].maqg}`);
            }
        }
        
        setReload(!reload)
    }
    return (
        <div>
             {
                addcp == true ?
                <Themchiendich onShow={setAddcp} />
                :
                <></>
            }
            <div className="flex justify-between items-center ">
                <div className="w-fit">
                    <select className="border-2 border-black p-2 rounded-xl mr-2" onChange={(e)=>setState(e.target.value)}>
                        <option value='all'>TẤT CẢ</option>
                        <option value='open'>VẪN CÒN THU</option>
                        <option value='close'>ĐÃ ĐÓNG ĐƠN</option>
                    </select>
                </div>
                <div className="w-full">
                    <input className="p-2 pb-1 border-2 border-black rounded-xl w-full" type="text" placeholder="TÌM KIẾM"/>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <button className=" rounded-xl p-1 bg-[#1e83a5] hover:bg-[#176b87] text-white mt-2"
                onClick={()=>setAddcp(true)}
                >THÊM CHIẾN DỊCH</button>
                <div>
                    <button className="italic mr-4 text-sm underline" onClick={()=>{setChoosen(new Array(size).fill(true))}}>Chọn hết </button>
                    <button className="italic text-sm underline" onClick={()=>{setChoosen(new Array(size).fill(false))}}>Bỏ chọn hết </button>
                    <button className="ml-2 p-1 bg-[#1e83a5] hover:bg-[#176b87] text-white rounded-xl" onClick={()=>handleDelete()}>Xóa</button>
                </div>
            </div>
            
            <div className="mt-2">
                <table>
                    <tr className="text-sm align-top border-b-2 border-black">
                        <th className="p-1 w-fit">MQG</th>
                        <th className="p-1 w-[150px]">Tên quyên góp</th>
                        <th className="p-1 ">Tổng tiền</th>
                        <th className="p-1">Thời gian bắt đầu</th>
                        <th className="p-1">Thời gian kết thúc</th>
                        <th className="p-1">Chọn</th>
                    </tr>
                    {
                        data.map((val,index) => {
                            
                            return (
                            <tr className="text-center text-sm align-top hover:bg-[#68d3cc1c]">
                                <td>{val.maqg}</td>
                                <td>{val.tenqg}</td>
                                <td>{val.tongtien}</td>
                                <td>{val.tgbd}</td>
                                <td>{val.tgkt}</td>
                                <td>
                                    <input type="checkbox" checked={choosen[index]} onChange={(e)=>handleCheck(e.target.checked,index)} className="p-4 text-xl" />
                                </td>
                            </tr>
                        )})
                    }

                </table>
            </div>
        </div>
    );
}

export default Qgfilter;