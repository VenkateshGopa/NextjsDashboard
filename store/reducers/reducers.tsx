import { combineReducers } from "redux";
import countrypagereducer from "./countrypagereducer";
import homereducer from "./homereducer";
import searchreducer from "./searchreducer";

const reducer = combineReducers({
    searchdata:searchreducer,
    homedata:homereducer,
    countrypage:countrypagereducer
})

export default reducer;