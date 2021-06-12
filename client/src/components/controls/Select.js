import React from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@material-ui/core';

function Select(props) {

    const { name, label, value, onChange, options } = props;

    return (
        <FormControl variant="outlined">
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                label={label}
                name={name}
                value={value}
                onChange={onChange}>
                {
                    options.map(
                        item => (<MenuItem key={item._id} value={item._id}>{item.item_name}</MenuItem>)
                    )
                }
            </MuiSelect>
        </FormControl>
    )
 }

 export default Select;