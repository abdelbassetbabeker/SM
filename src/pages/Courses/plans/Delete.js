import { Alert } from '@mui/material';
import React from 'react';
import { Button, Loader } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteLevel } from '../../../actions/levelActions';

const Delete = ({ setOpen, id }) => {

    const dispath = useDispatch()

    const {
        loding: deleteLoding,
        error: deleteError,
        success: deleteSuccess
    } = useSelector(state => state.deleteLevel)

    const handleTeacherDeleting = () => {
        dispath(deleteLevel(id))
    }

    return (
        <div>
            {deleteLoding && <Loader active inline='centered'>Loding...</Loader>}
            {deleteSuccess && <Alert severity="success">  Record Deleted With Success</Alert>}
            {deleteError && <Alert severity="error">  There is Error While Deleting This Record Please Try Again Later !  </Alert>}

            <Button type='button' floated='right' loading={deleteLoding} onClick={() => setOpen(false)}>Canel</Button>
            <Button type='button' color='red' onClick={handleTeacherDeleting}>Continue</Button>
        </div>
    );
}

export default Delete;
