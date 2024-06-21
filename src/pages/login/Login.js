import { Alert, IconButton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../../actions/userActions';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import { Container, Loader } from 'semantic-ui-react';

import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../actions/userActions';
import './style.css'




const schema = yup
    .object()
    .shape({
        user: yup.string().email('Please Enter A Valide Email Address').required('Email is required'),
        password: yup.string().required('Password is required'),
    }).required();




const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();



    const dispatch = useDispatch();

    const {
        loding: userInfoLoding,
        error: userInfoError,
        userInfo
    } = useSelector(state => state.userLogin)


    useEffect(() => {
        console.log(userInfo);
        if (userInfo) {
            navigate('/')
        }
    }, [dispatch, navigate, userInfo])

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm(
        {
            resolver: yupResolver(schema)
        }
    );

    const onSubmit = (_data) => {
        dispatch(login(_data.user, _data.password))
    }


    return (
        <div className=' dotsBG'>
            <div className='bg-gradient-to-r from-slate-900 to-gray-900/90 '>
                <Container>
                    <div className=' lg:flex sm:block flex-1 gap-5 lg:h-[100vh] sm:h-full items-center' >
                        <div></div>
                        <div className='w-full '>
                            <h1 className='m-0 text-white font-[900] font-roboto text-[60px]'>Welcome.</h1>
                            <h1 className=' m-0 bg-gradient-to-r from-blue-400 to-teal-500 bg-clip-text text-transparent font-bold font-roboto text-[60px]'>School Managment</h1>
                            <h2 className=' m-0 mb-10 text-gray-400 font-light font-roboto'>Online Managment Platform</h2>
                            <p className=' text-gray-300 text-[20px] '>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum fuga adipisci placeat quaerat reprehenderit optio eius obcaecati natus voluptas facere.</p>
                        </div>

                        <div className='w-full  rounded-lg border-gray-800 shadow-lg bg-gray-900/90 m-2 p-5' >
                            <div className=' px-5 py-10'>
                                {userInfoLoding && <Loader active inline='centered'>Loding...</Loader>}
                                {userInfo && <Alert severity="success">{userInfo.message}</Alert>}
                                {userInfoError && <Alert severity="error">{userInfoError}</Alert>}
                                <br />
                                <div className='mb-9 pl-3  '>
                                    <h2 className=' text-white font-bold font-sans'>Sign in</h2>
                                    <p className='text-white'>Sign in if you have an accountin here</p>
                                </div>
                                <form autoComplete='true' onSubmit={handleSubmit(data => onSubmit(data))} >
                                    <div>
                                        <label className=' text-white text-[15px] ml-5'>Email</label>
                                        <div className={`flex items-center rounded-xl px-5 py-1 text-white bg-white/10 ${errors.user ? 'border border-red-300' : ''} `}>
                                            {mailIcon}
                                            <input
                                                type="email"
                                                name='user'
                                                {...register('user')}
                                                placeholder='example@gmail.com'
                                                className='block px-5 py-3 outline-none  bg-transparent rounded-full w-full '
                                            />
                                        </div>
                                        <p className='text-sm mt-1 ml-3 text-red-600'>{errors.user && errors.user.message}</p>
                                    </div>
                                    <div className='my-4'>
                                        <label className='text-white text-[15px] ml-5'>Password</label>
                                        <div className={`flex items-center rounded-xl px-5 py-1 text-white bg-white/10 ${errors.password ? 'border border-red-300 ' : ''} `}>
                                            {keyIcon}
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                name='username'
                                                {...register('password')}
                                                placeholder='Password Here'
                                                className=' px-5 outline-none w-full bg-transparent ' />
                                            <IconButton onClick={() => setShowPassword(!showPassword)}>
                                                {showPassword ? ShowPasswordIcon : hidePasswordIcon}
                                            </IconButton>
                                        </div>
                                        <p className='text-sm mt-1 ml-3 text-red-600'>{errors.password && errors.password.message}</p>
                                        <span className='flex justify-end mt-3'>
                                            <Link className=''>Forget Your Password?</Link>
                                        </span>
                                    </div>
                                    <div className='my-2 mx-auto flex  gap-3'>
                                        <button type='submit' className='py-4 px-9 bg-white/20 rounded-xl w-full text-white text-[15px] font-bold font-sans hover:bg-blue-600'>Login</button>
                                        <button type='submit' className='py-4 px-9 bg-blue-500 rounded-xl w-full text-white text-[15px] font-bold font-sans hover:bg-blue-600'>Create account</button>
                                    </div>
                                </form >
                            </div >
                        </div>
                    </div>
                </Container>
            </div>
        </div>

    );
}

export default Login;





const ShowPasswordIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>

const hidePasswordIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
</svg>


const keyIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
</svg>


const mailIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
</svg>
