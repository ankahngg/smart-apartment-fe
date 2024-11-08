import Image from 'next/image'
function Main() {
    const script:{icon:string,str:string}[] = [{
        icon :'/icons/icon1.png',
        str : 'Hạnh phúc đôi khi chỉ là cảm giác an yên khi trở về nhà, nơi ta gọi là tổ ấm',
    },
    {
        str : 'Phát triển là xu hướng của thời đại',
        icon : '/icons/icon2.png',
    },
    {
        str : 'Giữ gìn tài sản là trách nhiệm của mỗi người',
        icon :  '/icons/icon3.png',
    }];
  
    return (
        <div>
            <div className='relative h-[36rem]'>
                <Image
                    src="/slider.png"
                    alt="slider"
                    fill={true} 
                />
            </div>
            <div className='flex justify-center mt-10'>
                <div className='flex w-[1000px] pb-10 border-b-[#5895a9] border-b-[3px] space-x-6' >
                    {
                        script.map((item)=>(
                            <div className='w-80 bg-[#dad8d9] p-5'> 
                                <div className='flex justify-center p-2'>
                                    <Image 
                                        src={item.icon}
                                        width={100}
                                        height={100}
                                        alt='icon'
                                    />  
                                </div>
                                <p className='text-black font-bold text-center'>{item.str}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
      );
}

export default Main;