import React from 'react';
import { appStyles } from '../Config/AppStyle'
import { useDBContext } from '../Config/DBProvider';
import { Link as RouterLink } from "react-router-dom";
import { Drawer, List,ListItem,ListItemIcon,ListItemText,Divider } from "@material-ui/core";

import HomeIcon from '@material-ui/icons/Home';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

export const NavLeft = () => {
    const { drawerOpen, handleDrawerClose } = useDBContext();
    const { drawerContainer,offset,drawerPaper } = appStyles();
    const headersData = [
                            { label: "Home", href: "/Home", icon: <HomeIcon/> },
                            { label: "Usuarios", href: "/users", icon: <LocalCafeIcon/>},
                            { label: "Clientes", href: "/clients", icon: <PermIdentityIcon/>}
                        ];

    const getDrawerList = () => {
        return headersData.map(({ label, href, icon }) => {
            return (
                <ListItem button
                    {...{
                        component: RouterLink,
                        to: href,
                        color: "inherit",
                        style: { textDecoration: "none" },
                        key: label,
                    }}
                    >
                        <ListItemIcon>
                            {icon}
                        </ListItemIcon>
                    <ListItemText primary={label} />
                </ListItem>
            );
        });
    };

    return (
        <Drawer
            {...{
                anchor: "left",
                open: drawerOpen,
                onClose: handleDrawerClose,
                classes: {
                    paper:drawerPaper
                }
            }}
            >
            <div className={offset}></div>
            <Divider />
            <List component="nav" className={drawerContainer}>
                {getDrawerList()}
            </List>

        </Drawer>
     )
}