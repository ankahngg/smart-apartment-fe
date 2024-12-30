import Filter from "./filter/filter";
import Table from "./table";
import Themchiendich from "./filter/themchiendich";
import { useAppSelector } from "@/redux/hooks";

function Phiquyengop() {
    const themchiendich = useAppSelector((state) => state.global.themchiendich)
    return ( 
        <div className="flex w-full">
            <div className="w-[600px]">
                <Filter />
            </div> 
            <div className="w-full">
                <Table />
            </div>
           

        </div>
    );
}

export default Phiquyengop;