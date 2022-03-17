import axios from "axios"
import { pagination_failed, pagination_loading, pagination_success } from "../constants/paginationcons"

export const getpaginationdata = ( url:any) => async(dispatch:any) =>{
    try {
        dispatch({type:pagination_loading , payload:true})
        const {data} =await axios.request({
            method: 'GET',
            url : url
        })
        dispatch({type:pagination_success, payload: data })
    } 
    catch (error) {
        dispatch({type:pagination_failed, payload:"failed to fetch search countries"})
        console.log(error)
    }
}

