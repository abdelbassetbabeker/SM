import {
    Alert,
    TextField
} from '@mui/material';
import React, { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { Loader } from 'semantic-ui-react';
import { addLevel } from '../../../actions/levelActions';


const schema = yup
    .object()
    .shape({
        name: yup.string().required('Name is required'),
        monthes: yup.number().min(1, 'Please Enter Valid Number Of Monthes !').max(12, 'Please Enter Valid Number Of Monthes !').required('Number is required'),
    })
    .required();




const Add = ({ setOpen }) => {

    const dispatch = useDispatch()

    const {
        loding: addingLevelLoding,
        error: addingLevelError,
        level
    } = useSelector(state => state.addLevel)

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm(
        {
            resolver: yupResolver(schema)
        }
    );

    const onSubmit = (data) => {
        // console.log(data);
        dispatch(addLevel(data))
    }

    return (
        <div>
            <div className='max-w-5xl'>
                <div className='mb-2'>
                    {addingLevelLoding && <Loader active inline='centered'>Loding...</Loader>}
                    {level && <Alert severity="success">{level?.message || 'Add Successfuly '}</Alert>}
                    {addingLevelError && <Alert severity="error">{addingLevelError}</Alert>}
                </div>
                <form autoComplete='off' onSubmit={handleSubmit(data => onSubmit(data))} >
                    <TextField
                        name='name'
                        label='Level Name'
                        size='small'
                        fullWidth
                        {...register('name')}
                        multiline
                        helperText={(errors.name && errors.name.message) || 'Enter Course Name Here'}
                        error={Boolean(errors.name)}
                        sx={textFieldStyle}
                    />
                    <TextField
                        name='monthes'
                        type='number'
                        label='Number Of Monthes'
                        size='small'
                        fullWidth
                        {...register('monthes')}
                        helperText={(errors.monthes && errors.monthes.message) || 'Enter Number Of Monthes '}
                        error={Boolean(errors.monthes)}
                        sx={textFieldStyle}
                    />
                    <br />
                    <br />
                    <Button type='submit' color='green' loading={addingLevelLoding}>Submit</Button>
                    <Button type='button' floated='right' onClick={() => setOpen(false)}>Cancel</Button>
                </form>
            </div >
        </div >

    );
}

export default Add;






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











// single select textField  

// <Controller
// name='plan_ids'
// control={control}
// render={({ field: { onChange, value }, fieldState: { error } }) => (
//     <Autocomplete
//         options={plansOptions ?? []}
//         size='small'
//         renderInput={(params) => {
//             return (
//                 <TextField
//                     {...params}
//                     label='Payment Plan'
//                     margin="normal"
//                     variant="outlined"
//                     onChange={onChange}
//                     error={!!error}
//                     helperText={error?.message
//                         ||
//                         <FormHelperText sx={{ margin: '0' }}>
//                             The Payment Is Not In the List ?
//                             <Link to="/teachers">x d  Add Payment </Link>Method.
//                         </FormHelperText>
//                     }
//                 />
//             );
//         }}
//         onChange={(event, values, reason) => onChange(values ? values.id : 'null')}
//     />
// )}
// />