import { yupResolver } from '@hookform/resolvers/yup';
import { Autocomplete, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { Button } from 'semantic-ui-react';
import { listTeachers } from '../../../actions/teacherActions';
import { listLevels } from '../../../actions/levelActions';








const schema = yup
    .object()
    .shape({
        name: yup.string().required('Payment Plan is required'),
        teacher: yup.object().required('Full Name is required'),
    })
    .required();





const AddGroup = ({ setOpen, setGroups }) => {



    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listTeachers())
    }, [dispatch]);

    const {
        loding: teacherListLoding,
        // error: teacherListError,
        teachers
    } = useSelector(state => state.teacherList)

    const [teacherOptions, setTeachers] = useState([])

    useEffect(() => {
        setTeachers(() => (teachers?.data?.data?.map((item) => ({
            id: item.id,
            label: `${item.lname} ${item.fname}`
        }))))

    }, [teacherListLoding]);

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors }
    } = useForm(
        {
            resolver: yupResolver(schema)
        }
    );


    const onSubmit = (data) => {
        console.log(data);
        setGroups((prev) => [...prev, {
            name: data.name,
            teacher_id: data.teacher.id,
            teacher: data.teacher.label
        }])
    }


    return (
        <div>
            <form autoComplete='off' onSubmit={handleSubmit(data => onSubmit(data))} >
                <TextField
                    name='name'
                    label='Group Name'
                    size='small'
                    fullWidth
                    {...register('name')}
                    multiline
                    helperText={(errors.name && errors.name.message) || 'Enter Course Name Here'}
                    error={Boolean(errors.name)}
                    sx={{ margin: '10px 0' }}
                />
                <Controller
                    name='teacher'
                    control={control}
                    render={({ field: { ref, ...field }, fieldState: { error } }) => (
                        <Autocomplete
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
                                />
                            )}
                        />
                    )}
                />

                {/* <Controller
                    name='level'
                    control={control}
                    render={({ field: { ref, ...field }, fieldState: { error } }) => (
                        <Autocomplete
                            {...field}
                            id="tags-outlined"
                            size='small'
                            fullWidth
                            getOptionLabel={(option) => option.label}
                            onChange={(_, value) => field.onChange(value)} // Update the value in the controller's field state
                            value={field.value || null} // Ensure a valid controlled value
                            options={levelsOptions ?? []}
                            renderInput={(params) => (
                                <TextField
                                    error={!!error}
                                    helperText={error?.message || "Select Level "}
                                    label="Level"
                                    type="search"
                                    inputRef={ref}
                                    {...params}
                                    sx={{ margin: '10px 0' }}

                                />
                            )}
                        />
                    )}
                /> */}


                <br />
                <Button floated='right' color='green'>
                    Submit
                </Button>
                <Button
                    type='button'
                    onClick={() => setOpen(false)}
                >
                    Cancel
                </Button>
            </form>
        </div>
    );
}

export default AddGroup;
