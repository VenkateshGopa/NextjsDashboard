import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import React, { useEffect } from "react";
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { getcountries } from '../store/actions/searchactions';
import { search } from '../store/constants/searchcons';
// import { wrapper } from '../store/store';

interface datatype{
  ThreeLetterSymbol:string
  Country:string
}
// interface global{
//   ActiveCases: string 
//   TotalCases: string
//   TotalDeaths:string
//   TotalRecovered:string
// }

const Home: NextPage = () => {
  // const [global, setglobal] =  useState<global>();
  // const [data, setdata] = useState<datatype[]>([]);
  // const [data1, setdata1] = useState<datatype[]>([]);
  // const [loading, setloading] = useState<boolean>(true);
  const router = useRouter();
  const dispatch = useDispatch();
  const {countries, seaarchdata} = useSelector((state:RootStateOrAny) => state.searchdata)

  console.log(countries)

  useEffect(()=>{
    dispatch(getcountries())
  //   const getdata = async() => {
  //     const res= await axios.request({
  //         method: 'GET',
  //         url: 'https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/countries-name-ordered',
  //         headers: {
  //         'x-rapidapi-host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
  //         'x-rapidapi-key': '0dcb4bd39fmshe0af6d8719d5217p172434jsn1f9be1248561'
  //         }
  //     })
      
  //    setdata(res.data);
  //    setdata1(res.data);
  // }
  // getdata();
  // setloading(false)
  },[dispatch])

  const changeHandler = (event:any) =>{
    dispatch({type:search ,payload:seaarchdata.filter((ele:datatype) => ele.Country.toLowerCase().indexOf(event?.target.value.toLowerCase())>=0 || ele.ThreeLetterSymbol.toLowerCase().indexOf(event?.target.value.toLowerCase())>=0 )})
  }
  const submithandler = (name:string , code:string) =>{
    window.localStorage.setItem('code', code)
    window.localStorage.setItem('name', name)
    router.push(`/${code}`)
  }

  return (
  <>
  <div className='home '>
    <div className='p-5 py-12 w-11/12 bg-white dark:bg-neutral-900 m-auto sm:p-20 sm:w-3/4 lg:w-1/2 rounded shadow-xl' >
      <p className='font dark:text-white  text-black text-3xl'> Select a Country </p>
      <input className='w-full my-10 h-8 bg-slate-200 dark:bg-neutral-700 rounded px-2 dark:text-slate-200 text-gray-900' type="text" onChange={changeHandler} placeholder="Select a Country.."/>
      <p className='dark:text-gray-400 text-black text-sm pb-4'>Suggestions</p>
      <div className=''>
      {countries.length<=0 && <p className='text-black dark:text-slate-300'>No data Found</p>}
      {countries.length>0 && countries.map( (ele:datatype) => <p onClick={() => submithandler(ele.Country, ele.ThreeLetterSymbol)} className='text-black dark:text-white hover:text-white hover:bg-black hover:cursor-pointer p-5 rounded' key={ele.Country}>{ele.Country.toUpperCase()}({ele?.ThreeLetterSymbol})</p>)}
      </div>
    </div>
  </div>
  </>
  );
}

export default Home



// export const getServerSideProps = wrapper.getServerSideProps(async({store}) =>{
//   await store.dispatch(getcountries());
// })