import React from 'react';
import {DialogActions,
        Button} from '@material-ui/core';

class HandleClosing extends React.Component {
    render() {
        const { handleClose } = this.props;

        return(
            
            <DialogActions>
                <Button autoFocus onClick={ handleClose } color="primary">
                    Cancel
                </Button>
                <Button autoFocus onClick={ handleClose } color="primary">
                    Done
                </Button>
            </DialogActions>
        )
    }
}

export default HandleClosing;