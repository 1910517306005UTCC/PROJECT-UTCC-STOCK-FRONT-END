import React from 'react'
import TableTool from '../components/TableTool'

import "./ToolList.css"

function ToolList() {

    return (
        <div className="container-toollist">
            <h1>รายการอุปกรณ์</h1>
            <TableTool />
        </div>
    )
}

export default ToolList
