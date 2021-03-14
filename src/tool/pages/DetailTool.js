import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { toolItem } from "../../Api"
import { Avatar, Button } from "@material-ui/core"

import "./DetailTool.css"
import { SlideImagePreview } from '../../shared/components/UIElements/SlideImagePreview';

function DetailTool() {

    // const toolId = useParams().tid
    const [tool] = useState(toolItem);
    const [previewImg, setPreviewImg] = useState(tool.imageProfile)
    const [images] = useState(tool.images);

    return (
        <div>
            <h1>Tool Detail</h1>

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
                        <p>Tool Code</p>
                        <p>{tool.total}</p>
                    </div>
                    <div className="detailtool-list">
                        <p>total</p>
                        <p>{tool.total}</p>
                    </div>
                    <div className="detailtool-list">
                        <p>type</p>
                        <p>{tool.type}</p>
                    </div>
                    <div className="detailtool-list">
                        <p>category</p>
                        <p>{tool.category}</p>
                    </div>
                    <div className="detailtool-list">
                        <p>status</p>
                        <p>{tool.status}</p>
                    </div>
                    <div className="detailtool-list">
                        <p>limit</p>
                        <p>{tool.limit}</p>
                    </div>
                    <div className="detailtool-des">
                        <p>description</p>
                        <p>{tool.description}</p>
                    </div>
                    <div className="detailtool-btn">
                        <Button
                            color="primary"
                            type="button"
                            variant="contained"
                        >
                            <Link to={`/tool/${tool.id}`}>Edit</Link>
                        </Button>
                        <Button
                            type="button"
                            variant="contained"
                        >
                            <Link to="/">Back</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DetailTool
