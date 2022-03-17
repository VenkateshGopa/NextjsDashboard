import { cardchart_failed, cardchart_loading, cardchart_select, cardchart_success, countrypage, countrypage_failed, linechart_failed, linechart_filter, linechart_loading, linechart_success } from "../constants/countrypagecons"
const initialstate = {
    name:[],
    LineChartdata : {loading:true, data:[], data1:[]},
    CardChartdata : {loading:true, states:[], selstate:[]}
}
export const countrypagereducer =(state=initialstate, action:any)=>{
    switch(action.type){
        case countrypage:
            console.log(action.payload)
            return{
                ...state,
                name:action.payload
            }
        case countrypage_failed:
            return{
                error: action.payload
            }
        case linechart_success:
            return{
                ...state,
                LineChartdata:{...state.LineChartdata , data:action.payload, data1:action.payload}
            }
        case linechart_filter:
            return{
                ...state,
                LineChartdata:{...state.LineChartdata , data:action.payload}
            }
        case linechart_loading:
            return{
                ...state,
                LineChartdata:{...state.LineChartdata , loading:action.payload}
            }

        case cardchart_failed:
            return{
                error: action.payload
            }
        case cardchart_success:
            return{
                ...state,
                CardChartdata:{...state.CardChartdata , states:action.payload}
            }
        case cardchart_select:
            return{
                ...state,
                CardChartdata:{...state.CardChartdata , selstate:action.payload}
            }
        case cardchart_loading:
            return{
                ...state,
                CardChartdata:{...state.CardChartdata , loading:action.payload}
            }

        case linechart_failed:
            return{
                error: action.payload
            }
        default:
            return state;
    }
}

export default countrypagereducer;