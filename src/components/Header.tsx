import Link from "next/link";

const Header = () => {
    return ( 
        <header className="flex w-full h-20">
            <ul className="flex w-full h-full gap-6 justify-end align-center mr-20 my-4">
               <Link href={"/list"} className="text-xl font-bold">List</Link>
               <Link href={"/search"} className="text-xl font-bold">Search</Link>
            </ul>
        </header>
     );
}
 
export default Header;