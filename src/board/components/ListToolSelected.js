import React from 'react'
import { ListItem, ListItemText, ListItemSecondaryAction, List, IconButton } from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
    listSelected: {
        border: "1px solid #ccc",
        borderRadius: "5px",
        margin: "10px 0"
    }
}));

function ListToolSelected(props) {

    const classes = useStyles();

    return (
        <div className={classes.demo}>
            { props.toolSelected.length === 0 ? <div> </div> :
                <List className={classes.listSelected}>
                    {props.toolSelected.map((item) => (
                        <ListItem key={item.id}>
                            <ListItemText
                                primary={item.toolName}
                                secondary={`จำนวน ${item.total}`}
                            />
                            <ListItemSecondaryAction onClick={() => props.deleteTool(item.id)}>
                                <IconButton edge="end" aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
            }
        </div>
    )
}

export default ListToolSelected
