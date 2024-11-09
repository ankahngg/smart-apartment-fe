import Image from 'next/image'
import Link from 'next/link'
export default function Menu(){
    const menus:{name:string,src:string}[] = [
        {
            name : 'Trang Chủ',
            src : '/homepage',
        },
        {
            name : 'Quy Định',
            src : '/rule',
        },
        {
            name : 'Dịch Vụ',
            src : '/service',
        },
        {
            name : 'Tra Cứu',
            src : '/search',
        }
    ]

    return (
        <div className='bg-white'>
            <div className='flex justify-center bg-[#176b87] '>
                {
                    menus.map((item,index)=>{
                        return (
                            <div className='flex items-center p-2'> 
                                <Link
                                key={item.name}
                                href={item.src}
                                className="text-white hover:bg-[#64ccc5] p-2 "
                                >
                                {item.name}
                                </Link>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}