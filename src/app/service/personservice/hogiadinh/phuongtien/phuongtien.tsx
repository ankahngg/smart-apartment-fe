import { useEffect, useState } from "react";
import Themphuongtien from "./themphuongtien";
import Lichsubd from "../nhankhau/lichsubd";
import axiosInstance from "@/utils/axiosConfig";
import { Pagination } from "antd";
import type { PaginationProps } from "antd";
import Chinhsuaptien from "./chinhsuaptien";
import { useAppSelector } from "@/redux/hooks";

interface phuongtien {
    stt : number,
    mapt:number,
    ten : string,
    loai : string,
    bienso:string,
    ngay:string,
    typeid:string,
}
interface newbox {
    
}


const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };


const Phuongtien:React.FC<newbox> =()=> {
    const cr_apart = useAppSelector((state) =>state.global.cr_apart)
    const [data,setData] = useState<phuongtien[]>([])
    const [crPtien,setCrPtien] = useState<phuongtien>()
    const [pageSize,setPageSize] = useState(5); // Số item mỗi trang
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [edit,setEdit] = useState(false);
    const [add,setAdd] = useState(false);
    useEffect(()=>{
        // alert("here")
        const fetchVehi = async (page: number) => {
            const response = await axiosInstance.post("/api/v1/vehicles/search", {
                page: page - 1,
                pageSize,
                filters : [
                    {
                        name : "apartmentId",
                        value : cr_apart.id,
                        operation : "eq"
                    }
                ]
            });
            console.log('API Response:', response.data);  // Log the response for debugging
            if (response.data && response.data.content) {
                const fetchedData = response.data.content.map( (item: any, index: number) => {
                        return {
                            stt : index+1,
                            mapt : item.vehicleId,
                            ten : item.name||"",
                            bienso: item.licensePlate||"",
                            loai : item.vehicleTypeName||"",
                            ngay : formatDate(item.registerDate)||"",
                            typeid:item.vehicleTypeId
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
        fetchVehi(currentPage); // Gọi hàm fetchInvoices mỗi khi `currentPage` thay đổi
    },[currentPage, pageSize,add,edit])

    const handlePageChange: PaginationProps["onChange"] = (page: any) => {
                setCurrentPage(page); // Cập nhật state `currentPage` khi trang thay đổi
            };
        
            // Tính toán chỉ số bản ghi đầu tiên và cuối cùng
    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalItems);
    return (
        <div>
            {
                add ?
                <Themphuongtien onShow={setAdd} />:
                <></>
            }
            {
                edit ?
                <Chinhsuaptien onShow={setEdit} crPtien={crPtien}/>:
                <></>
            }
           
            <div className="flex justify-end">
                <button className="p-2 bg-[#1e83a5] hover:bg-[#176b87] text-white rounded-xl text-sm"
                onClick={()=>setAdd(true)}
                >THÊM PHƯƠNG TIỆN</button>
            </div>
            <div className="h-[300px]">
                <table className="w-full">
                    <tr className="border-b-2 border-black mb-2 text-center ">
                        <th className="w-fit">STT</th>
                        <th className="p-2">Tên phương tiện</th>
                        <th className="p-2">Loại phương tiện</th>
                        <th className="p-2">Biển số</th>
                        <th className="p-2">Ngày thêm</th>
                        <th className="p-2">Hành động</th>
                    </tr>
                        {
                            data.map((val,index)=> {
                                return (
                                    <tr className="align-top hover:bg-[#68d3cc1c] text-center">
                                        <td className="p-2">{val.stt}</td>
                                        <td className="w-[150px] p-2">{val.ten}</td>
                                        <td className="p-2 ">{
                                            val.loai =="PARKING_CAR" ? "Ô tô" :
                                            val.loai =="PARKING_MOTORCYCLE" ? "Xe máy" :
                                            val.loai =="PARKING_BICYCLE" ? "Xe đạp" :
                                            "Khác"
                                        }</td>
                                        <td className="p-2 w-[150px]">{val.bienso}</td>
                                        <td className="p-2">{val.ngay}</td>
                                        <td className="p-2">
                                            <button className="bg-[#1e83a5] hover:bg-[#176b87] pl-2 pr-2 rounded-xl text-white"
                                            onClick={()=>{setCrPtien(val),setEdit(true)}}
                                            >Chỉnh sửa</button>
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

export default Phuongtien;