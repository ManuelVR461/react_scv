import React, { useEffect, useState } from 'react';
import { LinearProgress, TableContainer as TContainer, Table, TableBody as TBody, TableHead as THead ,TableRow, TableCell } from '@material-ui/core';
import { Typography, Button, Box, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import { appStyles } from '../Config/AppStyle';
import { useDBContext } from '../Config/DBProvider';
import uuid from 'react-uuid';



const ConfirmButton = () => {
    const { btnIcon  } = appStyles();
    return (
        <IconButton key={uuid()} className={btnIcon} color="secondary" aria-label="Done" onClick={() => { alert('clicked Ok') }}>
            <DoneIcon />
        </IconButton>
    );
}

const CancelButton = () => {
    const { btnIcon  } = appStyles();
    const { handleCancelRow } = useDBContext();

    return (
        <IconButton key={uuid()} className={btnIcon} color="secondary" aria-label="Done" onClick={() => handleCancelRow()}>
            <ClearIcon />
        </IconButton>
    );
}


const DeleteButton = () => {
    const { btnIcon  } = appStyles();

    return (
        <IconButton key={uuid()} className={btnIcon} color="secondary" aria-label="Delete" onClick={() => {alert('clicked Delete') }}>
            <DeleteIcon />
        </IconButton>
    );
}

const DialogForm = () => {
    const { handleCloseDialog, openDialog, DialogMode, idRowSelected } = useDBContext();
    const [newData, setNewData] = useState({Cliente:null,Rut:null,Monto:null})

    const handleClose = () => {
        handleCloseDialog()
    };

    console.log(idRowSelected)

    const btnAction = (DialogMode === 'Add')? 'Agregar':'Actualizar';

    const handleFormItemClick = () => {
        console.log(newData);
    };

    const handleChangeName = (e) => setNewData((prevState) => ({ ...prevState, Cliente: e.target.value }));
    const handleChangeRut = (e) => setNewData((prevState) => ({ ...prevState, Rut: e.target.value }));
    const handleChangeMonto = (e) => setNewData((prevState) => ({ ...prevState, Monto: e.target.value }));

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={openDialog}>
            <DialogTitle id="simple-dialog-title">Nuevo Cliente</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Nombre Cliente"
                    type="text"
                    fullWidth
                    onChange={ handleChangeName }
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="rut"
                    label="Rut Cliente"
                    type="text"
                    fullWidth
                    onChange={ handleChangeRut }
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="monto"
                    label="Monto"
                    type="text"
                    fullWidth
                    onChange={ handleChangeMonto }
                />

            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={() => handleFormItemClick('agregar')}>{btnAction}</Button>
                <Button onClick={handleClose} color="primary">Cancelar</Button>
            </DialogActions>
        </Dialog>
    )

}

const EditButton = (props) => {
    const { btnIcon  } = appStyles();
    const { handleOpenDialog, setDialogMode, handleIdRowSelected } = useDBContext();
    console.log(props)

    const handleOpenDialogEdit = () => {
        setDialogMode('update');
        handleOpenDialog();
        handleIdRowSelected(props.id)
    }

    return (
        <IconButton key={props.id} className={btnIcon} color="secondary" aria-label="Edit" onClick={() => handleOpenDialogEdit() }>
            <EditIcon />
        </IconButton>
    );
}

const TableAction = (props) => {
    const { editRow } = useDBContext();

    return (
        <Box key={uuid()} component="div">
            { editRow && <EditButton {...props} /> }
            <DeleteButton />
        </Box>
    )
}

const TableBody = () => {
    const { Columns, DataSet } = useDBContext()

    const RowsBody = () => {
        return (
            DataSet.map((item, idat)=> (
                <TableRow key={idat+1}>
                    {Columns.map((field, icol) => {
                        return <TableCell key={icol}>{item[field]}</TableCell>
                    })}
                    <TableCell>
                        <TableAction id={item.id} />
                    </TableCell>
                </TableRow>
            ))
        )
    }

    return (
        <TBody key={uuid()}>
               { (Columns.length > 0 && DataSet.length > 0) && <RowsBody /> }
        </TBody>
    )
}

const TableHead = () => {
    const { Columns } = useDBContext();

    const RowsHead = () => {
        return (
            <TableRow>
                    {Columns.map(item => <TableCell key={item}>{item}</TableCell>)}
                    <TableCell>Accion</TableCell>
            </TableRow>
        )
    }

    const Loading = () => {
        return (
            <>
                <Typography variant="caption" component="div" color="textSecondary">Cargando...</Typography>
                <LinearProgress />
            </>
        )
    }

    return (
        <THead>
            { (Columns.length > 0) ? <RowsHead /> : <Loading /> }
        </THead>
    )
}

const TableContainer = ({children}) => {
    const { showbtnAdd, handleOpenDialog, setDialogMode } = useDBContext();
    const { ContentRight, btnAddTableGrid  } = appStyles();

    const handleOpenDialogAdd= () => {
        setDialogMode('Add');
        handleOpenDialog()
    }

    return (
        <TContainer>
            <Box component="div" className={ContentRight}>
                { showbtnAdd && <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    className={btnAddTableGrid}
                                    startIcon={<AddBoxIcon />}
                                    onClick={handleOpenDialogAdd}
                                >
                                    Agregar
                                </Button> }
            </Box>
            {children}
        </TContainer>

    )
}

export const TableGrid = ({children,...props}) => {
    const { getDataCollection,
            handleshowbtnAdd,
            handleshowIdCell,
            handleEditRow } = useDBContext()

    const { DataCollection, showBtnAdd, showIdCell, editRow } = props

    useEffect(() => {
        if(DataCollection){
            getDataCollection('Clientes')
        }
        if(showBtnAdd){
            handleshowbtnAdd()
        }
        if(showIdCell){
            handleshowIdCell()
        }
        if(editRow){
            handleEditRow()
        }
    },[])

    return (
        <TableContainer>
            <Table>
                <TableHead />
                <TableBody />
            </Table>
            <DialogForm />
        </TableContainer>
    )
}