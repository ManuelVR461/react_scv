import React, { createContext, useState, useMemo, useEffect, useContext, useRef } from 'react';
import firebase from './firebase';
import { useHistory } from "react-router-dom";

const DBContext = createContext()

export const DBProvider = ({children}) => {
    const history = useHistory();
    const auth = firebase.auth();
    const db = firebase.firestore();
    console.log('inicializando...')

    const [state, setState] = useState({
        email: null,
        password: null,
        drawerOpen: false,
        subProfile: null,
        DataSet:[{"DataSet":"dataset not found!"}],
        Columns:["DataSet"],
        showIdCell: true
    });

    const { drawerOpen, subProfile, DataSet, Columns, showIdCell, email, password } = state;

    const [isAuth, setIsAuth] = useState(() => window.sessionStorage.getItem('user'));

    const emailChange = (e) => setState((prevState) => ({ ...prevState, email: e.target.value }));
    const passwordChange = (e) => setState((prevState) => ({ ...prevState, password: e.target.value }));
    const handleDrawerOpen = () => setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () => setState((prevState) => ({ ...prevState, drawerOpen: false }));
    const handlesubProfileOpen = (e) => setState((prevState) => ({ ...prevState, subProfile: e.currentTarget }));
    const handlesubProfileClose = () => setState((prevState) => ({ ...prevState, subProfile: null }));

    const isMountedRef = useRef(true);

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

        return () => {
            isMountedRef.current = false;
        }
    },[])

    useEffect(() => {
        console.log('otro efect')
        handleColumns(DataSet)
    },[DataSet])


    const login = (e)  => {
        e.preventDefault();
        console.log('login');
        if(email && password){
            auth.signInWithEmailAndPassword(email, password)
                .then((res) => {
                    console.log("Haciendo Login...");
                    //console.log(res);
                    if(isMountedRef.current){
                        setIsAuth(true)
                        history.push("/Home");
                    }
                })
                .catch((err) => {
                    console.log(err.message);
                })
        }
    }

    const logout = (e) => {
        e.preventDefault();
        //console.log("logout")
        auth.signOut();
        window.sessionStorage.removeItem('user');
        setIsAuth(false);
    }

    const getDataCollection = (collection) => {
        console.log('getDataCollection')
        const DataRef = db.collection(collection);
        let data = [];
        DataRef.get().then((res) => {
            data = res.docs.map(doc => ({id: doc.id, ...doc.data()}));
            console.log(data);
            setState((prevState) => ({ ...prevState, DataSet: data }));
        })
    }

    const handleColumns= () => {
        console.log('handleColumns')
        if(DataSet.length > 0){

            let cols = Object.keys(DataSet[0]);
            //console.log(cols)
            if(!showIdCell){
               console.log('sin ID')
               cols = cols.filter(c => c.toLowerCase() !== 'id')
            }
            console.log(cols)
            setState((prevState) => ({ ...prevState, Columns: cols }));
        }
    }


    const value = useMemo(() => {
        return {
            drawerOpen,
            subProfile,
            isAuth,
            DataSet,
            Columns,
            showIdCell,
            login,
            logout,
            emailChange,
            passwordChange,
            handleDrawerOpen,
            handleDrawerClose,
            handlesubProfileOpen,
            handlesubProfileClose,
            getDataCollection
        }
    },[drawerOpen, subProfile, isAuth, DataSet, Columns, showIdCell, email, password]);


    return  <DBContext.Provider value={value}>
                {children}
            </DBContext.Provider>
}

export const useDBContext = () => {
    const context = useContext(DBContext);
    if (!context){
        throw new Error("Base de Datos No conectada");
    }
    return context;
}
