import React, { useState } from 'react'
import { Container, Paper, TextField, Button } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles'
import { useForm } from "../../shared/hooks/form-hook"
import { VALIDATOR_REQUIRE } from "../../shared/util/validators"
import Input from "../../shared/components/FormElements/Input"

import "./CreateTool.css"
import ImageUpload from '../../shared/components/FormElements/ImageUpload'

const useStyles = makeStyles((theme) => ({
    textarea: {
        margin: "20px 0"
    },
    input: {
        margin: "20px 0"
    },
    button: {
        margin: "20px 0"
    }
}));

function CreateTool() {

    const classes = useStyles();
    const [total, setTotal] = useState('');
    const [size, setSize] = useState('');
    const [description, setDescription] = useState('');
    const [toolCode, setToolCode] = useState('');
    const [file, setFile] = useState(null);

    const [formState, inputHandler] = useForm(
        {
            name: {
                value: '',
                isValid: false
            }
        },
        {
            type: {
                value: '',
                isValid: false
            }
        },
        {
            category: {
                value: '',
                isValid: false
            }
        },
        false
    );


    // send data to front-end
    const onSubmit = (e) => {
        e.preventDefault();

        let newTool = {
            toolName: formState.inputs.name.value,
            toolCode: toolCode,
            total: total,
            type: formState.inputs.type.value,
            category: formState.inputs.category.value,
            size: size,
            imageProfile: file,
            toollimit: '',
            description: description
        }

        console.log(newTool);
    }

    return (
        <Container maxWidth="sm">
            <h1>สร้างอุปกรณ์</h1>
            <Paper className="createtool-form">
                <form onSubmit={onSubmit}>
                    <Input
                        id="name"
                        element="input"
                        type="text"
                        label="ชื่ออุปกรณ์"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="โปรดใส่ข้อมูล."
                        onInput={inputHandler}
                        required
                    />
                    <TextField
                        label="รหัสอุปกรณ์"
                        variant="outlined"
                        fullWidth
                        type="text"
                        className={classes.input}
                        onChange={(e) => setToolCode(e.target.value)}
                    />
                    <div className="createtool-input-group">
                        <Input
                            id="type"
                            element="input"
                            type="text"
                            label="ชนิด"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="โปรดใส่ข้อมูล."
                            onInput={inputHandler}
                            required
                        />
                        <Input
                            id="category"
                            element="input"
                            type="text"
                            label="ประเภท"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="โปรดใส่ข้อมูล."
                            onInput={inputHandler}
                            required
                        />
                    </div>
                    <div className="createtool-input-group">
                        <TextField
                            label="จำนวนอุปกรณ์"
                            variant="outlined"
                            fullWidth
                            type="number"
                            className={classes.input}
                            onChange={(e) => setTotal(e.target.value)}

                        />
                        <TextField
                            label="ขนาด"
                            variant="outlined"
                            fullWidth
                            type="text"
                            className={classes.input}
                            onChange={(e) => setSize(e.target.value)}
                        />
                    </div>
                    <ImageUpload  file={file} setFile={setFile} />
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

export default CreateTool
