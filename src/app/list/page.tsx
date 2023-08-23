'use client'
import api from "@/service/api";
import { User } from "@/types/User";
import React from "react";

const List = () => {
    const [users, setUsers] = React.useState<User[]>();
    const [currentPage, setCurrentPage] = React.useState<number>(0);
    const [itensPerPage, setItensPerPage] = React.useState(10);

    React.useEffect(() => {
        api.get('')
        .then((response) => {
            setUsers(response.data);
        })
    },[]);

    let items: number = 0;

    if (users) {
        items = users.length;
    }
    const pages = Math.ceil(items / itensPerPage);

    const startIndex = currentPage * itensPerPage;
    const endIndex = startIndex + itensPerPage;
    const CurrentItens = users?.slice(startIndex, endIndex);

    React.useEffect(() => {
        setCurrentPage(0);
    }, [setItensPerPage]);
    return ( 
        <div className="flex flex-col align-middle justify-center w-full">
            <h1 className="flex justify-center text-2xl my-3">Users list</h1>
            <div className="flex justify-center">
                <table className="table-auto border w-auto h-80 overflow-hidden border-blue-800 border-separate border-spacing-2">
                    <thead>
                        <tr className="border border-blue-800">
                            <th>ID</th>
                            <th>Login</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        CurrentItens?.map((user) =>
                            (<tr>
                                <td className=" px-3">{user.id}</td>
                                <td className=" px-3">{user.login}</td>
                            </tr>)
                        )}
                    </tbody>
                </table>
            </div>
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
 
export default List;