import React, { useState } from 'react'
import { useForm } from "../../shared/hooks/form-hook"
import { VALIDATOR_REQUIRE } from "../../shared/util/validators"
import { toolItem } from "../../Api"
import { Container, Paper, TextField, Button, Divider } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles'

// Component
import ImageUpload from '../../shared/components/FormElements/ImageUpload'
import ImageUploadMultiple from '../../shared/components/FormElements/ImageUploadMultiple'
import Input from "../../shared/components/FormElements/Input"

// CSS
import "./EditTool.css"


const useStyles = makeStyles((theme) => ({
    margin: {
        margin: "10px 0"
    }
}));




function EditTool() {

    const classes = useStyles();
    const [tool] = useState(toolItem);
    const [file, setFile] = useState(tool.imageProfile);
    const [files, setFiles] = useState(tool.images);
    const [total, setTotal] = useState(tool.total);
    const [type] = useState(tool.type);
    const [limit, setLimit] = useState(tool.limit);
    const [description, setDescription] = useState(tool.description);
    const [toolCode, settoolCode] = useState(tool.toolCode);

    const [formState, inputHandler] = useForm(
        {
            name: {
                value: '',
                isValid: false
            },
            type: {
                value: '',
                isValid: false
            },
            category: {
                value: '',
                isValid: false
            }
        },
        false
    );

    const onSubmit = (e) => {
        e.preventDefault();

        let newTool = {
            toolName: formState.inputs.name.value,
            toolCode: toolCode,
            total: total,
            type: formState.inputs.type.value,
            category: formState.inputs.category.value,
            imageProfile: file,
            limit: limit,
            description: description,
            images: files
        }

        console.log(newTool);
    }


    return (
        <Container>
            <h1>แก้ไข {tool.toolName}</h1>
            <Paper>
                <form onSubmit={onSubmit}>
                    <Input
                        id="name"
                        element="input"
                        type="text"
                        label="ชื่ออุปกรณ์ *"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="โปรดใส่ข้อมูล."
                        onInput={inputHandler}
                        initialValue={tool.toolName}
                        initialValid={true}
                        required
                    />
                    <TextField
                        label="รหัสอุปกรณ์"
                        variant="outlined"
                        fullWidth
                        type="text"
                        value={toolCode}
                        className={classes.margin}
                        onChange={(e) => settoolCode(e.target.value)}
                    />
                    <TextField
                        label="จำกัด"
                        variant="outlined"
                        type="number"
                        fullWidth
                        value={limit}
                        className={classes.margin}
                        onChange={(e) => setLimit(e.target.value)}
                    />
                    <div className="edittool-input-group">
                        <Input
                            id="type"
                            element="input"
                            type="text"
                            label="ชนิด *"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="โปรดใส่ข้อมูล."
                            onInput={inputHandler}
                            initialValue={type}
                            initialValid={true}
                            required
                        />
                        <Input
                            id="category"
                            element="input"
                            type="text"
                            label="ประเภท *"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="โปรดใส่ข้อมูล."
                            onInput={inputHandler}
                            initialValue={tool.category}
                            initialValid={true}
                            required
                        />
                    </div>
                    <TextField
                        label="จำนวน"
                        variant="outlined"
                        type="number"
                        fullWidth
                        value={total}
                        className={classes.margin}
                        onChange={(e) => setTotal(e.target.value)}
                    />
                    <ImageUpload file={file} setFile={setFile} />
                    <ImageUploadMultiple files={files} setFiles={setFiles} />
                    <TextField
                        id="outlined-multiline-flexible"
                        label="รายละเอียดเพิ่มเติม"
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
                        อัพเดต
                    </Button>

                </form>
            </Paper>
        </Container>
    )
}

export default EditTool