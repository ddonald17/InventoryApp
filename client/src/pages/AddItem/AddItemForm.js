import React , {useEffect} from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../components/controls/Controls";
import { useForm, Form } from '../../components/useForm';


const initialValues ={
    item_name:'',
    category:'',
    buy_price:'',
    stock:''
}

function AddItemForm(props) {

    const { addOrEdit, recordForEdit } = props


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
                        name="item_name"
                        label="Item Name"
                        value={values.item_name}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="Category"
                        name="category"
                        value={values.category}
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
                <Grid xs={6}>
                    <Controls.Input
                        label="Buy Price"
                        name="buy_price"
                        value={values.buy_price}
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        label="Stock"
                        name="stock"
                        value={values.stock}
                        onChange={handleInputChange}
                    />
                </Grid>

             </Grid>
        </Form>
    )
}

export default AddItemForm
