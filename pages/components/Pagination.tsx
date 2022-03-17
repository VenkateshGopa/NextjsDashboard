
const Pagination = (props:{page:number, numberofpages:number  , req(page:number | string ):void }) =>{
    
    return(
        <div className="flex items-center">
            {console.log(props)}
            <div className="flex flex-row pt-10 gap-1 m-auto" >
                <button className="p-1 dark:bg-slate-200 bg-gray-700 dark:text-black text-white hover:cursor-pointer disabled:cursor-not-allowed disabled:bg-red-400 dark:disabled:bg-red-400" onClick={() => props.req("p")} disabled={props.page<=1}> Prev</button>
                { ( props.page===1 || props.page ===2 || props.page === 3) && 
                <>
                {/* disabled={props.numberofpages<=props.page} */}
                <button className="p-1 px-2 dark:bg-slate-200 bg-gray-700 dark:text-black text-white hover:cursor-pointer "  onClick={() => props.req(1)}>1</button>
                <button className="p-1 px-2 dark:bg-slate-200 bg-gray-700 dark:text-black text-white hover:cursor-pointer "  onClick={() => props.req(2)}>2</button>
                <button className="p-1 px-2 dark:bg-slate-200 bg-gray-700 dark:text-black text-white hover:cursor-pointer "  onClick={() => props.req(3)}>3</button>
                <button className="p-1 px-2 dark:bg-slate-200 bg-gray-700 dark:text-black text-white hover:cursor-pointer "  onClick={() => props.req(4)}>4</button>
                <button className="p-1 px-2 dark:bg-slate-200 bg-gray-700 dark:text-black text-white hover:cursor-pointer "  onClick={() => props.req(5)}>5</button>
                </>}
                { (props.page>3 && typeof props.numberofpages === "number" && props.page <= props.numberofpages-2 )&& 
                <>
                <p className="p-1 px-2 dark:bg-slate-200 bg-gray-700 dark:text-black text-white hover:cursor-pointer" onClick={() => props.req(props.page-2)}>{props.page-2}</p>
                <p className="p-1 px-2 dark:bg-slate-200 bg-gray-700 dark:text-black text-white hover:cursor-pointer" onClick={() => props.req(props.page-1)}>{props.page-1}</p>
                <p className="p-1 px-2 dark:bg-slate-200 bg-gray-700 dark:text-black text-white hover:cursor-pointer" onClick={() => props.req(props.page)}>{props.page}</p>
                <p className="p-1 px-2 dark:bg-slate-200 bg-gray-700 dark:text-black text-white hover:cursor-pointer" onClick={() => props.req(props.page+1)}>{props.page+1}</p>
                <p className="p-1 px-2 dark:bg-slate-200 bg-gray-700 dark:text-black text-white hover:cursor-pointer" onClick={() => props.req(props.page+2)}>{props.page+2}</p>
                </>}

                { ( typeof props.numberofpages === "number" && props.page > props.numberofpages-2 && (props.numberofpages!==0) && (props.numberofpages>4) )&& 
                <>
                <p className="p-1 px-2 dark:bg-slate-200 bg-gray-700 dark:text-black text-white hover:cursor-pointer" onClick={() => props.req(props.numberofpages-4)}>{props.numberofpages-4}</p>
                <p className="p-1 px-2 dark:bg-slate-200 bg-gray-700 dark:text-black text-white hover:cursor-pointer" onClick={() => props.req(props.numberofpages-3)}>{props.numberofpages-3}</p>
                <p className="p-1 px-2 dark:bg-slate-200 bg-gray-700 dark:text-black text-white hover:cursor-pointer" onClick={() => props.req(props.numberofpages-2)}>{props.numberofpages-2}</p>
                <p className="p-1 px-2 dark:bg-slate-200 bg-gray-700 dark:text-black text-white hover:cursor-pointer" onClick={() => props.req(props.numberofpages-1)}>{props.numberofpages-1}</p>
                <p className="p-1 px-2 dark:bg-slate-200 bg-gray-700 dark:text-black text-white hover:cursor-pointer" onClick={() => props.req(props.numberofpages)}>{props.numberofpages}</p>
                </>}
                
                <button className="p-1 dark:bg-slate-200 bg-gray-700 dark:text-black text-white hover:cursor-pointer disabled:cursor-not-allowed disabled:bg-red-400 dark:disabled:bg-red-400" disabled={props.page=== props.numberofpages} onClick={() => props.req("n")}> Next </button>
            </div>
        </div>
        );
}

export default Pagination;