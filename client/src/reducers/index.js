import { combineReducers } from "redux";
import products from './products';
import transactions from "./transactions";

export default combineReducers({
    products,
    transactions
});