import React, { useState, useEffect } from 'react';
import { useDBContext } from '../Config/DBProvider';
import { TableGrid } from '../Layout/TableGrid';

export const Clientes = ()=>{
    return  (
        <>
            <h1>Clientes</h1>
            <TableGrid
                DataCollection="Clientes"
                showBtnAdd = {true}
                showIdCell = {true}
                editRow = {true}
            />
        </>
    );

}