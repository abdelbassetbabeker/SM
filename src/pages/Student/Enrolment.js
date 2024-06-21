
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Autocomplete, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useDispatch, useSelector } from 'react-redux';
import { Button, Loader } from 'semantic-ui-react';
import { listCourses, showCourse } from '../../actions/courseActions';

import LottieAnimationCM from '../../components/lottieAnimation/LottieAnimationCM';
import loderAnimation from '../../lottiefiles/loder.json';

import { enroll } from '../../actions/enrolmentActions';


const schema = yup
    .object()
    .shape({
        plan_id: yup.string().required('Payment Plan is required'),
        course_id: yup.string().required(' Course is required'),
        group_id: yup.string().required('Level is required'),
    })
    .required();




const Enrolment = ({ setOpen, studentID }) => {

    const dispatch = useDispatch()

    const {
        loding: listCoursesLoding,
        // error:,
        courses
    } = useSelector(state => state.coursesList)

    const {
        loding: enrollLoding,
        error: enrollError,
        enrolment
    } = useSelector(state => state.enrolment)

    const {
        loding: showCourseLoding,
        error: showCourseError,
        course
    } = useSelector(state => state.showCourse)

    useEffect(() => {
        console.log(studentID);
        setValue('student_id', studentID)
        dispatch(listCourses())
    }, [dispatch, studentID])

    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
        watch,
        trigger
    } = useForm(
        {
            resolver: yupResolver(schema),
        }
    );

    const [isCourse, setIsCourse] = useState(true)

    useEffect(() => {
        console.log(watch('course_id'));
        dispatch(showCourse(watch('course_id')));
        if (course) {
            setIsCourse(false)
        }
    }, [watch('course_id')]);


    const onSubmit = (data) => {
        console.log(data);
        dispatch(enroll(data))
    }

    return (
        <div>
            <div className='max-w-5xl'>
                <div className=''>
                    {enrollLoding && <Loader active inline='centered'>Loding...</Loader>}
                    {enrollError && <Alert severity="error">{enrollError}</Alert>}
                    {enrolment && <Alert severity="success">{enrolment.message}</Alert>}
                </div>
                {listCoursesLoding && showCourseLoding ?
                    'Loding...'
                    :
                    <form autoComplete='off' onSubmit={handleSubmit(data => onSubmit(data))} >
                        <FormControl
                            error={Boolean(errors.course_id)}
                            fullWidth
                            size="small"
                            sx={{ margin: '10px 0' }}
                        >
                            <InputLabel id="demo-simple-select-error-label">Course</InputLabel>
                            <Controller
                                name="course_id"
                                control={control}
                                defaultValue={courses?.data[0]?.id} // Set the default value here
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        label="Course"
                                    >
                                        {courses?.data?.data?.map((e, i) => (
                                            <MenuItem value={e.id} key={i}>
                                                {e.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                            <FormHelperText>
                                {(errors.course_id && errors.course_id.message) ||
                                    'Select Course To Be Inrolled in '}
                            </FormHelperText>
                        </FormControl>

                        <FormControl
                            error={Boolean(errors.group_id)}
                            fullWidth
                            size="small"
                            sx={{ margin: '10px 0' }}
                        >
                            <InputLabel id="demo-simple-select-error-label">Group</InputLabel>
                            <Controller
                                name="group_id"
                                control={control}
                                defaultValue={course?.data?.groups[0]?.id || ''}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        label="Group"
                                        disabled={isCourse} // Disable when field is empty
                                    >
                                        {course?.data?.groups?.map((e, i) => (
                                            <MenuItem value={e.id} key={i}>
                                                {e.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                            <FormHelperText>
                                {(errors.group_id && errors.group_id.message) || 'Select Group'}
                            </FormHelperText>
                        </FormControl>

                        <FormControl
                            error={Boolean(errors.plan_id)}
                            fullWidth
                            size="small"
                            sx={{ margin: '10px 0' }}
                        >
                            <InputLabel id="demo-simple-select-error-label">Payment Plan</InputLabel>
                            <Controller
                                name="plan_id"
                                control={control}
                                defaultValue={course?.data?.course_plans[0]?.plan.id || ''}
                                render={({ field }) => (
                                    <Select
                                        {...field}
                                        label="Payment Plan"
                                        disabled={isCourse} // Disable when field is empty
                                    >
                                        {course?.data?.course_plans?.map((e, i) => (
                                            <MenuItem value={e.plan.id} key={i}>
                                                {e.plan.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                            <FormHelperText>
                                {(errors.plan_id && errors.plan_id.message) || 'Select Payment Plan'}
                            </FormHelperText>
                        </FormControl>

                        <br />
                        <br />
                        <Button type='submit' color='green'>Submit</Button>
                        <Button type='button' floated='right' onClick={() => setOpen(false)}>Cancel</Button>
                    </form>
                }
            </div>
        </div >

    );
}

export default Enrolment;




// defaultValue={course?.data?.course_plans[0]?.plan?.id || 0}
