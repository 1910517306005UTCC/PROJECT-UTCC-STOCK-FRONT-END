import React, { useState } from 'react'
import { Container, Paper, Button } from "@material-ui/core"
import SaveIcon from '@material-ui/icons/Save';
import { useForm } from "../../shared/hooks/form-hook"
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from "../../shared/util/validators"
import Input from "../../shared/components/FormElements/Input"
import { makeStyles } from '@material-ui/core/styles'
import ImageUpload from '../../shared/components/FormElements/ImageUpload'



const useStyles = makeStyles((theme) => ({
    button: {
        margin: "10px 10px 0 0"
    },
    paddingForm: {
        padding: "10px 20px"
    }
}));

const data = [{
    id: "cacd5252",
    email: "boonyarit@hotmail.com",
    name: "Roze",
    password: "123456",
    status: "Admin",
    image: "https://images.unsplash.com/photo-1615502258994-72db7460643c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=632&q=80"
}]

function EditProfile() {

    const classes = useStyles();
    const [file, setFile] = useState(data[0].image)

    const [formState, inputHandler] = useForm(
        {
            email: {
                value: '',
                isValid: false
            },
            name: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            },
        },
        false
    );

    const handleSubmitEdit = (e) => {
        e.preventDefault()
        console.log(formState.inputs)
    }

    return (
        <Container maxWidth="sm">
            <h1>แก้ไขโปรไฟล์</h1>
            <Paper className={classes.paddingForm}>
                <Input
                    id="email"
                    element="input"
                    type="email"
                    label="อีเมล์"
                    validators={[VALIDATOR_EMAIL()]}
                    errorText="โปรดกรอกอีเมล์ของคุณ."
                    onInput={inputHandler}
                    initialValue={data[0].email}
                    initialValid={true}
                    required
                />
                <Input
                    id="name"
                    element="input"
                    type="text"
                    label="ชื่อ"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="โปรดกรอกชื่อของคุณ."
                    onInput={inputHandler}
                    initialValue={data[0].name}
                    initialValid={true}
                    required
                />
                <Input
                    id="password"
                    element="input"
                    type="password"
                    label="รหัสผ่าน"
                    validators={[VALIDATOR_MINLENGTH(6)]}
                    errorText="โปรดกรอกรหัสผ่านอย่างน้อย 6 ตัว."
                    onInput={inputHandler}
                    initialValue={data[0].password}
                    initialValid={true}
                    required
                />

                <ImageUpload file={file} setFile={setFile} />

                <div className="EditProfile-action">
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        size="small"
                        disabled={!formState.isValid}
                        onClick={handleSubmitEdit}
                        startIcon={<SaveIcon />}
                    >
                        บันทึก
                    </Button>
                    <Button
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        size="small"
                    >
                        ยกเลิก
                    </Button>
                </div>
            </Paper>
        </Container>
    )
}

export default EditProfile
