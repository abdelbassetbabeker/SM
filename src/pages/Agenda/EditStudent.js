import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Autocomplete, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { editTeacher, showTeacher } from '../../actions/teacherActions';
// import { listCourses } from '../../../actions/coursesActions';
import { Loader } from 'semantic-ui-react';



const schema = yup
    .object()
    .shape({
        lname: yup.string().required('Full Name name is required'),
        fname: yup.string().required('Full Name name is required'),
        salary: yup.number().required('salary is required'),
        sex: yup.string().required('Gander is required'),
        phone: yup.number("sting").required('Phone is required'),
        email: yup.string("email is required").email('enter a valid email ').required('email is required'),
    })
    .required();




const EditStudent = ({ setOpen, id }) => {

    const dispatch = useDispatch()

    const {
        // loding: teacherLoding,
        // error: teacherError,
        teacher,
    } = useSelector(state => state.showTeacher)

    const {
        loding: editTeacherLoding,
        error: editTeacherError,
        teacher: editTeacherSuccess,
    } = useSelector(state => state.editTeacher)

    const {
        register,
        handleSubmit,
        // control,
        formState: { errors },
        setValue
    } = useForm(
        {
            resolver: yupResolver(schema)
        }
    );


    useEffect(() => {
        dispatch(showTeacher(id))
    }, [dispatch, id]);

    useEffect(() => {
        if (teacher) {
            setValue('lname', teacher.teacher.lname);
            setValue('fname', teacher.teacher.fname);
            setValue('sex', teacher.teacher.sex);
            setValue('phone', teacher.teacher.phone);
            setValue('email', teacher.teacher.email);
            // setValue('salary', teacher.teacher.salary);
        }
    }, [teacher]);


    const onSubmit = (data) => {
        console.log(data);
        dispatch(editTeacher(id, data))
    }


    return (
        <div>
            <div className='max-w-5xl'>
                <div className='mb-5'>
                    {editTeacherLoding && <Loader active inline='centered'>Loding...</Loader>}
                    {editTeacherSuccess && <Alert severity="success">{editTeacherSuccess.message || 'done'}</Alert>}
                    {editTeacherError && <Alert severity="error">{editTeacherError}</Alert>}
                </div>
                {teacher ? <form autoComplete='off' onSubmit={handleSubmit(data => onSubmit(data))} >
                    <TextField
                        id='lname'
                        name='lname'
                        label='Last Nama'
                        fullWidth
                        size='small'
                        {...register('lname')}
                        multiline
                        helperText={errors.lname && errors.lname.message}
                        error={Boolean(errors.lname)}
                    />
                    <br />
                    <br />
                    <TextField
                        id='fname'
                        name='fname'
                        label='Family Nama'
                        fullWidth
                        size='small'
                        {...register('fname')}
                        multiline
                        helperText={errors.fname && errors.fname.message}
                        error={Boolean(errors.fname)}
                    />
                    <br />
                    <div className='px-4 py-3 my-5 border border-gray-400 rounded-md'>
                        <select
                            id='sex'
                            name='sex'
                            {...register('sex')}
                            className='w-full'
                        >
                            <option value={1}>Homme</option>
                            <option value={0}>Femme</option>
                        </select>
                    </div>
                    <p className='text-red-400'>
                        {errors.sex && errors.sex.message}
                    </p>
                    <TextField
                        type='number'
                        id='phone'
                        name='phone'
                        label='Phone'
                        fullWidth
                        size='small'
                        {...register('phone')}
                        helperText={errors.phone && errors.phone.message}
                        error={Boolean(errors.phone)}
                    />
                    <br />
                    <br />
                    <TextField
                        type='email'
                        id='email'
                        name='email'
                        label='Email'
                        fullWidth
                        size='small'
                        {...register('email')}
                        helperText={errors.email && errors.email.message}
                        error={Boolean(errors.email)}
                    />
                    <br />
                    <br />
                    <TextField
                        type='number'
                        id='salary'
                        name='salary'
                        label='salary'
                        fullWidth
                        size='small'
                        {...register('salary')}
                        helperText={errors.salary && errors.salary.message}
                        error={Boolean(errors.salary)}
                    />
                    <br />
                    <br />
                    <Button type='submit' color='green'>Submit</Button>
                    <Button type='button' floated='right' onClick={() => setOpen(false)}>Cancel</Button>
                </form>
                    : <Loader active inline='centered'>Loding...</Loader>
                }
            </div>
        </div >

    );
}

export default EditStudent;






// <Controller
// name='course_id'
// control={control}
// render={({ field: { onChange, value }, fieldState: { error } }) => (
//     <Autocomplete
//         className='z-10'
//         options={courseOptions}
//         size='small'
//         renderInput={(params) => {
//             return (
//                 <TextField
//                     {...params}
//                     label='Course'
//                     margin="normal"
//                     variant="outlined"
//                     onChange={onChange}
//                     error={!!error}
//                     helperText={error?.message}
//                 />
//             );
//         }}
//         onChange={(event, values, reason) => onChange(values ? values.value : 'null')}
//     />
// )}
// />