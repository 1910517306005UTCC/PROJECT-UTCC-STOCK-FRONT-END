import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// Component 
import { TextField, MenuItem } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    marginFilter: {
        marginRight: "10px"
    }
}));

function SelectFilterStatus(props) {

    const classes = useStyles();
    const { label, setData, defaultValueData } = props;
    const [typeList] = useState([{ text: "ทั้งหมด", value: "ทั้งหมด" }, { text: "การเพิ่ม", value: "add" }, { text: "การเบิก", value: "request" }]);
    const [value, setValue] = useState("ทั้งหมด");


    const onChange = (e) => {
        const newValue = e.target.value;

        let newArr = []

        if (newValue === "ทั้งหมด") {
            newArr = defaultValueData
            setValue("ทั้งหมด");
        } else {
            defaultValueData.map((tool) => {
                if (newValue === tool.actionType) {
                    newArr = [...newArr, tool]
                }
            }) // function map()
            setValue(newValue)

        } // if 1

        setData(newArr)

    }


    return (
        <TextField
            id="standard-select-currency"
            select
            label={label}
            value={value}
            onChange={onChange}
            helperText="Please select your currency"
            className={classes.marginFilter}
        >
            {typeList.map((option, index) => (
                <MenuItem key={index} value={option.value}>
                    {option.text}
                </MenuItem>
            ))}
        </TextField>
    )
}

export default SelectFilterStatus
