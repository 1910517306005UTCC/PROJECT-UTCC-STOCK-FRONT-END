import React from 'react'
import TableBoard from '../components/TableBoard'
import "./BoardList.css"

function BoardList() {
    return (
        <div>
            <div className="container-boardlist">
                <h1>Board List</h1>
                <TableBoard />
            </div>
        </div>
    )
}

export default BoardList
