import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { historyBoard } from '../../ApiHistory';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button, Modal, Backdrop, Fade } from '@material-ui/core';
import { useForm } from "../../shared/hooks/form-hook";
import { VALIDATOR_REQUIRE } from '../../shared/util/validators';

// Component
import Input from '../../shared/components/FormElements/Input';


// Icon
import RestoreIcon from '@material-ui/icons/Restore';
import EditIcon from '@material-ui/icons/Edit';
import DescriptionIcon from '@material-ui/icons/Description';


const columns = [
    { label: 'วันที่', minWidth: 170 },
    { label: 'ชื่อบอร์ด', minWidth: 170 },
    {
        label: 'ชื่อคนเบิก',
        minWidth: 170,
    },
    {
        label: 'สถานะผู้เบิก',
        minWidth: 170,
    },
    {
        label: 'จำนวน',
        minWidth: 170,
    },
    {
        label: 'เวลา',
        minWidth: 170,
    },
    {
        label: 'วันหมดอายุ',
        minWidth: 170,
    },
    {
        label: 'อื่นๆ',
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
        justifyContent: 'center'
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    actionAdd: {
        color: "#28a745",
    },
    actionRequest: {
        color: "#dc3545",
    }
}));

export default function TableHistoryBoard() {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [boards, setBoards] = useState(historyBoard);
    const [openRestore, setOpenRestore] = useState(false);
    const [data, setData] = useState({});
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
        setData({})
    }
    const handleSubmitRestore = () => {
        setData({})
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
        console.log(description)
        setData(description)
        setOpenDescription(true)
    }

    const handleOpenEdit = () => {
        setOpenEdit(true)
    }

    const handleCloseDescription = () => {
        setOpenDescription(false)
        setData({})
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
                                            {board.status}
                                        </TableCell>
                                        <TableCell>
                                            {board.actionType === "add" ?
                                                <span className={classes.actionAdd}>+ {board.total}</span> :
                                                <span className={classes.actionRequest}>- {board.total}</span>
                                            }
                                        </TableCell>
                                        <TableCell>
                                            {board.time}
                                        </TableCell>
                                        <TableCell>
                                            {board.exp}
                                        </TableCell>
                                        <TableCell>
                                            <div className="TableHistoryboard-action">
                                                <Button variant="contained" color="primary" startIcon={<RestoreIcon />} onClick={() => handleOpenRestore(board.boardName, board.total)}>คืน</Button>
                                                <Button variant="contained" color="secondary" startIcon={<EditIcon />} onClick={handleOpenEdit}>แก้ไข</Button>
                                                <Button variant="contained" color="default" startIcon={<DescriptionIcon />} onClick={() => handleOpenDescription(board)}>เพิ่มเติม</Button>
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
                        <h2 id="transition-modal-title">คุณต้องการทำขั้นตอนนี้หรือไม่ ?</h2>
                        <div className="TableHistoryboard-action">
                            <Button variant="contained" color="primary" onClick={handleSubmitRestore}>ยืนยัน</Button>
                            <Button variant="contained" color="secondary" onClick={handleCloseRestore}>ยกเลิก</Button>
                        </div>
                    </div>
                </Fade>
            </Modal>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openEdit}
                onClose={handleCloseEdit}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openEdit}>
                    <div className={classes.paper}>
                        <h2 id="transition-modal-title">ประวัติ</h2>
                        <form onSubmit={handleSubmitEdit}>
                            <Input id="total" element="input" label="จำนวนบอร์ด" type="number" errorText="Please fill data" validators={[VALIDATOR_REQUIRE()]} onInput={inputHandler} required />
                            <div className="TableHistoryTool-action">
                                <Button type="submit" variant="contained" color="primary" disabled={!formState.isValid}>แก้ไข</Button>
                                <Button variant="contained" color="secondary" onClick={handleCloseEdit}>ยกเลิก</Button>
                            </div>
                        </form>
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
                        <h2 id="transition-modal-title">รายละเอียดเพิ่มเติม</h2>
                        {data.actionType === "request" && <p className="historyboard-h4">จำนวนอุปกรณ์ที่ใช้ไป</p>}
                        {data.tools && data.actionType === "request" && data.tools.map((tool) => (
                            <div className="historyboard-description" key={tool.id}>
                                <p>{tool.toolName}</p>
                                <p>{Number(tool.total) * Number(data.total)}</p>
                            </div>
                        ))}
                        <div>
                            <p className="historyboard-h4">รายละเอียดอื่นๆ</p>
                            <p>{data.description}</p>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}