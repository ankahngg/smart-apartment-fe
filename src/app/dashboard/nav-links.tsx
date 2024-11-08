
  import Link from 'next/link';
   
  let links :{href : string, name : string}[] = [{
      href : 'http://localhost:3000',
      name : 'back2dashboard'
  }];
  
  export default function NavLinks() {
      return (
          <>
        {

        links.map((link) => {
          return (
            <Link
              key={link.name}
              href={link.href}
              className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
            >
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        })}
      </>
    );
  }