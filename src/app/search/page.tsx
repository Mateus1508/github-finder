'use client'
import Link from "next/link";
import React from "react";

const Search = () => {
   const [search, setSearch] = React.useState<string>('');
   localStorage.setItem('username', search);
    return ( 
        <div className="flex justify-center items-center w-full gap-3 flex-col">
           <label htmlFor="">Search user by username:</label>
           <input type="text" value={String(search)} onChange={e => setSearch(e.target.value)} className="text-black w-2/12 rounded border-blue-800" />
           { search.length > 3 ? 
           (
            <div className="flex gap-5 my-10">
               <Link href={{ pathname: '/details', query: { username: search } }}
               className="bg-blue-800 px-5 py-2 rounded hover:bg-blue-950 ease-in-out duration-300">
                  Details
               </Link>
               <Link href={{ pathname: '/repo', query: { username: search } }}
               className="bg-blue-800 px-5 py-2 rounded hover:bg-blue-950 ease-in-out duration-300">
                  Repositories
               </Link>
            </div>
           ) :
           null

           }
        </div>
     );
}
 
export default Search;