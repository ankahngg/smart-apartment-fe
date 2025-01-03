import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import globalSlice from "../../../../redux/globalSlice";
import axiosInstance from "../../../../utils/axiosConfig";
import { Pagination } from "antd";
import type { PaginationProps } from "antd";
import Chitiet from "./chitiet";
import { useAppSelector } from "@/redux/hooks";

interface Invoice {
    id:number,
    stt: number,
    mhd: number,
    mch: string,
    hoten: string,
    dotthu: string,
    tongtien: number,
    state: string,
    ngaydong: string,
    note:string,
}

interface fee {
    feeName: string,
    feeAmount: number,
    feeDescription: string,
}


const Table: React.FC = () => {
    const dongtien = useAppSelector((state) => state.global.dongtien)
    const chinhsua_fee = useAppSelector((state) => state.global.chinhsua_fee)
    const filter_status = useAppSelector((state) =>state.global.filter_status)
    const filter_apart = useAppSelector((state) => state.global.filter_apart)
    const filter_floor = useAppSelector((state) => state.global.filter_floor)
    const [data, setData] = useState<Invoice[]>([]);
    const [fee,setFee] = useState<fee[]>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [moreid,setMoreid] = useState(-1)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [pageSize] = useState(10); // Số item mỗi trang
    const dispatch = useDispatch();

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("en-GB", {
          month: "2-digit",
          year: "numeric",
        }).format(date);
      };

      
    useEffect(() => {
        const fetchInvoices = async (page: number) => {
            try {
                setLoading(true);
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
                console.log(filter_status,filter_status==='CHUA_THANH_TOAN')
                if(filter_status != '') {
                    filters.push({
                        name: "status",
                        value: filter_status,
                        operation: "eq",
                    })
                }
                const response = await axiosInstance.post("/api/v1/invoices/search", {
                    page: page - 1,
                    pageSize,
                    filters: filters,
                    sorts: [
                        { property: "createdAt", direction: "desc" }]
                });
                console.log('API Response:', response.data);  // Log the response for debugging
                if (response.data && response.data.content) {
                    const fetchedData = response.data.content.map((item: any, index: number) => {
                        var d:string = item.lastPayDate?.split("T")[0] || "Chưa đóng";
                        if(d != "Chưa đóng") d = d.split('-').reverse().join('-')
                       return {
                            stt: index + 1 + (page - 1) * pageSize,
                            id: item.id,
                            mhd: item.invoiceCode,
                            mch: item.apartment?.code || "N/A",
                            hoten: item.apartment?.owner?.fullName || "N/A",
                            dotthu: formatDate(item.startDate),
                            tongtien : item.totalAmount,
                            state: item.status ,
                            ngaydong: d,
                            note:item.note,
                    }});
                    setData(fetchedData); // Cập nhật state `data`
                    setTotalItems(response.data.totalElements); // Cập nhật state `totalItems`
                    console.log('Fetched Data:', fetchedData);  // Log fetched data for debugging
                } else {
                    setData([]); // Cập nhật state `data` với mảng rỗng nếu không có dữ liệu
                    setTotalItems(0); // Cập nhật state `totalItems` với giá trị 0
                }
            } catch (err) {
                setError(err as Error);
                console.error("Error fetching invoices:", err);
            } finally {
                setLoading(false); // Cập nhật state `loading` để không hiển thị trạng thái đang tải nữa
            }
        };

        fetchInvoices(currentPage); // Gọi hàm fetchInvoices mỗi khi `currentPage` thay đổi
    }, [currentPage, pageSize,filter_apart,filter_floor,chinhsua_fee,dongtien,filter_status]); // Các dependency bao gồm `currentPage` và `pageSize`

    const handlePageChange: PaginationProps["onChange"] = (page: any) => {
        setCurrentPage(page); // Cập nhật state `currentPage` khi trang thay đổi
    };

    // Tính toán chỉ số bản ghi đầu tiên và cuối cùng
    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalItems);

    // if (loading) return <div>Đang tải...</div>;
    // if (error) return <div>Có lỗi xảy ra: {error.message}</div>;


    return (
        <div className="w-full p-4 border-black border-2 h-[700px]">
            <div className="flex justify-between">
                <div>
                    <div className="text-xl font-bold">Danh sách hóa đơn</div>
                </div>
                <div className="flex items-center">
                    <div className="mr-5">
                        <button
                            className="border-2 p-2 bg-[#1e83a5] hover:bg-[#176b87] rounded-xl text-white"
                            onClick={() => dispatch(globalSlice.actions.dongtien(true))}
                        >
                            TẠO HÓA ĐƠN
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-2 h-[600px]">
                {
                    moreid>0 ? <Chitiet onShow={setMoreid} id={moreid}/>
                    :<></>
                }
                <table className="w-full">
                        <tr className="border-b-2 border-black text-center">
                            <th className="p-2">MHD</th>
                            <th className="p-2">Mã căn hộ</th>
                            
                            <th className="p-2">Đợt thu</th>
                            <th className="p-2">Tổng</th>
                            <th className="p-2">Trạng thái</th>
                            <th className="p-2">Ngày đóng</th>
                            <th className="p-2 w-[180px]">Ghi chú</th>
                            <th className="p-2">Hành động</th>
                        </tr>
                        {
                            data.length > 0 ? (
                                data.map((val) => {
                                  
                                    return (
                                        <tr className="hover:bg-[#68d3cc1c] text-center" key={val.mhd} >
                                            <td className="p-2 ">{val.mhd}</td>
                                            <td className="p-2 ">{val.mch}</td>
                                        
                                            <td className="p-2">{val.dotthu}</td>
                                            
                                            <td className="p-2">
                                                <button onClick={()=>setMoreid(val.id)}>{val.tongtien.toLocaleString("de-DE")} VNĐ</button>
                                            </td>
                                            {
                                                val.state==='Chưa thanh toán'?
                                                <td className="p-2 font-bold text-red-500">
                                                    {val.state}
                                                </td>
                                                :
                                                <td className="p-2 font-bold text-green-500">
                                                    {val.state}
                                                </td>

                                            }
                                            <td className="p-2">{val.ngaydong}</td>
                                            <td className="p-2">{val.note}</td>
                                            <td className="p-2">
                                                <button
                                                    className="bg-[#1e83a5] hover:bg-[#176b87] pl-2 pr-2 rounded-xl text-white"
                                                    onClick={() => {dispatch(globalSlice.actions.chinhsua_fee(true)),dispatch(globalSlice.actions.set_cr_invoice(val))}}
                                                >
                                                    Chỉnh sửa
                                                </button>
                                            </td>
                                        </tr>
                                )})
                            ) : (
                                <tr>
                                    <td colSpan={10} className="text-center">
                                        Không có dữ liệu.
                                    </td>
                                </tr>
                            )}

                </table>
                <div className="flex justify-between items-center mt-4">
                    <div className="pt-2">Hiển thị {startItem} - {endItem} / {totalItems} hóa đơn</div>

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
        </div>
    );
};

export default Table;