import React, { useState } from 'react'
// import { Swiper, SwiperSlide } from 'swiper/react';
// import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Avatar, Badge } from "@material-ui/core"

import './ImageUploadMultiple.css';
// import 'swiper/components/navigation/navigation.scss';
// import 'swiper/swiper.scss';
// import 'swiper/components/pagination/pagination.scss';
// import 'swiper/components/scrollbar/scrollbar.scss';

// SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
    square: {
        margin: "10px 10px 20px 0"
    },
    btnDelete: {
        cursor: "pointer"
    }
}));

function ImageUploadMultiple(props) {

    const classes = useStyles();
    const { files, setFiles } = props;
    const [previewfiles, setPreviewFiles] = useState([]);

    const pickedHandler = e => {
        console.log(e.target.files)
        if (e.target.files) {
            // covert e.target.files to be a new array
            const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
            setPreviewFiles((prevImages) => prevImages.concat(filesArray));
            setFiles(e.target.files);
        }

    }

    const deleteImage = async (image, index) => {
        // set new array of previewfiles variant after deleting a image.
        const delImg = await previewfiles.filter((prevImages) => prevImages !== image);
        const delfile = Array.from(files).filter((res, id) => id !== index);
        // const filterFiles = await files.filter((file) => file.name !==); 

        setPreviewFiles(delImg);
        setFiles(delfile)

        if (delImg.length === 0) {
            setPreviewFiles([]);
            setFiles([]);
        }
    }

    // const renderPhotos = (source) => {
    //     return source.map((photo, index) => {
    //         // return <img src={photo} alt="" key={photo} />
    //         return <SwiperSlide className="slide-img" key={photo} >
    //             <img src={photo} alt="" />
    //             <div className="cancle" onClick={() => deleteImage(photo, index)}><span>x</span></div>
    //         </SwiperSlide>
    //     })
    // }

    const renderPhotos = (source) => {
        return source.map((photo, index) => {
            return (
                <div className={classes.square} key={index}>
                    <Badge color="secondary" badgeContent="x" className={classes.btnDelete} onClick={() => deleteImage(photo, index)} >
                        <Avatar variant="square" src={photo} />
                    </Badge>
                </div>
            )
        })
    }

    return (
        <div className="form-control">
            <h4>Other Images</h4>
            { previewfiles && <div className="uploadMultiple-container">{renderPhotos(previewfiles)}</div>}
            <input
                accept="image/*"
                className={classes.input}
                id="contained-button-files"
                type="file"
                onChange={pickedHandler}
                multiple
            />
            <label htmlFor="contained-button-files">
                <Button variant="contained" color="primary" component="span">
                    Upload Files
                </Button>
            </label>
        </div>
    );
}

export default ImageUploadMultiple
