import { Alert } from '@mui/material';
import React from 'react';
import { Button, Loader } from 'semantic-ui-react';
import { deleteTeacher } from '../../actions/teacherActions';
import { useDispatch, useSelector } from 'react-redux';

const DeleteTeacher = ({ setDeleteModalopen, id }) => {

    const dispath = useDispatch()

    const {
        loding: deleteLoding,
        error: deleteError,
        success: deleteSuccess
    } = useSelector(state => state.deleteTeacher)

    const handleTeacherDeleting = () => {
        dispath(deleteTeacher(id))
    }

    return (
        <div>
            {deleteLoding && <Loader active inline='centered'>Loding...</Loader>}
            {deleteSuccess && <Alert severity="success">  Record Deleted With Success</Alert>}
            {deleteError && <Alert severity="error">  There is Error While Deleting This Record Please Try Again Later !  </Alert>}

            <Button type='button' floated='right' onClick={() => setDeleteModalopen(false)}>Canel</Button>
            <Button type='button' color='red' onClick={handleTeacherDeleting}>Continue</Button>
        </div>
    );
}

export default DeleteTeacher;
