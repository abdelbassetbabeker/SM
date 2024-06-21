import { Alert } from '@mui/material';
import React from 'react';
import { Button, Loader } from 'semantic-ui-react';
import { deleteTeacher } from '../../actions/teacherActions';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCourse } from '../../actions/courseActions';

const Delete = ({ setDeleteModal, id }) => {

    const dispath = useDispatch()

    const {
        loding,
        error,
        course
    } = useSelector(state => state.deleteCourse)

    const handleTeacherDeleting = async () => {
        await dispath(deleteCourse(id))
        await setDeleteModal(false)
    }

    return (
        <div>
            {loding && <Loader active inline='centered'>Loding...</Loader>}
            {error && <Alert severity="error">  There is Error While Deleting This Record Please Try Again !  </Alert>}
            {course && <>
                <Alert severity="success">  Record Deleted With Success</Alert>
                <br />
            </>
            }

            <Button
                type='button'
                floated='right'
                onClick={() => setDeleteModal(false)}
            >
                Canel
            </Button>
            <Button
                loading={loding}
                type='button'
                color='red'
                onClick={handleTeacherDeleting}
            >
                Proceed
            </Button>
        </div>
    );
}

export default Delete;
