import Themchiendich from "@/app/service/feeservice/quyengop/themchiendich";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface StateType {
    dongtien : boolean,
    themchiendich : boolean,
    chinhsua_fee : boolean,
}

const initState : StateType = {
    dongtien : false,
    themchiendich : false,
    chinhsua_fee : false,
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
        
    }
})