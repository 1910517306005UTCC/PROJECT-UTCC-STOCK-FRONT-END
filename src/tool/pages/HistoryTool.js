import React from 'react'
import TableHistoryTool from '../components/TableHistoryTool'
import './HistoryTool.css'

function HistoryTool() {
    return (
        <div className="Container-historytool">
            <h1>ประวัติการเบิก/เพิ่มอุปกรณ์</h1>
            <TableHistoryTool />
        </div>
    )
}

export default HistoryTool
