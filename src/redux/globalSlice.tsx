import Themchiendich from "@/app/service/feeservice/quyengop/filter/themchiendich";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface StateType {
    dongtien : boolean,
    themchiendich : boolean,
    chinhsua_fee : boolean,
    hgd_chitiet : boolean,
    cr_apart : Canho,
    cr_res:Cudan,
    reload:boolean,
    filter_floor:string,
    filter_apart:string,
    filter_keyword:string,
}

const initState : StateType = {
    dongtien : false,
    themchiendich : false,
    chinhsua_fee : false,
    hgd_chitiet : false,
    cr_apart:{
        id : 0,
        stt : 0,
        mach:'',
        hoten:'',
        dientich:0,
        soluong:0,
        phuongtien:0,
    },
    cr_res:{
        stt : 0,
        macd : '',
        hoten :'',
        gioitinh : '',
        ngaysinh : '',
        cccd : '',
        quequan : '',
        nghenghiep : '',
        lienhe : '',
        trangthai : '',
        vaitro : ''
    },
    reload:false,
    filter_floor:'',
    filter_apart:'',
    filter_keyword:''

}

interface Canho{
    id : number,
    stt : number,
    mach:string,
    hoten:string,
    dientich:number,
    soluong:number,
    phuongtien:number,
}

interface Cudan {
    stt : number,
    macd : string,
    hoten :string,
    gioitinh : string,
    ngaysinh : string,
    cccd : string,
    quequan : string,
    nghenghiep : string,
    lienhe : string,
    trangthai : string,
    vaitro : string
}

export default createSlice({
    name : 'global',
    initialState : initState,
    reducers : {
        dongtien : (state,action : PayloadAction<boolean>) => {
            state.dongtien = action.payload;
        },
        themchiendich : (state,action : PayloadAction<boolean>) => {
            state.themchiendich = action.payload;
        },
        chinhsua_fee : (state,action : PayloadAction<boolean>) => {
            state.chinhsua_fee = action.payload;
        },
        hgd_chitiet_action : (state,action : PayloadAction<boolean>) => {
            state.hgd_chitiet = action.payload;
        },
        set_cr_apart :(state,action : PayloadAction<Canho>) => {
            state.cr_apart = action.payload;
        },
        set_cr_res :(state,action : PayloadAction<Cudan>) =>{
            state.cr_res = action.payload;
        },
        set_reload :(state) =>{
            state.reload = !state.reload;
        },
        set_filter_floor :(state,action : PayloadAction<string>) =>{
            state.filter_floor = action.payload;
        },
        set_filter_apart :(state,action : PayloadAction<string>) =>{
            state.filter_apart = action.payload;
        },
        set_filter_keyword :(state,action : PayloadAction<string>) =>{
            state.filter_keyword = action.payload;
        },
    }
})