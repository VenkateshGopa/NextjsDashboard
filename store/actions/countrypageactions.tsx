import axios from 'axios';
import {linechart_failed, linechart_loading, linechart_success, countrypage, countrypage_failed, cardchart_loading, cardchart_success, cardchart_failed} from '../constants/countrypagecons'

export const getcountryname = ( iso:any) => async(dispatch:any) =>{
    try {
        const {data} =await axios.request({
            method: 'GET',
            url: 'https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/countries-name-ordered',
            headers: {
            'x-rapidapi-host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
            'x-rapidapi-key': '0dcb4bd39fmshe0af6d8719d5217p172434jsn1f9be1248561'
            }
        })
        console.log(iso)
        dispatch({type:countrypage, payload: data.filter( (ele: { ThreeLetterSymbol: string }) => ele.ThreeLetterSymbol === iso)})
    } 
    catch (error) {
        dispatch({type:countrypage_failed, payload:"failed to fetch search countries"})
        console.log(error)
    }
}

export const getlinechart = (iso:any) => async(dispatch:any) =>{
    try {
        dispatch({type:linechart_loading, payload:true})
        const {data} = await axios.request({
            method: "GET",
            url: `https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/covid-ovid-data/sixmonth/${iso}`,
            headers: {
              "x-rapidapi-host":"vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com",
              "x-rapidapi-key":"0dcb4bd39fmshe0af6d8719d5217p172434jsn1f9be1248561",
            },
          })
        console.log(iso)
        dispatch({type:linechart_success, payload: data.reverse()})
        dispatch({type:linechart_loading, payload:false})

    } 
    catch (error) {
        dispatch({type:linechart_failed, payload:"failed to fetch search countries"})
        console.log(error)
    }
}

export const getCardchart = (iso:any) => async(dispatch:any) =>{
    try {
        dispatch({type:cardchart_loading, payload:true})
        const {data} = await axios.request( {
            method: 'GET',
            url: `https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/api-covid-data/reports/${iso}`,
            headers: {
              'x-rapidapi-host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
              'x-rapidapi-key': '0dcb4bd39fmshe0af6d8719d5217p172434jsn1f9be1248561'
            }
          })
        console.log(iso)
        dispatch({type:cardchart_success, payload: data.reverse()})
        dispatch({type:cardchart_loading, payload:false})

    } 
    catch (error) {
        dispatch({type:cardchart_failed, payload:"failed to fetch search countries"})
        console.log(error)
    }
}