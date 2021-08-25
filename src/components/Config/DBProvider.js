import React, { createContext, useState, useMemo, useEffect, useContext, useRef } from 'react';
import firebase from './firebase';
import { useHistory } from "react-router-dom";

const DBContext = createContext()

export const DBProvider = ({children}) => {
    const history = useHistory();
    const auth = firebase.auth();
    const db = firebase.firestore();
    //console.log('inicializando...')

    const [state, setState] = useState({

        //user
        email: null,
        password: null,


        //navbar
        drawerOpen: false,
        subProfile: null,

        //tablegrid
        DataSet:[],
        Columns:[],
        showIdCell: false,
        showbtnAdd: false,
        editRow: false,
        openDialog: false,
        idRowSelected : null
    });

    const { email,password,
            drawerOpen, subProfile,
            DataSet, Columns,showIdCell, showbtnAdd, editRow, openDialog, idRowSelected,
        } = state;

    const [isAuth, setIsAuth] = useState(() => window.sessionStorage.getItem('user'));

    //User
    const emailChange = (e) => setState((prevState) => ({ ...prevState, email: e.target.value }));
    const passwordChange = (e) => setState((prevState) => ({ ...prevState, password: e.target.value }));

    //NavBar
    const handleDrawerOpen = () => setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () => setState((prevState) => ({ ...prevState, drawerOpen: false }));
    const handlesubProfileOpen = (e) => setState((prevState) => ({ ...prevState, subProfile: e.currentTarget }));
    const handlesubProfileClose = () => setState((prevState) => ({ ...prevState, subProfile: null }));

    //TableGrid
    const [ DialogMode, setDialogMode] = useState('Add');
    const handleshowbtnAdd = () => setState((prevState) => ({ ...prevState, showbtnAdd: true }));
    const handleshowIdCell = () => setState((prevState) => ({ ...prevState, showIdCell: true }));
    const handleEditRow= () => setState((prevState) => ({ ...prevState, editRow: true }));
    const handleOpenDialog = () => setState((prevState) => ({ ...prevState, openDialog: true }));
    const handleCloseDialog = () => setState((prevState) => ({ ...prevState, openDialog: false }));
    const handleIdRowSelected = (id) => setState((prevState) => ({ ...prevState, idRowSelected: id }));

    const isMountedRef = useRef(true);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user=>{
            if (user) {
               //console.log("logieee")
                window.sessionStorage.setItem('user', JSON.stringify(user));
                setIsAuth(true)
            } else {
                //console.log("no estoy login")
                window.sessionStorage.removeItem('user');
                setIsAuth(false)
            }
        });

        return () => {
            isMountedRef.current = false;
        }
    },[])

    const login = (e)  => {
        e.preventDefault();
        //console.log('login');
        if(email && password){
            auth.signInWithEmailAndPassword(email, password)
                .then((res) => {
                    //console.log("Haciendo Login...");
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



    // const putDataCollection = (collection) => {
    //     db.collection(collection).add({
    //         Cliente: 'Nuevo',
    //         Rut: '1234567890-0',
    //         Monto: 0,
    //         datetime: firebase.firestore.FieldValue.serverTimestamp()
    //     })
    // }

    // const delDataCollection = (collection, id) => {
    //     db.collection(collection).doc(id).delete().then(res => {
    //         console.log('Deleted!', res);
    //     });
    // }

    // const setDataCollection = (collection) => {
    //     db.collection(collection).doc(id).update({
    //         Cliente: 'Nuevo',
    //         Rut: '1234567890-0',
    //         Monto: 0,
    //         datetime: firebase.firestore.FieldValue.serverTimestamp()
    //     });
    // }


    useEffect(() => {
        handleColumns(DataSet)
    },[DataSet])

    const handleColumns= () => {
        console.log('handleColumns')
        if(DataSet.length > 0){
            let cols = Object.keys(DataSet[0]);
            if(!showIdCell){
               cols = cols.filter(c => c.toLowerCase() !== 'id')
            }
            setState((prevState) => ({ ...prevState, Columns: cols }));
        }
    }

    const getDataCollection = (collection) => {
        console.log("getdatacollection")
        const DataRef = db.collection(collection).orderBy('datetime', 'desc');
        DataRef.onSnapshot(snapshot => {
            let data = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
            data.forEach(d => {d.datetime = d.datetime.toDate().toDateString()})
            setState((prevState) => ({...prevState, DataSet: data }))
        },(error) => {
            console.log(error)
        });
    }

    const value = useMemo(() => {
        return {
            //user
            isAuth,
            login,
            logout,
            emailChange,
            passwordChange,

            //NavBar
            drawerOpen,
            subProfile,
            handleDrawerOpen,
            handleDrawerClose,
            handlesubProfileOpen,
            handlesubProfileClose,

            //tableGrid
            DataSet,
            Columns,
            showIdCell,
            showbtnAdd,
            editRow,
            openDialog,
            DialogMode,
            idRowSelected,
            getDataCollection,
            handleshowbtnAdd,
            handleshowIdCell,
            handleEditRow,
            handleOpenDialog,
            handleCloseDialog,
            setDialogMode,
            handleIdRowSelected
        }
    },[ isAuth,email, password,
        drawerOpen, subProfile,
        DataSet, Columns, showIdCell, showbtnAdd, editRow, openDialog, DialogMode, idRowSelected ]);


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
