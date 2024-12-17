import { useSelector } from "react-redux";
import Dongtien from "./dongtien";
import Filter from "./filter";
import Table from "./table";
import { useAppSelector } from "../../../../redux/hooks";
function Phichungcu() {
    const dongtien = useAppSelector((state) => state.global.dongtien)
    return (
        <>
            <Filter />
            <Table />
            {
                dongtien == true ?
                <Dongtien />
                :
                <></>
            }
        </>
    );
}

export default Phichungcu;