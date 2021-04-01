import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// Component 
import { TextField, MenuItem } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    marginFilter: {
        marginRight: "10px"
    }
}));

function SelectFilter(props) {

    const classes = useStyles();
    const { label, data, setData, defaultValue, filterType,
        setValueFilterType, valueFilterType, setValueFilterStatus, valueFilterStatus } = props;
    const [typeList, setTypeList] = useState([]);
    const [value, setValue] = useState("ทั้งหมด");

    useEffect(() => {
        // กำหนดค่าใน Input Select ไม่ให้ซ้ำกัน
        let typeArr = ["ทั้งหมด"]
        if (filterType === "type") {
            defaultValue.map((item) => {
                if (typeArr === 1) {
                    typeArr.push(item.type)
                } else {
                    let newFilter = typeArr.filter((x) => x.toLowerCase() !== item.type.toLowerCase());
                    typeArr = newFilter
                    typeArr.push(item.type)
                }
            })
        }

        if (filterType === "status") {
            typeArr = ["ทั้งหมด", "มี", "กำลังจะหมด", "หมด"]
        }

        setTypeList(typeArr)

        return () => {

        }
    }, [data])

    // {Number(tool.total) > Number(tool.limit) ?
    //     <p>มี</p> :
    //     Number(tool.total) === 0 ?
    //         <p style={{ color: "red" }}>หมด</p> : <p style={{ color: "orange" }}>กำลังจะหมด</p>
    // }

    const onChange = (e) => {
        const selectValue = e.target.value;
        setValue(selectValue)
        if (filterType === "type") {
            setValueFilterType(selectValue)
            // แสดงข้อมูลทั้งหมด
            if (selectValue === "ทั้งหมด") {
                // ฟิลเตอร์สถานะต่อหลังจากฟิลเตอร์ชนิดแล้ว
                if (valueFilterStatus === "ทั้งหมด") {
                    setData(defaultValue)
                }
                else if (valueFilterStatus === "มี") {
                    let filterData = defaultValue.filter((item) => Number(item.total) > Number(item.limit))
                    setData(filterData)
                }
                else if (valueFilterStatus === "กำลังจะหมด") {
                    let filterData = defaultValue.filter((item) => Number(item.total) <= Number(item.limit) && Number(item.total) !== 0)
                    setData(filterData)
                }
                else {
                    let filterData = defaultValue.filter((item) => Number(item.total) === 0)
                    // ฟิลเตอร์ชนิดต่อหลังจากฟิลเตอร์สถานะแล้ว
                    setData(filterData)
                }
            }
            // ฟิลเตอร์ข้อมูล
            else {
                let filterData = defaultValue.filter((item) => item.type.toLowerCase() === selectValue)
                // ฟิลเตอร์สถานะต่อหลังจากฟิลเตอร์ชนิดแล้ว
                if (valueFilterStatus === "ทั้งหมด") {
                    setData(filterData)
                }
                else if (valueFilterStatus === "มี") {
                    filterData = filterData.filter((item) => Number(item.total) > Number(item.limit))
                    setData(filterData)
                }
                else if (valueFilterStatus === "กำลังจะหมด") {
                    filterData = filterData.filter((item) => Number(item.total) <= Number(item.limit) && Number(item.total) !== 0)
                    setData(filterData)
                }
                else {
                    filterData = filterData.filter((item) => Number(item.total) === 0)
                    // ฟิลเตอร์ชนิดต่อหลังจากฟิลเตอร์สถานะแล้ว
                    setData(filterData)
                }
            }
        }


        if (filterType === "status") {
            setValueFilterStatus(selectValue)
            // แสดงข้อมูลทั้งหมด
            if (selectValue === "ทั้งหมด") {
                setData(defaultValue)
                // ฟิลเตอร์ชนิดต่อหลังจากฟิลเตอร์สถานะแล้ว
                if (valueFilterType === "ทั้งหมด") {
                    setData(defaultValue)
                }
                else {
                    let filterData = defaultValue.filter((item) => item.type.toLowerCase() === valueFilterType)
                    setData(filterData)
                }
            }
            // ฟิลเตอร์ข้อมูล
            else if (selectValue === "มี") {
                let filterData = defaultValue.filter((item) => Number(item.total) > Number(item.limit))
                // ฟิลเตอร์ชนิดต่อหลังจากฟิลเตอร์สถานะแล้ว
                if (valueFilterType === "ทั้งหมด") {
                    setData(filterData)
                }
                else {
                    filterData = filterData.filter((item) => item.type.toLowerCase() === valueFilterType)
                    setData(filterData)
                }
            }
            else if (selectValue === "กำลังจะหมด") {
                let filterData = defaultValue.filter((item) => Number(item.total) <= Number(item.limit) && Number(item.total) !== 0)
                // ฟิลเตอร์ชนิดต่อหลังจากฟิลเตอร์สถานะแล้ว
                if (valueFilterType === "ทั้งหมด") {
                    setData(filterData)
                }
                else {
                    filterData = filterData.filter((item) => item.type.toLowerCase() === valueFilterType)
                    setData(filterData)
                }
            }
            else {
                let filterData = defaultValue.filter((item) => Number(item.total) === 0)
                // ฟิลเตอร์ชนิดต่อหลังจากฟิลเตอร์สถานะแล้ว
                if (valueFilterType === "ทั้งหมด") {
                    setData(filterData)
                }
                else {
                    filterData = filterData.filter((item) => item.type.toLowerCase() === valueFilterType)
                    setData(filterData)
                }
            }
        }
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
                <MenuItem key={index} value={option.toLowerCase()}>
                    {option}
                </MenuItem>
            ))}
        </TextField>
    )
}

export default SelectFilter
