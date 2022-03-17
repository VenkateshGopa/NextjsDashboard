import axios from 'axios';
import {success, failed} from '../constants/searchcons'

export const getcountries = () => async(dispatch:any) =>{
    try {
        console.log("loading")
        const {data} = await axios.request({
            method: 'GET',
            url: 'https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/countries-name-ordered',
            headers: {
            'x-rapidapi-host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
            'x-rapidapi-key': '0dcb4bd39fmshe0af6d8719d5217p172434jsn1f9be1248561'
        }})
        dispatch({type:success, payload:data})
    } 
    catch (error) {
        dispatch({type:failed, payload:"failed to fetch search countries"})
        console.log(error)
    }
}
