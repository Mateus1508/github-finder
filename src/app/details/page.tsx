'use client'
import api from "@/service/api";
import { Details } from "@/types/Details";
import React, { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation'


const UserDetails = () => {
    const [details, setDetails] = useState<Details[]>([]);

    const searchParams = useSearchParams();
    const username = searchParams.get('username')

    useEffect(() => {
        api.get(`/${username}`)
        .then((response) => {
            setDetails(response.data);
        })
        .catch((error) => {
            console.error("Error fetching user details:", error);
        });
    }, [username]);
  
    return ( 
        <div>
        <table>
            <thead>
               <tr>
                    <th>ID</th>
                    <th>Login</th>
                    <th>Profile URL</th>
                    <th>Date of Login creation</th>
               </tr>
            </thead>
            <tbody>
                {
                details.map((user) =>
                    (<tr key={user.id}>
                        <td className=" px-3">{user.id}</td>
                        <td className=" px-3">{user.login}</td>
                        <td className=" px-3">{user.url}</td>
                        <td className=" px-3">{user.created_at}</td>
                    </tr>)
                )}
            </tbody>
        </table>
    </div>
     );
}
 
export default UserDetails;
