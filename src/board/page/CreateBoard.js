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
    const { tools } = toolList;
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
    }

    const deleteToolSelected = (id) => {
        setToolSelected(toolSelected.filter(item => item.id !== id));
    }


    return (
        <Container maxWidth="sm">
            <h1>Create Board</h1>
            <Paper className="createboard-form">
                <form onSubmit={onSubmit}>

                    <Input
                        id="name"
                        element="input"
                        type="text"
                        label="Board name *"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid board name."
                        onInput={inputHandler}
                        required
                    />

                    <TextField
                        label="Board code"
                        variant="outlined"
                        fullWidth
                        type="text"
                        className={classes.input}
                        onChange={(e) => setBoardCode(e.target.value)}
                    />

                    <Paper className={classes.PaperFilter}>
                        <div className="editboard-select-group">
                            <SelectComponent list={tools} typeFilter="tool" filterName="type" dataType="type" onChange={onChangeTypeFilter} value={typeSelect} />
                            <SelectComponent list={typeFilter} typeFilter="tool" filterName="category" dataType="category" onChange={onChangeCategoryFilter} value={categorySelect} />
                        </div>
                        <SelectComponent list={categoryFilter} typeFilter="tool" filterName="Tool name" dataType="name" onChange={onChangeNameFilter} value={nameSelect} />
                        <TextField
                            label="Total"
                            variant="outlined"
                            type="number"
                            fullWidth
                            value={totalSelect}
                            className={classes.inputFilter}
                            onChange={(e) => setTotalSelect(e.target.value)}
                        />
                        <Button variant="contained" size="small" color="primary" className={classes.margin} onClick={onSubmitToolSelected}>
                            add
                        </Button>
                        <Divider />
                        <h4>Tool selected</h4>
                        <ListToolSelected toolSelected={toolSelected} deleteTool={deleteToolSelected} />

                    </Paper>


                    <div className="createboard-input-group">
                        <TextField
                            label="Total"
                            variant="outlined"
                            fullWidth
                            type="number"
                            className={classes.input}
                            onChange={(e) => setTotal(e.target.value)}
                        />
                        <TextField
                            label="Type of work"
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
                        label="Description"
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
                        submit
                </Button>

                </form>
            </Paper>
        </Container>
    )
}

export default CreateBoard
