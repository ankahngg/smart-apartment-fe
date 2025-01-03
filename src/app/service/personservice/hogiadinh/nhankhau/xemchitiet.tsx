import axiosInstance from '@/utils/axiosConfig';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Chinhsua from './chinhsua';
import Xoa from './xoa';
import Khaibao from './khaibao';
import Chinhsuacutru from './chinhsuacutru';
import { useAppSelector } from '@/redux/hooks';
interface newbox {
    onShow : (show : boolean) => void
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


interface changelog{
    stt : number,
    id : number,
    trangthai:string,
    ngay: string,
    ghichu: string,
    enumName:string,
}


const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

const Xemchitiet:React.FC<newbox> = ({onShow}) =>{
    const cr_apart = useAppSelector((state) => state.global.cr_apart)
    const cr_res = useAppSelector((state) => state.global.cr_res)
    const [logdata,setLogdata] = useState<changelog[]>([])
    const [data,setData] = useState<nhankhau>(cr_res)
    const [kbao,setKbao] = useState(false)
    const [csua,setCsua] = useState(false)
    const [change,setChange] = useState(false);
    const [del,setDel] = useState(false);
    const [focus,setFocus] = useState(-1)
    const [crLog,setCrLog] = useState<changelog>()
    if(!csua && focus != -1) setFocus(-1);
    useEffect(()=>{

        const fetchChangelog = async () =>{

            // get-change-log
            const response = await axiosInstance.post("/api/v1/residents/change-log/search",{
                pageSize:999,
                filters: [
                    {
                        name:"residentId",
                        value:cr_res.macd,
                        operation:"eq",   
                    }
                ],
                sorts: [
                    {
                        property: "changeDate",
                        direction: "desc"
                    },
                ]
            });

            console.log('changelog Response:', response.data);
            if(response.data) {
                const fetchedData = response.data.content.map((item:any,index:any) =>{
                    return {
                        stt : index+1,
                        trangthai:item.changeType.name,
                        ngay:formatDate(item.changeDate),
                        ghichu:item.notes,
                        id : item.id,
                        enumName : item.changeType.enumName,
                    }
                })
                console.log('fetchedData_changelog: ',fetchedData)
                setLogdata(fetchedData);
            }
            else setLogdata([])


            //get resident
            const response2 = await axiosInstance.get(`/api/v1/residents/${cr_res.macd}`);
            console.log('API Response:', response2.data);  // Log the response for debugging
            var tt = '';
            if(response.data.content.length == 0) tt ='Thường trú';
            else tt = response.data.content[0].changeType.name
           
            var item = response2.data;
            const fetchedData =  
            {
                stt : 0,
                macd : item.residentId||"",
                hoten :item.fullName||"",
                gioitinh : item.gender.name||"",
                ngaysinh : item.dateOfBirth.split('-').reverse().join('/')||"",
                cccd : item.identityCardNumber||"",
                quequan : item.hometown||"",
                nghenghiep : item.job||"",
                lienhe : item.contact||"",
                trangthai : tt,
                vaitro : item.householdRole.name||"",
            };
            setData(fetchedData); // Update state with the resolved data
            console.log("Fetched Data:", fetchedData); // Log fetched data for debugging
        }
        fetchChangelog()
        // Gọi hàm fetchInvoices mỗi khi `currentPage` thay đổi

    },[change,kbao,csua])
    
    return (
        <div className="w-full h-full fixed z-10">
            {
                change?
                <Chinhsua onShow={setChange} />
                :
                <></>
            }
            {
                del?
                <Xoa onShow={setDel} onShow2={onShow}/>
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
                            <div className="flex w-[200px]">
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

                <div className="pl-4">
                    <div className=' flex items-center'>
                        <div className='font-bold text-lg pt-2 pb-2 mr-4' >
                            LỊCH SỬ CƯ TRÚ
                        </div>
                        <div>
                            <button className='bg-[#1e83a5] hover:bg-[#176b87] p-1 text-white rounded-xl'
                            onClick={()=>{setCsua(false),setKbao(true)}}
                            >KHAI BÁO</button>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='h-[200px] w-[550px] overflow-auto pr-2'>
                            <table className="w-full">
                                <tr className='text-center border-b-2 border-b-black sticky top-0 bg-white text-sm'>
                                    <th className='w-[10px]'>STT</th>
                                    <th className='p-2'>Trạng thái</th>
                                    <th className='p-2'>Ngày khai báo</th>
                                    <th className='p-2 w-[150px]'>Ghi chú</th>
                                    <th className='p-2'>Hành động</th>
                                </tr>
                                {
                                    
                                    logdata.map((val,index) =>{
                                        return (
                                        <tr className={`text-center text-sm ${index != focus ? 'hover:bg-[#68d3cc1c]':'bg-[#68d3cc1c]'} `}>
                                            <td className='p-2'>{val.stt}</td>
                                            <td className='p-2'>{val.trangthai}</td>
                                            <td className='p-2'>{val.ngay}</td>
                                            <td className='p-2'>{val.ghichu} </td>
                                            <td className='p-2'>
                                                <button className='bg-[#1e83a5] hover:bg-[#176b87] p-1 text-white rounded-xl' 
                                                onClick={()=>{setKbao(false),setCsua(true),setFocus(index),setCrLog(val)
                                                 }}
                                                >Chỉnh sửa</button>
                                            </td>
                                        </tr>
                                        )
                                    })
                                }
                                
                                
                            </table>
                        </div>
                        {
                            kbao?
                            <Khaibao onShow={setKbao} />
                            :
                            <></>
                        }
                        {
                            csua ?
                            <Chinhsuacutru onShow={setCsua} crLog = {crLog}/>
                            :
                            <></>
                        }
               
                    
                
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Xemchitiet;