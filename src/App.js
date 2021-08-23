import { ThemeProvider } from '@material-ui/core/styles'
import theme from './components/Config/theme';
import { DBProvider, useDBContext } from './components/Config/DBProvider';
import { BrowserRouter } from "react-router-dom";
import Layout from './components/Layout/PageLayout'

const InitApp = () => {
    const {isAuth} = useDBContext();

    if(isAuth==null) {
        return (<h1>Verificando Credenciales...</h1 >)
    }

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Layout />
            </BrowserRouter>
        </ThemeProvider>
    )
}

function App() {

  return (
      <DBProvider>
          <InitApp />
      </DBProvider>
  );
}

export default App;
