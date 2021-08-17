import React, { createContext, useState, useEffect, useContext } from 'react';
import firebase from '../../firebase';


const AuthContext = createContext()

export const UserProvider = ({children}) => {
    const auth = firebase.auth();
    const [email, setEmail]= useState();
    const [password, setPassword]= useState();

    const [isAuth, setIsAuth] = useState(() => {
        console.log("verificando si hay datos...");
        let datauser = window.sessionStorage.getItem('user');
        console.log("hay "+datauser+" en datos");
        return  datauser;
    });

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user=>{
            if (user) {
                console.log("logieee")
                window.sessionStorage.setItem('user', JSON.stringify(user));
                setIsAuth(true)
            } else {
                console.log("no estoy login")
                window.sessionStorage.removeItem('user');
                setIsAuth(false)
            }
        });
    },[])

    const emailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
    }

    const passwordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
    }

    const login = (e) => {
        e.preventDefault();
        //auth.setPersistence('none')
        auth.signInWithEmailAndPassword(email, password)
            .then((res) => {
                console.log("Haciendo Login...");
                console.log(res);
                setIsAuth(true)
            })
            .catch((err) => {
                console.log(err.message);
            })
    }

    const logout = (e) => {
        console.log("logout")
        e.preventDefault();
        auth.signOut();
        window.sessionStorage.removeItem('user');
        setIsAuth(false);
    }

    return <AuthContext.Provider value={{
            isAuth,
            login,
            logout,
            emailChange,
            passwordChange
        }}>
        {children}
    </AuthContext.Provider>
}

export function useAuthContext (){
    const context = useContext(AuthContext);
    if (!context){
        throw new Error("Context no existe");
    }
    return context;
}