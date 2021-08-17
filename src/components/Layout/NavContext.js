import React, { createContext, useMemo, useState, useContext } from 'react';

const NavContext = createContext();

export const NavProvider = ({children}) => {

    const [state, setState] = useState({
        drawerOpen: false,
        subProfile: null,
    });

    const { drawerOpen, subProfile } = state;

    const handleDrawerOpen = () => setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () => setState((prevState) => ({ ...prevState, drawerOpen: false }));
    const handlesubProfileOpen = (e) => setState((prevState) => ({ ...prevState, subProfile: e.currentTarget }));
    const handlesubProfileClose = () => setState((prevState) => ({ ...prevState, subProfile: null }));

    const value = useMemo(() => {
        return {
            drawerOpen,
            subProfile,
            handleDrawerOpen,
            handleDrawerClose,
            handlesubProfileOpen,
            handlesubProfileClose
        }
    },[drawerOpen, subProfile]);

    return  <NavContext.Provider value={value}>
                {children}
            </NavContext.Provider>
}

export function useNavContext (){
    const context = useContext(NavContext);
    if (!context){
        throw new Error("Context no existe");
    }
    return context;
}