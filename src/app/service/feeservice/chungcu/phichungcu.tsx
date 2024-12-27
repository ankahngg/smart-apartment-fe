import { useSelector } from "react-redux";
import Dongtien from "./dongtien";
import Filter from "./filter";
import Table from "./table";
import { useAppSelector } from "../../../../redux/hooks";
import Chinhsua from "./chinhsua";
import Mucphi from "./qlmucphi/mucphi";
function Phichungcu() {
    const dongtien = useAppSelector((state) => state.global.dongtien)
    const chinhsua_fee = useAppSelector((state) => state.global.chinhsua_fee)
    return (
        <div>

            <div className="flex">
                <Filter />
                <Table />
                {
                    dongtien == true ?
                        <Dongtien />
                        :
                        <></>
                }
                {
                    chinhsua_fee == true ?
                        <Chinhsua />
                        :
                        <></>
                }
            </div>

            <Mucphi />

        </div>
    );
}

export default Phichungcu;