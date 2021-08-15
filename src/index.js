import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthContext from "./AuthContext";

ReactDOM.render(
  <AuthContext.Provider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
  </AuthContext.Provider>,
  document.getElementById('root')
);