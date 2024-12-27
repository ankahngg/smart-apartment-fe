import { useEffect } from "react";

interface PhantrangProps {
    cnt: number;
    onPageChange: (page: number) => void;
    crpage : number;
}

const Phantrang:React.FC<PhantrangProps> =  ({cnt,onPageChange,crpage}) => {
    const page:number[] = []
    for(var i = 1; i <= cnt; i ++) page.push(i);
    return (
    <div className="p-2">
        <label className="text-sm mr-3">Trang</label>
        {
            page.map((val,index)=> {
                if(val != crpage)
                return (
                    <>
                        <button className="pl-2 pr-2 border-2 mr-1 text-sm rounded-xl"
                        onClick={()=>onPageChange(val)}>{val}</button>
                    </>
                )
                else 
                if(val == crpage)
                    return (
                        <>
                            <button className="pl-2 pr-2 border-2 mr-1 text-sm bg-[#1e83a5] text-white rounded-xl"
                            onClick={()=>onPageChange(val)}>{val}</button>
                        </>
                    )
            }) 
    
        }
    </div>
    );
}

export default Phantrang;