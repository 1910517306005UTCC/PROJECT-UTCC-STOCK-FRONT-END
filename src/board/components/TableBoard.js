import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Avatar, Button, Modal, Backdrop, Fade, TextField } from "@material-ui/core";
import { useForm } from "../../shared/hooks/form-hook";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import Input from "../../shared/components/FormElements/Input";
import { boardListAction, addBoardToTotal } from "../../actions/boardActions";

import "./TableBoard.css"

const columns = [
    { label: 'Image', minWidth: 100 },
    { label: 'Board name', minWidth: 170 },
    { label: 'Board code', minWidth: 170 },
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

export default function TableBoard() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const boardList = useSelector((state) => state.boardList);
    const { boards, loading, error, messageAlert } = boardList;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    // const [tools] = useState(listToolApi);
    const [openModal, setOpenModal] = useState(false);
    const [headerForm, setHeaderForm] = useState('');
    const [headerId, setHeaderId] = useState('');
    const [boardId, setBoardId] = useState('')

    useEffect(() => {
        dispatch(boardListAction());
        return () => {

        }
    }, [])

    const [formState, inputHandler] = useForm(
        {
            total: {
                value: '',
                isValid: false
            }
        },
        false
    );

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleOpenModal = (name, id, header) => {
        // const newName = name
        setHeaderForm(header + ' ' + name)
        setHeaderId(header);
        setBoardId(id);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setHeaderForm("")
        setBoardId("");
    };

    const onSubmitAdd = (e) => {
        e.preventDefault();
        dispatch(addBoardToTotal(boardId, formState.inputs.total.value));
        setOpenModal(false)
    }

    const onSubmitRequest = (e) => {
        e.preventDefault();
        // console.log("Request")
    }

    return (
        <div>
            { messageAlert && <Alert onClose={() => { }} style={{ margin: "10px 0" }}>This is a success alert — check it out!</Alert>}
            {/* Table */}

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
                            {boards.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((board, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                        <TableCell align="left">
                                            <Avatar variant="square" src={board.imageProfile} />
                                        </TableCell>
                                        <TableCell align="left">
                                            <p>{board.boardName}</p>
                                        </TableCell>
                                        <TableCell align="left">
                                            <p>{board.boardCode}</p>
                                        </TableCell>
                                        <TableCell align="left">
                                            <p>{board.type}</p>
                                        </TableCell>
                                        <TableCell align="left">
                                            <p>In Stock</p>
                                        </TableCell>
                                        <TableCell align="left">
                                            <p>{board.total}</p>
                                        </TableCell>
                                        <TableCell align="left">
                                            <div className="table-board-btn-action">
                                                <Button variant="contained" color="primary" onClick={() => handleOpenModal(board.boardName, index, "Request")}>
                                                    request
                                                </Button>
                                                <Button variant="contained" onClick={() => handleOpenModal(board.boardName, index, "Add")} style={{ background: "#28a745", color: "#fff" }}>
                                                    add
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={boards.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>

            {/* Prompt Request & Add Form */}

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openModal}
                onClose={handleCloseModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModal}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">{headerForm}</h2>
                        <form onSubmit={headerId == "Request" ? onSubmitRequest : onSubmitAdd}>
                            <Input
                                id="total"
                                element="input"
                                type="number"
                                label="Total"
                                validators={[VALIDATOR_REQUIRE()]}
                                errorText="Please enter a valid Total."
                                onInput={inputHandler}
                                required
                            />
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Description"
                                multiline
                                rowsMax={4}
                                variant="outlined"
                                fullWidth
                                className={classes.textarea}
                            />
                            <div className="table-board-btn-action">
                                <Button type="submit" variant="contained" color="primary" disabled={!formState.isValid} >submit</Button>
                                <Button variant="contained" color="secondary" onClick={() => setOpenModal(false)}>cancel</Button>
                            </div>
                        </form>
                    </div>
                </Fade>
            </Modal>
        </div >
    );
}