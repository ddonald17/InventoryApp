import React from 'react'
import { TextField } from '@material-ui/core';

export default function Input(props) {

    const { name, label, value, onChange, ...others } = props;
    return (
        <TextField
            variant="outlined"
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            {...others}
        />
    )
}