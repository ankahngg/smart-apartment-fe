import Filter from "./filter/filter";
import Table from "./table";
import Themchiendich from "./themchiendich";
import { useAppSelector } from "@/redux/hooks";

function Phiquyengop() {
    const themchiendich = useAppSelector((state) => state.global.themchiendich)
    return ( 
        <div className="flex w-full">
            <div className="w-[500px]">
                <Filter />
            </div> 
            <div className="">
                <Table />
            </div>
            {
                themchiendich == true ?
                <Themchiendich />
                :
                <></>

            }

        </div>
    );
}

export default Phiquyengop;