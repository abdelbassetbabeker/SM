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




import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const schema = yup
    .object()
    .shape({
        lname: yup.string().required('Full Name name is required'),
        fname: yup.string().required('Full Name name is required'),
        salary: yup.number().required('salary is required'),
        sex: yup.string().required('Gander is required'),
        birthdate: yup.date().required('birthdate is required'),
        phone: yup.number("sting").required('Phone is required'),
        email: yup.string("email is required").email('enter a valid email ').required('email is required'),
    })
    .required();




const AddStudent = ({ setOpen }) => {


    const today = new Date();
    const dispatch = useDispatch()

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
                <div className='mb-2'>
                    {teacherLoding && <Loader active inline='centered'>Loding...</Loader>}
                    {createSuccess && <Alert severity="success">{createSuccess.message}</Alert>}
                    {teacherError && <Alert severity="error">{teacherError}</Alert>}
                </div>
                <form autoComplete='off' onSubmit={handleSubmit(data => onSubmit(data))} >
                    {/* <div className='pb-6'>
                        <h3 className='m-1 text-gray-600'>Personal Informations</h3>
                        <p className='text-gray-400'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                    </div> */}
                    {/* <div className='pb-6 flex items-center'>
                        <span className='border border-gray-500  p-2 px-4 rounded-full mr-3'>1</span>
                        <div>
                            <h3 className='m-1 text-gray-600'>Personal Informations</h3>
                            <p className='text-gray-400'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                        </div>
                    </div> */}
                    <div className='flex gap-3 mb-3'>
                        <TextField
                            id='lname'
                            name='lname'
                            label='Last Nama'
                            fullWidth
                            size='small'
                            {...register('lname')}
                            multiline
                            helperText={errors.lname && errors.lname.message || 'Your Family Name Here'}
                            error={Boolean(errors.lname)}
                        />
                        <TextField
                            id='fname'
                            name='fname'
                            label='First Name'
                            size='small'
                            fullWidth
                            {...register('fname')}
                            multiline
                            helperText={errors.fname && errors.fname.message || 'Your Name Here'}
                            error={Boolean(errors.fname)}
                        />
                    </div>
                    <FormControl
                        error={Boolean(errors.sex)}
                        fullWidth
                        size='small'
                        sx={textFieldStyle}
                    >
                        <InputLabel id="demo-simple-select-error-label">Gander</InputLabel>
                        <Controller
                            name="sex"
                            id="sex"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    label="Gander"
                                >
                                    <MenuItem value={0}>Homme</MenuItem>
                                    <MenuItem value={1}>Femme</MenuItem>
                                </Select>
                            )}
                        />
                        <FormHelperText>{errors.sex && errors.sex.message || 'Select Your Gander'}</FormHelperText>
                    </FormControl>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <Controller
                                control={control}
                                name='birthdate'
                                render={({ field }) => (
                                    <DatePicker
                                        placeholderText='Select date'
                                        onChange={(date) => field.onChange(date)}
                                        selected={field.value}
                                        sx={textFieldStyle}
                                        slotProps={{
                                            textField: {
                                                helperText: (errors.birthdate && errors.birthdate.message) || 'Select Your Birth Date ',
                                                size: 'small',
                                                error: Boolean(errors.birthdate),
                                                fullWidth: 'true'
                                            },
                                        }}

                                    />
                                )}

                            />
                        </DemoContainer>
                    </LocalizationProvider>

                    {/* <div className='pb-6 flex items-center'>
                        <span className='border border-gray-500  p-2 px-4 rounded-full mr-3'>2</span>
                        <div>
                            <h3 className='m-1 text-gray-600'>Personal Informations</h3>
                            <p className='text-gray-400'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                        </div>
                    </div> */}
                    <TextField
                        type='number'
                        id='phone'
                        name='phone'
                        label='Phone'
                        fullWidth
                        size='small'
                        {...register('phone')}
                        helperText={(errors.phone && errors.phone.message) || 'Enter Your Phone Number !'}
                        error={Boolean(errors.phone)}
                        sx={textFieldStyle}
                    />
                    <br />
                    {/* <br /> */}
                    <TextField
                        type='email'
                        id='email'
                        name='email'
                        label='Email'
                        fullWidth
                        size='small'
                        {...register('email')}
                        helperText={(errors.email && errors.email.message) || 'Enter Your Email Here'}
                        error={Boolean(errors.email)}
                        sx={textFieldStyle}

                    />
                    <br />
                    <br />
                    <Button type='submit' color='green'>Submit</Button>
                    <Button type='button' floated='right' onClick={() => setOpen(false)}>Cancel</Button>
                </form>
            </div >
        </div >

    );
}

export default AddStudent;














const textFieldStyle = {
    marginTop: '6px',
    marginBottom: '6px'
}







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