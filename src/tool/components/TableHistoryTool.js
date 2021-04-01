import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { historyTool } from '../../ApiHistory';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button, Modal, Backdrop, Fade } from '@material-ui/core';
import { useForm } from "../../shared/hooks/form-hook";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";

// Component
import Input from '../../shared/components/FormElements/Input';

// Icon
import RestoreIcon from '@material-ui/icons/Restore';
import EditIcon from '@material-ui/icons/Edit';
import DescriptionIcon from '@material-ui/icons/Description';
import SelectFilterTimeAndStatus from '../../shared/components/UIElements/SelectFilterTimeAndStatus';


const columns = [
    { label: 'วันที่', minWidth: 170 },
    { label: 'ชื่ออุปกรณ์', minWidth: 170 },
    {
        label: 'ชื่อผู้เบิก',
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
        justifyContent: 'center',
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

export default function TableHistoryTool() {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [tools] = useState(historyTool);
    const [openRestore, setOpenRestore] = useState(false);
    const [data, setData] = useState();
    const [openEdit, setOpenEdit] = useState(false);
    const [openDescription, setOpenDescription] = useState(false);


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
        console.log(data)
        setData()
    }

    const handleOpenEdit = () => {
        setOpenEdit(true)
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


    // let lastTime = new Date("3/28/2021")
    
    // let currentTime = new Date();
    // const latestTime = currentTime.getTime() / lastTime.getTime()
    // // console.log(currentTime.getTime() / lastTime.getTime())
    // console.log(currentTime)

    return (
        <div>
            <SelectFilterTimeAndStatus label="เวลา" />
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
                            {tools.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((tool, index) => {
                                return (
                                    <TableRow key={index} hover role="checkbox" tabIndex={-1}>
                                        <TableCell>
                                            {tool.date}
                                        </TableCell>
                                        <TableCell>
                                            {tool.toolName}
                                        </TableCell>
                                        <TableCell>
                                            {tool.username}
                                        </TableCell>
                                        <TableCell>
                                            {tool.status}
                                        </TableCell>
                                        <TableCell>
                                            {tool.actionType === "add" ?
                                                <span className={classes.actionAdd}>+ {tool.total}</span> :
                                                <span className={classes.actionRequest}>- {tool.total}</span>
                                            }
                                        </TableCell>
                                        <TableCell>
                                            {tool.time}
                                        </TableCell>
                                        <TableCell>
                                            {tool.exp}
                                        </TableCell>
                                        <TableCell>
                                            <div className="TableHistoryTool-action">
                                                <Button variant="contained" color="primary" startIcon={<RestoreIcon />} onClick={() => handleOpenRestore(tool.toolName, tool.total)}>คืน</Button>
                                                <Button variant="contained" color="secondary" startIcon={<EditIcon />} onClick={handleOpenEdit}>แก้ไข</Button>
                                                <Button variant="contained" color="default" startIcon={<DescriptionIcon />} onClick={() => handleOpenDescription(tool.description)}>เพิ่มเติม</Button>
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
                    count={tools.length}
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
                        <div className="TableHistoryTool-action">
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
                            <Input id="total" element="input" label="Total" type="number" errorText="Please fill data" validators={[VALIDATOR_REQUIRE()]} onInput={inputHandler} required />
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
                        <p>{data}</p>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}