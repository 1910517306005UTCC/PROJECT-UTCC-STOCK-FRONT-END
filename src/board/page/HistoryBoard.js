import React from 'react'
import TableHistoryBoard from '../components/TableHistoryBoard'
import "./HistoryBoard.css"

function HistoryBoard() {
    return (
        <div className="Container-historytool">
            <h1>History of Tool</h1>
            <TableHistoryBoard />
        </div>
    )
}

export default HistoryBoard
