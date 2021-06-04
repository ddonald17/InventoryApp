import React,{useState, useEffect} from 'react';
import { Paper, makeStyles, TableBody, TableRow, TableCell } from '@material-ui/core';
import AddItemForm from './AddItemForm';
import PageHeader from '../../components/PageHeader';
import {uuid} from "uuidv4";
import AddIcon from '@material-ui/icons/Add';
import Controls from "../../components/controls/Controls";
import { FiberPinRounded, Search } from "@material-ui/icons";
import {Toolbar, InputAdornment } from  '@material-ui/core';
import Popup from "../../components/Popup";
import  useTable from '../../components/useTable';
import axios from '../../api/axios';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';



const useStyles = makeStyles(theme => ({
    pageContent: {
        padding: theme.spacing(3),
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
    { id: 'stock', label: 'Stock' },
    { id: 'actions', label: 'Actions', disableSorting: true }
];


function AddItems() {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);
    const [records, setRecords] = useState([]);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })



    const { TblContainer, TblHead,  TblPagination, recordsAfterPagingAndSorting } = useTable( records, headCells, filterFn);
    
    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
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


    const addItemHandler =async (records) =>{
        const request = {
            id: uuid(),
            ...records
        };

        const response = await axios.post("/product", request);
        setRecords([...records, response.data])
    }

    const updateItemHandler = async (record) => {
        const response = await axios.put(`/product/${record.id}`, record)
        setRecords(records.map(record =>{
            return record.id === response.data.id ? {...response.data} : record;
        }))
    }

    const addOrEdit = (item , resetForm) => {
        if (item.id == 0)
           addItemHandler(item);
        else
           updateItemHandler(item);
        resetForm();
        setRecordForEdit(null);
        setOpenPopup(false);  
    }


    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }


   
    return (

        <>
         {/* <PageHeader
                title="Add Item"
                subTitle="Adding Products to Inventory"
                icon={<AddIcon fontSize="large" />}
            /> */}

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
                                    <TableRow key={item.id}>
                                        <TableCell>{item.item_name}</TableCell>
                                        <TableCell>{item.category}</TableCell>
                                        <TableCell>{item.buy_price}</TableCell>
                                        <TableCell>{item.stock}</TableCell>
                                        <TableCell>
                                        <Controls.ActionButton
                                            color="primary"
                                            onClick={() => { openInPopup(item) }}>
                                            <EditOutlinedIcon fontSize="small" />
                                        </Controls.ActionButton>
                                        <Controls.ActionButton
                                            color="secondary">
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
