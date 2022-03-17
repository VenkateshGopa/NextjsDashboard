import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Spinner from "./components/Spinner";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer
  } from "recharts";
import Threedotsloading from "./components/threedotsloading";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { gethomechart } from "../store/actions/homeactions";

interface global1{
    ActiveCases: string 
    TotalCases: string
    TotalDeaths:string
    TotalRecovered:string
}
interface global {
  ActiveCases: number
  Case_Fatality_Rate: number
  Continent: string
  Country: string
  Deaths_1M_pop: number
  Infection_Risk: number
  NewCases: number
  NewDeaths: number
  NewRecovered: number
  Population: string
  Recovery_Proporation: number
  Serious_Critical: number
  Test_Percentage: number
  Tests_1M_Pop: number
  ThreeLetterSymbol: null
  TotCases_1M_Pop: number
  TotalCases: number
  TotalDeaths: number
  TotalRecovered: string
  TotalTests: string
  TwoLetterSymbol: null
  id: string
  one_Caseevery_X_ppl: number
  one_Deathevery_X_ppl: number
  one_Testevery_X_ppl: number
  rank: number
}
const Test = (props:{data:[global]}) =>{
  // const [global, setglobal] =  useState<global>();
  // const [country, setcountry] = useState();
  // const [loading, setloading] = useState<boolean>(true);
  // const router = useRouter();
  const dispatch = useDispatch();
  const {countries, loading} = useSelector((state:RootStateOrAny) => state.homedata)

  useEffect(()=>{
    dispatch(gethomechart())
  //   const getdata = async() => {
  //     const res2= await axios.request({
  //       method: 'GET',
  //       url: 'https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/countries',
  //       headers: {
  //         'x-rapidapi-host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
  //         'x-rapidapi-key': '0dcb4bd39fmshe0af6d8719d5217p172434jsn1f9be1248561'
  //       }
  //     })
  //     setcountry(res2.data)
  //     // setglobal({ActiveCases: res.data[0].ActiveCases, TotalCases:res.data[0].TotalCases,TotalDeaths:res.data[0].TotalDeaths,TotalRecovered:res.data[0].TotalRecovered})
  //     // console.log({ActiveCases: res.data[0].ActiveCases, TotalCases:res.data[0].TotalCases,TotalDeaths:res.data[0].TotalDeaths,TotalRecovered:res.data[0].TotalRecovered})
  //     setloading(false)
  // }
  // getdata();
  },[dispatch])
  
    return(
    <>
    
    <div className="flex flex-col mt-20 sm:mt-10 sm:flex-row items-start">
      <div className="w-11/12 m-3 sm:w-1/2 sm:m-10 ">
        <p className="text-5xl sm:text-7xl dark:text-white text-black pb-10">Covid-19</p>
        <p className="dark:text-slate-300 text-black text-bold pb-6">Global Cases</p>

        <div className="dark:bg-neutral-900 p-3 bg-gray-300 rounded shadow-xl ">
            <p className="dark:text-blue-200  text-blue-600 md:text-sm lg:text-lg pb-1">Total Cases</p>
            {!loading ? <p className="dark:text-white text-black pb-8  md:text-3xl lg:text-4xl">{props.data[0].TotalCases}</p> : <Threedotsloading/>}

            <p className="dark:text-green-200 text-green-600 md:text-sm lg:text-lg pb-1">Recovered Cases</p>
            {!loading ? <p className="dark:text-white text-black pb-8  md:text-3xl lg:text-4xl">{props.data[0].TotalRecovered}</p> :<Threedotsloading/>}

            <p className="dark:text-yellow-200 text-yellow-600 md:text-sm lg:text-lg pb-1">Active Cases</p>
            {!loading ? <p className="dark:text-white text-black pb-8  md:text-3xl lg:text-4xl">{props.data[0].ActiveCases}</p> : <Threedotsloading/>}

            <p className="dark:text-red-200 text-red-600  md:text-sm lg:text-lg pb-1">Deaths</p>
            {!loading ? <p className="dark:text-white text-black pb-8  md:text-3xl lg:text-4xl">{props.data[0].TotalDeaths}</p> : <Threedotsloading/>}
        </div>
      </div>
    
    <div className="w-11/12 sm:w-1/2 countrygraph  overflow-y-scroll ">
    <p className="dark:text-slate-300 text-black text-bold pb-6 m-3 sm:mx-10">Country Wise Cases</p>
    {loading && <div className="w-3/4 py-72 m-auto dark:bg-neutral-900 bg-gray-100"><Spinner/></div>}    
    {!loading &&
    <ResponsiveContainer width="100%" height={12000}>
    <BarChart 
        // width={600} 
        // height={12000} 
        data={countries} 
        layout="vertical"
        margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
        <XAxis type="number"/>
        <YAxis type="category" dataKey="Country" />
        {/* <CartesianGrid strokeDasharray="3 3"/> */}
        <Tooltip/>
        <Legend />
        <Bar dataKey="TotalCases"  fill="#8884d8" />
        <Bar dataKey="TotalRecovered"  fill="#4ade80" />
        <Bar dataKey="ActiveCases"  fill="#fde047" />
        <Bar dataKey="TotalDeaths" fill="#dc2626" />
    </BarChart>
    </ResponsiveContainer>}
    </div>
    </div>
    </>
    );
}
export async function getServerSideProps() {
  const res = await axios.request({
    method: 'GET',
    url: 'https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/world',
    headers: {
      'x-rapidapi-host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
      'x-rapidapi-key': '0dcb4bd39fmshe0af6d8719d5217p172434jsn1f9be1248561'
    }
  })
  const data = res.data
  return {
    props: {data}, // will be passed to the page component as props
  }
}

export default Test;