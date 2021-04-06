import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { toolItem } from "../../Api"
import { Avatar, Button } from "@material-ui/core"

// Component
import { SlideImagePreview } from '../../shared/components/UIElements/SlideImagePreview';

// Icon
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

// CSS
import "./DetailTool.css"

function DetailTool() {

    // const toolId = useParams().tid
    const [tool] = useState(toolItem);
    const [previewImg, setPreviewImg] = useState(tool.imageProfile)
    const [images] = useState(tool.images);

    return (
        <div>
            <h1>รายเอียดอุปกรณ์ของ {tool.toolName}</h1>

            <div className="container-detailtool">
                <div>
                    <div className="introl-img">
                        <img src={previewImg} alt="" />
                    </div>
                    {images.length === 3 ?
                        <div className="detailtool-list-img">
                            {images.map((img, index) => (
                                <Avatar variant="square" src={img} key={index} onClick={() => setPreviewImg(img)} />
                            ))}
                        </div>
                        :
                        <div><SlideImagePreview setPreviewImg={setPreviewImg} images={images} /></div>
                    }
                </div>
                <div>
                    <h2>{tool.toolName}</h2>
                    <div className="detailtool-list">
                        <p>รหัสอุปกรณ์</p>
                        <p>{tool.total}</p>
                    </div>
                    <div className="detailtool-list">
                        <p>จำนวนอุปกรณ์</p>
                        <p>{tool.total}</p>
                    </div>
                    <div className="detailtool-list">
                        <p>ชนิด</p>
                        <p>{tool.type}</p>
                    </div>
                    <div className="detailtool-list">
                        <p>ประเภท</p>
                        <p>{tool.category}</p>
                    </div>
                    <div className="detailtool-list">
                        <p>สถานะ</p>
                        {Number(tool.total) > Number(tool.limit) ?
                            <p>มี</p> :
                            Number(tool.total) === 0 ?
                                <p style={{ color: "red" }}>หมด</p> : <p style={{ color: "orange" }}>กำลังจะหมด</p>
                        }
                    </div>
                    <div className="detailtool-list">
                        <p>การแจ้งเตือนจำนวนอุปกรณ์(จำนวนอุปกรณ์ 58 น้อยกว่า 68 = กำลังจะหมด)</p>
                        <p>{tool.limit}</p>
                    </div>
                    <div className="detailtool-des">
                        <p>รายละเอียดเพิ่มเติม</p>
                        <p>{tool.description}</p>
                    </div>
                    <div className="detailtool-btn">

                        <Link to={`/tool/${tool.id}`}>
                            <Button color="primary" type="button" variant="contained" startIcon={<EditIcon />}>แก้ไข</Button>
                        </Link>
                        <Link to="/tool/list">
                            <Button type="button" variant="contained" startIcon={<ArrowBackIcon />}>กลับ</Button>
                        </Link>

                    </div>
                </div>
            </div>
        </div >
    )
}

export default DetailTool
