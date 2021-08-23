import React, { useState, useEffect } from 'react';
import { useDBContext } from '../Config/DBProvider';
import { TableGrid } from '../Layout/TableGrid';

export const Clientes = ()=>{
    const { getDataCollection } = useDBContext();

    useEffect(() => {
        console.log('cliente efect')
        getDataCollection('Clientes')
    },[])

    return  (
        <>
            <h1>Clientes</h1>
            <TableGrid />
        </>
    );

}