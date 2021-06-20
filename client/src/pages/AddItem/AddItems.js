import React,{useState, useEffect} from 'react';
import { Paper, makeStyles, TableBody, TableRow, TableCell } from '@material-ui/core';
import AddItemForm from './AddItemForm';
import AddIcon from '@material-ui/icons/Add';
import Controls from "../../components/controls/Controls";
import { Search } from "@material-ui/icons";
import {Toolbar, InputAdornment } from  '@material-ui/core';
import Popup from "../../components/Popup";
import  useTable from '../../components/useTable';
import axios from '../../api/axios';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';



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
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);
    const [records, setRecords] = useState([]);
    const [edit, setEdit] = useState(false);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })



    const { TblContainer, TblHead,  TblPagination, recordsAfterPagingAndSorting } = useTable( records, headCells, filterFn);
    
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

    const fetchItems = async () =>{
        const response= await axios.get("/product");
        return response.data;
    }

     useEffect(()=>{
       const getAllItem = async () =>{
        const allItem = await fetchItems();
        if(allItem) setRecords(allItem);
       };
       getAllItem();
       
    },[])


    const addItemHandler =async (record) =>{
        // console.log(record);
        const request = {
            ...record
        }

        const response = await axios.post("/product", request);
         setRecords([...records, response.data])
    }

    const updateItemHandler = async (record) => {
        console.log(record._id)

        const response = await axios.patch(`/product/${record._id}`, record)
        console.log(response.data) 
        setRecords(records.map(record =>{
            return record._id === response.data._id ? {...response.data} : record;
        }))
    }

    const removeItemHandler = async (record) => {
        await axios.delete(`/product/${record._id}`);
        // setRecords(...records);
    }

    const addOrEdit = (item , resetForm) => {
        if (edit)
           updateItemHandler(item);           
        else
           addItemHandler(item);
        resetForm();
        setRecordForEdit(null);
        setEdit(false);
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
