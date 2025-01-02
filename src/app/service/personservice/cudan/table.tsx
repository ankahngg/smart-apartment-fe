
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Pagination } from "antd";
import type { PaginationProps } from "antd";
import axiosInstance from "@/utils/axiosConfig";
import { useAppSelector } from "@/redux/hooks";

interface cudan {
    stt:number,
    resdientId:number,
    fullName : string,
    dateOfBirth: string,
    gender:string,
    contact:string,
    livingType:string,
    apartmentId:number
    apartment:string,
}

function Table() {
    const filter_apart = useAppSelector((state) => state.global.filter_apart)
    const filter_floor = useAppSelector((state) => state.global.filter_floor)
    const filter_keyword = useAppSelector((state) => state.global.filter_keyword)
        
    const [data,setData] = useState<cudan[]>([])
    const [pageSize,setPageSize] = useState(10); // Số item mỗi trang
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    useEffect(() =>{
        const fetchResi = async (page : number) => {
            var filters:{
                name:string,
                operation:string,
                value:string
            }[] = []
            if(filter_apart != '') filters.push({
                name:"apartmentId",
                operation:"eq",
                value:filter_apart
            })
            if(filter_floor != '') filters.push({
                name:"floorId",
                operation:"eq",
                value:filter_floor
            })
            
            const res = await axiosInstance.post("/api/v1/residents/search",{
                page:page-1,
                pageSize,
                filters:filters,
                
            })
            console.log("resi api :",res);
            const fetcheddata = res.data.content.map((item:any,index:any) =>{
                return {
                    stt : (page-1)*pageSize+1+index,
                    resdientId:item.residentId,
                    fullName : item.fullName,
                    dateOfBirth: item.dateOfBirth? item.dateOfBirth.split('-').reverse().join('/'):"",
                    gender:item.gender.name||"",
                    contact:item.contact||"",
                    livingType:item.currentLivingType.name,
                    apartmentId:item.apartmentId||"",
                    apartment:item.apartment?.code
                }
            })
            console.log("fetched data  :",fetcheddata);
            setTotalItems(res.data.totalElements); // Cập nhật state `totalItems`
            setData(fetcheddata)
        }
        fetchResi(currentPage)
    },[currentPage,pageSize,filter_apart,filter_floor])

    const handlePageChange: PaginationProps["onChange"] = (page: any) => {
                setCurrentPage(page); // Cập nhật state `currentPage` khi trang thay đổi
    };
    
        // Tính toán chỉ số bản ghi đầu tiên và cuối cùng
    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalItems);
    
    const dispatch = useDispatch();
    return (
    <div className="w-full p-4 border-black border-2 h-[700px]">
        <div className="flex justify-between">
            <div>
                <div className="text-xl font-bold">Danh sách cư dân</div>
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
        </div>


        <div className="mt-2 h-[500px]">
            <table className="w-full">
                <tr className="border-b-2 border-black mb-2 text-center">
                        <th className="p-2 w-fit">STT</th>
                        <th className="p-2 w-fit">Họ tên</th>
                        <th className="p-2 w-[200px]">Căn hộ</th>
                        <th className="p-2">Ngày sinh</th>
                        <th className="p-2">Giới tính</th>
                        <th className="p-2">Liên hệ</th>
                        <th className="p-2">Trạng thái</th>
                        <th className="p-2">Hành động</th>
                </tr>
                {
                    data.map((val,index)=> {
                        return (
                            <tr className="align-top hover:bg-[#68d3cc1c] text-center ">
                                <td className="p-2">{val.stt}</td>
                                <td className="p-2 w-[200px]">{val.fullName}</td>
                                <td className="p-2">{val.apartment}</td>
                                <td className="p-2">{val.dateOfBirth}</td>
                                <td className="p-2">{val.gender}</td>
                                <td className="p-2">{val.contact}</td>
                                <td className="p-2">{val.livingType}</td>
                                <td className="p-2">
                                    <button className="bg-[#1e83a5] hover:bg-[#176b87] pl-2 pr-2 rounded-xl text-white ">XEM CHI TIẾT</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </table>

        </div>
        <div className="flex justify-between items-center mt-4">
            <div className="pt-2">Hiển thị {startItem} - {endItem} / {totalItems} căn hộ</div>

            <Pagination
                current={currentPage}
                onChange={handlePageChange}
                total={totalItems}
                pageSize={pageSize}
                className="mt-[16px] text-center"
                // style={{ marginTop: "16px", textAlign: "center" }}
            />
        </div>
    </div>
    );
}

export default Table;   