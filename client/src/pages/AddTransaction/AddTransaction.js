import React,{useState, useEffect} from 'react';
import { Paper, makeStyles, TableBody, TableRow, TableCell } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Controls from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import {Toolbar, InputAdornment } from  '@material-ui/core';
import Popup from "../../components/Popup";
import  useTable from '../../components/useTable';
import axios from '../../api/axios';
import moment from 'moment';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddTransactionForm from './AddTransactionForm';
import { useDispatch } from 'react-redux';
import {createTransactions} from '../../actions/transactions'


const useStyles = makeStyles(theme => ({
    pageContent: {
        padding: theme.spacing(3),
        margin: theme.spacing(5),
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}))

const headCells = [
    { id: 'cust_name', label: 'Customer Name' },
    { id: 'cust_address', label: 'Address' },
    {id:'product' , label:'Product'},
    { id: 'quantity', label: 'Quantity' },
    { id: 'sell_price', label: 'Price' },
    { id: 'date', label: 'Date' }
];


function AddTransaction() {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);
    const [records, setRecords] = useState([]);
    const [isEdit , setEdit] = useState(false);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const dispatch = useDispatch();



    const { TblContainer, TblHead,  TblPagination, recordsAfterPagingAndSorting } = useTable( records, headCells, filterFn);
    
    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.cust_name.toLowerCase().includes(target.value))
            }
        })
    }

    const fetchItems = async () =>{
        const response= await axios.get("/transaction");
        return response.data;
    }

     useEffect(()=>{
       const getAllItem = async () =>{
        const allItem = await fetchItems();
        if(allItem) setRecords(allItem);
       };
       getAllItem();
    },[])

   
    const addOrEdit = (item , resetForm) => {
        if (!isEdit)
        dispatch(createTransactions(item));
        else
            console.log("update")
        resetForm();
        setRecordForEdit(null);
        setOpenPopup(false);
        setEdit(false);  
    }


    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }


   
    return (

        <>

        <Paper className={classes.pageContent}>
                <Toolbar>
                    <Controls.Input
                        label="Search Items"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                <Controls.Button
                        text="Add New"
                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                 />
                </Toolbar>

                 <TblContainer>
                        <TblHead />
                        <TableBody>
                            {
                                recordsAfterPagingAndSorting().map( item =>(
                                    <TableRow key={item._id}>
                                        <TableCell>{item.cust_name}</TableCell>
                                        <TableCell>{item.cust_address}</TableCell>
                                        <TableCell >{item.item.item_name}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>{item.sell_price}</TableCell>
                                        <TableCell>{moment(item.timestamp).format("MMM Do YY")}</TableCell>
                                        {/* <TableCell>
                                             <Controls.ActionButton
                                            color="primary"
                                            onClick={() => { openInPopup(item); setEdit(true); }}>
                                            <EditOutlinedIcon fontSize="small" />
                                        </Controls.ActionButton>
                                        <Controls.ActionButton
                                            color="secondary">
                                            <DeleteOutlineIcon fontSize="small" />
                                        </Controls.ActionButton> 
                                    </TableCell> */}
                                    </TableRow>)
                                    )
                            }
                        </TableBody>
                 </TblContainer>
                 <TblPagination />
                
            </Paper>

            <Popup
             title="Add Item"
             openPopup={openPopup}
             setOpenPopup={setOpenPopup}
                  >
                    <AddTransactionForm 
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
            </Popup>
        </>
    )
}

export default AddTransaction