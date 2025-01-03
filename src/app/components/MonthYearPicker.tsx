import React from "react";
import { DatePicker } from "antd";
import { useAppDispatch } from "@/redux/hooks";
import globalSlice from "@/redux/globalSlice";

const { MonthPicker } = DatePicker;

interface MonthYearPickerProps {
    setDate: (date: string) => void; // Nhận một hàm để set giá trị dạng YYYY-MM
    date:string,
}

const MonthYearPicker: React.FC<MonthYearPickerProps> = ({ setDate,date }) => {
    const dispatch = useAppDispatch()
    const handleChange = (value: any) => {
        if (value) {
            const formattedDate = value.format("YYYY-MM");
            setDate(formattedDate);
           
        }
    };

    return (
        <div className="">
            <MonthPicker
                value={date}
                onChange={handleChange}
                format="YYYY-MM"
                placeholder="CHỌN ĐỢT THU"
                className ="p-2 text-xl font-medium border-2 border-black w-full rounded-xl mb-2 "
            />
        </div>
    );
};

export default MonthYearPicker;
