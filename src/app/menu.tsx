'use client'
import Link from 'next/link'

import { useState } from 'react'

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
            src : '/service/feeservice',
        },
        {
            name : 'Tra Cứu',
            src : '/search',
        }
    ]
    const [service,setService] = useState(false)
    function ServiceDrop() {
        return (
            <div className='absolute top-[169px] '
            >
                <div className='hover:bg-[#64ccc5] bg-[#176b87] p-1'
                onClick={()=>setService(!service)}
                >
                    <Link
                        href={'/service/feeservice'}
                        className="text-white p-1"
                    >
                    Phí Chung Cư
                    </Link>
                </div>
                <div className='bg-[#176b87] hover:bg-[#64ccc5] p-1'
                onClick={()=>setService(!service)}>
                    <Link
                        href={'/service/personservice'}
                        className="text-white p-1 "
                    >
                    Nhân Khẩu
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className='bg-white'
        >
            <div className='flex justify-center bg-[#176b87] '>
                {
                    menus.map((item,index)=>{
                        if(item.name == "Dịch Vụ") {
                            return (
                                <div className='flex items-center p-2 '> 
                                    <div className='text-white hover:bg-[#64ccc5] p-2 hover:cursor-pointer'
                                    // onMouseLeave={()=>setService(false)}
                                    onClick={()=>setService(!service)}

                                    >Dịch Vụ</div>
                                    {/* <Link
                                    key={item.name}
                                    href={item.src}
                                    className="text-white hover:bg-[#64ccc5] p-2 "
                                    >
                                    {item.name}
                                    </Link> */}
                                    {
                                        service ?
                                        <ServiceDrop />
                                        :
                                        <></>
                                    }
                                </div>
                            );
                        }
                        else {
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
                        }

                    })
                }
            </div>
        </div>
    )
}