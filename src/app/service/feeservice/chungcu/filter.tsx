import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFilter } from "../chungcu/useFilter";
import MonthYearPicker from "@/app/components/MonthYearPicker";
import axiosInstance from "@/utils/axiosConfig";

const Filter: React.FC = () => {
    const { date, setDate, state, setState, floor, setFloor, house, setHouse, name, setName, resetFilter, applyFilter } = useFilter();
    const [statuses, setStatuses] = useState<{ code: string; name: string; enumName: string }[]>([]);

    useEffect(() => {
        const fetchStatuses = async () => {
            try {
                const statusResponse = await axiosInstance.get("/api/v1/enum/invoice-statuses");
                setStatuses(statusResponse.data); // Giả sử API trả về một mảng các đối tượng

                const floorResponse = await axiosInstance.post("/api/v1/floors/search", {
                    page: 0,
                    pageSize: 999,
                    filters: [],
                    sorts: [],
                }
                );
                setFloor(floorResponse.data.content);

                const houseResponse = await axiosInstance.post("/api/v1/apartments/search", {
                    page: 0,
                    pageSize: 999,
                    filters: [],
                    sorts: [],
                });
                setHouse(houseResponse.data.content);


            } catch (error) {
                console.error("Error fetching statuses:", error);
            }
        };
        fetchStatuses();
    }, []);

    return (
        <div className="flex">
            <div className="p-3 w-[250px] border-black border-2">
                <div className="text-xl mb-3 p-2 italic">Bộ lọc</div>

                <MonthYearPicker setDate={setDate} />

                <select className="p-2 w-full text-l border-black border-2 mb-2 rounded-xl" onChange={(e) => setState(e.target.value)} value={state}>
                    <option value="default">CHỌN TRẠNG THÁI</option>
                    {statuses.map((status) => (
                        <option key={status.code} value={status.code}>
                            {status.name}
                        </option>
                    ))}
                </select>

                <select className="p-2 w-full text-l border-black border-2 mb-2 rounded-xl" onChange={(e) => setFloor(e.target.value)} value={floor}>
                    <option value="default">CHỌN TẦNG</option>
                    {[...Array(15)].map((_, i) => (
                        <option key={i + 1} value={(i + 1).toString()}>TẦNG {i + 1}</option>
                    ))}
                </select>

                <select className="p-2 w-full text-l border-black border-2 mb-2 rounded-xl" onChange={(e) => setHouse(e.target.value)} value={house}>
                    <option value="default">CHỌN CĂN HỘ</option>
                    <option value="101">CĂN HỘ 101</option>
                    <option value="102">CĂN HỘ 102</option>
                    <option value="phong cua bo">CĂN HỘ PHÒNG CỦA BỐ</option>
                </select>

                <input type="text" placeholder="Tìm kiếm.." className="text-black text-l w-full p-2 border-black border-2 mb-2 rounded-xl" onChange={(e) => setName(e.target.value)} value={name} />

                <div className="flex mt-2 justify-end">
                    <button className="border-black border-2 p-2 rounded-xl hover:bg-gray-200" onClick={resetFilter}>HỦY LỌC</button>
                    <button className="ml-4 p-2 bg-[#1e83a5] hover:bg-[#176b87] text-white rounded-xl" onClick={applyFilter}>ÁP DỤNG</button>
                </div>
            </div>
        </div>
    );
};

export default Filter;
