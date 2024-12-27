function Filter() {
    const floor_filter:string[] = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15']

    function cancelFilter(): void {
        throw new Error("Function not implemented.");
    }

    function doFilter(): void {
        throw new Error("Function not implemented.");
    }
    return ( 
        <div className="border-2 p-2 border-black w-[300px]">
            <div className="p-2 italic text-xl ">Bộ lọc</div>
            <select id="status" name="status" className="p-2 w-full text-l border-black border-2 rounded-xl mb-2" >
                <option value={'default'}>CHỌN TẦNG</option>
                {
                    floor_filter.map((val)=>{
                        return (
                            <option value={val}> TẦNG {val}</option>
                        )
                    })
                }
            </select>
            <input className="p-2 rounded-xl mb-2 w-full border-2 border-black" placeholder="SỐ NHÂN KHẨU" type="number"/>
            <input type="text" placeholder="CHỌN CĂN HỘ : 2.05" className=" p-2 text-black text-l w-full border-black border-2 rounded-xl mb-2" /> 
            <input type="text" placeholder="NHẬP TÊN CHỦ HỘ" className="text-black text-l w-full p-2 border-black border-2 mb-2 rounded-xl" /> 
            <div className="flex mt-2 justify-end">
                <button className="border-black border-2 p-2 rounded-xl hover:bg-gray-200"
                onClick={()=>cancelFilter()}
                >HỦY LỌC</button>
                <button className="ml-4 p-2 bg-[#1e83a5] hover:bg-[#176b87] text-white rounded-xl"
                onClick={()=>doFilter()}
                >ÁP DỤNG</button>
            </div>
        </div>
        
    );
}

export default Filter;