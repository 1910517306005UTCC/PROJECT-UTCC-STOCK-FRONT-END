import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import { Link } from "react-router-dom";

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    link: {
        paddingLeft: "40px"
    }
});

export default function SlideBar(props) {
    const { Hamburgur, closeHamburgur, openHamburgur } = props;
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    // const [Hamburgur, setHamburgur] = React.useState(false);

    // const closeHamburgur = () => {
    //     setHamburgur(false);
    // }

    // const openHamburgur = () => {
    //     setHamburgur(true);
    // }

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem button>
                    <Link className={classes.link} to="/">All Tool</Link>
                </ListItem>
                <ListItem button>
                    <Link className={classes.link} to="/tool/new">Add Tool</Link>
                </ListItem>
                <ListItem button>
                    <Link className={classes.link} to="/">history of Tool</Link>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button>
                    <Link className={classes.link} to="/board/list">All Board</Link>
                </ListItem>
                <ListItem button>
                    <Link className={classes.link} to="/board/new">Add Board</Link>
                </ListItem>
                <ListItem button>
                    <Link className={classes.link} to="/project/new">Add Project</Link>
                </ListItem>
                <ListItem button>
                    <Link className={classes.link} to="/board/request">Request Board</Link>
                </ListItem>
                <ListItem button>
                    <Link className={classes.link} to="/">history of Board</Link>
                </ListItem>
                <ListItem button>
                    <Link className={classes.link} to="/">history of Project</Link>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button>
                    <Link className={classes.link} to="/">อุปกรณ์ไม่ครบ</Link>
                </ListItem>
            </List>
        </div>
    );

    return (
        <div>
            {/* <Button onClick={openHamburgur}>open</Button> */}
            <Drawer anchor='left' open={Hamburgur} onClose={closeHamburgur}>
                {list('left')}
            </Drawer>
        </div>
    );
}