'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Menu(){
    const router = useRouter();
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
            <div className='absolute w-[120px] top-[55px]'>
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

    function handleLogout() {
        localStorage.removeItem('accessToken');
        router.push('/login');
    }

    return (
        <div className='bg-white relative'>
            <div className='absolute right-0 top-1/2 -translate-y-1/2 mr-2'>
                <div className='flex items-center'>
                    <div className='text-white mr-2'>Xin chào admin</div>
                    <Link
                        href={'/account'}
                        className="text-white p-1 block text-sm border-2"
                    >
                    Tài khoản
                    </Link>
                    <button className='text-white text-sm p-1 border-2 ml-1' onClick={()=>handleLogout()}>Đăng xuất</button>
                </div>

            </div>
            <div className='flex justify-center bg-[#176b87] '>
                {
                    menus.map((item,index)=>{
                        if(item.name == "Dịch Vụ") {
                            return (
                                <div className='flex items-center p-2 relative'> 
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