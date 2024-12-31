import axiosInstance from "@/utils/axiosConfig";
import { useEffect, useState } from "react";

interface newbox {
    onShow : (show : boolean) => void,
    resiId : string;
}

interface role {
    code: number,
    name: string,
    enumName: string,
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
 

const Chinhsua:React.FC<newbox> =({onShow,resiId}) => {
    const [data,setData] = useState<nhankhau>(init)
    const [roledata,setRoledata] = useState<role[]>([])
    const [genderdata,setGenderdata] = useState<role[]>([])
    const [name,setName] = useState('');
    const [gender,setGender] = useState('NAM');
    const [role,setRole] = useState('CHILD');
    const [cccd,setCccd] = useState('');
    const [dob,setDob] = useState('');
    const [home,setHome] = useState('');
    const [contact,setContact] = useState('');
    const [job,setJob] = useState('');
    const [warn,setWarn] = useState(false);
    
    useEffect(()=>{
        
        const fetchRole = async () => {
            const response = await axiosInstance.get("/api/v1/enum/household-role")
            console.log(response)
            setRoledata(response.data)
            
        }
        const fetchGender = async () =>{
            const response = await axiosInstance.get("/api/v1/enum/gender")
            console.log(response)
            setGenderdata(response.data)
            
        }
        const fetchResi = async () => {
            const response = await axiosInstance.get(`/api/v1/residents/${resiId}`, {
            });
            console.log('API Response:', response.data);  // Log the response for debugging
            // const tmp = new Array(response.data.content.size).fill(false)
            if (response.data ) {
                var item = response.data;
                setName(item.fullName||"");
                setCccd(item.identityCardNumber||"");
                setContact(item.contact||"");
                setDob(item.dateOfBirth||"");
                setHome(item.homeTown||"");
                setRole(item.householdRole.enumName||"");
                setGender(item.gender.enumName||"")
                setJob(item.job||"");
            } else {
                setData(init); // Update state with an empty array if no data is available
            }
        };
        fetchGender()
        fetchRole()
        fetchResi()
        
    },[])
    async function handleChange() {
        console.log(name,gender,role,cccd,dob,home,contact,job)
        let isnum = /^\d+$/.test(cccd);
        if(name=='' || cccd == '' || !isnum || dob=='') {setWarn(true);return;}
        // console.log()
        
        await axiosInstance.put(`/api/v1/residents/${resiId}`,
            {
                fullName: name,
                dateOfBirth: dob,
                identityCardNumber: cccd,
                contact: contact,
                gender: gender,
                hometown:home,
                job :job,
                currentLivingType: "THUONG_TRU",
                householdRole: role,
        })
        onShow(false)
        
    }

    return (
        <div className="w-full h-full fixed z-10">
            <div className="absolute left-1/2 -translate-x-1/2  border-2 w-[500px] bg-white ">
                <div className="flex justify-end">
                    <button className="bg-[#1e83a5] hover:bg-[#176b87] p-1 text-white"
                    onClick={()=>onShow(false)}
                    >X</button>
                </div>
                <div className="text-center text-xl font-bold">CHỈNH SỬA</div>
                <div className="p-3">
                    {/* row1 */}
                    <div className="flex items-top justify-between">
                        <div className="w-">
                            <div>Họ và tên</div>
                            <input type="text" className="border-2 p-2 border-black rounded-xl" onChange={(e)=>setName(e.target.value)} value={name}/>
                        </div>
                        <div>
                            <div>Giới tính</div>
                            <select className="border-2 p-2 border-black rounded-xl" onChange={(e)=>setGender(e.target.value)} value={gender}>
                            {
                                genderdata.map((val,index)=>{
                                    if(index < 2) return (
                                        <option value={val.enumName}>
                                            {val.name}
                                        </option>
                                    )
                                })
                               
                            }
                            </select>
                        </div>
                        <div>
                            <div>Vai trò</div>
                            <select className="border-2 p-2 border-black rounded-xl" onChange={(e)=>setRole(e.target.value)} value={role}>
                            {
                                
                                roledata.map((val,index)=>{
                                    return (
                                        <option value={val.enumName}>
                                            {val.name}
                                        </option>
                                    )
                                })
                               
                            }
                            </select>
                            
                        </div>

                    </div>
                    {/* row2 */}
                    <div className="flex justify-between">
                        <div>
                            <div>Mã số cccd</div>
                            <input type="string" className="border-2 p-2 border-black rounded-xl" onChange={(e)=>setCccd(e.target.value)} value={cccd}/>
                        </div>
                        <div>
                            <div>Ngày sinh</div>
                            <input type="date" className="border-2 p-2 border-black rounded-xl" onChange={(e)=>setDob(e.target.value)} value={dob}/>
                        </div>
                    </div>
                    {/* row3 */}
                    <div className="flex justify-between">
                        <div>
                            <div>Quê quán</div>
                            <input type="string" className="border-2 p-2 border-black rounded-xl w-[150px]" onChange={(e)=>setHome(e.target.value)} value={home}/>
                        </div>
                        <div>
                            <div>Liên hệ</div>
                            <input type="string" className="border-2 p-2 border-black rounded-xl  w-[150px]" onChange={(e)=>setContact(e.target.value)} value={contact}/>
                        </div>
                        <div>
                            <div>Nghề nghiệp</div>
                            <input type="string" className="border-2 p-2 border-black rounded-xl  w-[150px]" onChange={(e)=>setJob(e.target.value)} value={job}/>
                        </div>
                    </div>
                    {/* warning */}
                    {
                        warn ?
                        <div className="text-center mt-2 font-bold text-red-600">
                            <div className="text-red-600">ĐIỀN KHÔNG HỢP LỆ</div>
                        </div>
                        :
                        <></>
                    }
                    {/* row4 */}
                    <div className="mt-5 flex justify-center">
                        <button className="p-2 rounded-xl bg-[#1e83a5] hover:bg-[#176b87] text-white"
                        onClick={()=>handleChange()}
                        >CHỈNH SỬA</button>
                    </div>
                </div>
                

            </div>
        </div>
    );
}

export default Chinhsua;