import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Autocomplete, Switch, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';
// import { listCourses } from '../../../actions/coursesActions';
import { Loader } from 'semantic-ui-react';

import { addExpense } from '../../actions/expensesActions';
import { listTeachers } from '../../actions/teacherActions';






const AddExpense = ({ setOpen }) => {

    const [isTeacherExpense, setIsTeacherExpense] = React.useState(false)


    const schema = yup
        .object()
        .shape({
            name: yup.string().required(' Title is required'),
            amount: yup.number().min(1, "Please enter a valid amount ").required('Amount is required '),
            notes: yup.string().optional(),
            teacher_id: isTeacherExpense ? yup.object().required('Full Name is required') : yup.object().optional().nullable()
        })
        .required();

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listTeachers())
    }, [dispatch]);



    const {
        loding: teacherListLoding,
        // error: teacherListError,
        teachers
    } = useSelector(state => state.teacherList)

    const [teacherOptions, setTeachers] = React.useState([])

    useEffect(() => {
        setTeachers(() => (teachers?.data?.data?.map((item) => ({
            id: item.id,
            label: `${item.lname} ${item.fname}`
        }))))

    }, [teacherListLoding]);


    const {
        loding,
        error,
        expense
    } = useSelector(state => state.addExpense)


    const {
        register,
        control,
        handleSubmit,
        setValue,
        trigger,
        formState: { errors }
    } = useForm(
        {
            resolver: yupResolver(schema)
        }
    );

    const handleSwitchChange = () => {
        setIsTeacherExpense(() => !isTeacherExpense)
        if (isTeacherExpense) {
            setValue('teacher_id', null)
        }
        console.log(isTeacherExpense);

    }


    const onSubmit = (data) => {

        dispatch(addExpense(
            {
                name: data.name,
                amount: data.amount,
                notes: data.notes,
                teacher_id: data.teacher_id.id,
            }
        ))
        console.log(data);
    }

    return (
        <div>
            <div className='max-w-5xl'>
                <div className='mb-2'>
                    {loding && <Loader active inline='centered'>Loding...</Loader>}
                    {expense && <Alert severity="success">{expense?.message}</Alert>}
                    {error && <Alert severity="error">{error}</Alert>}
                </div>
                <form autoComplete='off' onSubmit={handleSubmit(data => onSubmit(data))} >

                    <TextField
                        id='name'
                        name='name'
                        label='Title'
                        fullWidth
                        size='small'
                        {...register('name')}
                        multiline
                        helperText={(errors.name && errors.name.message) || 'Expense Title !'}
                        error={Boolean(errors.name)}
                        sx={textFieldStyle}
                    />
                    <TextField
                        id='amount'
                        name='amount'
                        label='Amount'
                        size='small'
                        fullWidth
                        {...register('amount')}
                        multiline
                        type='number'
                        helperText={(errors.amount && errors.amount.message) || 'Expense Amount'}
                        error={Boolean(errors.amount)}
                        sx={textFieldStyle}

                    />
                    <TextField
                        type='notes'
                        id='notes'
                        name='notes'
                        label='Additional notes'
                        fullWidth
                        size='small'
                        {...register('notes')}
                        helperText={(errors.notes && errors.notes.message) || 'Enter Your notes Here'}
                        error={Boolean(errors.notes)}
                        sx={textFieldStyle}
                        multiline
                        rows={3}
                    />
                    <Switch
                        label="Switch demo"
                        onChange={handleSwitchChange}
                    // onChange={() => setIsTeacherExpense(() => !isTeacherExpense)}

                    />

                    <Controller
                        name='teacher_id'
                        control={control}
                        render={({ field: { ref, ...field }, fieldState: { error } }) => (
                            <Autocomplete
                                disabled={!isTeacherExpense}
                                {...field}
                                id="tags-outlined"
                                size='small'
                                fullWidth
                                getOptionLabel={(option) => option.label}
                                onChange={(_, value) => field.onChange(value)} // Update the value in the controller's field state
                                value={field.value || null} // Ensure a valid controlled value
                                options={teacherOptions ?? []}
                                renderInput={(params) => (
                                    <TextField
                                        error={!!error}
                                        helperText={error?.message || "Select Teacher "}
                                        label="Teacher"
                                        type="search"
                                        inputRef={ref}
                                        {...params}
                                        sx={textFieldStyle}

                                    />
                                )}
                            />
                        )}
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

export default AddExpense;


const textFieldStyle = {
    marginTop: '10px',
    marginBottom: '8px'
}




