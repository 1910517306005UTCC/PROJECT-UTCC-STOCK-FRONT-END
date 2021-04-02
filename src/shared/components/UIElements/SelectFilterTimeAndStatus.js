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
    const { label, tools, setTools, defaultValueTools, setDefaultValueTools } = props;
    const [typeList] = useState([{ period: "ทั้งหมด", value: 0 }, { period: "วันนี้", value: 1 }, { period: "ภายใน 7 วัน", value: 7 },
    { period: "ภายใน 14 วัน", value: 14 }, { period: "ภายใน เดือน", value: 30 }, { period: "ภายใน 3 เดือน", value: 90 }, { period: "ภายใน 5 เดือน", value: 150 }]);
    const [value, setValue] = useState("ทั้งหมด");


    const onChange = (e) => {
        const value = e.target.value;

        const newValue = typeList.filter((item) => item.period === value)
        setValue(newValue[0].period)
        let newArr = []

        if (value === "ทั้งหมด") {
            newArr = defaultValueTools
            setValue("ทั้งหมด");
        } else {
            tools.map((tool) => {
                let currentTime = new Date();
                let latestTime = new Date(tool.date + " " + tool.time)
                let latestMonth = latestTime.getMonth() + 1;
                let latestDate = latestTime.getDate();
                // let latestDay = latestTime.getDay() + 1;
                let latestHour = latestTime.getHours();
                let currentMonth = currentTime.getMonth() + 1;
                let currentDate = currentTime.getDate();
                // let currentDay = currentTime.getDay() + 1;
                let currentHour = currentTime.getHours();

                if (value === "วันนี้") {
                    if (currentDate === latestDate) {
                        newArr = [...newArr, tool]
                    }
                }
                if (value === "ภายใน 7 วัน") {
                    let cal;
                    if (currentMonth === latestMonth) {
                        cal = currentDate - latestDate;
                    } else {
                        // เช็คเดือนที่มี 31 วัน
                        if (latestMonth === 1 || 3 || 5 || 7 || 8 || 10 || 12) {
                            cal = (31 - latestDate) + currentDate;
                        }
                        // เช็คเดือนกุมภาพันธ์ และเดือนกุมภาพันธ์มีทั้ง 28 วัน และ 29 วัน
                        else if (latestMonth === 2) {
                            if (latestDate === 28) {
                                cal = (28 - latestDate) + currentDate;
                            } else {
                                cal = (29 - latestDate) + currentDate;
                            }
                        }
                        // เดือนที่มี 30 วัน
                        else {
                            cal = (30 - latestDate) + currentDate;
                        }
                    }
                    // ไม่เกิน 7 วัน
                    if (cal <= 7) {
                        // คำนวณระยะเวลาของชั่วโมงของวันสุดท้าย เช่น 17/04/63 17.00 และ 24/04/63 16.00 = TRUE(อีก 1 ชั่วโมงครบ 7 วัน)
                        if (cal === 7) {
                            if (currentHour < latestHour) {
                                newArr = [...newArr, tool]
                            }
                        }
                        // 1 - 6 วัน
                        if (cal !== 7) {
                            newArr = [...newArr, tool]
                        }
                    }
                }
            }) // function map()
        } // if 1

        setTools(newArr)
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
                <MenuItem key={index} value={option.period}>
                    {option.period}
                </MenuItem>
            ))}
        </TextField>
    )
}

export default SelectFilterTimeAndStatus
