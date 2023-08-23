'use client'
import api from "@/service/api";
import { Repos } from "@/types/Repos";
import React, { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation'


const UserRepos = () => {
    const [repos, setRepos] = useState<Repos[]>([]);
    const [currentPage, setCurrentPage] = React.useState<number>(0);
    const [itensPerPage, setItensPerPage] = React.useState(10);

    const searchParams = useSearchParams();
    const username = searchParams.get('username')

    let items: number = 0;

    if (repos) {
        items = repos.length;
    }
    const pages = Math.ceil(items / itensPerPage);

    const startIndex = currentPage * itensPerPage;
    const endIndex = startIndex + itensPerPage;
    const CurrentItens = repos?.slice(startIndex, endIndex);

    React.useEffect(() => {
        setCurrentPage(0);
    }, [setItensPerPage]);

    useEffect(() => {
        api.get(`/${username}/repos`)
        .then((response) => {
            setRepos(response.data);
        })
        .catch((error) => {
            console.error("Error fetching user Repos:", error);
        });
    }, [username]);
  
    return ( 
        <div className="flex flex-col items-center justify-center w-full">
            <h1 className="flex justify-center text-2xl my-3">{username} Repositories</h1>
        <table className="table-auto border w-3/4 h-80 overflow-hidden border-blue-800 border-separate border-spacing-2">
            <thead>
               <tr>
                    <th>ID</th>
                    <th>name</th>
                    <th>Project URL</th>
               </tr>
            </thead>
            <tbody>
                {
                CurrentItens.map((user) =>
                    (<tr key={user.id}>
                        <td className=" px-3">{user.id}</td>
                        <td className=" px-3">{user.name}</td>
                        <td className=" px-3">{user.url}</td>
                    </tr>)
                )}
            </tbody>
        </table>
        <div className="flex justify-center gap-4">
                {Array.from(Array(pages), (item, index) => {
                    return <button
                        className="bg-blue-800 text-white px-2 py-1 rounded-md my-3"
                        value={index}
                        onClick={e => setCurrentPage(Number(e.currentTarget.value))}> {index + 1}
                    </button>
                })}
            </div>
    </div>
     );
}
 
export default UserRepos;
