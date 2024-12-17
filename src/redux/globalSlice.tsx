import Themchiendich from "@/app/service/feeservice/quyengop/themchiendich";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface StateType {
    dongtien : boolean,
    themchiendich : boolean
}

const initState : StateType = {
    dongtien : false,
    themchiendich : false,
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
    }
})