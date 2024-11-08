import Link from "next/link";
import NavLinks from "./nav-links";

export default function Page() {
    return (
    <>
      <p>Dashboard Page</p>
      <Link
              key='back'
              href='http://localhost:3000/login'
              //className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
      >backtologin</Link>
    </>
    )
  }