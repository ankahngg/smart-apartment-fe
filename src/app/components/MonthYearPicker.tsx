'use client'
import React, { useState } from "react";
import { DatePicker } from "antd";


const { MonthPicker } = DatePicker;

const MonthYearPicker = () => {
    const [date, setDate] = useState(null);

    const handleChange = (value: any) => {
        setDate(value);
        alert(value)
    };

    return (
        <div className="">
            <MonthPicker
                onChange={handleChange}
                format="YYYY-MM"
                placeholder="CHỌN ĐỢT THU"
                className ="p-2 text-l font-medium border-2 border-black w-full rounded-xl mb-2 "
            />
        </div>
    );
};

export default MonthYearPicker;
