import React from 'react';
import { appStyles } from '../../AppStyle';

import { NavProvider } from "./NavContext";
import { NavBar } from './NavBar';
import { NavLeft } from "./NavLeft";

import { useAuthContext } from '../Users/AuthContext';
import { Switch, Redirect, Route } from "react-router-dom";

import { Home } from "../Home/Home";
import { Users } from "../Users/Users";
import { Login } from "../Users/Login";
import { Clientes } from '../Clients/Clientes';
import { Profile } from '../Users/Profile';

const Layout = () => {
     const {isAuth} = useAuthContext();
     const { root,offset,content } = appStyles();

     return (
          <div className={root}>
               <NavProvider>
                    <NavBar/>
                    <NavLeft />
               </NavProvider>
               <div className={content}>
                    <div className={offset}></div>
                    <Switch>
                         {!isAuth && <Login />}
                         {!isAuth && <Redirect to="/Login" />}
                         <Route path="/Home" exact>
                              <Home />
                         </Route>
                         <Route path="/users" exact>
                              <Users/>
                         </Route>
                         <Route path="/Clients" exact>
                              <Clientes/>
                         </Route>
                         <Route path="/Profile" exact>
                              <Profile/>
                         </Route>
                    </Switch>
               </div>
          </div>
     )
}

export default Layout;
