import React from "react";
import { DatePicker } from "antd";

const { MonthPicker } = DatePicker;

interface MonthYearPickerProps {
    setDate: (date: string) => void; // Nhận một hàm để set giá trị dạng YYYY-MM
}

const MonthYearPicker: React.FC<MonthYearPickerProps> = ({ setDate }) => {
    const handleChange = (value: any) => {
        if (value) {
            const formattedDate = value.format("YYYY-MM");
            setDate(formattedDate);
        }
    };

    return (
        <div>
            <MonthPicker
                onChange={handleChange}
                format="YYYY-MM"
                placeholder="Chọn tháng"
            />
        </div>
    );
};

export default MonthYearPicker;
