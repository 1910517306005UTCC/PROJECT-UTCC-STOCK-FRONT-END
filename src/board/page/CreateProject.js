import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from "../../shared/hooks/form-hook";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useDispatch, useSelector } from "react-redux";
import { toolListAction } from "../../actions/toolActions";

// Component
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import SelectComponent from '../../shared/components/FormElements/Select';
import ListToolSelected from '../components/ListToolSelected';
import ImageUploadMultiple from '../../shared/components/FormElements/ImageUploadMultiple';
import Input from "../../shared/components/FormElements/Input";
import { Container, Paper, TextField, Button, Divider } from "@material-ui/core";

// CSS
import "./CreateProject.css"



const useStyles = makeStyles((theme) => ({
    textarea: {
        margin: "20px 0"
    },
    input: {
        margin: "20px 0"
    },
    button: {
        margin: "20px 0"
    },
    PaperFilter: {
        padding: "10px"
    },
    margin: {
        margin: "10px 0"
    },
    btnCheck: {
        margin: "10px 0",
        backgroundColor: "#FFC107"
    },
}));

function CreateProject() {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const toolList = useSelector((state) => state.toolList);
    const [tools, setTools] = useState([]);
    const [toolCal, setToolCal] = useState([]);
    const [file, setFile] = useState(null);
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [projectCode, setProjectCode] = useState('');
    const [typeSelect, setTypeSelect] = useState('');
    const [categorySelect, setCategorySelect] = useState('');
    const [nameSelect, setNameSelect] = useState('');
    const [totalSelect, setTotalSelect] = useState('');
    const [typeFilter, setTypeFilter] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState([]);
    const [nameFilter, setNameFilter] = useState([]);
    const [toolSelected, setToolSelected] = useState([]);
    const [files, setFiles] = useState(null);
    const [toolBackup, setToolBackup] = useState([])
    const [openAlert, setOpenAlert] = useState(false);
    const [validTool, setValidTool] = useState(false);
    const [validBtn, setValidBtn] = useState(false);
    const [validName, setValidName] = useState(false);
    const [validTotal, setValidTotal] = useState(false);





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

    // console.log(formState.isValid)


    useEffect(() => {
        dispatch(toolListAction());
        if(toolList.tools.length !== 0) {
            setTools(toolList.tools);
            setToolCal(toolList.tools);
            
        }
        return () => {

        }
    }, [toolList.tools])

    // send data to front-end
    const onSubmit = (e) => {
        e.preventDefault();

        let newProject = {
            projectName: formState.inputs.name.value,
            projectCode: projectCode,
            total: formState.inputs.total.value,
            type: type,
            imageProfile: file,
            description: description,
            tools: toolSelected,
            images: files
        }

        if (!validTool) {
            history.push("/historyproject")
        } else {
            history.push("/boardincomplete")
        }

        console.log(newProject);
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

    const deleteToolSelected = (id) => {
        let findData = toolBackup.find((item) => item.id === id);
        setToolSelected(toolSelected.filter(item => item.id !== id));
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



    return (
        <Container maxWidth="sm">
            <h1>สร้างโปรเจค</h1>
            <Paper className="createproject-form">
                <form onSubmit={onSubmit}>
                    <div onClick={handleAlert}>
                        <Input
                            id="name"
                            element="input"
                            type="text"
                            label="ชื่อโปรเจค *"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="โปรดใส่ข้อมูล."
                            onInput={inputHandler}
                            required
                        />
                    </div>

                    <TextField
                        label="รหัสโปรเจค"
                        variant="outlined"
                        fullWidth
                        type="text"
                        className={classes.input}
                        onChange={(e) => setProjectCode(e.target.value)}
                    />

                    <div className="createproject-input-group">
                        <div onClick={handleAlert}>
                            <Input
                                id="total"
                                element="input"
                                type="number"
                                label="จำนวน *"
                                validators={[VALIDATOR_REQUIRE()]}
                                errorText="โปรดใส่ข้อมูล."
                                onInput={inputHandler}
                                required
                            />
                        </div>
                        <TextField
                            label="ชนิดงานของโปรเจค"
                            variant="outlined"
                            fullWidth
                            type="text"
                            className={classes.input}
                            onChange={(e) => setType(e.target.value)}
                        />
                    </div>

                    <Paper className={classes.PaperFilter}>
                        <h3>อุปกรณ์</h3>
                        <div className="createproject-select-group">
                            <SelectComponent list={tools} typeFilter="tool" filterName="ชนิด" dataType="type" onChange={onChangeTypeFilter} value={typeSelect} />
                            <SelectComponent list={typeFilter} typeFilter="tool" filterName="ประเภท" dataType="category" onChange={onChangeCategoryFilter} value={categorySelect} />
                        </div>
                        <SelectComponent list={categoryFilter} typeFilter="tool" filterName="ชื่ออุปกรณ์" dataType="name" onChange={onChangeNameFilter} value={nameSelect} />
                        <TextField
                            label="จำนวน"
                            variant="outlined"
                            type="number"
                            fullWidth
                            value={totalSelect}
                            className={classes.margin}
                            onChange={totalInput}
                        />
                        <Button variant="contained" size="small" color="primary" className={classes.margin}
                            disabled={!validBtn} onClick={onSubmitToolSelected}>
                            เพิ่ม
                        </Button>
                        <Divider />
                        <h4>อุปกรณ์ที่ใช้ในโปรเจค</h4>
                        <ListToolSelected toolSelected={toolSelected} deleteTool={deleteToolSelected} />

                    </Paper>

                    <ImageUpload file={file} setFile={setFile} />

                    <Divider />

                    <ImageUploadMultiple files={files} setFiles={setFiles} />

                    <TextField
                        id="outlined-multiline-flexible"
                        label="รายละเอียดเพิ่มเติม"
                        multiline
                        rowsMax={4}
                        variant="outlined"
                        fullWidth
                        className={classes.textarea}
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
                        className={classes.button}
                        disabled={!formState.isValid}
                    >
                        ยืนยัน
                </Button>

                </form>
            </Paper>
        </Container>
    )
}

export default CreateProject
