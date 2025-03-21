/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';


import { FaList, FaUser, FaHeart } from 'react-icons/fa';
import { IoIosHome } from "react-icons/io";
import { FaBorderAll } from "react-icons/fa6";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { AiOutlineDashboard, AiOutlineShoppingCart } from "react-icons/ai";
import { TbListDetails } from "react-icons/tb";
import { IoMdLogOut } from "react-icons/io";
import { RiLockPasswordLine } from "react-icons/ri";

import api from '../api/api';

import { user_reset } from '../store/reducers/authReducer'
import { reset_count } from '../store/reducers/cartReducer'

import Header from '../components/Header';
import Footer from '../components/Footer';

import toast from 'react-hot-toast';
import config from '../config';

const CustomerDashboard = () => {
    const { seller } = useSelector(state => state.seller)
    
    const sellerId = seller._id 
    const sellerPrimaryColor1 = seller.frontEndPrimaryColor1
    const sellerSecondaryColor1 = seller.frontEndSecondaryColor1

    const sellerBoolShowSiteWishList = seller.isVisibleSiteWishlist === 'Show' ? true : false
    const sellerBoolShowSiteChat = seller.isVisibleSiteChat === 'Show' ? true : false

    const [filterShow, setFilterShow] =  useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const logout = async () => {
        try {
            toast.success('Logout Success')
            const {data} = await api.get('/customer/logout')
            localStorage.removeItem('customerToken')
            dispatch(user_reset())
            dispatch(reset_count())
            navigate('/login')    
        } catch (error) {
            console.log(error.response.data)
        }
    }

    return (
        <div>
           <Header/>
           <div className='bg-slate-200 mt-5'>
                <div className='w-[90%] mx-auto md-lg:block hidden'>
                    <div>
                        <button onClick={() => setFilterShow(!filterShow)} className='text-center border py-3 px-3'
                            style={{backgroundColor:sellerSecondaryColor1, color:sellerPrimaryColor1, borderColor:sellerPrimaryColor1}}>
                            <FaList/>
                        </button>
                    </div>
                </div>
                <div className='h-full mx-auto'>
                    <div className='py-5 flex md-lg:w-[90%] mx-auto relative'>
                        <div className={`rounded-md z-50 md-lg:absolute 
                            ${filterShow ? '-left-4' : '-left-[360px]'} w-[270px] ml-4 border`}
                            style={{backgroundColor:sellerSecondaryColor1, color:sellerPrimaryColor1, borderColor:sellerPrimaryColor1}}>
                            <ul className='py-2 px-4 text-[14px] font-semibold'>
                                <li className='flex justify-start items-center gap-2 py-2'>
                                    <span className='text-xl'><AiOutlineDashboard /></span>
                                    <Link to='/customerDashboard' className='block'>Dashboard</Link>
                                </li>
                                <li className='flex justify-start items-center gap-2 py-2'>
                                    <span className='text-xl'><FaUser /></span>
                                    <Link to='/customerDashboard/myProfile' className='block'>My Profile</Link>
                                </li>
                                <li className='flex justify-start items-center gap-2 py-2'>
                                    <span className='text-xl'><TbListDetails /></span>
                                    <Link to='/customerDashboard/eventDetailsCustomerDashboard' className='block'>
                                        <div className='block'>Event Details/</div>
                                        <div className='block'>Give Deposit</div>
                                    </Link>
                                </li>
                                <li className='flex justify-start items-center gap-2 py-2'>
                                    <span className='text-xl'><FaBorderAll/></span>
                                    <Link to='/customerDashboard/myOrders' className='block'>My Orders</Link>
                                </li>
                                <li className={` ${sellerBoolShowSiteWishList ? '' : 'hidden'} flex justify-start items-center gap-2 py-2`}>
                                    <span className='text-xl'><FaHeart/></span>
                                    <Link to='/customerDashboard/myWishlist' className='block'>My Wishlist</Link>
                                </li>
                                <li className={` ${sellerBoolShowSiteChat ? '' : 'hidden' } flex justify-start items-center gap-2 py-2`}>
                                    <span className='text-xl'><IoChatbubbleEllipsesSharp/></span>
                                    <Link  to={`/customerDashboard/chat/${sellerId}`} className='block' >Chat</Link>
                                </li>
                                <li className='flex justify-start items-center gap-2 py-2'>
                                    <span className='text-xl'><RiLockPasswordLine/></span>
                                    <Link to='/customerDashboard/changePassword' className='block' >Change Password</Link>
                                </li>
                                <li onClick={logout} className='flex justify-start items-center gap-2 py-2 cursor-pointer'>
                                    <span className='text-xl'><IoMdLogOut/></span>
                                    <div className='block'>Logout</div>
                                </li> 
                            </ul>
                        </div>
                        <div className='w-[calc(100%-270px)] md-lg:w-full'>
                            <div className='mx-4 md-lg:mx-0'>
                                <Outlet/>
                            </div>
                        </div>
                    </div>
                </div>
           </div>
           <Footer/>
        </div>
    );
};

export default CustomerDashboard;
