import { use, useEffect, useState } from "react";
import Themnguoi from "./themnguoi";
import Phantrang from "../../phantrang";
import Lichsubd from "./lichsubd";
import Xemchitiet from "./xemchitiet";
import axiosInstance from "@/utils/axiosConfig";
import { Pagination } from "antd";
import type { PaginationProps } from "antd";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import globalSlice from "@/redux/globalSlice";

interface newbox {
    
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
    trangthai:string,
    lienhe : string,
    vaitro : string,
    mach:string,
    tench:string,
}

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };




const Nhankhau:React.FC<newbox> = () => {
    const cr_apart = useAppSelector((state)=>state.global.cr_apart)
    const dispatch = useAppDispatch()
    const [data,setData] = useState<nhankhau[]>([])
    const [pageSize,setPageSize] = useState(5); // Số item mỗi trang
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [add,setAdd] = useState(false);
    const [xemls,setXemls] = useState(false);
    const [chitiet,setChitiet] = useState(false);

    useEffect(()=>{
        // alert("here")
        const fetchApart = async (page: number) => {
            const response = await axiosInstance.post("/api/v1/residents/search", {
                page: page - 1,
                pageSize,
                filters : [
                    {
                        name : "apartmentId",
                        value : cr_apart.id,
                        operation : "eq"
                    }
                ],
                // sorts: [
                //     {
                //     property: "",
                //     direction: "desc"
                //     }
                // ],
            });
            console.log('API Response:', response.data);  // Log the response for debugging
            if (response.data && response.data.content) {
                var fetchedData:nhankhau[] = []
                for (const [index, item] of response.data.content.entries()) {
                    const res = await axiosInstance.post("/api/v1/residents/change-log/search", {
                        pageSize: 999,
                        filters: [
                            {
                                name: "residentId",
                                value: item.residentId,
                                operation: "eq",
                            },
                        ],
                        sorts: [
                            {
                                property: "changeDate",
                                direction: "desc"
                            },
                        ]
                    });
                    var tt = ''
                    if(res.data.content.length == 0) tt = 'Thường trú'
                    else {
                        tt = res.data.content[0].changeType.name
                    }
                    fetchedData.push ({
                        stt : (page-1)*pageSize+index+1,
                        macd : item.residentId,
                        hoten :item.fullName,
                        gioitinh : item.gender.name||"",
                        ngaysinh : item.dateOfBirth.split('-').reverse().join('/'),
                        cccd : item.identityCardNumber||"",
                        quequan : item.hometown||"",
                        nghenghiep : item.job||"",
                        lienhe : item.contact||"",
                        vaitro : item.householdRole.name||"",
                        trangthai:tt,
                        mach:item.apartmentId,
                        tench:item.apartment?.name
                    });
                }
                fetchedData.sort(function(a:nhankhau,b:nhankhau){return (b.vaitro=="Chủ hộ"?1:0)-(a.vaitro=="Chủ hộ"?1:0)})
                setData(fetchedData); // Update state with the resolved data
                setTotalItems(response.data.totalElements); // Cập nhật state `totalItems`
                console.log("Fetched Data:", fetchedData); // Log fetched data for debugging
            } else {
                setData([]); // Update state with an empty array if no data is available
                setTotalItems(0); // Cập nhật state `totalItems` với giá trị 0
            }
        };
        fetchApart(currentPage); // Gọi hàm fetchInvoices mỗi khi `currentPage` thay đổi

    },[currentPage, pageSize,add,chitiet])

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
                <Themnguoi onShow={setAdd} cnt={data.length}/>
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
                <Xemchitiet onShow={setChitiet} />
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
                    <thead>
                        <tr className="border-b-2 border-black mb-2 text-center bg-white ">
                            <th>STT</th>
                            <th className="p-2 w-[200px]">Họ và tên</th>
                            <th className="p-2">Giới tính</th>
                            <th className="p-2">Ngày sinh</th>
                            <th className="p-2">Mã số CCCD</th>
                            <th className="p-2">Liên hệ</th>
                            <th className="p-2">Trạng thái</th>
                            <th className="p-2">Vai trò</th>
                            <th className="p-2">Hành động</th>
                        </tr>

                    </thead>
                    <tbody>

                        {
                            data.map((val,index)=> {
                                return (
                                    <tr className="align-top hover:bg-[#68d3cc1c] text-center">
                                        <td className="p-2">{val.stt}</td>
                                       
                                        <td className="text-center w-[200px] p-2">{val.hoten}</td>
                                        <td className="p-2">{val.gioitinh}</td>
                                        <td className="p-2">{val.ngaysinh}</td>
                                        <td className="p-2">{val.cccd}</td>
                                        <td className="p-2"> {(val.lienhe)}</td>
                                        <td className="p-2"> {(val.trangthai)}</td>
                                        {
                                            index == 0 ?
                                            <td className="font-bold p-2"> {(val.vaitro)}</td>
                                            :
                                            <td className="p-2"> {(val.vaitro)}</td>

                                        }
                                        <td className="p-2">
                                            <button className="bg-[#1e83a5] hover:bg-[#176b87] pl-2 pr-2 rounded-xl text-white"
                                            onClick={()=>{setChitiet(true),dispatch(globalSlice.actions.set_cr_res(val))}}
                                            >Xem chi tiết</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between items-center mt-4">
                <div className="pt-2">Hiển thị {startItem} - {endItem} / {totalItems} cư dân</div>
    
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