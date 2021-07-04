import React from 'react'
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


export default function Input(props) {

    const { name, label, value, handleChange, type, handleShowPassword, autoFocus, ...others } = props;
    return (
        <TextField
            variant="outlined"
            label={label}
            name={name}
            required
            fullWidth
            value={value}
            onChange={handleChange}
            type ={type}
            autoFocus = {autoFocus}
            InputProps={name === 'password' ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {type === 'password' ?  <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              } : null}
            {...others}
        />
    )
}