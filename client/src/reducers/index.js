import { combineReducers } from "redux";
import products from './products';
import transactions from "./transactions";
import auth from "./auth";

export default combineReducers({
    products,
    transactions,
    auth
});