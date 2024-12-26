import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import globalSlice from "../../../../redux/globalSlice";
import axiosInstance from "../../../../utils/axiosConfig";

function Table() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.post('/api/v1/invoices/search', {
                    pageable: {
                        page: 0,
                        pageSize: 20,
                    },
                });
                const fetchedData = response.data.content.map((item, index) => ({
                    stt: index + 1,
                    mhd: item.id,
                    mch: item.apartment?.code || "N/A", // Xử lý null-safe cho item.apartment
                    hoten: item.apartment?.owner?.fullName || "N/A", // Xử lý null-safe cho item.apartment.owner
                    dotthu: item.startDate?.split("T")[0] || "",
                    hanthu: item.dueDate?.split("T")[0] || "",
                    phish: item.totalAmount || 0,
                    paidAmount: item.paidAmount || 0,
                    state: item.status || "N/A",
                    ngaydong: item.completedPayDate?.split("T")[0] || "Chưa đóng",
                }));
                setData(fetchedData);
            } catch (err) {
                setError(err);
                console.error("Error fetching invoices:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchInvoices();
    }, []);

    // if (loading) return <div>Đang tải...</div>;
    // if (error) return <div>Có lỗi xảy ra: {error.message}</div>;

    return (
        <div className="w-full p-4 border-black border-2 h-[700px]">
            <div className="flex justify-between">
                <div>
                    <div className="text-xl font-bold">Danh sách hóa đơn</div>
                    <div className="pt-2">
                    </div>
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
            <div className="mt-2 ">
                <table className="w-full">
                    <thead>
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
                    </thead>
                    <tbody>
                        {data.map((val) => (
                            <tr className="hover:bg-[#68d3cc1c]" key={val.mhd}>
                                <td className="text-center">{val.mhd}</td>
                                <td className="text-center">{val.mch}</td>
                                <td className="text-center">{val.hoten}</td>
                                <td className="text-center">{val.dotthu}</td>
                                <td className="text-center">{val.hanthu}</td>
                                <td className="text-center">{val.phish.toLocaleString('de-DE')} VNĐ</td>
                                <td className="text-center">{val.paidAmount} VNĐ</td>

                                <td
                                    className={`text-center font-bold ${val.state === "Đã đóng" ? "text-green-500" : "text-red-500"
                                        }`}
                                >
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
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;
