import React from 'react'
import TableHistoryBoard from '../components/TableHistoryBoard'
import "./HistoryBoard.css"

function HistoryBoard() {
    return (
        <div className="Container-historyboard">
            <h1>History of Board</h1>
            <TableHistoryBoard />
        </div>
    )
}

export default HistoryBoard
