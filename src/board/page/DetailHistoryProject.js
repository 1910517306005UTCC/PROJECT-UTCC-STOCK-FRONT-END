import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { projectItem } from "../../ApiHistory"
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Button, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core"

// Component
import { SlideImagePreview } from '../../shared/components/UIElements/SlideImagePreview';

// Icon
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import VisibilityIcon from '@material-ui/icons/Visibility';


// CSS
import "./DetailHistoryProject.css"

const columns = [
    { label: 'รูป', minWidth: 100 },
    { label: 'ชื่ออุปกรณ์', minWidth: 170 },
    { label: 'รหัสอุปกรณ์', minWidth: 170 },
    {
        label: 'ชนิด', minWidth: 100, align: 'left',
    },
    {
        label: 'สถานะ', minWidth: 170, align: 'left',
    },
    {
        label: 'จำนวนที่ใช้', minWidth: 100, align: 'left',
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

function DetailHistoryProject() {

    // const projectId = useParams().tid
    const classes = useStyles();
    const [project] = useState(projectItem);
    const [previewImg, setPreviewImg] = useState(project.profileImage)
    const [images] = useState(project.images);

    console.log(project)

    return (
        <div>
            <h1>รายละเอียดโปรเจค {project.projectName}</h1>

            <div className="container-detailproject">
                <div>
                    <div className="introl-img">
                        <img src={previewImg} alt="" />
                    </div>
                    {images.length === 3 ?
                        <div className="detailproject-list-img">
                            {images.map((img, index) => (
                                <Avatar variant="square" src={img} key={index} onClick={() => setPreviewImg(img)} />
                            ))}
                        </div>
                        :
                        <div><SlideImagePreview setPreviewImg={setPreviewImg} images={images} /></div>
                    }
                </div>
                <div>
                    <h2>{project.projectName}</h2>
                    <div className="detailproject-list">
                        <p>รหัสโปรเจค</p>
                        <p>{project.projectCode}</p>
                    </div>
                    <div className="detailproject-list">
                        <p>จำนวน</p>
                        <p>{project.total}</p>
                    </div>
                    <div className="detailproject-list">
                        <p>ชนิด</p>
                        <p>{project.type}</p>
                    </div>
                    <div className="detailproject-list">
                        <p>ชื่อผู้เบิก</p>
                        <p>{project.username}</p>
                    </div>
                    <div className="detailproject-list">
                        <p>สถานะผู้เบิก</p>
                        <p>{project.status}</p>
                    </div>
                    <div className="detailproject-list">
                        <p>วันที่เบิก</p>
                        <p>{project.date}</p>
                    </div>
                    <div className="detailproject-list">
                        <p>เวลา</p>
                        <p>{project.time}</p>
                    </div>
                    <div className="detailproject-des">
                        <p>รายละเอียดโปรเจค</p>
                        <p>{project.description}</p>
                    </div>
                    <div className="detailproject-btn">
                        <Link to={`/project/${project.id}`}>
                            <Button
                                color="primary"
                                type="button"
                                variant="contained"
                                startIcon={<EditIcon />}
                            >
                                แก้ไข
                            </Button>
                        </Link>
                        <Link to="/historyProject">
                            <Button
                                type="button"
                                variant="contained"
                                startIcon={<ArrowBackIcon />}
                            >
                                กลับ
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <Divider />

            <h2>อุปกรณ์ของ {project.projectName}</h2>

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
                            {project.tools.map((tool, index) => {
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
                                            <div className="table-project-btn-action">
                                                <Link to={`/${tool.id}/tool`}>
                                                    <Button variant="contained" color="primary" startIcon={<VisibilityIcon />}>
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
            </Paper>

        </div >
    )
}

export default DetailHistoryProject