import { useAppSelector } from "@/redux/hooks";
import axiosInstance from "@/utils/axiosConfig";
import { useEffect, useState } from "react";

interface newbox {
    onShow : (show : boolean) => void,
}

interface role {
    code: number,
    name: string,
    enumName: string,
}

 

const Nhaptien:React.FC<newbox> =({onShow}) => {
    const [file, setFile] = useState(null);
    async function handleSubmit() {
        if (!file) {
            alert('Please select a file first!');
            return;
          }
      
        const formData = new FormData();
        formData.append('file', file); // Append the file with a key (e.g., 'file')
      
          
        await axiosInstance.post('/api/v1/invoices/import', formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
              },
        }
        );
        onShow(false)
    }
  
    const handleFileChange = (event:any) => {
        setFile(event.target.files[0]); // Save the selected file to state
      };

    
    return (
        <div className="w-full h-full fixed z-10">
            <div className="absolute left-1/2 -translate-x-1/2  border-2 w-[500px] bg-white ">
                <div className="flex justify-end">
                    <button className="bg-[#1e83a5] hover:bg-[#176b87] p-1 text-white"
                    onClick={()=>onShow(false)}
                    >X</button>
                </div>
                <div className="text-center font-bold text-xl">NHẬP PHÍ SINH HOẠT</div>
                <div className="p-2">
                    <div>Tải lên file phí sinh hoạt - yêu cầu file excel</div>
                    <input type="file" onChange={handleFileChange}/>
                </div>

                <div className="flex justify-center">
                    <button className="bg-[#1e83a5] hover:bg-[#176b87] p-1 text-white rounded-xl mb-4" onClick={()=>handleSubmit()}>TẢI LÊN</button>
                </div>
            </div>
        </div>
    );
}

export default Nhaptien;