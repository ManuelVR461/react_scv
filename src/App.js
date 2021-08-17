import React from 'react';
import {ThemeProvider} from '@material-ui/core/styles'
import theme from './themeConfig';
import Layout from './components/Layout/PageLayout'
import { useAuthContext } from './components/Users/AuthContext';
import { BrowserRouter } from "react-router-dom";


function App() {
    const {isAuth} = useAuthContext();
    console.log("detrusture "+ isAuth)

    if(isAuth==null) {
        return (<h1>Cargando...</h1 >)
    }

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Layout/>
            </BrowserRouter>
        </ThemeProvider>

    );
}

export default App;
