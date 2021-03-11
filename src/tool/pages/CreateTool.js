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
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();

    const [formState, inputHandler, setFormData] = useForm(
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

    // Function of selecting image
    const pickedHandler = e => {
        setFile(e.target.files[0]);
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(e.target.files[0]);

    };

    const deleteImage = () => {
        setPreviewUrl(false);
        setFile();
    }

    return (
        <Container maxWidth="sm">
            <h1>Create Tool</h1>
            <Paper className="createtool-form">
                <form onSubmit={onSubmit}>
                    <Input
                        id="name"
                        element="input"
                        type="text"
                        label="Name *"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid name."
                        onInput={inputHandler}
                        required
                    />
                    <TextField
                        label="Tool code"
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
                            label="Type *"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please enter a valid type."
                            onInput={inputHandler}
                            required
                        />
                        <Input
                            id="category"
                            element="input"
                            type="text"
                            label="Category *"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please enter a valid category."
                            onInput={inputHandler}
                            required
                        />
                    </div>
                    <div className="createtool-input-group">
                        <TextField
                            label="Total"
                            variant="outlined"
                            fullWidth
                            type="number"
                            className={classes.input}
                            onChange={(e) => setTotal(e.target.value)}

                        />
                        <TextField
                            label="Size"
                            variant="outlined"
                            fullWidth
                            type="text"
                            className={classes.input}
                            onChange={(e) => setSize(e.target.value)}
                        />
                    </div>
                    <ImageUpload pickedHandler={pickedHandler} previewUrl={previewUrl} deleteImage={deleteImage} />
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

export default CreateTool
