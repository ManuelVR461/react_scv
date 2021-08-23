import { makeStyles } from "@material-ui/core";

const drawerWidth = 240;

export const appStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    headerNav: {
        //width : `calc(100% - ${drawerWidth}px)`,
        backgroundColor: "#400CCC",
        "@media (max-width: 900px)": {
            paddingLeft: 0,
            marginLeft: drawerWidth,
        },
        whiteSpace: 'nowrap',
    },
    logo: {
        fontFamily: "Work Sans, sans-serif",
        fontWeight: 600,
        color: "#FFFEFE",
        textAlign: "left",
        flexGrow:1,

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
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
        },
    },
    offset: theme.mixins.toolbar,
    content: {
        flexGrow:1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    cardLogin: {
      marginTop: theme.spacing(10)
    },
    containerLogin: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      margin: `${theme.spacing(0)} auto`
    },
    btnLogin: {
      marginTop: theme.spacing(2),
      flexGrow: 1
    },
    headerLogin: {
      textAlign: 'center',
      background: '#212121',
      color: '#fff'
    },
    btnAddTableGrid: {
        margin: theme.spacing(1),
    },
    ContentRight: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
    ContentCenter: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    btnIcon: {
        margin: theme.spacing(1),
    }
}));
