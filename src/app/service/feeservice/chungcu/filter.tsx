import React from "react";
import { useFilter } from "../chungcu/useFilter";
import MonthYearPicker from "@/app/components/MonthYearPicker";

const status_filter = ['ĐÃ ĐÓNG', 'CHƯA ĐÓNG'];
const floor_filter = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];
const apartment_filter = ['101', '102', 'phong cua bo'];

const Filter: React.FC = () => {
    const { year, setYear, month, setMonth, state, setState, floor, setFloor, house, setHouse, name, setName, resetFilter, applyFilter } = useFilter();
    return (
        <div className="flex">
            <div className="p-3 w-[250px] border-black border-2">
                <div className="text-xl mb-3 p-2 italic">Bộ lọc</div>
                <MonthYearPicker />
                {/* <input type="month" className="border-2 p-2 border-black rounded-xl "/> */}
                <select className="p-2 w-full text-l border-black border-2 mb-2 rounded-xl" onChange={(e) => setState(e.target.value)} value={state}>
                    <option value="default">CHỌN TRẠNG THÁI</option>
                    {status_filter.map((val) => (
                        <option key={val} value={val}>{val}</option>
                    ))}
                </select>
                
                <select className="p-2 w-full text-l border-black border-2 mb-2 rounded-xl" onChange={(e) => setFloor(e.target.value)} value={floor}>
                    <option value="default">CHỌN TẦNG</option>
                    {floor_filter.map((val) => (
                        <option key={val} value={val}>TẦNG {val}</option>
                    ))}
                </select>

                <select className="p-2 w-full text-l border-black border-2 mb-2 rounded-xl" onChange={(e) => setHouse(e.target.value)} value={house}>
                    <option value="default">CHỌN CĂN HỘ</option>
                    {apartment_filter.map((val) => (
                        <option key={val} value={val}>CĂN HỘ {val}</option>
                    ))}
                </select>

                <input type="text" placeholder="NHẬP TÊN CHỦ HỘ" className="text-black text-l w-full p-2 border-black border-2 mb-2 rounded-xl" onChange={(e) => setName(e.target.value)} value={name} />

                <div className="flex mt-2 justify-end">
                    <button className="border-black border-2 p-2 rounded-xl hover:bg-gray-200" onClick={resetFilter}>HỦY LỌC</button>
                    <button className="ml-4 p-2 bg-[#1e83a5] hover:bg-[#176b87] text-white rounded-xl" onClick={applyFilter}>ÁP DỤNG</button>
                </div>
            </div>
        </div>
    );
};

export default Filter;