import React from 'react'
import { Snackbar,makeStyles } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useSelector,useDispatch } from 'react-redux';
import { updateAlert } from '../../../../store/admission/ssoSlice';

const AlertBox = () => {

    const { sso } = useSelector(state=>state)
    const dispatch = useDispatch()
    const { alert } = sso;
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') return;
      dispatch(updateAlert({show:false}))
    };
    
    return (
        <>
        <Snackbar open={alert.show} autoHideDuration={2000} onClose={handleClose}>
            <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity={alert.type}>
                { alert.message }
            </MuiAlert>
        </Snackbar>
        {/*
        <Alert severity="error">This is an error message!</Alert>
        <Alert severity="warning">This is a warning message!</Alert>
        <Alert severity="info">This is an information message!</Alert>
        <Alert severity="success">This is a success message!</Alert>
        */}
            
        </>
    )
}

export default AlertBox
