import React from 'react'
import { FormControl, Select, InputLabel, MenuItem } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: "10px 0"
    }
}));



function SelectComponent(props) {

    const classes = useStyles();

    const listSelect = () => {
        let arr = []
        let filter;
        if (props.typeFilter === "tool") {
            if (props.dataType === "type") {
                props.list.map((item, index) => {
                    // ถ้าข้อมูลอาเรย์ = 0 เพิ่มข้อมูลเข้าไปใน อาเรย์
                    if (arr.length === 0) {
                        arr.push(item.type.toLowerCase())
                    }
                    else if (arr.length > 0) {
                        // ฟิลเตอร์ข้อมูลในอาเรย์ ว่ามีข้อมูลซ้ำกันไหม ถ้ามีให้ลบออก
                        // console.log(item)
                        filter = arr.filter((x) => x !== item.type.toLowerCase())
                        // เพิ่มข้อมูลใหม่เข้าไปหลังจากฟิลเตอร์ข้อมูลแล้ว
                        filter.push(item.type.toLowerCase())
                        // หลังจากฟิลเตอร์ข้อมูลแล้ว นำข้อมูลนั้นแทนที่ข้อมูลอาเรย์หลัก
                        arr = filter
                    }
                    return arr
                })
            }
            if (props.dataType === "category") {
                props.list.map((item, index) => {
                    // ถ้าข้อมูลอาเรย์ = 0 เพิ่มข้อมูลเข้าไปใน อาเรย์
                    if (arr.length === 0) {
                        arr.push(item.category.toLowerCase())
                    }
                    else if (arr.length > 0) {
                        // ฟิลเตอร์ข้อมูลในอาเรย์ ว่ามีข้อมูลซ้ำกันไหม ถ้ามีให้ลบออก
                        filter = arr.filter((x) => x !== item.category.toLowerCase())
                        // เพิ่มข้อมูลใหม่เข้าไปหลังจากฟิลเตอร์ข้อมูลแล้ว
                        filter.push(item.category.toLowerCase())
                        // หลังจากฟิลเตอร์ข้อมูลแล้ว นำข้อมูลนั้นแทนที่ข้อมูลอาเรย์หลัก
                        arr = filter
                    }
                    return arr
                })
            }
            if (props.dataType === "name") {
                props.list.map((item, index) => {
                    arr.push(item.toolName.toLowerCase())
                    return arr
                })
            }
        }

        if (props.typeFilter === "board") {
            return arr = []
        }
        return arr
    }

    return (
        <div>
            <FormControl variant="outlined" className={classes.margin} style={{width: "100%"}}>
                <InputLabel id="demo-simple-select-outlined-label">{props.filterName}</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={props.value}
                    onChange={props.onChange}
                    label="Age"
                    fullWidth
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {listSelect().map((item) => (
                        <MenuItem key={item} value={item}>{item}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}

export default SelectComponent
