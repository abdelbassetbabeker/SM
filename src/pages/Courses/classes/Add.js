import { yupResolver } from '@hookform/resolvers/yup';
import {
    Alert,
    TextField
} from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { Loader } from 'semantic-ui-react';
import { addClass } from '../../../actions/ClassActions';


const schema = yup
    .object()
    .shape({
        name: yup.string().required('Class Name name is required'),
    })
    .required();




const Add = ({ setOpen }) => {

    const dispatch = useDispatch()

    const {
        loding,
        error,
        class: data
    } = useSelector(state => state.addClass)

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm(
        {
            resolver: yupResolver(schema)
        }
    );

    const onSubmit = (Data) => {
        // console.log(data);
        dispatch(addClass(Data))
    }

    return (
        <div>
            <div className='max-w-5xl'>
                <div className=''>
                    {loding && <Loader active inline='centered'>Loding...</Loader>}
                    {data && <Alert severity="success">{data?.message || 'Add Successfuly '}</Alert>}
                    {error && <Alert severity="error">{error}</Alert>}
                </div>
                <form autoComplete='off' onSubmit={handleSubmit(data => onSubmit(data))} >
                    <TextField
                        name='name'
                        label='Class Name'
                        size='small'
                        fullWidth
                        {...register('name')}
                        multiline
                        helperText={(errors.name && errors.name.message) || 'Enter Class Name Here'}
                        error={Boolean(errors.name)}
                        sx={textFieldStyle}
                    />
                    <br />
                    <br />
                    <Button type='submit' color='green' loading={loding}>Submit</Button>
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

