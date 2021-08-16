import React,{useContext} from 'react';
import { BrowserRouter, Switch, Redirect } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { Login } from "./components/Users/Login";
import { Logout } from "./components/Users/Logout";
import { AuthContext } from './AuthContext';
import { Header } from "./components/Header/Header";
import { Clientes } from './components/Clients/Clientes';
import {ThemeProvider} from '@material-ui/core/styles'
import theme from './themeConfig';

function App() {
    const {isAuth} = useContext(AuthContext)
    console.log("detrusture "+ isAuth)

    if(isAuth==null) {
        return (<h1>Cargando...</h1 >)
    }

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Header/>
                <Switch>
                    {!isAuth && <Login />}
                    {!isAuth && <Redirect to="/Login" />}
                    <Home />
                    <Clientes/>
                    <Logout/>
                </Switch>
            </BrowserRouter>
        </ThemeProvider>

    );
}

export default App;
