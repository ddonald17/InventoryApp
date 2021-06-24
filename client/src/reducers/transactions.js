export default  ( (ṭransactions = [], action) =>{
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE':
            return [...ṭransactions, action.payload];

        // case 'UPDATE':
        //     return ṭransactions.map((ṭransaction) => ṭransaction._id == action.payload._id ? action.payload : transaction)
        // case 'DELETE':
        //     return ṭransactions.filter((ṭransaction) => ṭransaction._id !=action.payload);
        default:
            return ṭransactions;
    }
})