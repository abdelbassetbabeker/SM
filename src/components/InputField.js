import React from 'react';
import { useField } from 'formik';
import { TextField } from '@mui/material';

const InputField = ({ label }, props) => {

    const [field, meta] = useField(props.name ? props.name : '');


    // console.log(meta);
    return (
        <TextField
            fullWidth
            label={label}
            {...field}
            {...props}
            error={meta.touched && meta.error}
            helperText="Incorrect entry."

        />
    );
}

export default InputField;


