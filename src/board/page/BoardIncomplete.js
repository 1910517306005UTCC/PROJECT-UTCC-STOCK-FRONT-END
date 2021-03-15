import React, { useState } from 'react'
import { boardIncompleteList } from "../../Api"
import { Button, TextField } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles'


import "./BoardIncomplete.css"

const useStyles = makeStyles((theme) => ({
    button: {
        margin: "20px 0"
    },
    margin: {
        margin: "10px 0"
    }
}));

function BoardIncomplete() {

    const classes = useStyles();
    const [toolList] = useState(boardIncompleteList)

    const onClickUpdateAll = (items) => {
        console.log(items)
    }

    return (
        <div className="container-incomplete">
            <div className="section-incomplete">
                <div className="headername-incomplete"><h3>Incomplete Board</h3></div>
                <div>
                    {toolList.map((item) => (
                        <div className="cover-incomplete" key={item.id}>
                            <div className="header-incomplete">
                                <div className="proflie-img-incomplete">
                                    <img src="/images/profile.png" alt="555" />
                                </div>
                                <div>
                                    <p>{item.username} ({item.userStatus})</p>
                                    <p>{item.date}</p>
                                </div>
                            </div>
                            <div className="content-incomplete">
                                <h3>{item.boardName}</h3>
                                <div className="detail-incomplete">
                                    <table className="table-incomplete">
                                        <thead style={{ background: "#EAE6EB" }}>
                                            <tr>
                                                <th>Name</th>
                                                <th>Total</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {item.tools.map((tool) => (
                                                <tr key={tool.id}>
                                                    <th>{tool.toolName}</th>
                                                    <th>{tool.total}</th>
                                                    <th><TextField type="number"  /></th>
                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>
                                </div>
                                <div className="btn-incomplete">
                                    <Button
                                        type="button"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        size="small"
                                        className={classes.button}
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outlined"
                                        color="primary"
                                        fullWidth
                                        size="small"
                                        className={classes.button}
                                        onClick={() => onClickUpdateAll(item.tools)}
                                    >
                                        Update All
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
            <div className="figure-box"></div>
            <div className="figure-bar"></div>
        </div>
    )
}

export default BoardIncomplete