import { useState } from "react";

export const useFilter = () => {
    const [date, setDate] = useState<string>(""); // Dùng chuỗi để lưu dạng YYYY-MM
    const [state, setState] = useState<string>("");
    const [floor, setFloor] = useState<string>("");
    const [house, setHouse] = useState<string>("");
    const [name, setName] = useState<string>("");

    const resetFilter = () => {
        setDate("");
        setState("");
        setFloor("");
        setHouse("");
        setName("");
    };

    const applyFilter = () => {
        console.log({ date, state, floor, house, name });
    };

    return {
        date,
        setDate,
        state,
        setState,
        floor,
        setFloor,
        house,
        setHouse,
        name,
        setName,
        resetFilter,
        applyFilter,
    };
};
