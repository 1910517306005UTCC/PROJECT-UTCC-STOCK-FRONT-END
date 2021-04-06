import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// Component 
import { TextField, MenuItem } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    marginFilter: {
        marginRight: "10px"
    }
}));

function SelectFilterTime(props) {

    const classes = useStyles();
    const { label, setData, defaultValueData } = props;
    const [typeList] = useState([{ period: "ทั้งหมด", value: 0 }, { period: "วันนี้", value: 1 }, { period: "ภายใน 7 วัน", value: 7 },
    { period: "ภายใน 14 วัน", value: 14 }, { period: "ภายใน 1 เดือน", value: 30 }, { period: "ภายใน 3 เดือน", value: 90 }, { period: "ภายใน 5 เดือน", value: 150 }]);
    const [value, setValue] = useState("ทั้งหมด");


    const onChange = (e) => {
        const newValue = e.target.value;

        // const newType = typeList.filter((item) => item.period === value)
        // setValue(newType[0].period)
        let newArr = []

        if (newValue === "ทั้งหมด") {
            newArr = defaultValueData
            setValue("ทั้งหมด");
        } else {
            setValue(newValue)
            defaultValueData.map((tool) => {
                let currentTime = new Date();
                // let currentTime = new Date();
                let latestTime = new Date(tool.date + " " + tool.time)
                let latestMonth = latestTime.getMonth() + 1;
                let latestYear = latestTime.getFullYear();
                let latestDate = latestTime.getDate();
                // let latestDay = latestTime.getDay() + 1;
                let latestHour = latestTime.getHours();
                let currentMonth = currentTime.getMonth() + 1;
                let currentYear = currentTime.getFullYear();
                let currentDate = currentTime.getDate();
                // let currentDay = currentTime.getDay() + 1;
                let currentHour = currentTime.getHours();
                let calYear = currentYear - latestYear;

                if (newValue === "วันนี้") {
                    if (currentMonth === latestMonth && currentDate === latestDate) {
                        newArr = [...newArr, tool]
                    }
                }
                if (newValue === "ภายใน 7 วัน") {
                    let cal;
                    if (currentMonth === latestMonth) {
                        cal = currentDate - latestDate;
                    } else {
                        if (calYear === 1 || calYear === 0) {
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

                if (newValue === "ภายใน 14 วัน") {
                    let cal;
                    if (currentMonth === latestMonth) {
                        cal = currentDate - latestDate;
                    } else {
                        // เช็คเดือนที่มี 31 วัน
                        if (calYear === 1 || calYear === 0) {
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
                    }



                    // ไม่เกิน 14 วัน
                    if (cal <= 14) {
                        // คำนวณระยะเวลาของชั่วโมงของวันสุดท้าย เช่น 17/04/63 17.00 และ 24/04/63 16.00 = TRUE(อีก 1 ชั่วโมงครบ 7 วัน)
                        if (cal === 14) {
                            if (currentHour < latestHour) {
                                newArr = [...newArr, tool]
                            }
                        }
                        // 1 - 6 วัน
                        if (cal !== 14) {
                            newArr = [...newArr, tool]
                        }
                    }
                }

                if (newValue === "ภายใน 1 เดือน") {
                    let cal;
                    let lastMonth = currentMonth - latestMonth;
                    if (currentMonth === latestMonth) {
                        cal = currentDate - latestDate;
                    }
                    // เดือนมกราคม - เดือนธันวาคม 1 - 12 = -11 หรือ เดือนกุมภาพันธ์ - เดือนมกราคม  2 - 1 = 1 
                    if (calYear === 1 || calYear === 0) {
                        if (lastMonth === 1 || lastMonth === -11) {
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
                    }
                    // ไม่เกิน 14 วัน
                    if (cal <= 31) {
                        // คำนวณระยะเวลาของชั่วโมงของวันสุดท้าย เช่น 17/04/63 17.00 และ 24/04/63 16.00 = TRUE(อีก 1 ชั่วโมงครบ 7 วัน)
                        if (cal === 31) {
                            if (currentHour < latestHour) {
                                newArr = [...newArr, tool]
                            }
                        }
                        // 1 - 6 วัน
                        if (cal !== 31) {
                            newArr = [...newArr, tool]
                        }
                    }
                }

                if (newValue === "ภายใน 3 เดือน") {
                    // เช็คระยะห่างของเดือน
                    let lastMonth = 0;
                    if (calYear === 1 || calYear === 0) {
                        if (currentMonth > latestMonth) {
                            // กรณีเดือนเมษายน - เดือนมกราคม = 4 - 1  = 3
                            lastMonth = currentMonth - latestMonth
                        } if (latestMonth > currentMonth) {
                            // กรณีเดือนตุลาคม - เดือนมกราคม = (12-10) + 1  = 3
                            lastMonth = (12 - latestMonth) + currentMonth

                        }
                    }
                    // เช็คเดือนในปัจจุบันว่าตรงกับเดือนในข้อมูลหรือไม่
                    if (lastMonth <= 3) {
                        if (currentMonth === latestMonth) {
                            if (currentDate === latestDate) {
                                newArr = [...newArr, tool]
                            } else if (currentDate > latestDate) {
                                newArr = [...newArr, tool]
                            }
                        }
                        else {
                            newArr = [...newArr, tool]
                        }
                    }
                }
                if (newValue === "ภายใน 5 เดือน") {
                    // เช็คระยะห่างของเดือน
                    let lastMonth = 0;
                    if (calYear === 1 || calYear === 0) {
                        if (currentMonth > latestMonth) {
                            // กรณีเดือนมิถุนายน - เดือนมกราคม = 6 - 1  = 5
                            lastMonth = currentMonth - latestMonth
                        } if (latestMonth > currentMonth) {
                            // กรณีเดือนสิงหาคม - เดือนมกราคม = (12-8) + 1  = 5
                            lastMonth = (12 - latestMonth) + currentMonth

                        }
                    }
                    // console.log(lastMonth)
                    // เช็คเดือนในปัจจุบันว่าตรงกับเดือนในข้อมูลหรือไม่
                    if (lastMonth <= 5) {
                        if (currentMonth === latestMonth) {
                            if (currentDate === latestDate) {
                                newArr = [...newArr, tool]
                            } else if (currentDate > latestDate) {
                                newArr = [...newArr, tool]
                            }
                        }
                        else {
                            newArr = [...newArr, tool]
                        }
                    }
                }
            }) // function map()
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
                <MenuItem key={index} value={option.period}>
                    {option.period}
                </MenuItem>
            ))}
        </TextField>
    )
}

export default SelectFilterTime
