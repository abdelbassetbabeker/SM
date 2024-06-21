import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Autocomplete, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { addTeacher } from '../../actions/teacherActions';
// import { listCourses } from '../../../actions/coursesActions';
import { Loader } from 'semantic-ui-react';



const schema = yup
    .object()
    .shape({
        lname: yup.string().required('Full Name name is required'),
        fname: yup.string().required('Full Name name is required'),
        salary: yup.number().required('salary is required'),
        sex: yup.string().required('Gander is required'),
        phone1: yup.string("sting").required('Phone is required'),
        phone2: yup.string("sting").required('Phone is required'),
        email: yup.string("email is required").email('enter a valid email ').required('email is required'),
    })
    .required();




const AddTeacher = ({ setOpen }) => {

    const dispatch = useDispatch()

    const formsStyle = {
        margin: '10px 0'
    }


    const {
        loding: teacherLoding,
        error: teacherError,
        teacher: createSuccess,
    } = useSelector(state => state.addTeacher)

    // const {
    //     // loding: coursesLoding,
    //     // error: coursesError,
    //     courses: courseOptions,
    // } = useSelector(state => state.coursesList)

    const courseOptions = []

    useEffect(() => {
        // dispatch(listCourses())
    }, [dispatch]);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm(
        {
            resolver: yupResolver(schema)
        }
    );

    const onSubmit = (data) => {
        console.log(data);
        dispatch(addTeacher(data))
    }

    return (
        <div>
            <div className='max-w-5xl'>
                <div className=''>
                    {teacherLoding && <Loader active inline='centered'>Loding...</Loader>}
                    {createSuccess && <Alert severity="success">{createSuccess.message}</Alert>}
                    {teacherError && <Alert severity="error">{teacherError}</Alert>}
                </div>
                <form autoComplete='off' onSubmit={handleSubmit(data => onSubmit(data))} >
                    <div className='flex gap-5'>
                        <TextField
                            id='lname'
                            name='lname'
                            label='Last Nama'
                            fullWidth
                            size='small'
                            {...register('lname')}
                            multiline
                            helperText={(errors.lname && errors.lname.message) || 'Enter Teacher First Name'}
                            error={Boolean(errors.lname)}
                            sx={formsStyle}
                        />
                        <TextField
                            id='fname'
                            name='fname'
                            label='Family Nama'
                            fullWidth
                            size='small'
                            {...register('fname')}
                            multiline
                            helperText={(errors.fname && errors.fname.message) || 'Enter Teacher Family Name'}
                            error={Boolean(errors.fname)}
                            sx={formsStyle}
                        />
                    </div>
                    <FormControl
                        error={Boolean(errors.sex)}
                        fullWidth
                        size='small'
                    >
                        <InputLabel id="demo-simple-select-error-label">Gender</InputLabel>
                        <Controller
                            name="sex"
                            id="sex"
                            control={control}
                            defaultValue={0} // Set an initial default value
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    label="Gender"
                                >
                                    <MenuItem value={0}>Homme</MenuItem>
                                    <MenuItem value={1}>Femme</MenuItem>
                                </Select>
                            )}
                        />
                        <FormHelperText>{(errors.sex && errors.sex.message) || 'Select Teacher Gender'}</FormHelperText>
                    </FormControl>

                    <div className='flex gap-5'>
                        <TextField
                            id='phone1'
                            name='phone1'
                            label='Phone 01'
                            fullWidth
                            size='small'
                            {...register('phone1')}
                            helperText={(errors.phone1 && errors.phone1.message) || 'Enter Teacher Phone Number'}
                            error={Boolean(errors.phone1)}
                            sx={formsStyle}
                        />
                        <TextField
                            id='phone2'
                            name='phone2'
                            label='Phone'
                            fullWidth
                            size='small'
                            {...register('phone2')}
                            helperText={(errors.phone2 && errors.phone2.message) || 'Enter Additional Teacher Phone Number'}
                            error={Boolean(errors.phone2)}
                            sx={formsStyle}
                        />
                    </div>
                    <TextField
                        type='email'
                        id='email'
                        name='email'
                        label='Email'
                        fullWidth
                        size='small'
                        {...register('email')}
                        helperText={(errors.email && errors.email.message) || 'Enter Teacher Email Address'}
                        error={Boolean(errors.email)}
                        sx={formsStyle}
                    />
                    <TextField
                        type='number'
                        id='salary'
                        name='salary'
                        label='salary'
                        fullWidth
                        size='small'
                        {...register('salary')}
                        helperText={(errors.salary && errors.salary.message) || 'Enter Teacher Salary DZ'}
                        error={Boolean(errors.salary)}
                        sx={formsStyle}
                    />
                    <br />
                    <br />
                    <Button type='submit' color='green'>Submit</Button>
                    <Button type='button' floated='right' onClick={() => setOpen(false)}>Cancel</Button>
                </form>
            </div>
        </div >

    );
}

export default AddTeacher;






















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