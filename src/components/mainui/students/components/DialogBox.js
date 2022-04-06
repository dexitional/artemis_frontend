import { ButtonBase, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@material-ui/core';
import React from 'react'
//import Button from '@mui/material/Button';
//import Dialog from '@mui/material/Dialog';
//import DialogActions from '@mui/material/DialogActions';
//import DialogContent from '@mui/material/DialogContent';
//import DialogContentText from '@mui/material/DialogContentText';
//import DialogTitle from '@mui/material/DialogTitle';
import parse from 'html-react-parser';
import { useSelector,useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateAlert, updateDialog } from '../../../../store/admission/ssoSlice';

const DialogBox = () => {

    const { sso } = useSelector(state=>state)
    const dispatch = useDispatch()
    const { dialog } = sso;
    const history = useHistory()
    
    const handleClickOpen = () => {
      dispatch(updateDialog({show:true}))
    }
    const handleClose = () => {
      dispatch(updateDialog({show:false}))
    }

    const handleAction = () => {
        history.push(dialog.url)
        dispatch(updateDialog({show:false}))

      }
    //title: null, content: null, button:null, url:null
    return (
        <div>
            <Dialog open={dialog.show} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{parse(dialog.title || '')}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">{parse(dialog.content || '')}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    {/*<Button onClick={handleClose}>Disagree</Button>*/}
                    <Button onClick={handleAction} autoFocus>Goto</Button>
                </DialogActions>
            </Dialog>
      </div>
    )
}

export default DialogBox
