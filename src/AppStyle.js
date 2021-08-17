import { makeStyles } from "@material-ui/core";
const drawerWidth = 240;

export const appStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    header: {
        //width : `calc(100% - ${drawerWidth}px)`,
        backgroundColor: "#400CCC",
        "@media (max-width: 900px)": {
            paddingLeft: 0,
            marginLeft: drawerWidth,
        },
    },
    logo: {
        fontFamily: "Work Sans, sans-serif",
        fontWeight: 600,
        color: "#FFFEFE",
        textAlign: "left",
        flexGrow:1,

    },
    menuButton: {
        fontFamily: "Open Sans, sans-serif",
        fontWeight: 700,
        size: "18px",
        marginRight:theme.spacing(2),
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
    },
    drawerContainer: {
        width: drawerWidth,
        flexShrink:0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    offset: theme.mixins.toolbar,
    content: {
        flexGrow:1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    }
}));
