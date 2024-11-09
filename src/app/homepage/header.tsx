
import Image from 'next/image'
export default function Header(){
    return (
        <div className='flex p-5 items-center bg-[#333a76]'>
            <Image
                src="/logo.png"
                width={100}
                height={100}
                alt="logo"
            />
            <div className='w-full'>
                <p className='text-center font-bold text-xl text-white'>UBND PHƯỜNG KHƯƠNG ĐÌNH - KHU DÂN CƯ SỐ 2</p>
                <p className='text-center text-white'>Cổng dịch vụ quản lí thu phí chung cư BlueMoon</p>
            </div>
        </div>
    )
}