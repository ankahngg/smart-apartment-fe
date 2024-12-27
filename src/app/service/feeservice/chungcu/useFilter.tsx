import { useState } from "react";

export const useFilter = () => {
    const [year, setYear] = useState('default');
    const [month, setMonth] = useState('default');
    const [state, setState] = useState('default');
    const [floor, setFloor] = useState('default');
    const [house, setHouse] = useState('');
    const [name, setName] = useState('');

    const resetFilter = () => {
        setYear('default');
        setMonth('default');
        setState('default');
        setFloor('default');
        setHouse('');
        setName('');
    };

    const applyFilter = () => {
        console.log(year, month, state, floor, house, name);
    };

    return {
        year, setYear,
        month, setMonth,
        state, setState,
        floor, setFloor,
        house, setHouse,
        name, setName,
        resetFilter,
        applyFilter
    };
};