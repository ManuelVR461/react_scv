import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    header: {
        backgroundColor: "#400CCC",
        "@media (max-width: 900px)": {
        paddingLeft: 0,
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
        padding: "20px 30px",
    },
    offset: theme.mixins.toolbar,
}));
