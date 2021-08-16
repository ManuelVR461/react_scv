import React from 'react';
import AuthContext from '../../AuthContext';

export const Logout = () => {
     return (
          <AuthContext.Consumer>
               {
                    ({logout}) => {
                          return logout;
                    }
               }
          </AuthContext.Consumer>

     )
}