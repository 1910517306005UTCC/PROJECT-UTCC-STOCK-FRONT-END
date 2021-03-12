import { BOARD_ADD_TOTAL_FAIL, BOARD_ADD_TOTAL_REQUEST, BOARD_ADD_TOTAL_SUCCESS, BOARD_LIST_FAIL, BOARD_LIST_REQUEST, BOARD_LIST_SUCCESS } from "../constants/boardConstants";
import { listBoards } from "../Api";


export const boardListAction = () => (dispatch) => {
    try {
        dispatch({type: BOARD_LIST_REQUEST});
        dispatch( {type: BOARD_LIST_SUCCESS, payload: listBoards } )
    } catch (error) {
        dispatch({ type: BOARD_LIST_FAIL, payload: "Server is error now." })
    }
}


export const addBoardToTotal = (id, total) => (dispatch) => {
    try {
        
        dispatch({type: BOARD_ADD_TOTAL_REQUEST});
        dispatch( {type: BOARD_ADD_TOTAL_SUCCESS, payload: { id: id, total: total } } )
    } catch (error) {
        dispatch({ type: BOARD_ADD_TOTAL_FAIL, payload: "Server is error now." })
    }
}