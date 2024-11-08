import Image from 'next/image'
export default function Menu(){
    return (
        <div className='flex justify-center bg-white'>
            <div className='p-5 text-black'>Trang chủ</div>
            <div className='p-5 text-black'>Quy định</div>
            <div className='p-5 text-black'>Dịch vụ</div>
            <div className='p-5 text-black'>Tra cứu</div>
        </div>
    )
}