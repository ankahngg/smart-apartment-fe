import React, { useState } from "react";
import axiosInstance from "@/utils/axiosConfig";
import { useRouter } from "next/navigation";
interface NewBoxProps {
  onShow: (show: boolean) => void;
}

const Doimatkhau: React.FC<NewBoxProps> = ({ onShow }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
    const router = useRouter();
  const handleChangePassword = async () => {
    try {
      const response = await axiosInstance.post("/users/change-pwd", {
        oldPwd: oldPassword,
        newPwd: newPassword,
      });
      console.log("Password changed successfully:", response.data);
      alert("Đổi mật khẩu thành công!");
      onShow(false); // Close the modal
      localStorage.removeItem('accessToken');
      router.push('/login');

    } catch (error: any) {
      console.error("Error changing password:", error.response?.data || error);
      alert(error.response?.data?.message || "Failed to change password");
    }
  };

  return (
    <div className="w-full h-full fixed z-10">
      <div className="absolute left-1/2 -translate-x-1/2 border-2 w-[500px] bg-white">
        <div className="flex justify-end">
          <button
            className="bg-[#1e83a5] hover:bg-[#176b87] p-1 text-white"
            onClick={() => onShow(false)}
          >
            X
          </button>
        </div>
        <div className="text-center font-bold text-xl">ĐỔI MẬT KHẨU</div>
        <div className="p-2 flex flex-col justify-center items-center">
          <div>
            <div>Nhập mật khẩu cũ</div>
            <input
              type="password"
              className="p-1 border-2 border-black rounded-xl"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div>
            <div>Nhập mật khẩu mới</div>
            <input
              type="password"
              className="p-1 border-2 border-black rounded-xl"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="mt-4 flex justify-center">
            <button
              className="bg-[#1e83a5] hover:bg-[#176b87] p-1 text-white rounded-xl"
              onClick={handleChangePassword}
            >
              XÁC NHẬN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doimatkhau;
