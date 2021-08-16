import React from 'react';
import AuthContext from '../../AuthContext';
import { Button } from '@material-ui/core';

export const Home = () => {
     return (
          <AuthContext.Consumer>
               {
                    ({logout}) => {
                          return (
                              <form onSubmit={logout}>
                                   <h1>Bienvenido</h1>
                                   <br/>
                                   <Button type="submit">Cerrar Session</Button>
                              </form>
                          )
                    }
               }
          </AuthContext.Consumer>

     )
}