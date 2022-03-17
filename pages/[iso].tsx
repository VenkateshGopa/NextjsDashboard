import axios from "axios";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { getcountryname } from "../store/actions/countrypageactions";

import CardsComponent from "./components/CardsComponent";
import LineGraphComponent from "./components/LineGraphComponent";
import PieCharts from "./components/PicChart";

interface datatype{
  ThreeLetterSymbol:string
  Country:string
}

const Country: NextPage = () => {
  // const [data, setdata] = useState<datatype[]>([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const {name} = useSelector((state:RootStateOrAny) => state.countrypage)

  useEffect(()=>{
    if(!router.isReady) return;
    dispatch(getcountryname(router.query.iso))
  //   const getdata = async() => {
  //     const res= await axios.request({
  //         method: 'GET',
  //         url: 'https://vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com/api/npm-covid-data/countries-name-ordered',
  //         headers: {
  //         'x-rapidapi-host': 'vaccovid-coronavirus-vaccine-and-treatment-tracker.p.rapidapi.com',
  //         'x-rapidapi-key': '0dcb4bd39fmshe0af6d8719d5217p172434jsn1f9be1248561'
  //         }
  //     })
  //    setdata(res.data.filter( (ele: { ThreeLetterSymbol: string }) => ele.ThreeLetterSymbol === router.query.iso));
  // }
  // getdata();
  },[router])
  return (
  <>
  <div className="m-auto w-10/12 h-1/2 md:w-8/12 lg:w-7/12 md:h-full mt-32">
    <p className="text-3xl md:text-4xl lg:text-5xl dark:text-white text-black text-centerx">{name[0]?.Country.toUpperCase()}({name[0]?.ThreeLetterSymbol})</p>
  </div>
  <LineGraphComponent/>
  <CardsComponent />
  <PieCharts/>
  </>
  );
};
export default Country;
