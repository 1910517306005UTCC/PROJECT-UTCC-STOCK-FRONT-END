import React, { useState, useEffect } from 'react';
import { useForm } from "../../shared/hooks/form-hook";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { projectItem } from "../../ApiHistory";
import { useDispatch, useSelector } from "react-redux";
import { toolListAction } from "../../actions/toolActions";
import { makeStyles } from '@material-ui/core/styles'

// Component
import Input from "../../shared/components/FormElements/Input";
import ListToolSelected from "../components/ListToolSelected";
import SelectComponent from "../../shared/components/FormElements/Select";
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import { Container, Paper, TextField, Button, Divider } from "@material-ui/core";
import ImageUploadMultiple from '../../shared/components/FormElements/ImageUploadMultiple';

// CSS
import "./EditProject.css"


const useStyles = makeStyles((theme) => ({
    margin: {
        margin: "20px 0"
    },
    btnCheck: {
        margin: "10px 0",
        backgroundColor: "#FFC107"
    },
}));




function EditProject() {

    const classes = useStyles();
    const [project] = useState(projectItem);
    const [toolSelected, setToolSelected] = useState(project.tools)
    const dispatch = useDispatch();
    const toolList = useSelector((state) => state.toolList);
    const [file, setFile] = useState(project.profileImage);
    const [files, setFiles] = useState(project.images);
    const [total] = useState(project.total);
    const [type, setType] = useState(project.type);
    const [description, setDescription] = useState(project.description);
    const [projectCode, setprojectCode] = useState(project.projectCode);
    const [typeSelect, setTypeSelect] = useState('');
    const [categorySelect, setCategorySelect] = useState('');
    const [nameSelect, setNameSelect] = useState('');
    const [totalSelect, setTotalSelect] = useState('');
    const [typeFilter, setTypeFilter] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState([]);
    const [nameFilter, setNameFilter] = useState([]);
    const [toolBackup, setToolBackup] = useState(project.tools);
    const [tools, setTools] = useState(toolList.tools);
    const [openAlert, setOpenAlert] = useState(false);
    const [validTool, setValidTool] = useState(false);
    const [validBtn, setValidBtn] = useState(false);
    const [validName, setValidName] = useState(false);
    const [validTotal, setValidTotal] = useState(false);
    const [toolCal] = useState(toolList.tools);

    const [formState, inputHandler] = useForm(
        {
            name: {
                value: '',
                isValid: false
            },
            total: {
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
        let temArr = []
        for (var count = 0; count < project.tools.length; count++) {
            if(temArr.length === 0){
                temArr = tools.filter((item) => project.tools[count].id !== item.id)
            } 
            if(temArr.length > 0) {
                let filterData = temArr.filter((item) => project.tools[count].id !== item.id)
                temArr = filterData
            }
        }

        setTools(temArr)
        return () => {

        }
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();

        let newTool = {
            projectName: formState.inputs.name.value,
            projectCode: projectCode,
            total: formState.inputs.name.value,
            type: type,
            profileImage: file,
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
        setNameFilter(filterData);
        setValidName(true)
        setValidBtn(true && validTotal)
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
        setValidBtn(false)
        setValidTotal(false)
        setValidName(false)
    }

    // console.log(toolBackup)

    const deleteToolSelected = (id) => {
        // let findData = toolBackup.filter((item) => item.id === id);
        let findData = toolBackup.find((item) => item.id === id);
        setToolSelected(toolSelected.filter((item) => item.id !== id));
        setToolBackup(toolBackup.filter(item => item.id !== id))
        // set ข้อมูลที่ถูกลบกลับไปยังตัวแปรเดิม
        setTools([...tools, findData])
        setTotalSelect("")
        setNameSelect("")
        setCategorySelect("")
        setTypeSelect("")
        // ให้การแจ้งเตือน ข้อผิดพลาด หายไป
        setOpenAlert(false)
    }

    const handleAlert = () => {
        setOpenAlert(false)
    }

    const totalInput = (e) => {
        if (e.target.value === "") {
            setValidTool(false)
            setValidBtn(false)
        } else {
            setValidTotal(true)
            setValidBtn(validName && true)
        }
        setTotalSelect(e.target.value)
    }

    const onSubmitCheck = async () => {
        let projectTotal = formState.inputs.total.value;
        // console.log(toolSelected)

        // คำนวนอุปกรณ์ที่ต้องใช้
        let requiredTool = []
        await toolSelected.map((tool) => {
            let sum = Number(tool.total) * projectTotal;
            let newArr = { id: tool.id, toolName: tool.toolName, total: sum }
            requiredTool = [...requiredTool, newArr]
        })

        // คำนวนอุปกรณ์ที่ต้องเหลือ
        let newTotalTool = []
        await requiredTool.map((tool) => {
            let findTool = toolCal.find((item) => item.id === tool.id)
            let sum = Number(findTool.total) - Number(tool.total)
            let newArr = { id: tool.id, toolName: tool.toolName, total: sum }
            newTotalTool = [...newTotalTool, newArr]
        })

        // เก็บค่าอุปกรณ์ที่ขาดโชวหน้าจอ
        let inSufficientTool = []
        newTotalTool.map((item) => {
            if (item.total < 0) {
                inSufficientTool = [...inSufficientTool, item]
            }
        })

        if (inSufficientTool.length > 0) {
            setOpenAlert(true)
            setValidTool(inSufficientTool)

        } else {
            setValidTool(false)
        }
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
                        <div onClick={handleAlert}>
                            <Input
                                id="total"
                                element="input"
                                type="number"
                                label="จำนวน *"
                                validators={[VALIDATOR_REQUIRE()]}
                                errorText="โปรดใส่ข้อมูล."
                                onInput={inputHandler}
                                initialValue={total}
                                initialValid={true}
                            />
                        </div>
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
                            onChange={totalInput}
                        />
                        <Button variant="contained" size="small" color="primary" className="editproject-btn-add"
                            onClick={onSubmitToolSelected}
                            disabled={!validBtn}
                        >
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
                        type="button"
                        variant="contained"
                        fullWidth
                        className={classes.btnCheck}
                        disabled={formState.isValid === false || toolSelected.length === 0 ? true : false}
                        onClick={onSubmitCheck}
                    >
                        ตรวจสอบ
                    </Button>

                    {openAlert &&
                        <div className="alert-errordata">
                            <h3>รายการอุปกรณ์ไม่ครบ</h3>
                            {validTool && validTool.map((item) => (
                                <div key={item.id} className="valid-data">
                                    <p>{item.toolName}</p>
                                    <p>{item.total}</p>
                                </div>
                            ))}
                        </div>
                    }

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

