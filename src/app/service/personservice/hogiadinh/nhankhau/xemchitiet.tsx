import axiosInstance from '@/utils/axiosConfig';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Chinhsua from './chinhsua';
import Xoa from './xoa';
import Lichsucutru from './lichsucutru';
interface newbox {
    onShow : (show : boolean) => void
    resId : string
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


const init:nhankhau = {
    stt : 0,
    macd : "",
    hoten :"",
    gioitinh : "",
    ngaysinh : "",
    cccd : "",
    quequan : "",
    nghenghiep : "",
    lienhe : "",
    trangthai : "",
    vaitro : ""
}


const Xemchitiet:React.FC<newbox> = ({onShow,resId}) =>{
    const [data,setData] = useState<nhankhau>(init)
    const [change,setChange] = useState(false);
    const [del,setDel] = useState(false);
    useEffect(()=>{
        const fetchResi = async () => {
            const response = await axiosInstance.get(`/api/v1/residents/${resId}`, {
            });
            console.log('API Response:', response.data);  // Log the response for debugging
            // const tmp = new Array(response.data.content.size).fill(false)
            if (response.data ) {
                var item = response.data;
                const fetchedData =  
                {
                    stt : 0,
                    macd : item.residentId||"",
                    hoten :item.fullName||"",
                    gioitinh : item.gender.name||"",
                    ngaysinh : item.dateOfBirth.split('-').reverse().join('/')||"",
                    cccd : item.identityCardNumber||"",
                    quequan : item.homeTown||"",
                    nghenghiep : item.job||"",
                    lienhe : item.contact||"",
                    trangthai : item.currentLivingType.name||"",
                    vaitro : item.householdRole.name||"",
                };
                setData(fetchedData); // Update state with the resolved data
                console.log("Fetched Data:", fetchedData); // Log fetched data for debugging
            } else {
                onShow(false);
                setData(init); // Update state with an empty array if no data is available
            }
        };
        fetchResi(); // Gọi hàm fetchInvoices mỗi khi `currentPage` thay đổi
    },[change])
    
    return (
        <div className="w-full h-full fixed z-10">
            {
                change?
                <Chinhsua onShow={setChange} resiId={resId}/>
                :
                <></>
            }
            {
                del?
                <Xoa onShow={setDel} resId={resId} onShow2={onShow}/>
                :
                <></>
            }
            <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/4 border-2 w-[900px] h-[500px] bg-white ">  
                <div className="flex justify-end">
                    <button className="bg-[#1e83a5] hover:bg-[#176b87] p-1 text-white"
                    onClick={()=>onShow(false)}
                    >X</button>
                </div>
                <div className='font-bold text-xl ml-4'>THÔNG TIN CƯ DÂN</div>
                <div className="p-4 flex items-start">
                    {/* col1 */}
                    <div className="w-700px border-2 p-2 border-black">
                        {/* row1 */}
                        <div className="flex ">
                            <div className="w-[300px] flex ">
                                <div className="font-bold mr-2">Họ và tên</div>
                                <div>{data.hoten}</div>
                            </div>
                            <div className="flex w-[150px]">
                                <div className="font-bold mr-2">Vai trò</div>
                                <div>{data.vaitro}</div>
                            </div>
                            <div className="flex w-[150px]">
                                <div className="font-bold mr-2">MCD</div>
                                <div>CD{data.macd}</div>
                            </div>
                        </div>
                        {/* row2 */}
                        <div className="flex mt-2">
                            <div className="w-[200px] flex ">
                                <div className="font-bold mr-2">Ngày sinh</div>
                                <div>{data.ngaysinh}</div>
                            </div>
                            <div className="w-[150px] flex ">
                                <div className="font-bold mr-2">Giới tính</div>
                                <div>{data.gioitinh}</div>
                            </div>
                            <div className="flex w-[150px]">
                                <div className="font-bold mr-2">Quê quán</div>
                                <div>{data.quequan}</div>
                            </div>
                        </div>
                        {/* row3 */}
                        <div className="flex mt-2 ">
                            <div className="w-[200px] flex ">
                                <div className="font-bold mr-2">Nghề nghiệp</div>
                                <div>{data.nghenghiep}</div>
                            </div>
                            <div className="flex w-[180px]">
                                <div className="font-bold mr-2 ">Liên hệ</div>
                                <div>{data.lienhe}</div>
                            </div>
                            <div className="flex ">
                                <div className="font-bold mr-2">Trạng thái</div>
                                <div>{data.trangthai}</div>
                            </div>
                        </div>
                        {/* row4 */}
                        <div className="flex mt-2 justify-between">
                            <div className="flex w-[300px]">
                                <div className="font-bold mr-2">CCCD</div>
                                <div>{data.cccd}</div>
                            </div>
                            <div className='flex '>
                                <button className='bg-[#1e83a5] hover:bg-[#176b87] p-1 text-white rounded-xl' onClick={()=>setChange(true)}>Chỉnh sửa thông tin</button>
                                <button className='bg-red-600 hover:bg-red-700 p-1 text-white rounded-xl ml-2 ' onClick={()=>setDel(true)}>Xóa</button>
                            </div>
                        </div>
                    </div>
                    {/* col2 */}
                    <div className='ml-5 flex flex-col justify-center w-full'>
                        <div className='flex justify-center'>
                            <Image
                                src="/avatar_default.jpg" // Static image in the public folder
                                alt="Description of the image"
                                width={100} // Set width
                                height={500} // Set height
                                className='flex justify-center'
                            />

                        </div>
                        <div className='flex justify-center'>
                            <button className='p-2 underline'>Đổi ảnh</button>
                        </div>
                    </div>
                </div>

                <Lichsucutru resId={resId}/>

                
            </div>
        </div>
    );
}

export default Xemchitiet;