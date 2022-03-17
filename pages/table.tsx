import axios from "axios";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import Pagination from "./components/Pagination";
import Spinner from "./components/Spinner";
import usePagination from "./components/usePagination";

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

const Table:NextPage = () => {
    // const {data,loading,show,url,req,reqs,inputhandler,clearfilter,showhandler,checkhand} = usePagination('git /country');

    const [data, setdata] = useState<pagnination>();
    const [loading, setloading] = useState<boolean>(true);
    const [show, setshow] = useState<boolean>(false);
    const [url, seturl] = useState<urlreq>({page:1,pagesize:10,sort:'Select',sorttype:true,filter:'Select', min:-1, max:-1, submit:false})


    useEffect( () =>{
        setloading(true)
        axios.get('https://covidpagination.herokuapp.com/country?page=1&pagesize=10').then((response) => {setdata(response.data) ; setloading(false) }).catch((error) => console.log(error))
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
        return `https://covidpagination.herokuapp.com/country?page=${page}&pagesize=${pagesize}&sort=${url.sort}:${url.sorttype ? 'asc' : 'desc'}&filter=${url.filter}:gt-${url.min},${url.filter}:lt-${url.max} `

        else if (url.sort !== "Select")
        return `https://covidpagination.herokuapp.com/country?page=${page}&pagesize=${pagesize}&sort=${url.sort}:${url.sorttype ? 'asc' : 'desc'}`

        else if (url.filter !== "Select" && (url.min < url.max) && (url.max!== -1 || url.min!== -1) )
        return `https://covidpagination.herokuapp.com/country?page=${page}&pagesize=${pagesize}&filter=${url.filter}:gt-${url.min},${url.filter}:lt-${url.max}`

        return `https://covidpagination.herokuapp.com/country?page=${page}&pagesize=${pagesize}`

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
        axios.get(`https://covidpagination.herokuapp.com/country?page=1&pagesize=10`).then((response) => {setdata(response.data) ; setloading(false) }).catch((error) => console.log(error))
    }

    const showhandler = () =>{
        setshow((prev) => !prev)
    }
    
    const checkhand = (event:any) =>{
        seturl((prev) => { return{...prev , sorttype: event.target.value!=='desc'}})
    }

  return (
    <div className="mt-36">
    { show && <>
    <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-50 z-10 " ></div>
    <div className="fixed sm:top-1/4 sm:w-1/2 sm:left-1/4 w-11/12  dark:bg-slate-900 bg-slate-200 rounded shadow-2xl z-20 overflow-hidden">
        <div className="flex flex-col "> 
            <div>
               <p className="bg-red-400 px-2 m-2 float-right hover:cursor-pointer hover:bg-red-500 rounded" onClick={showhandler} >x</p>
            </div>
            <div className="flex flex-row m-5 dark:text-slate-200 text-black">
                <p>Sort:</p>
                <select className="ml-2 bg-slate-200 dark:bg-slate-500 rounded shadow-lg" name="sort" onChange={inputhandler} value={url.sort}>
                    <option value="Select">Select Field</option>
                    <option value="Country">Country</option>
                    <option value="ThreeLetterSymbol"> ISO</option>
                    <option value="Population">Population</option>
                    <option value="TotalTests">TotalTests</option>
                    <option value="TotalCases">TotalCases</option>
                    <option value="ActiveCases">ActiveCases</option>
                    <option value="TotalRecovered">Recovered</option>
                    <option value="TotalDeaths">Deaths</option>
                </select>
                <div className="flex flex-row items-center px-2">
                <input className="mx-1" type="radio" name="sorttype" value="asc" checked={url.sorttype} onChange={checkhand} /> 
                <p>ASC</p>
                <input className="mx-1" type="radio" name="sorttype" value="desc" checked={!url.sorttype} onChange={checkhand}/>
                <p>Dsc</p>
                </div>
            </div>
            
            <div className="flex flex-col m-5 dark:text-slate-200 text-black">
                <div className="flex flex-row mb-3">
                <p>Filter:</p>
                <select className="ml-2 bg-slate-200 dark:bg-slate-500 rounded shadow-lg" name="filter" onChange={inputhandler} value={url.filter}>
                    <option value="Select">Select Field</option>
                    <option value="Population">Population</option>
                    <option value="TotalTests">TotalTests</option>
                    <option value="TotalCases">TotalCases</option>
                    <option value="ActiveCases">ActiveCases</option>
                    <option value="TotalRecovered">Recovered</option>
                    <option value="TotalDeaths">Deaths</option>
                </select>
                </div>
                <div className="flex flex-row items-center px-2">
                <p>min:</p>
                <input className="mx-1 w-1/2 bg-slate-200 dark:bg-slate-500 rounded" type="number"  name="min" value={url.min} onChange={inputhandler} /> 
                <p>max:</p>
                <input className="mx-1 w-1/2 bg-slate-200 dark:bg-slate-500 rounded" type="number" name="max" value={url.max} onChange={inputhandler}/>
                </div>
            </div>

        </div>
        <button className="m-7 px-2 py-1 dark:text-black text-slate-200 dark:bg-slate-200 bg-black rounded float-right" onClick={reqs} >Submit</button>

    </div>
    </>}

    <div className="flex flex-row items-center m-5 float-right">
    { url.submit && <button className="dark:bg-white text-xs sm:text-sm px-2 py-1 mr-2 bg-black text-white dark:text-black rounded" onClick={clearfilter}>Clear filter</button>}
    <button className=" dark:bg-white text-xs sm:text-sm px-2 py-1 mr-2 bg-black text-white dark:text-black rounded" onClick={showhandler} >Sort|Filter</button>
    <p className="dark:text-white text-black mr-4">Per page:</p>
        <select className="dark:bg-slate-600 dark:text-slate-200 text-black bg-white w-14 rounded" name="pagesize" value={url.pagesize} onChange={inputhandler}>
            <option value={10} > 10</option>
            <option value={20} > 20</option>
            <option value={30} > 30</option>
            <option value={40} > 40</option>
            <option value={50} > 50</option>
        </select>
    </div>

    <table className=" table-fixed dark:bg-black bg-white text-black dark:text-white tableborder w-11/12 m-auto">
      <thead >
        <tr className="tableborder" > 
          <th className="tableborder" >Country</th>
          <th className="tableborder" >ISO CODE</th>
          <th className="tableborder" >Population</th>
          <th className="tableborder" >TotalTests</th>
          <th className="tableborder" >TotalCases</th>
          <th className="tableborder" >ActiveCases</th>
          <th className="tableborder" >Recovered</th>
          <th className="tableborder" >Deaths</th>
        </tr>
      </thead>
      <tbody>
          {!loading &&
           data?.data.map( ele => <tr className="tableborder" key={ele._id} >
              <td className="tableborder" >{ele.Country}</td>
              <td className="tableborder" >{ele.ThreeLetterSymbol}</td>
              <td className="tableborder" >{ele.Population}</td>
              <td className="tableborder" >{ele.TotalTests}</td>
              <td className="tableborder" >{ele.TotalCases}</td>
              <td className="tableborder" >{ele.ActiveCases}</td>
              <td className="tableborder"  >{ele.TotalRecovered}</td>
              <td className="tableborder"  >{ele.TotalDeaths}</td>
              </tr>)}
      </tbody>
    </table>
    {loading && <div className="mt-10"> <Spinner/></div> }
    <p className="dark:text-white text-black text-center mt-4">Page {data?.page} of {data?.numberofpages} </p>
    <Pagination page={url.page} numberofpages={typeof data?.numberofpages === "number" ? data?.numberofpages : 0} req={req} />
    </div>
  );
};

export default Table;
