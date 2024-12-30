import Themchiendich from "@/app/service/feeservice/quyengop/filter/themchiendich";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface StateType {
    dongtien : boolean,
    themchiendich : boolean,
    chinhsua_fee : boolean,
    hgd_chitiet : boolean,
}

const initState : StateType = {
    dongtien : false,
    themchiendich : false,
    chinhsua_fee : false,
    hgd_chitiet : false,
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
    }
})