import React from 'react';
import { useParams } from 'react-router-dom';

const ViewTeacher = () => {

    const params = useParams()
    const { id } = params

    return (
        <div>
            <div className='bg-zinc-100 border p-5 rounded-lg relative'>
                <ul>
                    <li className='text-whit'>
                        <h1 className='mb-0 font-mono'>ABDELBASSET BABEKER</h1>
                        <h4 className='my-1'>Math Teacher</h4>
                    </li>
                    <li>
                        <img src="/assets/TbannerL.png" alt="" className='max-h-[150px] absolute right-11 top-5' />
                    </li>
                </ul>
            </div>
            <div>
                <div>

                </div>
                <div>

                </div>
            </div>
        </div>
    );
}

export default ViewTeacher;
