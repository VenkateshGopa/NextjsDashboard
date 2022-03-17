import { success, failed, search  } from "../constants/searchcons"

export const searchreducer =(state={countries:[]}, action:any)=>{
    switch(action.type){
        case success:
            return{
                countries: action.payload,
                seaarchdata:action.payload
            }
        case failed:
            return{
                errror: action.payload
            }
        case search:{
            return{
                ...state,
                countries:action.payload
            }
        }
        default:
            return state;
    }
}

export default searchreducer;