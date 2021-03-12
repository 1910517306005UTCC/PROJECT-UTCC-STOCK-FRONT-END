import { BOARD_ADD_TOTAL_REQUEST, BOARD_LIST_REQUEST, BOARD_LIST_SUCCESS, BOARD_LIST_FAIL, BOARD_ADD_TOTAL_SUCCESS } from "../constants/boardConstants";

export const boardListReducer = (state = { boards: [] }, action) => {
    switch (action.type) {
        case BOARD_LIST_REQUEST:
            return { loading: true, boards: [], messageAlert: false }
        case BOARD_ADD_TOTAL_REQUEST: 
            return { loading: true, boards: state.boards }    
        case BOARD_LIST_SUCCESS:
            return { loading: false, boards: action.payload }
        case BOARD_ADD_TOTAL_SUCCESS:
            // อาเรย์ที่ต้องการแก้ = จำนวนที่ต้องการเพิ่ม + ค่าจำนวนปัจจุบัน
            state.boards[action.payload.id].total = Number(action.payload.total) + Number(state.boards[action.payload.id].total) ;
            return { loading: false, boards: state.boards , messageAlert: true }
            // return state
        case BOARD_LIST_FAIL:
            return { loading: false, error: action.payload, boards: [] }
        default:
            return state;

    }
}