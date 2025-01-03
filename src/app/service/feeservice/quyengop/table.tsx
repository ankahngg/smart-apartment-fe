import { useEffect, useState } from "react";
import Dongtien from "./dongtien";
import Chinhsua from "./chinhsua";
import Quyengop from "./quyengop";
import axiosInstance from "@/utils/axiosConfig";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import globalSlice from "@/redux/globalSlice";

interface donate {
    apartmentId:number,
    campaignId:number,
    donationDate:string,
    apartmentCode:string,
    campaignName:string,
    startDate:string,
    endDate:string,
    amount:number,
    id:number,
}

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

function Table() {
    const filter_apart = useAppSelector((state) => state.global.filter_apart)
    const filter_floor = useAppSelector((state) => state.global.filter_floor)
    const filter_keyword = useAppSelector((state) => state.global.filter_keyword)
    const filter_campaigns = useAppSelector((state) => state.global.filter_campaigns)
    const dispatch = useAppDispatch()
    const [crDonate,setCrDonate] = useState<donate>()
    const [data,setData] = useState<donate[]>([])
    const [change,setChange] = useState(false)
    const [qg,setQg] = useState(false)
    
    useEffect(()=>{
        const fetchDonate = async() => {
            // const response = await axiosInstance.post("/api/v1/campaigns/search", {
            // pageSize : 999,
            // filters : (state=='all'? all_filters: state=='open'?open_filters:close_filters),
            // sorts: [
            //     { property: "createdAt", direction: "desc" }]
            // });

            var filters:{
                name: string,
                value: any,
                operation: string,
              }[] = []

            if(filter_apart != '') filters.push({
                name: "apartmentId",
                value: filter_apart,
                operation: "eq",
            })
            if(filter_floor != '' && filter_apart =='' ) {
                const res = await axiosInstance.post("/api/v1/apartments/search",{
                    pageSize:999,
                    filters:[
                        {
                            name:"floorId",
                            value:filter_floor,
                            operation:"eq",
                        }
                    ]
                })
                var apartids:number[] = []
                for (const item of res.data.content) {
                    apartids.push(item.apartmentId)
                }
                filters.push({
                    name: "apartmentId",
                    value: apartids,
                    operation: "in",
                })
            }
            if(filter_campaigns.length == 1 && filter_campaigns[0]==-1) filters;
            else 
                filters.push({
                    name: "campaignId",
                    value: filter_campaigns,
                    operation: "in",
                })

            const res = await axiosInstance.post("/api/v1/donations/search",
                {
                    pageSize:999,
                    filters:filters,
                }
            );
            const fetcheddata = res.data.content.map((item:any,index:any) =>{
                return {
                    apartmentId:item.apartmentId,
                    campaignId:item.campaignId,
                    donationDate:formatDate(item.donationDate),
                    apartmentCode:item.apartment.code,
                    campaignName:item.campaign.name,
                    startDate:formatDate(item.campaign.startDate),
                    endDate:formatDate(item.campaign.endDate),
                    amount:item.amount,
                    id:item.id,
                }
            })
            setData(fetcheddata)
        }
        fetchDonate()
        

    },[qg,change,filter_apart,filter_floor,filter_keyword,filter_campaigns])

    return (
    <div className="p-2 border-2 h-[800px] border-black">
        {
            change ?
            <Chinhsua onShow={setChange} crDonate={crDonate}/>
            :
            <></>
        }
        {
            qg ?
            <Quyengop onShow={setQg}/>
            :
            <></>
        }
        <div className="flex justify-between">
            <div>
                <div className="text-xl font-bold">Danh sách quyên góp</div>
                <div className="pt-2">
                    <div className="flex space-x-2">
                        <div className="text-sm">Hiển thị</div>
                        <select className="border-gray-200 boder-2 bg-gray-200 text-sm">
                            <option>10</option>
                            <option>11</option>
                        </select>
                        <div className="text-sm">hàng</div>
                    </div>
                </div>
            </div>
            <div className="mr-5">
                <button className="border-2 p-2 bg-[#1e83a5] hover:bg-[#176b87] rounded-xl text-white"
                onClick={()=>setQg(true)}
                >QUYÊN GÓP</button>
            </div>
        </div>
        <div className="mt-2">
            <table className="w-full">
                <tr className="border-b-2 border-black mb-2 align-top text-center">
                        <th className="p-2 w-fit">STT</th>
                        <th className="p-2 w-fit">MQG</th>
                        <th className="p-2 w-[250px]">Tên quyên góp</th>
                        <th className="p-2 ">Thời gian bắt đầu</th>
                        <th className="p-2">Thời gian kết thúc</th>
                        <th className="p-2 w-fit">Mã căn hộ</th>
                        
                        <th className="p-2">Số tiền</th>
                        <th className="p-2">Ngày đóng</th>
                        <th className="p-2">Hành động</th>
                </tr>
                {
                    data.map((val,index)=> {
                        return (
                            <tr className="align-top hover:bg-[#68d3cc1c] text-center">
                                <td className="p-2">{index+1}</td>
                                <td className="p-2">{val.campaignId}</td>
                                <td className="p-2">{val.campaignName}</td>
                                <td className="p-2">{val.startDate}</td>
                                <td className="p-2">{val.endDate}</td>
                                <td className="p-2">{val.apartmentCode}</td>
                                
                                <td className="p-2">{(val.amount).toLocaleString('de-DE')}</td>
                                <td className="p-2">{val.donationDate}</td>
                                <td className="p-2">
                                    <button className="bg-[#1e83a5] hover:bg-[#176b87] pl-2 pr-2 rounded-xl text-white" onClick={()=>{setCrDonate(val),setChange(true)}}
                                    
                                    >Chỉnh sửa</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </table>

        </div>
    </div>  
    );
}

export default Table;