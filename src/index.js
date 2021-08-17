import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { UserProvider } from './components/Users/AuthContext';

ReactDOM.render(
  <UserProvider>
      {/* <React.StrictMode> momentaneamente hasta que se soluciones por parte de react */}
        <App />
      {/* </React.StrictMode> */}
  </UserProvider>,
  document.getElementById('root')
);