import axios from '../api/axios';

export const getProducts = () => async(dispatch) => {
    try{
        const {data} = await axios.get("/product");
        dispatch({ type: 'FETCH_ALL', payload: data});
    }catch(error){
        console.log(error.message)
    }
}

export const createProduct = (product) => async(dispatch) =>{
    try {
        const {data} = await axios.post("/product", product);
        dispatch({ type: 'CREATE' , payload: data })
    }catch(error){
        console.log(error);
    }
}

export const updateProduct = (id, product) => async(dispatch) => {
    try{
       const { data } = await axios.patch(`/product/${id}`, product);
        dispatch ({ type: 'UPDATE', payload:data})
    }catch(error){
        console.log(error)
    }
}

export const deleteProduct = (id) => async (dispatch) => {
    try {
        await axios.delete(`/product/${id}`);
        dispatch({ type:'DELETE' ,payload:id})
    } catch (error) {
        console.log(error)
    }
}