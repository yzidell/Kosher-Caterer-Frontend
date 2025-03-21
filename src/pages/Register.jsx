/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { FaFacebookF, FaGoogle } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";

import { customer_register, messageClear } from '../store/reducers/authReducer';

import { FadeLoader } from 'react-spinners';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

import Header from '../components/Header';
import Footer from '../components/Footer';

import toast from 'react-hot-toast';
import config from '../config';

const Register = () => {
    const sellerFrontendURL = config.STR_FRONTEND_URL
    const sellerDashbordURL  = config.STR_DASHBOARD_URL

    const { seller } = useSelector(state => state.seller)
    const {loader, errorMessage, successMessage, userInfo } = useSelector(state => state.auth)
        
    const sellerId = seller._id 
    const sellerPrimaryColor1 = seller.frontEndPrimaryColor1
    const sellerSecondaryColor1 = seller.frontEndSecondaryColor1
    const sellerBeforeYouRegister1 = seller.beforeYouRegister1

    const navigate = useNavigate()
    const dispatch = useDispatch()

    let [state, setState] = useState({
        webSiteOrigin: sellerFrontendURL, name: '', eventName: '', eventDate: '', phoneNumber:'', email: '', password: ''
    })
    
    const [myPhoneNumber, setMyPhoneNumber] = useState()
    
    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const register = (e) => {
        e.preventDefault()
        state.phoneNumber = myPhoneNumber
        //console.log(state)
        dispatch(customer_register(state))
    }

    useEffect(() => { 
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())  
        } 
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())  
        } 
        if (userInfo) {
            navigate('/')
        }
    },[successMessage, errorMessage])

    return (
        <div>
            {
                loader && 
                <div className='w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#38303033] z-[999]'>
                    <FadeLoader/>
                </div>
            }
            <Header/>
            <div className='min-w-screen min-h-screen bg-slate-200 flex justify-center items-center' >
                <div className='w-[350px] p-2'>
                    <div className='bg-white text-[#ffffff] p-4 rounded-md shadow-lg'>
                        <h2 className='text-center text-xl font-bold' style={{ color: sellerPrimaryColor1 }}>
                            Register
                        </h2>
                        <div className='text-center text-md mt-1' style={{ color: sellerPrimaryColor1 }}>
                            {sellerBeforeYouRegister1}
                        </div>
                        <form onSubmit={register}>
                            <div className='flex flex-col w-full gap-1 mb-3' style={{ color: sellerPrimaryColor1 }}>
                                <label htmlFor="name">Name</label>
                                <input required onChange={inputHandle} value={state.name} type="text" name='name' placeholder='Name' id='name'  
                                    className='px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md' />
                            </div>
                            <div className='flex flex-col gap-1 mb-2' style={{ color: sellerPrimaryColor1 }}>
                                <label htmlFor="eventName">Event Name (Short)</label>
                                <input onChange={inputHandle} value={state.eventName} type="text" name="eventName" id="eventName" placeholder='Event Name' 
                                    className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md' />
                            </div>
                            <div className='flex flex-col gap-1 mb-2' style={{ color: sellerPrimaryColor1 }}>
                                <label htmlFor="eventDate">Event Date</label>
                                <input onChange={inputHandle} value={state.eventDate} type="date" name="eventDate" id="eventDate" 
                                    className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md' />
                            </div>
                            <div className='flex flex-col gap-1 mb-2' style={{ color: sellerPrimaryColor1 }}>
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <PhoneInput required defaultCountry='US' country="US" value={myPhoneNumber} onChange={setMyPhoneNumber} 
                                    className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md' />
                            </div>
                            {
                                //         // <input onChange={inputHandle} value={state.phoneNumber} type="tel" name="phoneNumber" id="phoneNumber" placeholder='Phone Number' 
                                //         // className='hidden w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md' />
                                
                                //         // <PhoneInput defaultCountry='US' country="US" value={phoneNumber} onChange={setPhoneNumber}
                                //         // className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md' />
                                //         //<PhoneInput country="US" value={phoneNumber} onChange={setPhoneNumber} />
                                    
                                // </div>
                            }
                            <span className='hidden'>placeholder:text-[#6a5fdf] bg-[#bed0f5] text-[#6a5fdf]</span>
                            <div className='flex flex-col w-full gap-1 mb-3' style={{ color: sellerPrimaryColor1 }}>
                                <label htmlFor="email">Email</label>
                                <input onChange={inputHandle} value={state.email} className='px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md' 
                                    type="email" name='email' placeholder='Email' id='email' required />
                            </div>
                            <div className='flex flex-col w-full gap-1 mb-3' style={{ color: sellerPrimaryColor1 }}>
                                <label htmlFor="password">Password</label>
                                <input onChange={inputHandle} value={state.password} className='px-3 py-2 outline-none border border-slate-400 bg-transparent rounded-md' 
                                    type="password" name='password' placeholder='Password' id='password' required />
                            </div>
                            <div className='flex items-center w-full gap-3 mb-3' style={{ color: sellerPrimaryColor1 }}>
                                <input className='w-4 h-4 text-blue-600 overflow-hidden bg-gray-200 rounded border-gray-300 focus:ring-blue-500' 
                                    type="checkbox" name="checkbox" id="checkbox" />
                                <label htmlFor="checkbox"> I agree to privacy policy & terms</label> 
                            </div>
                            <button className='px-8 w-full mb-2 mr-2 py-2 shadow-lg hover:shadow-green-500/40 text-white rounded-md' 
                                style={{backgroundColor:sellerPrimaryColor1}}>
                                Register
                            </button>
                            <div className='flex items-center mb-3 gap-3 justify-center' style={{ color: sellerPrimaryColor1 }}>
                                <p>Already Have An Account ? <Link className='font-bold' to="/login">Sign In</Link></p>
                            </div>
                            <a target='_blank' href={`${sellerDashbordURL}/login`}>
                                <div className='px-8 w-full py-2 bg-[#02e3e0] shadow hover:shadow-red-500/50 text-white rounded-md flex justify-center items-center gap-2 mb-3'>
                                    Login As a Seller
                                </div>
                            </a>
                            <a target='_blank' href={`${sellerDashbordURL}/register`}>
                                <div className='px-8 w-full py-2 bg-[#ad2cc4] shadow hover:shadow-red-500/50 text-white rounded-md flex justify-center items-center gap-2 mb-3'>
                                    Register As a Seller
                                </div>
                            </a>
                            <div className='hidden justify-center items-center gap-3'>
                                <div className='w-[135px] h-[35px] flex rounded-md bg-orange-700 shadow-lg hover:shadow-orange-700/50 justify-center cursor-pointer items-center overflow-hidden'>
                                    <span><FaGoogle /></span>
                                </div>
                                <div className='w-[135px] h-[35px] flex rounded-md bg-blue-700 shadow-lg hover:shadow-blue-700/50 justify-center cursor-pointer items-center overflow-hidden'>
                                    <span><FaFacebook /></span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>  
            </div>
            <Footer/>
        </div>
    );
};

export default Register;
