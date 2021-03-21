import React, { useState, useEffect } from 'react'
import { boardListAction } from "../../actions/boardActions"
import { Container, Paper, Button } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles'
import { useForm } from "../../shared/hooks/form-hook"
import { VALIDATOR_REQUIRE } from "../../shared/util/validators"
import Input from "../../shared/components/FormElements/Input"
import { Alert } from "@material-ui/lab"
import { useDispatch, useSelector } from "react-redux";

import "./BoardRequest"
import SelectValidation from '../../shared/components/FormElements/SelectValidation'

const useStyles = makeStyles((theme) => ({
    textarea: {
        margin: "20px 0"
    },
    input: {
        margin: "20px 0"
    },
    button: {
        margin: "10px 0"
    },
    inputFilter: {
        margin: "20px 0px",
        padding: "0 5px"
    },
    PaperFilter: {
        padding: "10px"
    }
}));

function BoardRequest() {

    const classes = useStyles();
    const dispatch = useDispatch();
    const boardList = useSelector((state) => state.boardList);
    const { boards, loading } = boardList;
    const [openAlert, setOpenAlert] = useState(false)

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
        dispatch(boardListAction());
        return () => {

        }
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(formState.inputs.name.value)
    }



    return (
        <Container maxWidth="sm">
            <h1>เบิกบอร์ด</h1>
            <Paper className="createtool-form">
                <form onSubmit={onSubmit}>
                    <SelectValidation
                        id="name"
                        list={boards}
                        filterName="ชื่อบอร์ด *"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="โปรดเลือกข้อมูล."
                        onInput={inputHandler}
                        required
                    />
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
                    <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        fullWidth
                        className={classes.button}
                        disabled={!formState.isValid}
                        onClick={() => setOpenAlert(true)}
                    >
                        ตรวจสอบ
                    </Button>

                    {openAlert && <Alert severity="error" onClose={() => setOpenAlert(false)} >This is an error alert — check it out!</Alert>}

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        className={classes.button}
                        disabled={!openAlert}
                    >
                        ยืนยัน
                    </Button>
                </form>
            </Paper>

        </Container>
    )
}

export default BoardRequest
