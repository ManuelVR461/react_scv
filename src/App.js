import React,{useContext} from 'react';
import { BrowserRouter, Switch, Redirect } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Login } from "./Pages/Login";
import {AuthContext} from './AuthContext';

function App() {
    const {isAuth} = useContext(AuthContext)
    console.log("detrusture "+ isAuth)

    if(isAuth==null) {
        return (<h1>Cargando...</h1 >)
    }

    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    {!isAuth && <Login />}
                    {!isAuth && <Redirect to="/Login" />}
                    <Home />
                </Switch>
            </BrowserRouter>

        </div>

    );
}

export default App;
