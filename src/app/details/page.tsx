'use client'
import api from "@/service/api";
import { Details } from "@/types/Details";
import React from "react";

const Details = () => {
    const [details, setDetails] = React.useState<Details[]>();
    const username = localStorage.getItem('username');

    React.useEffect(() => {
        api.get(`/${username}`)
        .then((response) => {
            setDetails(response.data);
        })
    },[]);
  
    return ( 
        <div>
        <table>
            <thead>
                <th>ID</th>
                <th>Login</th>
                <th>Profile URL</th>
                <th>Date of Login creation</th>
            </thead>
            <tbody>
                {
                details?.map((user) =>
                    (<tr>
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
 
export default Details;