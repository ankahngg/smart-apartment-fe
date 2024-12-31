import { use, useEffect, useState } from "react";
import Themnguoi from "./themnguoi";
import Phantrang from "../../phantrang";
import Lichsubd from "./lichsubd";
import Xemchitiet from "./xemchitiet";
import axiosInstance from "@/utils/axiosConfig";
import { Pagination } from "antd";
import type { PaginationProps } from "antd";

interface newbox {
    apartId:number
    reload:boolean
}
interface nhankhau {
    stt : number,
    macd : string,
    hoten :string,
    gioitinh : string,
    ngaysinh : string,
    cccd : string,
    quequan : string,
    nghenghiep : string,
    lienhe : string,
    trangthai : string,
    vaitro : string
}

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

const Nhankhau:React.FC<newbox> = ({apartId,reload}) => {
    const [data,setData] = useState<nhankhau[]>([])
    const [pageSize,setPageSize] = useState(5); // Số item mỗi trang
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const maxpage = 6;
    const [add,setAdd] = useState(false);
    const [xemls,setXemls] = useState(false);
    const [chitiet,setChitiet] = useState(false);
    const [resid,setResid] = useState('');

    useEffect(()=>{
        // alert("here")
        const fetchApart = async (page: number) => {
            const response = await axiosInstance.post("/api/v1/residents/search", {
                page: page - 1,
                pageSize,
                filters : [
                    {
                        name : "apartmentId",
                        value : apartId,
                        operation : "eq"
                    }
                ]
            });
            console.log('API Response:', response.data);  // Log the response for debugging
            if (response.data && response.data.content) {
                const fetchedData = response.data.content.map( (item: any, index: number) => {
                        return {
                            stt : (page-1)*pageSize+index+1,
                            macd : item.residentId,
                            hoten :item.fullName,
                            gioitinh : item.gender.name||"",
                            ngaysinh : item.dateOfBirth.split('-').reverse().join('/'),
                            cccd : item.identityCardNumber||"",
                            quequan : item.hometown||"",
                            nghenghiep : item.job||"",
                            lienhe : item.contact||"",
                            trangthai : item.currentLivingType.name||"",
                            vaitro : item.householdRole.name||"",
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
    },[currentPage, pageSize,add,chitiet,reload])

    const handlePageChange: PaginationProps["onChange"] = (page: any) => {
            setCurrentPage(page); // Cập nhật state `currentPage` khi trang thay đổi
        };
    
        // Tính toán chỉ số bản ghi đầu tiên và cuối cùng
    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalItems);

    return (
        <div >
            {
                add ?
                <Themnguoi onShow={setAdd} apartId={apartId} />
                :
                <></>
            }
            {
                xemls ?
                <Lichsubd onShow={setXemls}/>
                :
                <></>
                
            }
            {
                chitiet?
                <Xemchitiet onShow={setChitiet} resId={resid}/>
                :
                <></>
            }
            <div className="flex justify-end">
                <button className="italic mr-4 underline"
                onClick={()=>setXemls(true)}
                >XEM LỊCH SỬ BIẾN ĐỘNG</button>
                <button className="p-2 bg-[#1e83a5] hover:bg-[#176b87] text-white rounded-xl text-sm"
                onClick={()=>setAdd(true)}
                >THÊM NHÂN KHẨU</button>
            </div>
            <div className="h-[300px] overflow-y-scroll">
                <table className="w-full">
                    <tr className="border-b-2 border-black mb-2 text-center bg-white ">
                        <th>STT</th>
                        <th className="p-2">MCD</th>
                        <th className="p-2 w-[200px]">Họ và tên</th>
                        <th className="p-2">Giới tính</th>
                        <th className="p-2">Ngày sinh</th>
                        <th className="p-2">Mã số CCCD</th>
                        <th className="p-2">Liên hệ</th>
                        <th className="p-2">Trạng thái</th>
                        <th className="p-2">Vai trò</th>
                        <th className="p-2">Hành động</th>
                    </tr>
                        {
                            data.map((val,index)=> {
                                return (
                                    <tr className="align-top hover:bg-[#68d3cc1c] text-center">
                                        <td className="p-2">{val.stt}</td>
                                        <td className="p-2">{val.macd}</td>
                                        <td className="text-center w-[200px] p-2">{val.hoten}</td>
                                        <td className="p-2">{val.gioitinh}</td>
                                        <td className="p-2">{val.ngaysinh}</td>
                                        <td className="p-2">{val.cccd}</td>
                                        <td className="p-2"> {(val.lienhe)}</td>
                                        <td className="p-2">{val.trangthai}</td>
                                        {
                                            index == 0 ?
                                            <td className="font-bold p-2"> {(val.vaitro)}</td>
                                            :
                                            <td className="p-2"> {(val.vaitro)}</td>

                                        }
                                        <td className="p-2">
                                            <button className="bg-[#1e83a5] hover:bg-[#176b87] pl-2 pr-2 rounded-xl text-white"
                                            onClick={()=>{setChitiet(true),setResid(val.macd)}}
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
                    className="mt-[5px] text-center"
                    // style={{ marginTop: "16px", textAlign: "center" }}
                />
            </div>
        </div>
    );
}

export default Nhankhau;