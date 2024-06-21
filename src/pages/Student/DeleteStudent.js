import { Alert } from '@mui/material';
import React from 'react';
import { Button, Loader } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteStudent } from '../../actions/studentActions';

const DeleteStudent = ({ setDeleteModal, studentID }) => {

    const dispath = useDispatch()

    const {
        loding,
        error,
        student
    } = useSelector(state => state.deleteStudent)

    const handleTeacherDeleting = async () => {
        await dispath(deleteStudent(studentID))
        await setDeleteModal(false)
        // console.log(studentID);
    }

    return (
        <div>
            {loding && <Loader active inline='centered'>Loding...</Loader>}
            {student && <Alert severity="success">{student.message}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}

            <Button type='button' floated='right' onClick={() => setDeleteModal(false)}>Canel</Button>
            <Button type='button' color='red' onClick={handleTeacherDeleting}>Continue</Button>
        </div>
    );
}

export default DeleteStudent;
