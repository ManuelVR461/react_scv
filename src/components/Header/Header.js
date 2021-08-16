import React, { useState, useEffect, useContext } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, Link, Menu, MenuItem, Fade } from "@material-ui/core";
import { useStyles } from "./HeaderStyle";
import MenuIcon from "@material-ui/icons/Menu";
import { Link as RouterLink } from "react-router-dom";
import AuthContext from '../../AuthContext';



export const Header = () => {
    const headersData = [
        {
            label: "Usuarios",
            href: "/users",
        },
        {
            label: "Clientes",
            href: "/clients",
        }
    ];

    const { header,
            logo,
            menuButton,
            drawerContainer,
            offset
        } = useStyles();

    const [state, setState] = useState({
        drawerOpen: false,
        subProfile: null,
    });

    const { drawerOpen, subProfile } = state;

    useEffect(() => {}, []);

    const scvLogo = (
        <Typography variant="h6" component="h1" className={logo}>SCV</Typography>
    );

    const getDrawerChoices = () => {
        return headersData.map(({ label, href }) => {
            return (
                <Link
                    {...{
                        component: RouterLink,
                        to: href,
                        color: "inherit",
                        style: { textDecoration: "none" },
                        key: label,
                    }}
                    >
                    <MenuItem>{label}</MenuItem>
                </Link>
            );
        });
    };

    const handleDrawerOpen = () => setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () => setState((prevState) => ({ ...prevState, drawerOpen: false }));
    const handlesubProfileOpen = (e) => setState((prevState) => ({ ...prevState, subProfile: e.currentTarget }));
    const handlesubProfileClose = () => setState((prevState) => ({ ...prevState, subProfile: null }));

    const open = Boolean(subProfile);

    const displayMobile = () => {
        

        return (
            
        );
    };

    return (
        <header>
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
                        <MenuItem onClick={handlesubProfileClose}>Perfil</MenuItem>
                        <AuthContext.Consumer>
                            {
                                ({logout}) => {
                                    return (
                                        <MenuItem onClick={logout}>Salir</MenuItem>
                                    )
                                }
                            }
                        </AuthContext.Consumer>
                    </Menu>
                    <Drawer
                        {...{
                            anchor: "left",
                            open: drawerOpen,
                            onClose: handleDrawerClose,
                        }}
                        >
                        <div className={drawerContainer}>
                            {getDrawerChoices()}
                        </div>
                    </Drawer>
                </Toolbar>
            </AppBar>
            <div className={offset}></div>
        </header>
    );
}