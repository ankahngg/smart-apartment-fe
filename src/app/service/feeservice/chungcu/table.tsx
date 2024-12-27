import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import globalSlice from "../../../../redux/globalSlice";
import axiosInstance from "../../../../utils/axiosConfig";
import { Pagination } from "antd";
import type { PaginationProps } from "antd";

interface Invoice {
    stt: number;
    mhd: number;
    mch: string;
    hoten: string;
    dotthu: string;
    hanthu: string;
    phish: number;
    paidAmount: number;
    state: string;
    ngaydong: string;
}

const Table: React.FC = () => {
    const [data, setData] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [pageSize] = useState(10); // Số item mỗi trang
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchInvoices = async (page: number) => {
            try {
                setLoading(true);
                const response = await axiosInstance.post("http://localhost:8080/api/v1/invoices/search", {
                    page: page - 1,
                    pageSize,
                    sorts: [
                        { property: "createdAt", direction: "desc" }]
                });
                console.log('API Response:', response.data);  // Log the response for debugging
                if (response.data && response.data.content) {
                    const fetchedData = response.data.content.map((item: any, index: number) => ({
                        stt: index + 1 + (page - 1) * pageSize,
                        id: item.id,
                        mhd: item.invoiceCode,
                        mch: item.apartment?.code || "N/A",
                        hoten: item.apartment?.owner?.fullName || "N/A",
                        dotthu: item.startDate?.split("T")[0] || "",
                        hanthu: item.dueDate?.split("T")[0] || "",
                        phish: item.totalAmount || 0,
                        paidAmount: item.paidAmount || 0,
                        state: item.status || "N/A",
                        ngaydong: item.completedPayDate?.split("T")[0] || "Chưa đóng",
                    }));
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
    }, [currentPage, pageSize]); // Các dependency bao gồm `currentPage` và `pageSize`

    const handlePageChange: PaginationProps["onChange"] = (page:any) => {
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
                            ĐÓNG TIỀN
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-2">
                <table className="w-full">
                        <tr className="border-b-2 border-black">
                            <th className="p-2 text-center">MHD</th>
                            <th className="p-2 text-center">Mã căn hộ</th>
                            <th className="p-2 text-center">Họ tên chủ hộ</th>
                            <th className="p-2 text-center">Đợt thu</th>
                            <th className="p-2 text-center">Hạn thu</th>
                            <th className="p-2 text-center">Tổng</th>
                            <th className="p-2 text-center">Đã đóng</th>
                            <th className="p-2 text-center">Trạng thái</th>
                            <th className="p-2 text-center">Ngày đóng cuối</th>
                            <th className="p-2 text-center">Hành động</th>
                        </tr>
                        {data.length > 0 ? (
                        data.map((val) => (
                            <tr className="hover:bg-[#68d3cc1c] p-5" key={val.mhd}>
                                <td className="text-center">{val.mhd}</td>
                                <td className="text-center">{val.mch}</td>
                                <td className="text-center">{val.hoten}</td>
                                <td className="text-center">{val.dotthu}</td>
                                <td className="text-center">{val.hanthu}</td>
                                <td className="text-center">{val.phish.toLocaleString("de-DE")} VNĐ</td>
                                <td className="text-center">{val.paidAmount} VNĐ</td>
                                <td className={`text-center font-bold ${val.state === "Đã đóng" ? "text-green-500" : "text-red-500"}`}>
                                    {val.state}
                                </td>
                                <td className="text-center">{val.ngaydong}</td>
                                <td className="text-center">
                                    <button
                                        className="bg-[#1e83a5] hover:bg-[#176b87] pl-2 pr-2 rounded-xl text-white"
                                        onClick={() => dispatch(globalSlice.actions.chinhsua_fee(true))}
                                    >
                                        Chỉnh sửa
                                    </button>
                                </td>
                            </tr>
                        ))
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
                        style={{ marginTop: "16px", textAlign: "center" }}
                    />
                </div>

            </div>
        </div>
    );
};

export default Table;