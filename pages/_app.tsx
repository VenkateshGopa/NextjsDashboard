import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { wrapper } from '../store/store';
function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [check, setchecked] = useState<boolean>();
  const [nav, setnav] = useState<boolean>(false);


  useEffect(()=>{
    if(window.localStorage.getItem('theme')){
      setchecked((window.localStorage.getItem('theme') === 'true'? true : false))
      window.localStorage.getItem('theme') === 'true'? document.getElementsByTagName("body")[0].style.background="black" : document.getElementsByTagName("body")[0].style.background="white"
    }
    else{
      window.localStorage.setItem('theme','dark')
    }
  },[])

  const redir = (path:string) =>{
    document.getElementById('show')?.classList.add('hidden')
    router.push(path)
  }

  const changeHandler = () =>{
    document.getElementById('show')?.classList.add('hidden')
    const d = !check
    setchecked((prev) => !prev)
    window.localStorage.setItem('theme',d.toString())
    if(!check){
      document.getElementsByTagName("body")[0].style.background="black"
    }
    else{
      document.getElementsByTagName("body")[0].style.background="white"
    }
  }

  const shownav = () =>{
    document.getElementById('show')?.classList.remove('hidden')
  }

  const closenav = () =>{
    document.getElementById('show')?.classList.add('hidden')
  }
  
  return (
  <div className={ check ? 'dark' :'' }>
   <div className="fixed top-0 left-0 w-full text-bold flex flex-row z-50  bg-black text-white  dark:bg-slate-400 p-5 justify-between items-center ">
        <p className="text-3xl sm:text-4xl text-bold ">Co-Dash</p>
        <p className='rotate-90 sm:hidden hover:cursor-pointer' onClick={shownav}>|||</p>
        <div className='hidden sm:block' id='show'>
        <div className="nav flex sm:flex-row sm:items-center ">
            <p className='sm:hidden text-right p-4 hover:cursor-pointer ' onClick={closenav} > x </p>
            <p className= {router.pathname == "/" ? "px-3 hover:cursor-pointer bg-gray-700 dark:bg-gray-600 text-bold  rounded py-4 sm:py-0" : "px-3 hover:cursor-pointer text-bold py-4 sm:py-0 "} onClick={() => redir('/')}>Home</p>
            {/* <p className= {router.pathname == "/home" ? "px-3 hover:cursor-pointer text-bold text-black bg-gray-300 rounded" : "px-3 hover:cursor-pointer text-bold text-black "} onClick={() => redir('/home')}>Search</p> */}
            <p className= {router.pathname == "/home" ? " px-3 hover:cursor-pointer bg-gray-700  dark:bg-gray-600 text-bold  rounded py-4 sm:py-0" : "px-3 hover:cursor-pointer text-bold  py-4 sm:py-0"} onClick={() => redir('/home')}> Search
              {/* <svg className='w-6 h-6  ' fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 50 50" width="50px" height="50px"><path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"/></svg> */}
            </p>
            <p className= {router.pathname == "/table" ? " px-3 hover:cursor-pointer bg-gray-700  dark:bg-gray-600 text-bold  rounded py-4 sm:py-0" : "px-3 hover:cursor-pointer text-bold  py-4 sm:py-0"} onClick={() => redir('/table')}>Global</p>
            <div className='text-white  flex flex-row items-center mx-6 py-4 sm:py-0'>
              <p>Light</p>
              <label className="switch"> 
                <input type="checkbox" checked={check} onChange={changeHandler} />
                  <span className="slider round"></span> 
              </label>
              <p>Dark</p>
            </div>
        </div>
       </div>
    </div>
  <div className='my-16'>
  <Component {...pageProps} />
  </div>
  </div>);
}


export default wrapper.withRedux(MyApp)
