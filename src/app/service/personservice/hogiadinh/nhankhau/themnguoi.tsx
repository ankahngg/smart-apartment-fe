import axiosInstance from "@/utils/axiosConfig";
import { useEffect, useState } from "react";

interface newbox {
    onShow : (show : boolean) => void,
    apartId : number;
}

interface role {
    code: number,
    name: string,
    enumName: string,
}

 

const Themnguoi:React.FC<newbox> =({onShow,apartId}) => {
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
            setRole(roledata[0].enumName)
        }
        const fetchGender = async () =>{
            const response = await axiosInstance.get("/api/v1/enum/gender")
            console.log(response)
            setGenderdata(response.data)
            setGender(genderdata[0].enumName)
        }
        fetchGender()
        fetchRole()
        
    },[])
    console.log(gender,role,'wtf')
    async function handleAdd() {
        console.log(name,gender,role,cccd,dob,home,contact,job)
        if(name=='' || cccd == '') {setWarn(true);return;}
        
        await axiosInstance.post(`/api/v1/residents/to-apartment/${apartId}`,[
            {
                fullName: name,
                dateOfBirth: dob,
                identityCardNumber: cccd,
                contact: contact,
                gender: gender,
                currentLivingType: "THUONG_TRU",
                householdRole: role,
        }])
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
                <div className="text-center text-xl font-bold">THÊM NHÂN KHẨU</div>
                <div className="p-3">
                    {/* row1 */}
                    <div className="flex items-top justify-between">
                        <div className="w-">
                            <div>Họ và tên</div>
                            <input type="text" className="border-2 p-2 border-black rounded-xl" onChange={(e)=>setName(e.target.value)}/>
                        </div>
                        <div>
                            <div>Giới tính</div>
                            <select className="border-2 p-2 border-black rounded-xl" onChange={(e)=>setGender(e.target.value)}>
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
                            <select className="border-2 p-2 border-black rounded-xl" onChange={(e)=>setRole(e.target.value)}>
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
                            <input type="string" className="border-2 p-2 border-black rounded-xl" onChange={(e)=>setCccd(e.target.value)}/>
                        </div>
                        <div>
                            <div>Ngày sinh</div>
                            <input type="date" className="border-2 p-2 border-black rounded-xl" onChange={(e)=>setDob(e.target.value)}/>
                        </div>
                    </div>
                    {/* row3 */}
                    <div className="flex justify-between">
                        <div>
                            <div>Quê quán</div>
                            <input type="string" className="border-2 p-2 border-black rounded-xl w-[150px]" onChange={(e)=>setHome(e.target.value)}/>
                        </div>
                        <div>
                            <div>Liên hệ</div>
                            <input type="string" className="border-2 p-2 border-black rounded-xl  w-[150px]" onChange={(e)=>setContact(e.target.value)}/>
                        </div>
                        <div>
                            <div>Nghề nghiệp</div>
                            <input type="string" className="border-2 p-2 border-black rounded-xl  w-[150px]" onChange={(e)=>setJob(e.target.value)}/>
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
                        onClick={()=>handleAdd()}
                        >THÊM</button>
                    </div>
                </div>
                

            </div>
        </div>
    );
}

export default Themnguoi;