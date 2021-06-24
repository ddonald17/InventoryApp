import React , {useEffect, useState} from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';
import { useSelector, useDispatch } from 'react-redux';


const initialValues ={
    cust_name:'',
    cust_address:'',
    quantity:'',
    product:'',
    sell_price:''
}

function AddTransactionForm(props) {

    const { addOrEdit, recordForEdit } = props;
    const products = useSelector((state) => state.products);



    const handleSubmit = e => {
        e.preventDefault();
        addOrEdit(values, resetForm)
    }

    const {
        values,
        setValues,
        handleInputChange,
        resetForm
    } = useForm(initialValues);

    useEffect(()=> {
        if(recordForEdit != null)
        setValues({...recordForEdit})
    },[recordForEdit])

    return (
        <Form onSubmit={handleSubmit}>
             <Grid container>
                <Grid item xs={6}>
                    <Controls.Input
                        name="cust_name"
                        label="Customer Name"
                        value={values.cust_name}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="Address"
                        name="cust_address"
                        value={values.cust_address}
                        onChange={handleInputChange}
                    />
                   
                    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>

                </Grid>
                <Grid item xs={6}>
                    <Controls.Select
                        name="item"
                        label="Product"
                        value={products._id}
                        onChange={handleInputChange}
                        options={products}
                    />
                     <Controls.Input
                        label="Quantity"
                        name="quantity"
                        value={values.quantity}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="Price"
                        name="sell_price"
                        value={values.sell_price}
                        onChange={handleInputChange}
                    />
                </Grid>
             </Grid>
        </Form>
    )
}

export default AddTransactionForm
