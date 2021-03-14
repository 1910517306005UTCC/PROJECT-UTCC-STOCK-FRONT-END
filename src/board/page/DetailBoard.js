import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { boardItem } from "../../Api"
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core"

import "./DetailBoard.css"
import { SlideImagePreview } from '../../shared/components/UIElements/SlideImagePreview';

const columns = [
    { label: 'Image', minWidth: 100 },
    { label: 'Tool name', minWidth: 170 },
    { label: 'Tool code', minWidth: 170 },
    {
        label: 'type', minWidth: 100, align: 'left',
    },
    {
        label: 'status', minWidth: 170, align: 'left',
    },
    {
        label: 'Qty', minWidth: 100, align: 'left',
    },
    {
        label: 'action', minWidth: 170, align: 'left',
    },
];


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
        margin: "30px 0"
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    textarea: {
        margin: "10px 0"
    }
}));

function DetailBoard() {

    // const boardId = useParams().tid
    const classes = useStyles();
    const [board] = useState(boardItem);
    const [previewImg, setPreviewImg] = useState(board.imageProfile)
    const [images] = useState(board.images);

    return (
        <div>
            <h1>Board Detail</h1>

            <div className="container-detailboard">
                <div>
                    <div className="introl-img">
                        <img src={previewImg} alt="" />
                    </div>
                    {images.length === 3 ?
                        <div className="detailboard-list-img">
                            {images.map((img, index) => (
                                <Avatar variant="square" src={img} key={index} onClick={() => setPreviewImg(img)} />
                            ))}
                        </div>
                        :
                        <div><SlideImagePreview setPreviewImg={setPreviewImg} images={images} /></div>
                    }
                </div>
                <div>
                    <h2>{board.boardName}</h2>
                    <div className="detailboard-list">
                        <p>Board code</p>
                        <p>{board.boardCode}</p>
                    </div>
                    <div className="detailboard-list">
                        <p>total</p>
                        <p>{board.total}</p>
                    </div>
                    <div className="detailboard-list">
                        <p>type</p>
                        <p>{board.type}</p>
                    </div>
                    <div className="detailboard-list">
                        <p>status</p>
                        <p>{board.status}</p>
                    </div>
                    <div className="detailboard-list">
                        <p>limit</p>
                        <p>{board.limit}</p>
                    </div>
                    <div className="detailboard-des">
                        <p>description</p>
                        <p>{board.description}</p>
                    </div>
                    <div className="detailboard-btn">
                        <Button
                            color="primary"
                            type="button"
                            variant="contained"
                        >
                            <Link to={`/board/${board.id}`}>Edit</Link>
                        </Button>
                        <Button
                            type="button"
                            variant="contained"
                        >
                            <Link to="/">Back</Link>
                        </Button>
                    </div>
                </div>
            </div>

            <Divider />

            <h2>Tools of {board.boardName}</h2>

            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column, index) => (
                                    <TableCell
                                        key={index}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {board.tools.map((tool, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        <TableCell align="left">
                                            <Avatar variant="square" src={tool.imageProfile} />
                                        </TableCell>
                                        <TableCell align="left">
                                            <p>{tool.toolName}</p>
                                        </TableCell>
                                        <TableCell align="left">
                                            <p>{tool.toolCode}</p>
                                        </TableCell>
                                        <TableCell align="left">
                                            <p>{tool.type}</p>
                                        </TableCell>
                                        <TableCell align="left">
                                            <p>In Stock</p>
                                        </TableCell>
                                        <TableCell align="left">
                                            <p>{tool.total}</p>
                                        </TableCell>
                                        <TableCell align="left">
                                            <div className="table-board-btn-action">
                                                <Button variant="contained" color="primary" >
                                                    <Link to={`/${tool.id}/tool`}>description</Link>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

        </div >
    )
}

export default DetailBoard