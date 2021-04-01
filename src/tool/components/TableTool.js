import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../shared/hooks/form-hook";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { toolListAction, addToolToTotal } from "../../actions/toolActions";
import { Link } from "react-router-dom"

// Component
import Input from "../../shared/components/FormElements/Input";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Avatar, Button, Modal, Backdrop, Fade, TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

// Icon
import RestorePageIcon from '@material-ui/icons/RestorePage';
import AddIcon from '@material-ui/icons/Add';
import VisibilityIcon from '@material-ui/icons/Visibility';

// CSS
import "./TableTool.css"
import SelectFilter from '../../shared/components/UIElements/SelectFilter';

const columns = [
    { label: 'รูปภาพ', minWidth: 100 },
    { label: 'ชื่ออุปกรณ์', minWidth: 170 },
    { label: 'รหัสอุปกรณ์', minWidth: 170 },
    {
        label: 'ชนิด', minWidth: 100, align: 'left',
    },
    {
        label: 'ประเภท', minWidth: 120, align: 'left',
    },
    {
        label: 'ขนาด', minWidth: 120, align: 'left',
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

export default function TableTool() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const toolList = useSelector((state) => state.toolList);
    const { messageAlert } = toolList;
    const [tools, setTools] = useState([])
    const [defaultValue, setDefaultValue] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    // const [tools] = useState(listToolApi);
    const [openModal, setOpenModal] = useState(false);
    const [headerForm, setHeaderForm] = useState('');
    const [headerId, setHeaderId] = useState('');
    const [toolId, setToolId] = useState('');
    const [valueFilterType, setValueFilterType] = useState("ทั้งหมด");
    const [valueFilterStatus, setValueFilterStatus] = useState("ทั้งหมด");

    useEffect(() => {
        dispatch(toolListAction());
        if (toolList.tools.length !== 0) {
            setTools(toolList.tools);
            setDefaultValue(toolList.tools)
        }

        return () => {

        }
    }, [toolList.tools])



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
        setToolId(id);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setHeaderForm("")
        setToolId("");
    };

    const onSubmitAdd = (e) => {
        e.preventDefault();
        dispatch(addToolToTotal(toolId, formState.inputs.total.value));
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

            <SelectFilter label="ชนิด" defaultValue={defaultValue} data={tools} setData={setTools} filterType="type" setValueFilterType={setValueFilterType} valueFilterType={valueFilterType} valueFilterStatus={valueFilterStatus} setValueFilterStatus={setValueFilterStatus} />
            <SelectFilter label="สถานะ" defaultValue={defaultValue} data={tools} setData={setTools} filterType="status" setValueFilterType={setValueFilterType} valueFilterType={valueFilterType} valueFilterStatus={valueFilterStatus} setValueFilterStatus={setValueFilterStatus} />


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
                                            <p>{tool.category}</p>
                                        </TableCell>
                                        <TableCell align="left">
                                            <p>{tool.size}</p>
                                        </TableCell>
                                        <TableCell align="left">
                                            {Number(tool.total) > Number(tool.limit) ?
                                                <p>มี</p> :
                                                Number(tool.total) === 0 ?
                                                    <p style={{ color: "red" }}>หมด</p> : <p style={{ color: "orange" }}>กำลังจะหมด</p>
                                            }
                                        </TableCell>
                                        <TableCell align="left">
                                            <p>{tool.total}</p>
                                        </TableCell>
                                        <TableCell align="left">
                                            <div className="table-tool-btn-action">
                                                <Button variant="contained" color="primary" startIcon={<RestorePageIcon />} onClick={() => handleOpenModal(tool.toolName, index, "เบิก")}>
                                                    เบิก
                                                </Button>
                                                <Button className={classes.btnAdd} variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenModal(tool.toolName, index, "เพิ่ม")} >
                                                    เพิ่ม
                                                </Button>
                                                <Link to={`/${tool.id}/tool`}>
                                                    <Button variant="contained" color="default" startIcon={<VisibilityIcon />} >
                                                        ดู
                                                    </Button>
                                                </Link>
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
                        <form onSubmit={headerId == "เบิก" ? onSubmitRequest : onSubmitAdd}>
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
                            <div className="table-tool-btn-action">
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