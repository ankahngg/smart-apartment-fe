function Filter() {
    const year_filter:string[] = ['2024','2023','2022','2021'];
    const session_filter:string[] = ['1','2','3','4','5','6','7','8','9','10','11','12']
    const status_filter:string[] = ['ĐÃ ĐÓNG','CHƯA ĐÓNG']
    const floor_filter:string[] = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15']
    return ( 
        <div className="flex" >
            <div className="p-3 w-[250px] border-black border-2">
                <div className="text-xl mb-3 p-2 italic">Bộ lọc</div>

                <select id="year" name="year" className="p-2 w-full   text-l border-black border-2 mb-2 rounded-xl" >
                    <option value={'default'}>CHỌN NĂM</option>
                    {
                        year_filter.map((val)=>{
                            return (
                                <option value={val}>NĂM {val}</option>
                            )
                        })
                    }
                </select>

                <select id="session" name="session" className="p-2 w-full  text-l border-black border-2 mb-2 rounded-xl" >
                    <option value={'default'}>CHỌN ĐỢT</option>
                    {
                        session_filter.map((val)=>{
                            return (
                                <option value={val}>THÁNG {val}</option>
                            )
                        })
                    }
                </select>

                <select id="status" name="status" className="p-2 w-full   text-l border-black border-2 mb-2 rounded-xl" >
                    <option value={'default'}>CHỌN TRẠNG THÁI</option>
                    {
                        status_filter.map((val)=>{
                            return (
                                <option value={val}> {val}</option>
                            )
                        })
                    }
                </select>

                <select id="status" name="status" className="p-2 w-full   text-l border-black border-2 mb-2 rounded-xl" >
                    <option value={'default'}>CHỌN TẦNG</option>
                    {
                        floor_filter.map((val)=>{
                            return (
                                <option value={val}> TẦNG {val}</option>
                            )
                        })
                    }
                </select>

                <input type="text" placeholder="CHỌN CĂN HỘ EX : 2.05" className="text-black text-l w-full  p-2 border-black border-2 mb-2 rounded-xl" /> 

                <input type="text" placeholder="NHẬP TÊN CHỦ HỘ" className="text-black text-l w-full   p-2 border-black border-2 mb-2 rounded-xl" /> 


                <div className="flex mt-2 justify-end">
                    <button className="border-black border-2 p-2 rounded-xl hover:bg-gray-200">HỦY LỌC</button>
                    <button className="ml-4 p-2 bg-[#1e83a5] hover:bg-[#176b87] text-white rounded-xl">ÁP DỤNG</button>
                </div>
            </div>
        </div>
    )
}

export default Filter;