import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const DialogComponent = ({children, open, disagreeFnc, agreeFnc}) => {
    return(
        <Dialog
        open={open}
        onClose={disagreeFnc}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Are you sure ?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           {children}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={disagreeFnc} color="primary">
            Nope
          </Button>
          <Button onClick={agreeFnc} color="secondary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    )
};

export default DialogComponent;