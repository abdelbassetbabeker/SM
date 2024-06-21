import { Autocomplete, TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

const AutoCompleteField = ({ control, options, name, label }) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={[]}
            render={({ field: { ref, ...field }, fieldState: { error } }) => (
                <Autocomplete
                    {...field}
                    size='smal'
                    fullWidth
                    multiple
                    getOptionDisabled={(option) => option.disabled}
                    getOptionLabel={(option) => option.label}
                    id="days-autocomplete"
                    onChange={(_, value) => field.onChange(value)}
                    options={options ?? []}
                    renderInput={(params) => (
                        <TextField
                            error={!!error}
                            helperText={error?.message}
                            id={name}
                            label={label}
                            name={name}
                            type="search"
                            inputRef={ref}
                            {...params}
                        />
                    )}
                />
            )}
        />
    );
}

export default AutoCompleteField;
