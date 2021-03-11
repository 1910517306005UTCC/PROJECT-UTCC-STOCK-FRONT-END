import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Avatar, Badge } from "@material-ui/core"

import './ImageUpload.css';

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
        margin: "20px 0"
    },
    btnDelete: {
        cursor: "pointer"
    }
}));




const ImageUpload = props => {
    const classes = useStyles();

    return (
        <div className="form-control">
            { props.previewUrl &&
                <div className={classes.square}>
                    <Badge color="secondary" badgeContent="x" onClick={props.deleteImage} className={classes.btnDelete} >
                        <Avatar variant="square"  src={props.previewUrl} />
                    </Badge>
                </div>}
            <input
                accept="image/*"
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
                onChange={props.pickedHandler}
            />
            <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                    Upload
                </Button>
            </label>
        </div>
    );
};

export default ImageUpload;