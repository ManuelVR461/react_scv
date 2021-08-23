import React, { useEffect, useState } from 'react';
import { TableContainer as TContainer, Table, TableBody as TBody, TableHead as THead ,TableRow, TableCell, Button, Box, IconButton } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import EditIcon from '@material-ui/icons/Edit';

import { appStyles } from '../Config/AppStyle';
import { useDBContext } from '../Config/DBProvider';
import uuid from 'react-uuid';

const TableHead = () => {
    const { Columns } = useDBContext();

    useEffect(() => {
        console.log('TableHead efect')
    },[])

    return (
        <THead>
            <TableRow>
                {Columns.map(item => <TableCell key={item}>{item}</TableCell>)}
                <TableCell>Accion</TableCell>
            </TableRow>
        </THead>
    )
}

const TableAction = () => {
    const { btnIcon  } = appStyles();
    return (
        <>
            <IconButton className={btnIcon} color="secondary" aria-label="Update">
                <EditIcon />
            </IconButton>
            <IconButton className={btnIcon} color="primary" aria-label="Delete">
                <DeleteIcon />
            </IconButton>
        </>
    )
}

const TableBody = () => {
    const { Columns, DataSet} = useDBContext()

    useEffect(() => {
        console.log('TableBody efect')
    },[])

    return (
        <TBody key={uuid()}>
            {
                DataSet.map((item, idat)=> (
                    <TableRow key={idat+1}>
                        {Columns.map((field, icol) => {
                            return <TableCell key={icol}>{item[field]}</TableCell>
                        })}
                        <TableCell>
                            <TableAction />
                        </TableCell>
                    </TableRow>
                ))
            }
        </TBody>
    )
}

const TableContainer = ({children}) => {
    const { ContentRight, btnAddTableGrid  } = appStyles();

    return (
        <TContainer>
            <Box component="div" className={ContentRight}>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    className={{btnAddTableGrid}}
                    startIcon={<AddBoxIcon />}
                >
                    Agregar
                </Button>
            </Box>
            {children}
        </TContainer>

    )
}

export const TableGrid = ({children,...props}) => {
    const { } = useDBContext()

    useEffect(() => {
        console.log('TableGrid efect')

    },[])

    return (
        <TableContainer>
            <Table>
                <TableHead />
                <TableBody />
            </Table>
        </TableContainer>
    )
}