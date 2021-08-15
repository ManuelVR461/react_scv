import React, { useState } from 'react';
import Context from '../../Context'

const UserAuth = (props) => {
    const [isAuth, setIsAuth] = useState(false)

    const activateAuth = () => {
        setIsAuth(true)
    }

    return (
        <Context.Provider value={{
                isAuth,
                estado:"estado",
                activateAuth
            }}>
            {props.children}
        </Context.Provider>
    );
}

export default UserAuth;
