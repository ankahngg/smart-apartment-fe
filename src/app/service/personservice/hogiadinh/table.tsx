
import globalSlice from "@/redux/globalSlice";
import axiosInstance from "@/utils/axiosConfig";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Pagination } from "antd";
import type { PaginationProps } from "antd";
import Chitiet from "./chitiet";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

interface Canho{
    id : number,
    stt : number,
    mach:string,
    hoten:string,
    dientich:number,
    soluong:number,
    phuongtien:number,
}

function Table() {
    const filter_apart = useAppSelector((state) => state.global.filter_apart)
    const filter_floor = useAppSelector((state) => state.global.filter_floor)
    const filter_keyword = useAppSelector((state) => state.global.filter_keyword)
    const dispatch = useAppDispatch()
    const [data, setData] = useState<Canho[]>([]);
    const [pageSize,setPageSize] = useState(10); // Số item mỗi trang
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [chitiet,setChitiet] = useState(false);

    useEffect(()=>{
        const fetchApart = async (page: number) => {
            const apart_filter = [
                {
                    name:"apartmentId",
                    operation:"eq",
                    value:filter_apart
                }
            ]
            const floor_filter = [
                {
                    name:"floorId",
                    operation:"eq",
                    value:filter_floor
                }
            ]

            var filters:any;
            if(filter_apart != '') filters = apart_filter;
            else if(filter_floor != '') filters = floor_filter;
            else filters = []
            console.log('filter',filters)
            
            const response = await axiosInstance.post("/api/v1/apartments/search", {
                page: page - 1,
                keyword:filter_keyword,
                pageSize,
                filters,
                
            });
            console.log('API Response:', response.data);  // Log the response for debugging
            // const tmp = new Array(response.data.content.size).fill(false)
            if (response.data && response.data.content) {
                
                const fetchedData = response.data.content.map( (item: any, index: number) => {
                        var ht = 'Chưa có';
                        if(item.residents.length == 0) ht = 'Chưa có';
                        else {
                            for (const val of item.residents ) 
                                if(val.householdRole.name == "Chủ hộ") ht = val.fullName
                        }
                        return {
                            id : item.apartmentId,
                            stt: index,
                            mach: item.code,
                            hoten: ht,
                            dientich: item.area,
                            soluong: item.residents.length || 0,
                            phuongtien: item.vehicleCount || 0,
                        };
                    })
                
                setData(fetchedData); // Update state with the resolved data
                setTotalItems(response.data.totalElements); // Cập nhật state `totalItems`
                console.log("Fetched Data:", fetchedData); // Log fetched data for debugging
            } else {
                setData([]); // Update state with an empty array if no data is available
                setTotalItems(0); // Cập nhật state `totalItems` với giá trị 0
            }
            
        };
        fetchApart(currentPage); // Gọi hàm fetchInvoices mỗi khi `currentPage` thay đổi
    },[currentPage, pageSize,chitiet,filter_apart,filter_floor,filter_keyword])


    const handlePageChange: PaginationProps["onChange"] = (page: any) => {
        setCurrentPage(page); // Cập nhật state `currentPage` khi trang thay đổi
    };

    // Tính toán chỉ số bản ghi đầu tiên và cuối cùng
    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalItems);
    

    return (
    <div className="w-full p-4 border-black border-2 h-[700px]">
        {
            chitiet?
            <Chitiet onShow={setChitiet}/>
            :
            <></>
        }
        <div className="flex justify-between">
            <div>
                <div className="text-xl font-bold">Danh sách căn hộ</div>
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
        <div className="mt-2">
            <table className="w-full">
                <tr className="border-b-2 border-black mb-2 text-center">
                    <th className="p-2 w-fit">STT</th>
                    <th className="p-2 w-fit">Mã căn hộ</th>
                    <th className="p-2 w-[200px]">Họ tên chủ hộ</th>
                    <th className="p-2">Diện tích</th>
                    <th className="p-2">Số nhân khẩu</th>
                    <th className="p-2">Số phương tiện</th>
                    <th className="p-2">Hành động</th>
                        
                </tr>
                {
                data.map((val)=> {
                    //const [more, setMore] = useState(false);
                    return (
                        <tr className="align-top hover:bg-[#68d3cc1c] text-center ">
                            <td className="p-2">{val.stt}</td>
                            <td className="p-2">{val.mach}</td>
                            <td className="p-2 w-[200px]">{val.hoten}</td>
                            <td className="p-2">{val.dientich}</td>
                            <td className="p-2">{val.soluong}</td>
                            <td className="p-2">{val.phuongtien}</td>
                            <td className="p-2">
                                <button className="bg-[#1e83a5] hover:bg-[#176b87] pl-2 pr-2 rounded-xl text-white "
                                onClick={()=>{dispatch(globalSlice.actions.set_cr_apart(val)),setChitiet(true)}}
                                >Xem chi tiết</button>
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