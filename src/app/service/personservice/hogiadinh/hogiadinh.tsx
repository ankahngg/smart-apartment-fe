'use client'
import { useAppSelector } from '@/redux/hooks';
import Chitiet from './chitiet';
import Filter from './filter'
import Nhankhau from './nhankhau/nhankhau';
import Phuongtien from './phuongtien/phuongtien';
import Table from './table';

function Hogiadinh() {
    const hgd_chitiet = useAppSelector((state) => state.global.hgd_chitiet)
    return (
        <div className='flex'>
            <Filter />
            <Table />
            
            {
                hgd_chitiet == true ?
                <Chitiet />
                :
                <></>
            }

        </div>
    );
}
export default Hogiadinh;