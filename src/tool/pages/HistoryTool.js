import React from 'react'
import TableHistoryTool from '../components/TableHistoryTool'
import './HistoryTool.css'

function HistoryTool() {
    return (
        <div className="Container-historytool">
            <h1>ประวัติการเบิกอุปกรณ์</h1>
            <TableHistoryTool />
        </div>
    )
}

export default HistoryTool
