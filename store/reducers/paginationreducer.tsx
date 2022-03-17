import { pagination_loading, pagination_success, pagination_failed } from "../constants/paginationcons";

const initialstate = {
    data:[],
    loading:true,
    show:false,
    url:{
        page:1,
        pagesize:10,
        sort:'Select',
        sorttype:true,
        filter:'Select', 
        min:-1, 
        max:-1, 
        submit:false
    }
}

export const paginationreducer =(state=initialstate, action:any)=>{
    switch(action.type){
        case pagination_loading:
            return{
                ...state,
                loading:action.payload
            }
        case pagination_success:
            return{
                ...state,
                data: action.payload,
            }
        case pagination_failed:
            return{
                errror: action.payload
            }

        default:
            return state;
    }
}

export default paginationreducer;