import { TOOL_ADD_TOTAL_FAIL, TOOL_ADD_TOTAL_REQUEST, TOOL_ADD_TOTAL_SUCCESS, TOOL_LIST_FAIL, TOOL_LIST_REQUEST, TOOL_LIST_SUCCESS } from "../constants/toolConstants";
import { listToolApi } from "../Api";


export const toolListAction = () => (dispatch) => {
    try {
        dispatch({type: TOOL_LIST_REQUEST});
        dispatch( {type: TOOL_LIST_SUCCESS, payload: listToolApi } )
    } catch (error) {
        dispatch({ type: TOOL_LIST_FAIL, payload: "Server is error now." })
    }
}


export const addToolToTotal = (id, total) => (dispatch) => {
    try {
        
        dispatch({type: TOOL_ADD_TOTAL_REQUEST});
        dispatch( {type: TOOL_ADD_TOTAL_SUCCESS, payload: { id: id, total: total } } )
    } catch (error) {
        dispatch({ type: TOOL_ADD_TOTAL_FAIL, payload: "Server is error now." })
    }
}