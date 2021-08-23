import React from "react";
import { appStyles } from '../Config/AppStyle'
import { AppBar, Toolbar, Typography, IconButton, Badge, Menu, MenuItem, Fade } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
// import MailIcon from '@material-ui/icons/Mail'; Para Validar los correos de los clientes que facturen
// import NotificationsIcon from '@material-ui/icons/Notifications'; Para ver notificaciones de Telegram de clientes

import { Link } from "react-router-dom";

import { useDBContext } from '../Config/DBProvider';

export const NavBar = () => {
    const { logo, headerNav, menuButton } = appStyles();
    const { handleDrawerOpen, subProfile, handlesubProfileOpen, handlesubProfileClose, logout } = useDBContext();
    const open = Boolean(subProfile);
    const menuId = 'primary-search-account-menu';

    const scvLogo = (
        <Typography variant="h6" component="h1" className={logo}>SCV</Typography>
    );

    return (
        <AppBar className={headerNav}>
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
                {/* <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <IconButton aria-label="show 17 new notifications" color="inherit">
                    <Badge badgeContent={17} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton> */}
                <IconButton
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handlesubProfileOpen}
                        color="inherit"
                    >
                    <AccountCircle />
                </IconButton>
                <Menu
                        id="simple-menu"
                        anchorEl={subProfile}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
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
    )
}