import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthContext from "./AuthContext";

ReactDOM.render(
  <AuthContext.Provider>
      {/* <React.StrictMode> momentaneamente hasta que se soluciones por parte de react */}
        <App />
      {/* </React.StrictMode> */}
  </AuthContext.Provider>,
  document.getElementById('root')
);