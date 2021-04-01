import { TOOL_ADD_TOTAL_REQUEST, TOOL_LIST_REQUEST, TOOL_LIST_SUCCESS, TOOL_LIST_FAIL, TOOL_ADD_TOTAL_SUCCESS } from "../constants/toolConstants";
import { listToolApi } from "../Api";

export const toolListReducer = (state = { tools: [] }, action) => {
    switch (action.type) {
        case TOOL_LIST_REQUEST:
            return { loading: true, tools: [], messageAlert: false }
        case TOOL_ADD_TOTAL_REQUEST: 
            return { loading: true, tools: state.tools }    
        case TOOL_LIST_SUCCESS:
            return { loading: false, tools: action.payload }
        case TOOL_ADD_TOTAL_SUCCESS:
            // อาเรย์ที่ต้องการแก้ = จำนวนที่ต้องการเพิ่ม + ค่าจำนวนปัจจุบัน
            state.tools[action.payload.id].total = Number(action.payload.total) + Number(state.tools[action.payload.id].total) ;
            return { loading: false, tools: state.tools , messageAlert: true }
            // return state
        case TOOL_LIST_FAIL:
            return { loading: false, error: action.payload, tools: [] }
        default:
            return state;

    }
}

// case DELETE_ITEM:
//     return {
//         ...state,
//         items: state.items.filter(item => item._id !== action.payload)
//     };
// case ADD_ITEM:
//     return {
//         ...state,
//         items: [action.payload, ...state.items]
//     };