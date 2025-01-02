
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Pagination } from "antd";
import type { PaginationProps } from "antd";
import axiosInstance from "@/utils/axiosConfig";

interface cudan {
    stt:number,
    resdientId:number,
    fullName : string,
    dateOfBirth: string,
    gender:string,
    contact:string,
    livingType:string,
}

function Table() {
    const [data,setData] = useState<cudan[]>([])
    const [pageSize,setPageSize] = useState(5); // Số item mỗi trang
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    useEffect(() =>{
        const fetchResi = async (page : number) => {
            const res = await axiosInstance.post("/api/v1/residents/search",{
                page:page-1,
                pageSize,
            })
            console.log("resi api :",res);
            const fetcheddata = res.data.content.map((item:any,index:any) =>{
                return {
                    stt : (page-1)*pageSize+1,
                    resdientId:item.residentId,
                    fullName : item.fullName,
                    dateOfBirth: item.dateOfBirth,
                    gender:item.gender.name,
                    contact:item.contact,
                    livingType:item.currentLivingType.name,

                }
            })
            console.log("fetched data  :",fetcheddata);
            setData(fetcheddata)
        }
        fetchResi(currentPage)
    },[currentPage,pageSize])

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
            {/* <div className="flex items-center">
                <div className="mr-5">
                    <button className="border-2 p-2 bg-[#1e83a5] hover:bg-[#176b87] rounded-xl text-white"
                    
                    >ĐÓNG TIỀN</button>
                </div>
                <div>
                    <div className="text-xl font-bold">Thời hạn đóng phí</div>
                    <div className="">
                        <span className="text-l italic">Tháng 11</span>
                        <span className="text-l italic">- 2025</span>
                    </div>
                </div>

            </div> */}
        </div>


        <div className="mt-2">
            <table className="w-full">
                <tr className="border-b-2 border-black mb-2 text-center">
                        <th className="p-2 w-fit">STT</th>
                        <th className="p-2 w-fit">Mã căn hộ</th>
                        <th className="p-2 w-[200px]">Họ tên</th>
                        <th className="p-2">Ngày sinh</th>
                        <th className="p-2">Trạng thái</th>
                        <th className="p-2">Xem chi tiết</th>
                </tr>
                {
                    // data.map((val)=> {
                    //     const [more, setMore] = useState(false);
                    //     return (
                    //         <tr className="align-top hover:bg-[#68d3cc1c] text-center ">
                    //             <td className="p-1">{val.stt}</td>
                    //             <td className="p-1">{val.mch}</td>
                    //             <td className="p-1 w-[200px]">{val.hoten}</td>
                    //             <td className="p-1">{val.soluong}</td>
                    //             <td className="p-1">{val.thuongtru}</td>
                    //             <td className="p-1">{val.tamtru}</td>
                    //             <td className="p-1">{val.tamvang}</td>
                    //             <td className="p-1">
                    //                 <button className="bg-[#1e83a5] hover:bg-[#176b87] pl-2 pr-2 rounded-xl text-white ">XEM CHI TIẾT</button>
                    //             </td>

                    //         </tr>
                    //     )
                    // })
                }
            </table>

        </div>
    </div>
    );
}

export default Table;   