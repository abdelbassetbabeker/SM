import { yupResolver } from '@hookform/resolvers/yup';
import { Autocomplete, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { listPlans } from '../../../actions/plansActions';
import * as yup from 'yup';
import { Button } from 'semantic-ui-react';








const schema = yup
    .object()
    .shape({
        plans: yup.object().required('Payment Plan is required'),
        price: yup.number().required('Full Name is required'),
    })
    .required();





const AddPlan = ({ setOpen, setplans }) => {






    const [plansOptions, setPlans] = useState([])
    const dispatch = useDispatch()

    const {
        loding: plansListLoding,
        // error: plansListError,
        plans
    } = useSelector(state => state.listPlans)

    const {
        register,
        handleSubmit,
        control,
        setValue,
        trigger,
        formState: { errors }
    } = useForm(
        {
            resolver: yupResolver(schema)
        }
    );

    useEffect(() => {
        dispatch(listPlans())
    }, [dispatch]);

    useEffect(() => {
        setPlans(() => (plans?.data?.data?.map((item) => ({
            id: item.id,
            label: `${item.name}`,
        }))))
    }, [plansListLoding]);

    const onSubmit = (data) => {
        console.log(data);
        setplans((prev) => [...prev, {
            id: data.plans.id,
            label: data.plans.label,
            price: data.price,
        }])
    }


    return (
        <div>
            <form autoComplete='off' onSubmit={handleSubmit(data => onSubmit(data))} >
                <Controller
                    name='plans'
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
                            options={plansOptions ?? []}
                            renderInput={(params) => (
                                <TextField
                                    error={!!error}
                                    helperText={error?.message || "Select Payment Methods"}
                                    label="Payment Plan"
                                    type="search"
                                    inputRef={ref}
                                    {...params}
                                />
                            )}
                        />
                    )}
                />
                <TextField
                    name='price'
                    label='Price'
                    size='small'
                    type='number'
                    fullWidth
                    {...register('price')}
                    multiline
                    helperText={(errors.price && errors.price.message) || 'Enter The Stander Price For The Selected Payment Plan'}
                    error={Boolean(errors.price)}
                    sx={{
                        margin: "10px 0"
                    }}
                />
                <br />
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

export default AddPlan;
