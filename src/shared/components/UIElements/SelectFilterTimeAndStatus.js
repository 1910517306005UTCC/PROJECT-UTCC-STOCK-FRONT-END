import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// Component 
import { TextField, MenuItem } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    marginFilter: {
        marginRight: "10px"
    }
}));

function SelectFilterTimeAndStatus(props) {

    const classes = useStyles();
    const { label } = props;
    const [typeList, setTypeList] = useState([{ period: "7 วัน", value: 7 }, { period: "14 วัน", value: 14 },
        { period: "1 เดือน", value: 30 }, { period: "3 เดือน", value: 90 }, { period: "5 เดือน", value: 150 }]);
    const [value, setValue] = useState("ทั้งหมด");


    const onChange = (e) => {
        const value = e.target.value;

        let lastTime = new Date("3/28/2021")
        let currentTime = new Date();
        console.log(currentTime)
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
                    {option.period}
                </MenuItem>
            ))}
        </TextField>
    )
}

export default SelectFilterTimeAndStatus
