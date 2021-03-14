import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { historyBoard } from '../../ApiHistory';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button, Modal, Backdrop, Fade } from '@material-ui/core';
import { useForm } from "../../shared/hooks/form-hook";

const columns = [
    { label: 'Date', minWidth: 170 },
    { label: 'Board name', minWidth: 170 },
    {
        label: 'Username',
        minWidth: 170,
    },
    {
        label: 'total',
        minWidth: 170,
    },
    {
        label: 'time',
        minWidth: 170,
    },
    {
        label: 'action',
        minWidth: 330,
        align: 'center'
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
}));

export default function TableHistoryBoard() {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [boards, setBoards] = useState(historyBoard);
    const [openRestore, setOpenRestore] = useState(false);
    const [data, setData] = useState();
    const [openEdit, setOpenEdit] = useState(false);
    const [openDescription, setOpenDescription] = useState(false);


    const [formState, inputHandler, setFormData] = useForm(
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

    const handleOpenRestore = (name, total) => {
        let data = {
            name: name,
            total: total
        }
        setOpenRestore(true)
        setData(data)
        console.log(name)
    }

    const handleCloseRestore = () => {
        setOpenRestore(false)
        setData()
    }
    const handleSubmitRestore = () => {
        setData()
    }
    const handleCloseEdit = () => {
        setOpenEdit(false)
    }

    const handleSubmitEdit = (e) => {
        e.preventDefault()
        setOpenEdit(false)
        console.log(formState.inputs.total.value)
    }

    const handleOpenDescription = (description) => {
        setData(description)
        setOpenDescription(true)
    }

    const handleCloseDescription = () => {
        setOpenDescription(false)
        setData()
    }

    return (
        <div>
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
                                    <TableRow key={index} hover role="checkbox" tabIndex={-1}>
                                        <TableCell>
                                            {board.date}
                                        </TableCell>
                                        <TableCell>
                                            {board.boardName}
                                        </TableCell>
                                        <TableCell>
                                            {board.username}
                                        </TableCell>
                                        <TableCell>
                                            {board.total}
                                        </TableCell>
                                        <TableCell>
                                            {board.time}
                                        </TableCell>
                                        <TableCell>
                                            <div className="TableHistoryboard-action">
                                                <Button variant="contained" color="primary" onClick={() => handleOpenRestore(board.boardName, board.total)}>Restore</Button>
                                                <Button variant="contained" color="primary" onClick={() => handleOpenDescription(board.description)}>Description</Button>
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
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openRestore}
                onClose={handleCloseRestore}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openRestore}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Are you sure ?</h2>
                        <div className="TableHistoryboard-action">
                            <Button variant="contained" color="primary" onClick={handleSubmitRestore}>Submit</Button>
                            <Button variant="contained" color="secondary" onClick={handleCloseRestore}>Cancel</Button>
                        </div>
                    </div>
                </Fade>
            </Modal>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openDescription}
                onClose={handleCloseDescription}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openDescription}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">Description</h2>
                        <p>{data}</p>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}