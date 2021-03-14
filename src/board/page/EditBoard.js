import React, { useState, useEffect } from 'react'
import { useForm } from "../../shared/hooks/form-hook"
import { VALIDATOR_REQUIRE } from "../../shared/util/validators"
import { boardItem } from "../../Api"
import { Container, Paper, TextField, Button, Divider } from "@material-ui/core"
import Input from "../../shared/components/FormElements/Input"
import ListToolSelected from "../components/ListToolSelected";
import { useDispatch, useSelector } from "react-redux";
import { toolListAction } from "../../actions/toolActions";
import SelectComponent from "../../shared/components/FormElements/Select"
import { makeStyles } from '@material-ui/core/styles'


import "./EditBoard.css"
import ImageUpload from '../../shared/components/FormElements/ImageUpload'
import ImageUploadMultiple from '../../shared/components/FormElements/ImageUploadMultiple'

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: "10px 0"
    }
}));




function EditBoard() {

    const classes = useStyles();
    const [board] = useState(boardItem);
    const [toolSelected, setToolSelected] = useState(board.tools)
    const dispatch = useDispatch();
    const toolList = useSelector((state) => state.toolList);
    const { tools } = toolList;
    const [file, setFile] = useState(board.imageProfile);
    const [files, setFiles] = useState(board.images);
    const [total, setTotal] = useState(board.total);
    const [type, setType] = useState(board.type);
    const [limit, setLimit] = useState(board.limit);
    const [description, setDescription] = useState(board.description);
    const [boardCode, setBoardCode] = useState(board.boardCode);
    const [typeSelect, setTypeSelect] = useState('');
    const [categorySelect, setCategorySelect] = useState('');
    const [nameSelect, setNameSelect] = useState('');
    const [totalSelect, setTotalSelect] = useState('');
    const [typeFilter, setTypeFilter] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState([]);
    const [nameFilter, setNameFilter] = useState([]);

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

    const onSubmit = (e) => {
        e.preventDefault();

        let newTool = {
            boardName: formState.inputs.name.value,
            boardCode: boardCode,
            total: total,
            type: type,
            imageProfile: file,
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
        <Container>
            <h1>Edit {board.boardName}</h1>
            <Paper>
                <form onSubmit={onSubmit}>
                    <Input
                        id="name"
                        element="input"
                        type="text"
                        label="Board name *"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid board name."
                        onInput={inputHandler}
                        initialValue={board.boardName}
                        initialValid={true}
                        required
                    />
                    <TextField
                        label="Board code"
                        variant="outlined"
                        fullWidth
                        type="text"
                        value={boardCode}
                        className={classes.margin}
                        onChange={(e) => setBoardCode(e.target.value)}
                    />
                    <TextField
                        label="Board limit"
                        variant="outlined"
                        type="number"
                        fullWidth
                        value={limit}
                        className={classes.margin}
                        onChange={(e) => setLimit(e.target.value)}
                    />
                    <div className="editboard-input-group">
                        <TextField
                            label="total"
                            variant="outlined"
                            type="number"
                            fullWidth
                            value={total}
                            onChange={(e) => setTotal(e.target.value)}
                        />
                        <TextField
                            label="type"
                            variant="outlined"
                            type="text"
                            fullWidth
                            value={type}
                            // className={classes.inputFilter}
                            onChange={(e) => setType(e.target.value)}
                        />
                    </div>
                    <div className="editboard-toolSelected">
                        <div className="editboard-select-group">
                            <SelectComponent list={tools} typeFilter="tool" filterName="type" dataType="type" onChange={onChangeTypeFilter} value={typeSelect} />
                            <SelectComponent list={typeFilter} typeFilter="tool" filterName="category" dataType="category" onChange={onChangeCategoryFilter} value={categorySelect} />
                        </div>
                        <div className="">
                            <SelectComponent list={categoryFilter} typeFilter="tool" filterName="Tool name" dataType="name" onChange={onChangeNameFilter} value={nameSelect} />
                        </div>
                        <TextField
                            label="Total"
                            variant="outlined"
                            type="number"
                            fullWidth
                            value={totalSelect}
                            className={classes.margin}
                            onChange={(e) => setTotalSelect(e.target.value)}
                        />
                        <Button variant="contained" size="small" color="primary" className="editboard-btn-add" onClick={onSubmitToolSelected}>
                            add
                        </Button>
                        <Divider />
                        <h4>Tool selected</h4>
                        <ListToolSelected toolSelected={toolSelected} deleteTool={deleteToolSelected} />
                    </div>
                    <ImageUpload file={file} setFile={setFile} />
                    <ImageUploadMultiple files={files} setFiles={setFiles} />
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Description"
                        multiline
                        rowsMax={4}
                        variant="outlined"
                        fullWidth
                        className={classes.margin}
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
                        submit
                    </Button>

                </form>
            </Paper>
        </Container>
    )
}

export default EditBoard
