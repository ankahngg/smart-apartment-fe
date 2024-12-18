import Qgfilter from "./qgfilter";

function Filter() {
    const floor_filter:string[] = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15']

    return (
        <div className="border-2 p-2 border-black h-full">
            <div className="p-2 italic text-xl ">Bộ lọc</div>
            <div className="flex mb-2">

                <div className="flex-1">
                    <select id="status" name="status" className="p-2 w-full  text-l border-black border-2 rounded-xl" >
                        <option value={'default'}>CHỌN TẦNG</option>
                        {
                            floor_filter.map((val)=>{
                                return (
                                    <option value={val}> TẦNG {val}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <input type="text" placeholder="CHỌN CĂN HỘ : 2.05" className="flex-1 text-black text-l w-full pl-2 border-black border-2 ml-2 rounded-xl" /> 
            </div>
            <input type="text" placeholder="NHẬP TÊN CHỦ HỘ" className="text-black text-l w-full p-2 border-black border-2 mb-2 rounded-xl" /> 

            <Qgfilter />
        </div>  
    );
}

export default Filter;