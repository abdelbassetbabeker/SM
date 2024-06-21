
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useDispatch, useSelector } from 'react-redux';
import { Button, Loader } from 'semantic-ui-react';


import { addSubscription } from '../../actions/subscriptionActions';


const schema = yup
    .object()
    .shape({
        paid_amount: yup.number().min(1).required(' Payed Amount is required'),
    })
    .required();




const Subscription = ({ setOpen, enrollmentID }) => {

    const dispatch = useDispatch()


    useEffect(() => {
        setValue('enrolment_id', enrollmentID)
    }, [enrollmentID])

    const {
        loading,
        error,
        subscription
    } = useSelector(state => state.addSubscription)

    const {
        handleSubmit,
        setValue,
        formState: { errors },
        watch,
        register
    } = useForm(
        {
            resolver: yupResolver(schema),
        }
    );


    const onSubmit = (data) => {
        console.log(data);
        dispatch(addSubscription(data))
    }

    return (
        <div>
            <div className='max-w-5xl'>
                <div className=''>
                    {loading && <Loader active inline='centered'>Loding...</Loader>}
                    {error && <Alert severity="error">{error}</Alert>}
                    {subscription && <Alert severity="success">{subscription.message}</Alert>}
                </div>
                <form autoComplete='off' onSubmit={handleSubmit(data => onSubmit(data))} >
                    <TextField
                        name='paid_amount'
                        label='Payment'
                        fullWidth
                        size='small'
                        {...register('paid_amount')}
                        multiline
                        type='number'
                        helperText={(errors.paid_amount && errors.paid_amount.message) || 'Enter Payment Amount'}
                        error={Boolean(errors.paid_amount)}
                    />
                    <br />
                    <br />
                    <Button type='submit' color='green' loading={loading}>Submit</Button>
                    <Button type='button' floated='right' onClick={() => setOpen(false)}>Cancel</Button>
                </form>

            </div>
        </div >

    );
}

export default Subscription;




                                // defaultValue={course?.data?.course_plans[0]?.plan?.id || 0}
