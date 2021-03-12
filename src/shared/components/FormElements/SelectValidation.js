import React, { useReducer, useEffect } from 'react'
import { Select, FormControl, InputLabel, MenuItem } from "@material-ui/core"

import { validate } from '../../util/validators.js'
import { makeStyles } from '@material-ui/core/styles'


// Input of Login page
const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            };
        case 'TOUCH': {
            return {
                ...state,
                isTouched: true
            }
        }
        default:
            return state;
    }
};

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: "100%"
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const SelectValidation = props => {

    const classes = useStyles();

    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue || '',
        isTouched: false,
        isValid: props.initialValid || false
    });

    const { id, onInput } = props;
    const { value, isValid } = inputState;

    useEffect(() => {
        onInput(id, value, isValid)
    }, [id, value, isValid, onInput]);

    const changeHandler = event => {
        dispatch({
            type: 'CHANGE',
            val: event.target.value,
            validators: props.validators
        });
    };

    const touchHandler = () => {
        dispatch({
            type: 'TOUCH'
        });
    };

    const listSelect = () => {
        let arr = [];
        let filter;
        props.list.map((item, index) => {
            // ถ้าข้อมูลอาเรย์ = 0 เพิ่มข้อมูลเข้าไปใน อาเรย์
            if (arr.length === 0) {
                arr.push({id: item.id, boardName: item.boardName.toLowerCase()})
            }
            else if (arr.length > 0) {
                // ฟิลเตอร์ข้อมูลในอาเรย์ ว่ามีข้อมูลซ้ำกันไหม ถ้ามีให้ลบออก
                filter = arr.filter((x) => x.boardName !== item.boardName.toLowerCase())
                // เพิ่มข้อมูลใหม่เข้าไปหลังจากฟิลเตอร์ข้อมูลแล้ว
                filter.push({id: item.id, boardName: item.boardName.toLowerCase()})
                // หลังจากฟิลเตอร์ข้อมูลแล้ว นำข้อมูลนั้นแทนที่ข้อมูลอาเรย์หลัก
                arr = filter
            }
            return arr
        })
        return arr
    }

    return (
        <FormControl variant="outlined" className={classes.formControl} error={!inputState.isValid && inputState.isTouched}  >
            <InputLabel id={id}>{props.filterName}</InputLabel>
            <Select
                labelId={id}
                id={id}
                value={inputState.value}
                onChange={changeHandler}
                label="Age"
                onBlur={touchHandler}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {listSelect().map((item) => (
                    <MenuItem key={item.id} value={item.id}>{item.boardName}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default SelectValidation;
