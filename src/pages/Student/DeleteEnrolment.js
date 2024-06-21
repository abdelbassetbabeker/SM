import { Alert } from '@mui/material';
import React from 'react';
import { Button, Loader } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEnrolment } from '../../actions/enrolmentActions';

const DeleteEnrolment = ({ setDeleteModal, enrolmentID }) => {

    const dispath = useDispatch()

    const {
        loding,
        error,
        enrolment
    } = useSelector(state => state.deleteEnrolment)




    const handleDeleting = async () => {
        await dispath(deleteEnrolment(enrolmentID))
        // await setDeleteModal(false)
        // console.log(studentID);
    }

    return (
        <div>
            {loding && <Loader active inline='centered'>Loding...</Loader>}
            {enrolment && <Alert severity="success">{enrolment.message}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}

            <Button type='button' floated='right' onClick={() => setDeleteModal(false)}>Canel</Button>
            <Button type='button' color='red' loading={loding} onClick={handleDeleting}>Continue</Button>
        </div>
    );
}

export default DeleteEnrolment;
