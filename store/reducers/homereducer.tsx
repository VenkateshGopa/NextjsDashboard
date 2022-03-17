import { failed, success, loading } from "../constants/homecons"
export const homereducer =(state={countries:[], loading:true }, action:any)=>{
    switch(action.type){
        case loading:
            return{
                ...state,
                loading:action.payload
            }
        case success:
            return{
                ...state,
                countries: action.payload,
            }
        case failed:
            return{
                errror: action.payload
            }

        default:
            return state;
    }
}

export default homereducer;