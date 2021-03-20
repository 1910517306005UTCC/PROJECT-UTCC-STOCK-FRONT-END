import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { historyProject } from '../../ApiHistory';
import { Link } from "react-router-dom"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Button, Modal, Backdrop, Fade } from '@material-ui/core';


const columns = [
    { label: 'วันที่', minWidth: 170 },
    { label: 'ชื่อโปรเจค', minWidth: 170 },
    {
        label: 'ชื่อคนเบิก',
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
}));


function TableHistoryProject() {
    const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [projects, setProjects] = useState(historyProject);
    const [openRestore, setOpenRestore] = useState(false);
    const [data, setData] = useState();
    const [openDescription, setOpenDescription] = useState(false);


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
                            {projects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((project, index) => {
                                return (
                                    <TableRow key={index} hover role="checkbox" tabIndex={-1}>
                                        <TableCell>
                                            {project.date}
                                        </TableCell>
                                        <TableCell>
                                            {project.projectName}
                                        </TableCell>
                                        <TableCell>
                                            {project.username}
                                        </TableCell>
                                        <TableCell>
                                            {project.total}
                                        </TableCell>
                                        <TableCell>
                                            {project.time}
                                        </TableCell>
                                        <TableCell>
                                            <div className="TableHistoryTool-action">
                                                <Button variant="contained" color="primary" onClick={() => handleOpenRestore(project.projectName, project.total)}>คืน</Button>
                                                <Link to={`/project/${project.id}`}><Button variant="contained" color="primary">แก้ไข</Button></Link>
                                                <Link to={`/${project.id}/project`}><Button variant="contained" color="primary">ดู</Button></Link>
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
                    count={projects.length}
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
                        <div className="TableHistoryTool-action">
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

export default TableHistoryProject

