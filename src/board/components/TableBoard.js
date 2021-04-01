import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Avatar, Button, Modal, Backdrop, Fade, TextField } from "@material-ui/core";
import { useForm } from "../../shared/hooks/form-hook";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { boardListAction, addBoardToTotal } from "../../actions/boardActions";
import { Link } from "react-router-dom";

// Component
import Input from "../../shared/components/FormElements/Input";

// Icon
import AddIcon from '@material-ui/icons/Add';
import VisibilityIcon from '@material-ui/icons/Visibility';

// CSS
import "./TableBoard.css"
import SelectFilter from '../../shared/components/UIElements/SelectFilter';

const columns = [
    { label: 'รูปภาพ', minWidth: 100 },
    { label: 'ชื่อบอร์ด', minWidth: 170 },
    { label: 'รหัสบอร์ด', minWidth: 170 },
    {
        label: 'ชนิด', minWidth: 100, align: 'left',
    },
    {
        label: 'สถานะ', minWidth: 170, align: 'left',
    },
    {
        label: 'จำนวน', minWidth: 100, align: 'left',
    },
    {
        label: 'อื่นๆ', minWidth: 170, align: 'left',
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
    },
    btnAdd: {
        backgroundColor: "#28a745",
        color: "#fff"
    }
}));

export default function TableBoard() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const boardList = useSelector((state) => state.boardList);
    const { messageAlert } = boardList;
    // const [boards, setBoards] = useState(boardList.boards);
    const [boards, setBoards] = useState([])
    const [defaultValue, setDefaultValue] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    // const [tools] = useState(listToolApi);
    const [openModal, setOpenModal] = useState(false);
    const [headerForm, setHeaderForm] = useState('');
    const [headerId, setHeaderId] = useState('');
    const [boardId, setBoardId] = useState('');
    const [valueFilterType, setValueFilterType] = useState("ทั้งหมด");
    const [valueFilterStatus, setValueFilterStatus] = useState("ทั้งหมด");

    useEffect(() => {
        dispatch(boardListAction());
        if(boardList.boards.length !== 0) {
            setBoards(boardList.boards)
            setDefaultValue(boardList.boards)
        }
        return () => {

        }
    }, [boardList.boards])

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

    console.log(boards)

    return (
        <div>
            { messageAlert && <Alert onClose={() => { }} style={{ margin: "10px 0" }}>This is a success alert — check it out!</Alert>}
            {/* Table */}

            <SelectFilter label="สถานะ" defaultValue={defaultValue} data={boards} setData={setBoards} filterType="status" setValueFilterType={setValueFilterType} valueFilterType={valueFilterType} valueFilterStatus={valueFilterStatus} setValueFilterStatus={setValueFilterStatus} />

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
                                            {Number(board.total) > Number(board.limit) ?
                                                <p>มี</p> :
                                                Number(board.total) === 0 ?
                                                    <p style={{ color: "red" }}>หมด</p> : <p style={{ color: "orange" }}>กำลังจะหมด</p>
                                            }
                                        </TableCell>
                                        <TableCell align="left">
                                            <p>{board.total}</p>
                                        </TableCell>
                                        <TableCell align="left">
                                            <div className="table-board-btn-action">
                                                <Button className={classes.btnAdd} variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenModal(board.boardName, index, "เพิ่ม")} >
                                                    เพิ่ม
                                                </Button>
                                                <Link to={`/${board.id}/board`}><Button variant="contained" startIcon={<VisibilityIcon />} color="default">ดู</Button></Link>
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
                        <form onSubmit={onSubmitAdd}>
                            <Input
                                id="total"
                                element="input"
                                type="number"
                                label="จำนวน"
                                validators={[VALIDATOR_REQUIRE()]}
                                errorText="Please enter a valid Total."
                                onInput={inputHandler}
                                required
                            />
                            <TextField
                                id="outlined-multiline-flexible"
                                label="รายละเอียดเพิ่มเติม"
                                multiline
                                rowsMax={4}
                                variant="outlined"
                                fullWidth
                                className={classes.textarea}
                            />
                            <div className="table-board-btn-action">
                                <Button type="submit" variant="contained" color="primary" disabled={!formState.isValid} >ยืนยัน</Button>
                                <Button variant="contained" color="secondary" onClick={() => setOpenModal(false)}>ยกเลิก</Button>
                            </div>
                        </form>
                    </div>
                </Fade>
            </Modal>
        </div >
    );
}