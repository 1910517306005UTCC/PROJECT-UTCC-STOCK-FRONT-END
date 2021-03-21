import React, { useState, useEffect } from 'react'
import { useForm } from "../../shared/hooks/form-hook"
import { VALIDATOR_REQUIRE } from "../../shared/util/validators"
import { projectItem } from "../../ApiHistory"
import { Container, Paper, TextField, Button, Divider } from "@material-ui/core"
import Input from "../../shared/components/FormElements/Input"
import ListToolSelected from "../components/ListToolSelected";
import { useDispatch, useSelector } from "react-redux";
import { toolListAction } from "../../actions/toolActions";
import SelectComponent from "../../shared/components/FormElements/Select"
import { makeStyles } from '@material-ui/core/styles'


import "./EditProject.css"
import ImageUpload from '../../shared/components/FormElements/ImageUpload'
import ImageUploadMultiple from '../../shared/components/FormElements/ImageUploadMultiple'

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: "10px 0"
    }
}));




function EditProject() {

    const classes = useStyles();
    const [project] = useState(projectItem);
    const [toolSelected, setToolSelected] = useState(project.tools)
    const dispatch = useDispatch();
    const toolList = useSelector((state) => state.toolList);
    const [file, setFile] = useState(project.profileImage);
    const [files, setFiles] = useState(project.images);
    const [total, setTotal] = useState(project.total);
    const [type, setType] = useState(project.type);
    const [limit, setLimit] = useState(project.limit);
    const [description, setDescription] = useState(project.description);
    const [projectCode, setprojectCode] = useState(project.projectCode);
    const [typeSelect, setTypeSelect] = useState('');
    const [categorySelect, setCategorySelect] = useState('');
    const [nameSelect, setNameSelect] = useState('');
    const [totalSelect, setTotalSelect] = useState('');
    const [typeFilter, setTypeFilter] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState([]);
    const [nameFilter, setNameFilter] = useState([]);
    const [toolBackup, setToolBackup] = useState(project.tools)
    const [tools, setTools] = useState(toolList.tools)

    const [formState, inputHandler] = useForm(
        {
            name: {
                value: '',
                isValid: false
            }
        },
        false
    );

    useEffect(() => {
        // ดึงข้อมูลอุปกรณ์สำหรับเพิ่มลงในรายการบอร์ด
        dispatch(toolListAction());

        // กำหนดค่าอาเรย์ของอุปกรณ์ โดยนำข้อมูล อุปกรณ์ที่ใช้ในบอร์ด(project.tools) มาลบกับ อุปกรณ์(toolList.tool) 
        let arr = toolList.tools
        project.tools.map((item, index) => {
            arr = arr.filter((tool, index) => item.id !== tool.id)
        })
        setTools(arr)

        return () => {

        }
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();

        let newTool = {
            projectName: formState.inputs.name.value,
            projectCode: projectCode,
            total: total,
            type: type,
            profileImage: file,
            limit: limit,
            description: description,
            tools: toolSelected,
            images: files
        }

        console.log(newTool);
    }


    const onChangeTypeFilter = (e) => {
        let filterData = tools.filter((item) => item.type.toLowerCase() === e.target.value)
        setTypeFilter(filterData);
        setCategoryFilter(filterData);
        setTypeSelect(e.target.value);
        setNameFilter(filterData)
    }

    const onChangeCategoryFilter = (e) => {
        setCategorySelect(e.target.value);
        let filterData = typeFilter.filter((item) => item.category.toLowerCase() === e.target.value)
        setNameFilter(filterData);

    }

    const onChangeNameFilter = (e) => {
        setNameSelect(e.target.value);
        let filterData = categoryFilter.filter((item) => item.toolName.toLowerCase() === e.target.value);
        setNameFilter(filterData)
    }

    const onSubmitToolSelected = () => {
        let { id, toolName, type, category, size, imageProfile } = nameFilter[0];
        // เก็บข้อมูลอุปกรณ์ที่เลือก ไปยังตัวแปรใหม่ เพื่อ 
        // 1. ป้องกันผู้ใช้เลือกอุปกรณ์ที่เหมือนกัน เช่น R100K 10 ตัว, R100K 5 ตัว จริงๆแล้วผู้ใช้ควรเลือก R100K 15 ตัว
        // 2. ลบข้อมูลในตัวแปร tools เพื่อป้องกันค่าอุปกรณ์ที่เลือกแล้วมาแสดงใน select tag ซ้ำ แล้วนำค่าที่ลบมาเก็บไว้ในตัวแปร กรณี ผู้ใช้ลบข้อมูลอุปกรณ์ที่เลือกในตัวแปร
        // toolSelected ก็จะนำค่าที่ลบ นำกลับคืนสู่ตัวแปร tools 
        let backupData = [...toolBackup, nameFilter[0]]
        let newtool = tools.filter((tool) => tool.id !== nameFilter[0].id)
        // ลบอุปกรณ์ที่ถูกเลือกไปยังบอร์ด
        setTools(newtool)
        // backup อุปกรณ์ที่ถูกลบ
        setToolBackup(backupData)


        let createNewTool = {
            id,
            toolName,
            type,
            category,
            size,
            imageProfile,
            total: totalSelect
        }

        setTotalSelect("")
        setNameSelect("")
        setCategorySelect("")
        setTypeSelect("")
        setToolSelected([...toolSelected, createNewTool])
        setCategoryFilter([])
    }

    const deleteToolSelected = (id) => {
        let findData = toolBackup.find((item) => item.id === id);
        // console.log(findData)
        setToolSelected(toolSelected.filter((item) => item.id !== id));
        setToolBackup(toolBackup.filter(item => console.log(item.id !== id)))
        // set ข้อมูลที่ถูกลบกลับไปยังตัวแปรเดิม
        // console.log(toolBackup)
        setTools([...tools, findData])
        setTotalSelect("")
        setNameSelect("")
        setCategorySelect("")
        setTypeSelect("")
    }

    return (
        <Container>
            <h1>แก้ไข {project.projectName}</h1>
            <Paper>
                <form onSubmit={onSubmit}>
                    <Input
                        id="name"
                        element="input"
                        type="text"
                        label="ชื่อโปรเจค *"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="กรุณาใส่ข้อมูล."
                        onInput={inputHandler}
                        initialValue={project.projectName}
                        initialValid={true}
                        required
                    />
                    <TextField
                        label="รหัสโปรเจค"
                        variant="outlined"
                        fullWidth
                        type="text"
                        value={projectCode}
                        className={classes.margin}
                        onChange={(e) => setprojectCode(e.target.value)}
                    />
                    <div className="editproject-input-group">
                        <TextField
                            label="จำนวน"
                            variant="outlined"
                            type="number"
                            fullWidth
                            value={total}
                            onChange={(e) => setTotal(e.target.value)}
                        />
                        <TextField
                            label="ชนิด"
                            variant="outlined"
                            type="text"
                            fullWidth
                            value={type}
                            // className={classes.inputFilter}
                            onChange={(e) => setType(e.target.value)}
                        />
                    </div>
                    <h3>อุปกรณ์</h3>
                    <div className="editproject-toolSelected">
                        <div className="editproject-select-group">
                            <SelectComponent list={tools} typeFilter="tool" filterName="ชนิด" dataType="type" onChange={onChangeTypeFilter} value={typeSelect} />
                            <SelectComponent list={typeFilter} typeFilter="tool" filterName="ประเภท" dataType="category" onChange={onChangeCategoryFilter} value={categorySelect} />
                        </div>
                        <div className="">
                            <SelectComponent list={categoryFilter} typeFilter="tool" filterName="ชื่ออุปกรณ์" dataType="name" onChange={onChangeNameFilter} value={nameSelect} />
                        </div>
                        <TextField
                            label="จำนวน"
                            variant="outlined"
                            type="number"
                            fullWidth
                            value={totalSelect}
                            className={classes.margin}
                            onChange={(e) => setTotalSelect(e.target.value)}
                        />
                        <Button variant="contained" size="small" color="primary" className="editproject-btn-add" onClick={onSubmitToolSelected}>
                            เพิ่ม
                        </Button>
                        <Divider />
                        <h4>อุปกรณ์ที่ใช้ในบอร์ด</h4>
                        <ListToolSelected toolSelected={toolSelected} deleteTool={deleteToolSelected} />
                    </div>
                    <ImageUpload file={file} setFile={setFile} />
                    <ImageUploadMultiple files={files} setFiles={setFiles} />
                    <TextField
                        id="outlined-multiline-flexible"
                        label="รายละเอียด"
                        multiline
                        rowsMax={4}
                        variant="outlined"
                        fullWidth
                        className={classes.margin}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        className={classes.margin}
                        disabled={!formState.isValid}
                    >
                        ยืนยัน
                    </Button>

                </form>
            </Paper>
        </Container>
    )
}

export default EditProject

