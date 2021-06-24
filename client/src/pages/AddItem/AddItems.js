import React,{useState, useEffect} from 'react';
import { Paper, makeStyles, TableBody, TableRow, TableCell } from '@material-ui/core';
import AddItemForm from './AddItemForm';
import AddIcon from '@material-ui/icons/Add';
import Controls from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import {Toolbar, InputAdornment } from  '@material-ui/core';
import Popup from "../../components/Popup";
import  useTable from '../../components/useTable';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { useSelector, useDispatch } from 'react-redux';
import { createProduct, deleteProduct, updateProduct } from '../../actions/products';


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
    { id: 'item_name', label: 'Item Name' },
    { id: 'category', label: 'Category' },
    { id: 'buy_price', label: 'Buy Price' },
    { id: 'sell_price', label: 'Stock' },
    { id: 'actions', label: 'Actions', disableSorting: true }
];


function AddItems() {

    const classes = useStyles();
    const products = useSelector((state) => state.products);
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);
    const [records, setRecords] = useState({});
    const [edit, setEdit] = useState(false);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const dispatch = useDispatch();

    const { TblContainer, TblHead,  TblPagination, recordsAfterPagingAndSorting } = useTable( products, headCells, filterFn);
    
    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.item_name.toLowerCase().includes(target.value))
            }
        })
    }


    const removeItemHandler = async (record) => {
       dispatch(deleteProduct(record._id));
    }

    const addOrEdit = (item , resetForm) => {
        if (edit)
           dispatch(updateProduct(item._id, item))          
        else
           dispatch(createProduct(item));
        resetForm();
        setRecordForEdit(null);
        setEdit(false);
        setRecords(products);
        setOpenPopup(false);  
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
                                        <TableCell>{item.item_name}</TableCell>
                                        <TableCell>{item.category}</TableCell>
                                        <TableCell>{item.buy_price}</TableCell>
                                        <TableCell>{item.stock}</TableCell>
                                        <TableCell>
                                        <Controls.ActionButton
                                            color="primary"
                                            onClick={() => { openInPopup(item) ; setEdit(true); }}>
                                            <EditOutlinedIcon fontSize="small" />
                                        </Controls.ActionButton>
                                        <Controls.ActionButton
                                            color="secondary" 
                                            onClick={()=>removeItemHandler(item)}>
                                            <DeleteOutlineIcon fontSize="small" />
                                        </Controls.ActionButton>
                                    </TableCell>
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
                    <AddItemForm 
                    recordForEdit={recordForEdit}
                    addOrEdit={addOrEdit} />
            </Popup>
        </>
    )
}

export default AddItems
