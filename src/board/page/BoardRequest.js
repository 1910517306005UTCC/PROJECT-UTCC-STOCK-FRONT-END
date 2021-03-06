import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { boardListAction } from "../../actions/boardActions";
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from "../../shared/hooks/form-hook";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useDispatch, useSelector } from "react-redux";
import { listToolApi } from "../../Api"

// Component
import Input from "../../shared/components/FormElements/Input";
import SelectValidation from '../../shared/components/FormElements/SelectValidation';
import { Container, Paper, Button } from "@material-ui/core";

// CSS
import "./BoardRequest.css"

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
    btnCheck: {
        margin: "10px 0",
        backgroundColor: "#FFC107"
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
    const history = useHistory();
    const boardList = useSelector((state) => state.boardList);
    const { boards, loading } = boardList;
    const [tools] = useState(listToolApi)
    const [openAlert, setOpenAlert] = useState(false);
    const [validTool, setValidTool] = useState(false);
    const [validBoard, setvalidBoard] = useState(false);
    const [boardToltal, setBoardToltal] = useState({});

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

        if (!validTool) {
            history.push("/historyboard")
        } else {
            history.push("/boardincomplete")
        }
    }

    const onSubmitCheck = async (e) => {
        const boardId = formState.inputs.name.value;
        const selectedTotal = formState.inputs.total.value;
        // ?????????????????????????????????????????????????????? 
        let newTotalTool = []
        let findData = boards.find((item) => item.id === boardId)
        // ??????????????????????????????????????????????????????
        // console.log(Number(findData.total) >= selectedTotal)
        if (Number(findData.total) >= selectedTotal) {
            setvalidBoard(true)
        } else {
            let calTotalBoard = Number(findData.total) - selectedTotal
            setvalidBoard(false)
            setBoardToltal({ boardName: findData.boardName, total: calTotalBoard })
            setOpenAlert(true)
        }
        // console.log(findData)
        await findData.tools.map((tool) => {
            let calTotal = Number(tool.total) * selectedTotal
            let newArr = { id: tool.id, toolName: tool.toolName, total: calTotal }
            newTotalTool = [...newTotalTool, newArr]
        })

        // ????????????????????????????????????????????? = ??????????????????????????????????????? - ??????????????????????????????????????????
        let sumTotal = []
        newTotalTool.map((item) => {
            let totalToolInStock = tools.find((tool) => tool.id === item.id)
            // console.log(Number(totalToolInStock.total) + " " + item.total)
            let calSum = Number(totalToolInStock.total) - item.total
            let newArr = { id: item.id, toolName: item.toolName, total: calSum }
            sumTotal = [...sumTotal, newArr]
        })

        // ????????????????????????????????????????????? ????????????????????????
        let inSufficientTool = []
        sumTotal.map((item) => {
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
        setvalidBoard(false)
        setOpenAlert(false)
    }



    return (
        <Container maxWidth="sm">
            <h1>???????????????????????????</h1>
            <Paper className="createtool-form">
                <form onSubmit={onSubmit}>
                    <div onClick={handleAlert}>
                        <SelectValidation
                            id="name"
                            list={boards}
                            filterName="??????????????????????????? *"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="?????????????????????????????????????????????."
                            onInput={inputHandler}
                            required
                        />
                    </div>
                    <div onClick={handleAlert}>
                        <Input
                            id="total"
                            element="input"
                            type="number"
                            label="??????????????? *"
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="???????????????????????????????????????."
                            onInput={inputHandler}
                            required
                        />
                    </div>
                    <Button
                        type="button"
                        variant="contained"
                        fullWidth
                        className={classes.btnCheck}
                        disabled={!formState.isValid}
                        onClick={onSubmitCheck}
                    >
                        ?????????????????????
                    </Button>

                    {openAlert &&
                        <div className="alert-errordata">
                            <h3>?????????????????????????????????????????????????????????</h3>
                            {!validBoard &&
                                <div className="valid-data">
                                    <p>{boardToltal.boardName}</p>
                                    <p>{boardToltal.total}</p>
                                </div>
                            }
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
                        disabled={!validBoard}
                    >
                        ??????????????????
                    </Button>
                </form>

            </Paper>

        </Container>
    )
}

export default BoardRequest
