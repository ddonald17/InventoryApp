import axios from '../api/axios';

export const getTransactions = () => async(dispatch) => {
    try{
        const {data} = await axios.get("/transaction");
        dispatch({ type: 'FETCH_ALL', payload: data});
    }catch(error){
        console.log(error.message)
    }
}

export const createTransactions = (transaction) => async(dispatch) =>{
    try {
        const {data} = await axios.post("/transaction", transaction);
        dispatch({ type: 'CREATE' , payload: data })
    }catch(error){
        console.log(error);
    }
}

// export const updateTransactions = (id, transaction) => async(dispatch) => {
//     try{
//        const { data } = await axios.patch(`/transaction/${id}`, transaction);
//         dispatch ({ type: 'UPDATE', payload:data})
//     }catch(error){
//         console.log(error)
//     }
// }

// export const deleteTransaction = (id) => async (dispatch) => {
//     try {
//         await axios.delete(`/transaction/${id}`);
//         dispatch({ type:'DELETE' ,payload:id})
//     } catch (error) {
//         console.log(error)
//     }
// }