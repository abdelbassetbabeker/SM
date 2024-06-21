import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import './style.css'

const ImageSlider = ({ images, ...args }) => {


    const [index, setindex] = useState(0);


    const handleNext = () => {
        if (index === images.length - 1)
            setindex(() => 0)
        else if (index !== images.length - 1)
            setindex((prev) => prev + 1)
    }



    const handlePrev = () => {
        if (index === 0) {
            setindex(prev => prev + images.length)
        }
        setindex(prev => prev - 1)
    }

    // console.log(images);


    return (
        <div className={args}>
            <div className='max-w-2xl p-5 overflow-hidden'>
                <div className='relative flex justify-center  bg-gray-100 mb-5 rounded-lg '>
                    <div className='mx-auto p-8 rounded-lg'
                    >
                        {images && <img src={`http://127.0.0.1:8000${images[index].link}`} alt="" className='mx-auto opacityTransition' />}
                    </div>
                    <div className='absolute top-1/2 w-full lg:px-5 sm:px-1'>
                        <div className=' flex justify-between'>
                            <button onClick={handlePrev} className='border-2 border-blue-100 group hover:border-blue-300 transition duration-200 rounded-full 
                            px-[5px] py-[7.5px]  '>
                                <Icon name='left angle' size='large' className='text-gray-500 group-hover:text-gray-700' />
                            </button>
                            <button onClick={handleNext} className='border-2 border-blue-100 group hover:border-blue-300 transition duration-200 rounded-full 
                            pl-[6px] pr-[3px] py-[7.5px]'>
                                <Icon name='right angle' size='large' className='text-gray-500 group-hover:text-gray-700' />
                            </button>
                        </div>
                    </div>
                </div>
                <ul className=' flex overflow-hidden justify-center'>
                    {images?.map((_, i) => (
                        <li key={i} onClick={() => setindex(i)} className={`bg-gray-100 mx-1 border ${index === i ? 'border-blue-500' : 'border-none'} mx-auto p-1 border-blue-500 rounded-lg`}>
                            <img src={`http://127.0.0.1:8000${images[i].link}`} alt="" className=' mx-auto max-h-20' />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ImageSlider;
