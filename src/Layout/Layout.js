import { Avatar } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import NavLinks from '../components/NavLinks';




const Layout = () => {


    const [sidBar, setSidBar] = React.useState(false)

    return (
        <div className='homeLayout min-h-screen '>
            <div className='flex '>
                <div className={` bg-current h-full transition-all duration-500  ${sidBar ? '-translate-x-full w-0' : 'translate-x-0 w-[260px] '}`}>
                    <NavLinks
                        setSidBar={setSidBar}
                        sidBar={sidBar}
                    />
                </div>
                <div className='w-full h-screen overflow-y-auto'>
                    <div className='flex justify-between items-center py-2  border-b   sticky top-0 bg-white '>
                        <div className='ml-3 flex gap-3 items-center'>
                            <span
                                onClick={() => setSidBar(() => !sidBar)}
                                className={` border  rounded-lg p-4 border-zinc-300 hover:bg-black/5 transition-all duration-500  ${!sidBar ? 'opacity-0 invisible' : ' opacity-100 translate-x-0 w-fit'}`}>
                                {menuIcon}
                            </span>
                            <p className='text-gray-500 font-extrabold font-sans'>Ghardaia Traditional Community Admin Dashbord</p>
                        </div>
                        <div className='flex mr-32'>
                            <span className='p-3 bg-zinc-100 border  mr-5 rounded-md'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                                </svg>
                            </span>
                            <span className='p-3 bg-zinc-100 border  mr-6 rounded-md'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
                                </svg>
                            </span>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        </div>
                    </div>
                    <div className=' px-3 '>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Layout;




const menuIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>
