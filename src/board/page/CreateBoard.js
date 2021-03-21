import React, { useState, useEffect } from 'react'
import { Container, Paper, TextField, Button, Divider } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles'
import { useForm } from "../../shared/hooks/form-hook"
import { VALIDATOR_REQUIRE } from "../../shared/util/validators"
import Input from "../../shared/components/FormElements/Input"
import { useDispatch, useSelector } from "react-redux";
import { toolListAction } from "../../actions/toolActions";




import "./CreateBoard.css"
import ImageUpload from '../../shared/components/FormElements/ImageUpload'
import SelectComponent from '../../shared/components/FormElements/Select'
import ListToolSelected from '../components/ListToolSelected'


const useStyles = makeStyles((theme) => ({
    textarea: {
        margin: "20px 0"
    },
    input: {
        margin: "20px 0",
    },
    button: {
        margin: "20px 0"
    },
    inputFilter: {
        margin: "20px 0px",
        padding: "0 5px"
    },
    PaperFilter: {
        padding: "10px"
    },
    margin: {
        margin: "10px 0"
    }
}));

function CreateBoard() {

    const classes = useStyles();
    const dispatch = useDispatch();
    const toolList = useSelector((state) => state.toolList);
    const [tools, setTools] = useState(toolList.tools)
    const [file, setFile] = useState(null);
    const [total, setTotal] = useState('');
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [boardCode, setBoardCode] = useState('');
    const [typeSelect, setTypeSelect] = useState('');
    const [categorySelect, setCategorySelect] = useState('');
    const [nameSelect, setNameSelect] = useState('');
    const [totalSelect, setTotalSelect] = useState('');
    const [typeFilter, setTypeFilter] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState([]);
    const [nameFilter, setNameFilter] = useState([]);
    const [toolSelected, setToolSelected] = useState([]);
    const [toolBackup, setToolBackup] = useState([])




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
        return () => {

        }
    }, [])

    // send data to front-end
    const onSubmit = (e) => {
        e.preventDefault();

        let newTool = {
            boardName: formState.inputs.name.value,
            boardCode: boardCode,
            total: total,
            type: type,
            imageProfile: file,
            boardlimit: '',
            description: description,
            tools: toolSelected
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
        setToolSelected(toolSelected.filter(item => item.id !== id));
        setToolBackup(toolBackup.filter(item => item.id !== id))
        // set ข้อมูลที่ถูกลบกลับไปยังตัวแปรเดิม
        setTools([...tools, findData])
        setTotalSelect("")
        setNameSelect("")
        setCategorySelect("")
        setTypeSelect("")
    }


    return (
        <Container maxWidth="sm">
            <h1>สร้างบอร์ด</h1>
            <Paper className="createboard-form">
                <form onSubmit={onSubmit}>

                    <Input
                        id="name"
                        element="input"
                        type="text"
                        label="ชื่อบอร์ด *"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="โปรดใส่ข้อมูล."
                        onInput={inputHandler}
                        required
                    />

                    <TextField
                        label="รหัสบอร์ด"
                        variant="outlined"
                        fullWidth
                        type="text"
                        className={classes.input}
                        onChange={(e) => setBoardCode(e.target.value)}
                    />
                    <h3>อุปกรณ์</h3>
                    <Paper className={classes.PaperFilter}>
                        <div className="editboard-select-group">
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
                            className={classes.inputFilter}
                            onChange={(e) => setTotalSelect(e.target.value)}
                        />
                        <Button variant="contained" size="small" color="primary" className={classes.margin} onClick={onSubmitToolSelected}>
                            เพิ่ม
                        </Button>
                        <Divider />
                        <h4>อุปกรณ์ที่ใช้ในบอร์ด</h4>
                        <ListToolSelected toolSelected={toolSelected} deleteTool={deleteToolSelected} />

                    </Paper>


                    <div className="createboard-input-group">
                        <TextField
                            label="จำนวน"
                            variant="outlined"
                            fullWidth
                            type="number"
                            className={classes.input}
                            onChange={(e) => setTotal(e.target.value)}
                        />
                        <TextField
                            label="ชนิดงาน"
                            variant="outlined"
                            fullWidth
                            type="text"
                            className={classes.input}
                            onChange={(e) => setType(e.target.value)}
                        />
                    </div>

                    <ImageUpload file={file} setFile={setFile} />

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

export default CreateBoard
