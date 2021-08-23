import React from 'react';
import { appStyles } from '../Config/AppStyle';
import { useDBContext } from '../Config/DBProvider';
import { Switch, Redirect, Route } from "react-router-dom";
import { Login } from "../Users/Login";
import { NavBar } from './NavBar';
import { NavLeft } from "./NavLeft";
import Page from './Page';
import { Home } from "../Home/Home";
import { Users } from "../Users/Users";
import { Profile } from '../Users/Profile';
import { Clientes } from '../Clients/Clientes';

const Layout = () => {
     const {isAuth} = useDBContext();
     const { root,offset,content  } = appStyles();


    if(isAuth==null) {
        return (<h1>Verificando Credenciales...</h1 >)
    }

     return (
          <div className={root}>
               {!isAuth && <Login />}
               {!isAuth && <Redirect to="/Login" />}
               {isAuth &&
                    <>
                         <NavBar/>
                         <NavLeft/>
                         <div className={content}>
                              <div className={offset}></div>
                              <Page>
                                   <Switch>
                                        <Route path="/users" exact>
                                             <Users/>
                                        </Route>
                                        <Route path="/Profile" exact>
                                             <Profile/>
                                        </Route>
                                        <Route path="/Home" exact>
                                             <Home />
                                        </Route>
                                        <Route path="/Clients" exact>
                                             <Clientes/>
                                        </Route>
                                   </Switch>
                              </Page>
                         </div>
                    </>
               }
          </div>
     )
}

export default Layout;
