import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Fade } from "@material-ui/core";
import { appStyles } from "../../AppStyle";
import MenuIcon from "@material-ui/icons/Menu";
import { useAuthContext } from '../Users/AuthContext';
import { useNavContext } from "./NavContext";
import { Link } from "react-router-dom";

export const NavBar = () => {
    const { offset } = appStyles();
    return (
        <AppBarMenu />
    );
}

export const AppBarMenu = () => {
    const { handleDrawerOpen,
            subProfile,
            handlesubProfileOpen,
            handlesubProfileClose
        } = useNavContext()

    const {logout} = useAuthContext();

    const open = Boolean(subProfile);

    const { logo, header, menuButton } = appStyles();

    const scvLogo = (
        <Typography variant="h6" component="h1" className={logo}>SCV</Typography>
    );

    return (
        <>
            <AppBar className={header}>
                <Toolbar>
                    <IconButton
                        {...{
                            edge: "start",
                            color: "inherit",
                            "aria-label": "menu",
                            "aria-haspopup": "true",
                            className: menuButton,
                            onClick: handleDrawerOpen,
                        }}
                        >
                        <MenuIcon />
                    </IconButton>
                    {scvLogo}
                    <Button
                        {...{
                            "aria-controls": 'simple-menu',
                            color: "inherit",
                            "aria-haspopup":"true",
                            className: menuButton,
                            onClick: handlesubProfileOpen
                        }}
                        >
                        {'Custom'}
                    </Button>
                    <Menu
                            id="simple-menu"
                            anchorEl={subProfile}
                            keepMounted
                            open={open}
                            onClose={handlesubProfileClose}
                            TransitionComponent={Fade}
                        >
                        <MenuItem onClick={handlesubProfileClose} component={Link} to="/Profile">Perfil</MenuItem>
                        <MenuItem onClick={logout}>Salir</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </>
    );
}