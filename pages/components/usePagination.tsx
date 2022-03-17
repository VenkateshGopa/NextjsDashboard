import axios from "axios";
import React, { useEffect, useState } from "react";

interface data {
    _id:string
    Country:string
    TwoLetterSymbol:string
    ThreeLetterSymbol:string
    Infection_Risk:number
    Case_Fatality_Rate:number
    Test_Percentage:number
    Recovery_Proporation:number
    TotalCases:number
    NewCases:number
    TotalDeaths:number
    NewDeaths:number
    TotalRecovered:number
    NewRecovered:number
    ActiveCases:number
    TotalTests:number
    Population:number
    Serious_Critical:number
}

interface pagnination {
    page:number
    pagesize:number 
    records:number
    numberofpages: number
    data: data []
}
interface urlreq {
    page:number
    pagesize:number
    sort:string
    sorttype:boolean
    filter:string
    min:number
    max:number
    submit:boolean
}

const usePagination = (urls:string) =>{
    const [data, setdata] = useState<pagnination>();
    const [loading, setloading] = useState<boolean>(true);
    const [show, setshow] = useState<boolean>(false);
    const [url, seturl] = useState<urlreq>({page:1,pagesize:10,sort:'Select',sorttype:true,filter:'Select', min:-1, max:-1, submit:false})

    useEffect( () =>{
        setloading(true)
        axios.get(`${urls}?page=1&pagesize=10`).then((response) => {setdata(response.data) ; setloading(false) }).catch((error) => console.log(error))
    },[])

    const req = (type:string|number) =>{
        setloading(true)
        
        if(typeof type === "string"){
            if(type === 'p'){ 
              seturl((prev) => { return{...prev , page:prev.page-1}})
              axios.get(urltype(url.page-1, url.pagesize)).then((response) => {setdata(response.data) ; setloading(false) }).catch((error) => console.log(error))
            }
            else{
                seturl((prev) => { return{...prev , page:prev.page+1}})
                axios.get(urltype(url.page+1, url.pagesize)).then((response) => {setdata(response.data) ; setloading(false) }).catch((error) => console.log(error))
            }
        }
        else{
            seturl((prev) => { return{...prev , page:type}})
            console.log(urltype(type, url.pagesize))
            axios.get(urltype(type, url.pagesize)).then((response) => {setdata(response.data) ; setloading(false) }).catch((error) => console.log(error))
        }
    }


    const reqs = () =>{
        setloading(true)
        seturl((prev) => { return{...prev , page:1, submit:true}})
        axios.get(urltype(1, url.pagesize)).then((response) => {setdata(response.data) ; setloading(false) }).catch((error) => console.log(error))
        setshow(false)
    }

    const urltype = (page:number , pagesize:number) =>{

        if (url.sort !== "Select" && url.filter !== "Select" && (url.min < url.max) && (url.max!== -1 || url.min!== -1))
        return `${urls}?page=${page}&pagesize=${pagesize}&sort=${url.sort}:${url.sorttype ? 'asc' : 'desc'}&filter=${url.filter}:gt-${url.min},${url.filter}:lt-${url.max} `

        else if (url.sort !== "Select")
        return `${urls}?page=${page}&pagesize=${pagesize}&sort=${url.sort}:${url.sorttype ? 'asc' : 'desc'}`

        else if (url.filter !== "Select" && (url.min < url.max) && (url.max!== -1 || url.min!== -1) )
        return `${urls}?page=${page}&pagesize=${pagesize}&filter=${url.filter}:gt-${url.min},${url.filter}:lt-${url.max}`

        return `${urls}?page=${page}&pagesize=${pagesize}`

    }

    const inputhandler = (event:any) =>{
        if(event.target.name === 'min' || event.target.name==='max')
        seturl((prev) => { return{...prev , [event.target.name]: +event.target.value }})

        else if(event.target.name==='pagesize'){
        seturl((prev) => { return{...prev , [event.target.name]: event.target.value }})
        axios.get(urltype(1, event.target.value)).then((response) => {setdata(response.data) ; setloading(false) }).catch((error) => console.log(error))
        }

        else
        seturl((prev) => { return{...prev , [event.target.name]: event.target.value}})
    }

    const clearfilter = () =>{
        seturl((prev) =>{ return {...prev , sort:"Select",sorttype:true,filter:"Select",min:-1, max:-1, page:1 , pagesize:10 , submit:false}})
        axios.get(`${urls}?page=1&pagesize=10`).then((response) => {setdata(response.data) ; setloading(false) }).catch((error) => console.log(error))
    }

    const showhandler = () =>{
        setshow((prev) => !prev)
    }
    
    const checkhand = (event:any) =>{
        seturl((prev) => { return{...prev , sorttype: event.target.value!=='desc'}})
    }

    return{data,loading,show,url,req,reqs,inputhandler,clearfilter,showhandler,checkhand}
}

export default usePagination;