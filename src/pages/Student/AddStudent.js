import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { Loader } from 'semantic-ui-react';
import { addStudent } from '../../actions/studentActions';
import { listLevels } from '../../actions/levelActions';
import dayjs from 'dayjs';



const schema = yup
    .object()
    .shape({
        lname: yup.string().required('Last Name name is required'),
        fname: yup.string().required(' First name is required'),
        sex: yup.string().required('Gander is required'),
        birthdate: yup.date().required('birthdate is required'),
        phone1: yup.string("sting").required('Phone is required'),
        level_id: yup.string("sting").required('Level is required'),
    })
    .required();




const Add = ({ setOpen }) => {

    const dispatch = useDispatch()

    const {
        loding,
        error,
        student,
    } = useSelector(state => state.addStudent)

    const {
        loding: levelsListLoding,
        // error: levelsListError,
        levels
    } = useSelector(state => state.listLevels)

    useEffect(() => {
        dispatch(listLevels())

    }, []);


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
        dispatch(addStudent({ ...data, birthdate: dayjs(data.birthdate).format('YYYY-MM-DD') }))
    }

    return (
        <div>
            <div className='max-w-5xl'>
                <div className=''>
                    {loding && <Loader active inline='centered'>Loding...</Loader>}
                    {student && <Alert severity="success">{student.message}</Alert>}
                    {error && <Alert severity="error">{error}</Alert>}
                </div>
                <form autoComplete='off' onSubmit={handleSubmit(data => onSubmit(data))} >
                    <div className='flex gap-5'>
                        <TextField
                            id='fname'
                            name='fname'
                            label='First Name'
                            fullWidth
                            size='small'
                            {...register('fname')}
                            multiline
                            helperText={(errors.fname && errors.fname.message) || 'Enter Student First Name'}
                            error={Boolean(errors.fname)}
                            sx={formsStyle}
                        />
                        <TextField
                            id='lname'
                            name='lname'
                            label='Last Name'
                            fullWidth
                            size='small'
                            {...register('lname')}
                            multiline
                            helperText={(errors.lname && errors.lname.message) || 'Enter Student Last Name'}
                            error={Boolean(errors.lname)}
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
                                    <MenuItem value={1}>Homme</MenuItem>
                                    <MenuItem value={0}>Femme</MenuItem>
                                </Select>
                            )}
                        />
                        <FormHelperText>{(errors.sex && errors.sex.message) || 'Select Teacher Gender'}</FormHelperText>
                    </FormControl>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <Controller
                                control={control}
                                name='birthdate'
                                render={({ field }) => (
                                    <DatePicker
                                        name="birthdate"
                                        placeholderText='Select date'
                                        onChange={(date) => field.onChange(date)}
                                        selected={field.value}
                                        format="YYYY-MM-DD"
                                        slotProps={{
                                            textField: {
                                                helperText: (errors.birthdate && errors.birthdate.message) || 'Select Your Birth Date ',
                                                size: 'small',
                                                error: Boolean(errors.birthdate),
                                                fullWidth: true
                                            },
                                        }}

                                    />
                                )}
                            />
                        </DemoContainer>
                    </LocalizationProvider>

                    <TextField
                        id='phone1'
                        name='phone1'
                        label='Phone'
                        fullWidth
                        size='small'
                        {...register('phone1')}
                        helperText={(errors.phone1 && errors.phone1.message) || 'Enter Teacher Phone Number'}
                        error={Boolean(errors.phone1)}
                        sx={{ margin: '15px 0' }}
                    />

                    <FormControl
                        error={Boolean(errors.sex)}
                        fullWidth
                        size='small'
                    >
                        <InputLabel id="demo-simple-select-error-label">Level</InputLabel>
                        <Controller
                            name="level_id"
                            control={control}
                            defaultValue={0} // Set an initial default value
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    label="Level"
                                >
                                    {levels?.data?.data?.map((e, i) => (
                                        <MenuItem value={e.id} key={i} >{e.name}</MenuItem>
                                    ))}
                                </Select>
                            )}
                        />
                        <FormHelperText>{(errors.sex && errors.sex.message) || 'Select Student Current Level'}</FormHelperText>
                    </FormControl>

                    <br />
                    <br />
                    <Button type='submit' color='green'>Submit</Button>
                    <Button type='button' floated='right' onClick={() => setOpen(false)}>Cancel</Button>
                </form>
            </div>
        </div >

    );
}

export default Add;

const formsStyle = {
    margin: '10px 0'
}
