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
            <div className='absolute top-[169px] w-[120px]'>
                <div className='hover:bg-[#64ccc5] bg-[#176b87] p-1 '
                onClick={()=>setService(!service)}
                >
                    <Link
                        href={'/service/feeservice'}
                        className="text-white p-1 w-full block"
                    >
                    Phí Chung Cư
                    </Link>
                </div>
                <div className='bg-[#176b87] hover:bg-[#64ccc5] p-1'
                onClick={()=>setService(!service)}>
                    <Link
                        href={'/service/personservice'}
                        className="text-white p-1 w-full block"
                    >
                    Nhân Khẩu
                    </Link>
                </div>
                <div className='bg-[#176b87] hover:bg-[#64ccc5] p-1'
                onClick={()=>setService(!service)}>
                    <Link
                        href={'/service/setting'}
                        className="text-white p-1 w-full block"
                    >
                    Cài Đặt
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className='bg-white relative'>
            <div className='absolute right-0 top-1/2 -translate-y-1/2 mr-2'>
                <div className='flex'>
                    <button className='text-white text-sm p-1 border-2'
                    >Tài khoản</button>
                    <button className='text-white text-sm p-1 border-2 ml-1'>Đăng xuất</button>
                </div>
            </div>
            <div className='flex justify-center bg-[#176b87] '>
                {
                    menus.map((item,index)=>{
                        if(item.name == "Dịch Vụ") {
                            return (
                                <div className='flex items-center p-2 '> 
                                    <button className='text-white hover:bg-[#64ccc5] p-2 '
                                    // onMouseLeave={()=>setService(false)}
                                    onClick={()=>setService(!service)}

                                    >Dịch Vụ</button>
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