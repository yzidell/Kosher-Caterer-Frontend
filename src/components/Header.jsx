/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { MdEmail, MdOutlineRestaurantMenu } from "react-icons/md";
import { IoMdPhonePortrait, IoIosArrowDown, IoMdLogOut,  IoMdArrowDropdown } from "react-icons/io";
import { AiOutlineDashboard, AiOutlineShoppingCart } from "react-icons/ai";
import { FaFacebookF, FaList, FaLock, FaUser, FaGithub, FaLinkedin, FaPhoneAlt } from "react-icons/fa";
import { FaTwitter, FaHeart, FaCartShopping } from "react-icons/fa6";
import { IoChatbubbleEllipsesSharp, IoChatbubbleEllipsesOutline } from "react-icons/io5";

import { get_cart_products, get_wishlist_products } from '../store/reducers/cartReducer';
import { get_event_details } from '../store/reducers/eventDetailsReducer';
import { user_reset } from '../store/reducers/authReducer'
import { reset_count } from '../store/reducers/cartReducer'

import api from '../api/api';
import toast from 'react-hot-toast';

import config from '../config';

const Header = () => {
    const sellerFrontendURL = config.STR_FRONTEND_URL 

    const { seller } = useSelector(state => state.seller)
    const { userInfo } = useSelector(state => state.auth) 
    const { cart_product_count, wishlist_count } = useSelector(state => state.cart) 
    const { eventDetails } = useSelector(state => state.eventDetails);
    const { categorys, mainIngredients } = useSelector(state => state.home) 
                
    const sellerId = seller._id 
    const sellerPrimaryColor1 = seller.frontEndPrimaryColor1
    const sellerPrimaryColor2 =  seller.frontEndPrimaryColor2
    const sellerSecondaryColor1 = seller.frontEndSecondaryColor1
    const sellerProductPluralTerm = seller.productPluralTerm
    const sellerCompanyPhoneNumber = seller.phoneNumber
    const sellerCompanyLogo = seller.logoImage
    const sellerCompanyEmailAddress = seller.emailAdress
    const sellerCompanyKosherSupervision = seller.kosherSupervision
    const sellerMainIngredientPluralTerm = seller.mainIngredientPluralTerm
    const sellerTaglineTop1 = seller.taglineTop1
    const sellerTaglineTop2 = seller.taglineTop2
    const sellerMarketingLine1  = seller.marketingLine1

    const sellerBoolShowSiteWishList = seller.isVisibleSiteWishlist  === 'Show' ? true : false
    const sellerBoolShowSitePackages = seller.isVisibleSitePackages  === 'Show' ? true : false
    const sellerBoolShowSiteSamplesMenus = seller.isVisibleSiteSamplesMenus  === 'Show' ? true : false
    const sellerBoolShowSiteChat = seller.isVisibleSiteChat === 'Show' ? true : false

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const redirect_cart_page = () => {
        if (userInfo) {
            navigate('/cart')
        } else {
            navigate('/login')
        }
    }

    const redirect_wishlist_page = () => {
        if (userInfo) {
            navigate('/customerDashboard/myWishlist')
        } else {
            navigate('/login')
        }
    }

    const redirect_customerDashboard_page = () => {
        if (userInfo) {
            navigate('/customerDashboard')
        } else {
            navigate('/login')
        }
    }
    
    const redirect_chat_page = () => {
        if (userInfo) {
            navigate(`/customerDashboard/chat`)
            ///${sellerId}
        } else {
            navigate('/login')
        }
    }

    const {pathname} = useLocation()
    //console.log(pathname)
    
    const [showSidebar, setShowSidebar] = useState(true);
    const [categoryShow, setCategoryShow] = useState(true);
    const [mainIngredientShow, setMainIngredientShow] = useState(true);
    
    const [searchValue, setSearchValue] = useState('')
    const [category, setCategory] = useState('')
    const [mainIngredient, setMainIngredient] = useState('')
    
    const searchValueLocal =(val) => {
        if (val){
            setSearchValue(val)
            // console.log(val)
            // if (val.length > 3){
            //     search()      
            // }
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            search()
        }
    };

    const search = () => {
        //navigate(`/products/search?category=${category}&&value=${searchValue}`)
        navigate(`/products/search?category=${category}&&mainIngredient=${mainIngredient}&&value=${searchValue}`)
        //pages/SearchProducts
        //console.log(searchValue)
    }

    useEffect(() => {
        if (userInfo) {
            dispatch(get_cart_products(userInfo.id))    
            dispatch(get_wishlist_products(userInfo.id))
            dispatch(get_event_details(userInfo.id))
        }
    },[userInfo])

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
        <div id='topMenuDesktop' className='w-full bg-white'>
            <div className='header-top bg-[#caddff] md-lg:hidden'>
                <div className='w-[85%] lg:w-[90%] mx-auto'>
                    <div className='flex w-full justify-between items-center h-[50px]'>
                        <ul className='flex justify-start items-center gap-8 font-semibold text-[13px]'
                            style={{color:sellerPrimaryColor2}}>
                            <li className='flex relative justify-center items-center gap-2 after:absolute 
                                after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px]'>
                                <span><MdEmail /></span>
                                <span>{sellerCompanyEmailAddress}</span>
                            </li>
                            <li className='flex relative justify-center items-center gap-2 after:absolute 
                                after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px]'>
                                <span><IoMdPhonePortrait  /></span>
                                <span>{sellerCompanyPhoneNumber}<br/>Menu Questions</span>
                            </li>
                            <li className='flex relative justify-center items-center gap-2'>
                                <span><IoMdPhonePortrait  /></span>
                                <span>718 781-4207<br/>Tech Support</span>
                            </li>
                        </ul>
                        <div>
                            <div className='flex justify-center items-center gap-10'>
                                <div className='hidden justify-center items-center gap-4 text-black'>
                                    <a href="#"><FaFacebookF /></a>
                                    <a href="#"><FaTwitter /> </a>
                                    <a href="#"><FaLinkedin /></a>
                                    <a href="#"><FaGithub /> </a> 
                                </div>
                                <div className='hidden justify-center items-center gap-4 text-sm  text-black'>
                                    Everything cooked fresh and from scratch
                                </div>
                                <div className={`flex cursor-pointer text-sm justify-center items-center gap-1 relative after:h-[18px]  
                                    after:-right-[16px] after:absolute before:absolute before:h-[18px] font-semibold 
                                    after:bg-[#afafaf] before:bg-[#afafaf] after:w-[1px] before:w-[1px] before:-left-[20px]`}
                                    style={{color:sellerPrimaryColor2}}>
                                    Kosher: <span className='font-bold'>{sellerCompanyKosherSupervision}</span>
                                    <img className='hidden' src={`/images/kashrus/OU-Kosher-logo-77x24.png`}  alt='' />
                                </div>
                                <div className='group hidden cursor-pointer text-sm justify-center items-center gap-1 relative after:h-[18px]  
                                    after:-right-[16px] after:absolute before:absolute before:h-[18px] after:bg-[#afafaf] before:bg-[#afafaf] 
                                    after:w-[1px] before:w-[1px] before:-left-[20px]'>
                                    <img src={sellerFrontendURL + `/images/language.png`} alt="" />
                                    <span><IoMdArrowDropdown /></span>
                                    <ul className='flex absolute invisible transition-all top-12 rounded-sm duration-200 p-2 w-[100px] flex-col gap-3 group-hover:visible group-hover:top-6 
                                        text-white group-hover:bg-black z-10'>
                                        <li>Hindi</li>
                                        <li>English</li>
                                    </ul>
                                </div>    
                                {
                                    userInfo ?
                                        <span className='flex cursor-pointer justify-center items-center gap-1'>
                                            <FaUser className='hidden text-green-500 text-[18px]'/>
                                            <span className={` ${sellerBoolShowSiteChat ? '' : 'hidden'} `} onClick={redirect_chat_page}>
                                                <IoChatbubbleEllipsesOutline className='text-green-500 text-[36px]'/>
                                            </span>
                                        <span onClick={redirect_customerDashboard_page} 
                                            className='flex cursor-pointer justify-center items-center gap-1'>
                                            <AiOutlineDashboard className='text-green-500 text-[36px]'/>
                                            { 
                                                eventDetails?.eventName === '' ?
                                                <span onClick={redirect_customerDashboard_page} 
                                                    className='text-[13px] p-1 pl-2 pr-2 text-blue-800 font-semibold rounded-lg bg-green-200 border 
                                                    border-green-200'>
                                                    {userInfo?.name}<br />{userInfo?.email}
                                                </span>
                                                :
                                                <span onClick={redirect_customerDashboard_page} 
                                                    className='text-[13px] p-1 pl-2 pr-2 text-blue-800 font-semibold rounded-lg bg-green-200 border 
                                                    border-green-200 leading-4 '>
                                                    {userInfo?.email}<br />{eventDetails?.eventName}
                                                </span>
                                            }
                                            <IoMdLogOut onClick={logout} className='text-red-600 text-[36px]' />
                                        </span>
                                        </span>
                                        : 
                                         <Link to='/login' className='flex cursor-pointer justify-center items-center gap-2 text-sm 
                                            text-black'>
                                            <span><FaLock /></span>
                                            <span>Login</span>
                                         </Link>
                                }
                                {
                                    !userInfo ? '' : ''
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-white'>
                <div className='w-[85%] lg:w-[90%] mx-auto'>
                    <div className='h-[80px] md-lg:h-[100px] flex justify-between items-center flex-wrap'>
                        <div className='md-lg:w-full w-3/12 md-lg:pt-4 border-none'>
                            <div className='flex justify-between items-center'>
                                <Link to='/'>
                                    <img src={sellerCompanyLogo} alt="mylogo.png" />
                                </Link>
                                <div onClick={() => setShowSidebar(false)} 
                                    className='justify-center items-center w-[30px] h-[30px] rounded-sm cursor-pointer 
                                    lg:hidden md-lg:flex xl:hidden hidden border'
                                    style={{backgroundColor:sellerSecondaryColor1, color:sellerPrimaryColor1, borderColor:sellerPrimaryColor1}}    >
                                    <span><FaList/></span>
                                </div>
                            </div>
                        </div>
                        {
                            // w-full flex justify-center items-center uppercase font-bold tracking-widest border 
                            // border-[#dbf3ed] uppercase
                            //${pathname === '/' ? 'myTextColor1' : textPrimary2 }
                            //className={`p-2 block ${pathname === '/shops' ? textPrimary1 : textPrimary2 } `}
                            //hidden md:lg:w-full w-6/12 border justify-center items-center pl-3
                            }
                        
                        {
                            //md:lg:w-full w-6/12 justify-center items-center 
                            //link classanme p-2 blovk
                            // justify-center items-center


                        //     <div id='MiddleSecondRowSectionGood' className='w-9/12 pl-3 md-lg:pl-0 md-lg:w-full'>
                        // <div className='flex flex-wrap w-full justify-between items-center md-lg:gap-6'>
                        //     <div className='w-9/12 md-lg:w-full'>
                        //         <div className={`border w-full h-[40px] mb-1 text-lg flex justify-center items-center uppercase font-bold tracking-widest  
                    
                        }
                        <div className='md:lg:w-[98%] w-7/12 border-none justify-items-center'>
                            <div className='pl-1 pr-1 border-none '>
                                <table className= 'hidden w-full border-none'>
                                    <tbody>
                                        <tr>
                                            <td className='border w-1/5 text-sm' align='center'>Home</td>
                                            <td className='border w-1/5' align='center'>All {sellerProductPluralTerm}</td>
                                            <td className='border w-1/5' align='center'>Packages</td>
                                            <td className='border w-1/5' align='center'>Sample Menus</td>
                                            <td className='border w-1/5' align='center'>About Us</td>
                                        </tr>
                                    </tbody>
                                </table>
                                {
                                    //flex-wrap items-center justify-between items-center md-lg:justify-center 
                                }
                                <div id='ULMenuTop' className='border-none text-[17px]'>
                                    {
                                        //justify-start items-start border-none rounded-lg
                                        //style={{borderColor: sellerPrimaryColor1}}
                                    }
                                    <ul className='flex w-full border-none gap-4 text-nowrap font-bold md-lg:hidden'>
                                        <li className='' id='menuBar' name='menuBar'>
                                            <Link to='/' className='hover:border-b-2 pl-2 pr-2 pb-1' 
                                                style={{color: pathname === '/' ? sellerPrimaryColor1 : sellerPrimaryColor2, 
                                                borderColor: pathname === '/' ? sellerPrimaryColor1 : sellerPrimaryColor2}}>                                            
                                                Home
                                            </Link>
                                        </li>
                                        <li className=''>
                                            <Link to='/shops' className='hover:border-b-2 pl-2 pr-2 pb-1' 
                                                style={{color: pathname === '/shops' ? sellerPrimaryColor1 : sellerPrimaryColor2, 
                                                borderColor: pathname === '/shops' ? sellerPrimaryColor1 : sellerPrimaryColor2}}>
                                                All {sellerProductPluralTerm}
                                            </Link>
                                        </li>
                                        <li className={` ${sellerBoolShowSitePackages ? '' : 'hidden'}`} >
                                            <Link to='/sellerPackages' className='hover:border-b-2 pl-2 pr-2 pb-1' 
                                                style={{color: pathname === '/sellerPackages' ? sellerPrimaryColor1 : sellerPrimaryColor2, 
                                                borderColor: pathname === '/sellerPackages' ? sellerPrimaryColor1 : sellerPrimaryColor2}}>
                                                Packages 
                                            </Link>
                                        </li>
                                        <li className={` ${sellerBoolShowSiteSamplesMenus ? '' : 'hidden'} `} >
                                            <Link to='/sampleMenus' className='hover:border-b-2 pl-2 pr-2 pb-1' 
                                                style={{color: pathname === '/sampleMenus' ? sellerPrimaryColor1 : sellerPrimaryColor2, 
                                                borderColor: pathname === '/sampleMenus' ? sellerPrimaryColor1 : sellerPrimaryColor2 }}>
                                                Sample Menus
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to='/aboutUs' className='hover:border-b-2 pl-2 pr-2 pb-1' 
                                                style={{color: pathname === '/aboutUs' ? sellerPrimaryColor1 : sellerPrimaryColor2, 
                                                    borderColor: pathname === '/aboutUs' ? sellerPrimaryColor1 : sellerPrimaryColor2 }} >
                                                About Us
                                            </Link>
                                        </li>
                                        <li className='hidden'>
                                            <Link className='hover:border-b-2 p-2' 
                                                style={{color: pathname === '/contact' ? sellerPrimaryColor1 : sellerPrimaryColor2, 
                                                borderColor: pathname === '/contact' ? sellerPrimaryColor1 : sellerPrimaryColor2 }} >
                                                Contact Us 
                                            </Link>
                                        </li>    
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {
                            //md:lg:w-full w-3/12 border
                        }
                        <div className='md:lg:w-full w-2/12 border-none'>
                            <div className='flex md-lg:hidden justify-center items-center'>
                                <div className='flex justify-center gap-5'>
                                    <div onClick={redirect_wishlist_page} style={{backgroundColor:sellerSecondaryColor1}}
                                        className={` ${sellerBoolShowSiteWishList ? '' : 'hidden'} 
                                        relative flex justify-center items-center cursor-pointer rounded-full w-[65px] h-[35px]  `}>
                                        <span className='text-xl pr-1' style={{color:sellerPrimaryColor1}}>
                                            <MdOutlineRestaurantMenu/>
                                        </span>
                                        <span className='text-xl' style={{color:sellerPrimaryColor1}}>
                                            <FaHeart />
                                        </span>
                                        {
                                            wishlist_count !== 0 && 
                                            <div className='w-[30px] h-[22px] absolute bg-red-500 rounded-full text-white flex 
                                                justify-center items-center -top-[8px] -right-[16px] '>
                                                {wishlist_count}
                                            </div>
                                        }        
                                    </div>
                                    
                                    <div onClick={redirect_cart_page}
                                        className='relative flex justify-center items-center cursor-pointer whitespace-nowrap 
                                        w-[65px] h-[35px] rounded-full' style={{backgroundColor:sellerSecondaryColor1}}>
                                        <span className='text-xl pr-1' style={{color:sellerPrimaryColor1}}>
                                            <MdOutlineRestaurantMenu/> 
                                        </span>
                                        <span className='text-xl' style={{color:sellerPrimaryColor1}}>
                                            <FaCartShopping />
                                        </span>
                                        {
                                            //-right-[5px]
                                            cart_product_count !== 0 && 
                                            <div className='w-[30px] h-[22px] absolute bg-red-500 rounded-full text-white flex 
                                                justify-center items-center -top-[8px] -right-[16px] '>
                                                { cart_product_count }
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='hidden md-lg:block'>
                <div onClick={()=> setShowSidebar(true)} 
                    className={`fixed duration-200 transition-all 
                        ${showSidebar ? 'invisible' : 'visible'} hidden md-lg:block w-screen h-screen bg-[rgba(0,0,0,0.5)] 
                        top-0 left-0 z-20 `}>
                
                </div>
                <div id='sideMenuMobile' className={`w-[300px] z-[9999] transition-all duration-200 fixed 
                    ${showSidebar ? '-left-[300px]' : 'left-0 top-0'} overflow-y-auto bg-white h-screen py-6 px-8 `}>
                    
                    <div className='flex justify-start flex-col gap-6'>
                        <Link to='/'>
                            <img className='mb-1' src={sellerCompanyLogo} alt="Mylogo.png" />
                        </Link>
                        <div className='flex justify-start items-center gap-7'>
                            <div className={`flex cursor-pointer text-sm justify-center items-center gap-1 relative after:h-[18px]  
                                after:-right-[16px] after:absolute before:absolute before:h-[18px] text-slate-800 font-bold 
                                after:bg-[#afafaf] before:bg-[#afafaf] after:w-[1px] before:w-[1px] before:-left-[20px]`}>
                                <div>
                                    Kosher: <span className='font-bold'>{sellerCompanyKosherSupervision}</span>
                                </div>
                                <img className='hidden' src={`/images/kashrus/OU-Kosher-logo-20x20.png`} alt='' />
                            </div>
                            <div className='hidden group cursor-pointer text-slate-800 text-sm justify-center items-center gap-1 relative after:h-[18px] after:w-[1px] after:bg-[#afafaf] after:-right-[16px] after:absolute '>
                                <img src={sellerFrontendURL + `/images/language.png`} alt="" />
                                <span><IoMdArrowDropdown /></span>
                                <ul className='absolute invisible transition-all top-12 rounded-sm duration-200 text-white p-2 w-[100px] flex flex-col gap-3 group-hover:visible group-hover:top-6 group-hover:bg-black z-10'>
                                    <li>Hindi</li>
                                    <li>English</li>
                                </ul>
                            </div>
                            {
                                userInfo ? 
                                    <span className='flex cursor-pointer justify-center items-center gap-1'>
                                        <div className='flex cursor-pointer justify-center items-center gap-1'>
                                            <span><FaUser className='hidden text-green-500 text-[18px] mb-1'/></span>
                                            <IoChatbubbleEllipsesOutline className={` ${sellerBoolShowSiteChat ? '' : 'hidden'}  
                                                text-green-500 text-[32px]`} onClick={redirect_chat_page} />
                                            <AiOutlineDashboard onClick={redirect_customerDashboard_page} className='text-green-500 text-[32px] mb-1'/>
                                        </div>
                                        <div>
                                            <IoMdLogOut onClick={logout} className='text-red-600 text-[30px]' />
                                        </div>
                                        <div className='hidden text-[12px] p-1 text-black font-semibold rounded-lg bg-green-200 border border-green-200'>
                                        { 
                                            eventDetails?.eventName === '' ?
                                            <span onClick={redirect_customerDashboard_page} 
                                                className='text-[13px] p-1 pl-0 pr-2 text-blue-800 font-semibold rounded-lg bg-green-200 border 
                                                border-green-200'>
                                                {userInfo?.name}<br />{userInfo?.email}
                                            </span>
                                            :
                                            <span 
                                                className='text-[13px] p-1 text-blue-800 font-semibold rounded-lg bg-green-200 border 
                                                border-green-200 leading-4 '>
                                                {userInfo?.email}<br />{eventDetails?.eventName}
                                            </span>
                                        }   
                                        </div>
                                    </span> 
                                    : 
                                    <Link to='/login' className='flex cursor-pointer justify-center items-center gap-2 text-sm text-black'>
                                        <span><FaLock /></span>
                                        <span>Login</span>
                                    </Link>
                            } 
                        </div>  
                        {
                            //flex
                        }
                        <div className='hidden justify-left gap-5'>
                            <div className='relative flex justify-center items-center cursor-pointer rounded-full 
                                w-[65px] h-[35px]' style={{backgroundColor:sellerSecondaryColor1}}>
                                <span onClick={redirect_cart_page} className='text-xl pr-1' style={{color:sellerPrimaryColor1}}>
                                    <MdOutlineRestaurantMenu/>
                                </span>
                                <span className='text-xl' style={{color:sellerPrimaryColor1}}>
                                    <FaHeart />
                                </span>
                                <div className='w-[20px] h-[20px] absolute bg-red-500 rounded-full text-white flex justify-center items-center 
                                    -top-[3px] -right-[12px] '>
                                    { /*wishlist_count*/}
                                </div>
                            </div>
                            <div className='relative flex justify-center items-center cursor-pointer whitespace-nowrap 
                                w-[65px] h-[35px] rounded-full' style={{backgroundColor:sellerSecondaryColor1}}>
                                <span onClick={redirect_cart_page} className='text-xl pr-1' style={{color:sellerPrimaryColor1}}>
                                    <MdOutlineRestaurantMenu/> 
                                </span>
                                <span onClick={redirect_cart_page} className='text-xl' style={{color:sellerPrimaryColor1}}>
                                    <FaCartShopping />
                                </span>
                                {
                                    //-right-[5px]
                                    cart_product_count !== 0 && 
                                    <div className='w-[20px] h-[20px] absolute bg-red-500 rounded-full text-white flex 
                                        justify-center items-center -top-[3px] -right-[12px] '>
                                        { cart_product_count }
                                    </div>
                                }
                            </div>
                        </div>
                        <div className={`flex tracking-widest border-none`} style={{color:sellerPrimaryColor1}}>
                        { 
                            eventDetails?.eventName === '' ?
                            <span 
                                className='w-full text-[13px] p-1 text-blue-800 font-semibold rounded-lg bg-green-200 border 
                                border-green-200'>
                                <div className='pl-2 pt-1'>
                                    {userInfo?.name}
                                </div>
                                <div className='pl-2 pb-1'>
                                    {userInfo?.email}
                                </div>
                            </span>
                            :
                            <div  
                                className='w-full text-[13px] text-blue-800 font-semibold 
                                rounded-lg bg-green-200 border border-green-200'>
                                <div className='pl-2 pt-1'>
                                    {userInfo?.email}
                                </div>
                                <div className='pl-2 pb-1'>
                                    {eventDetails?.eventName}
                                </div>
                            </div>
                        }
                        </div>
                        <div className={`w-full p-1 flex justify-center items-center uppercase font-bold tracking-widest border 
                            border-[#dbf3ed] `} style={{color:sellerPrimaryColor1}}>
                            {sellerTaglineTop1}
                        </div>
                        <ul className='flex flex-col justify-start items-start text-sm font-bold uppercase'>
                            <li>
                                <Link to='/' className='p-2 block' style={{color: pathname === '/' ? sellerPrimaryColor1 : sellerPrimaryColor2 }}>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to='/shops' className='p-2 block' style={{color: pathname === '/shops' ? sellerPrimaryColor1 : sellerPrimaryColor2 }}>
                                    All {sellerProductPluralTerm}
                                </Link>
                            </li>
                            <li className={` ${sellerBoolShowSitePackages ? '' : 'hidden'} `} >
                                <Link  to='/sellerPackages' className='p-2 block' style={{color: pathname === '/sellerPackages' ? sellerPrimaryColor1 : sellerPrimaryColor2 }}>
                                    Packages
                                </Link>
                            </li>
                            <li className={` ${sellerBoolShowSiteSamplesMenus ? '' : 'hidden'} `} >
                                <Link to='/sampleMenus' className='p-2 block' style={{color: pathname === '/sampleMenus' ? sellerPrimaryColor1 : sellerPrimaryColor2 }}>
                                    Sample Menus
                                </Link>
                            </li>
                            <li>
                                <Link to='/aboutUs' className='p-2 block' style={{color: pathname === '/about' ? sellerPrimaryColor1 : sellerPrimaryColor2 }}> 
                                    About Us
                                </Link>
                            </li>
                            <li className='hidden' >
                                <Link to='/contact' className='p-2 block' style={{color: pathname === '/contact' ? sellerPrimaryColor1 : sellerPrimaryColor2 }}>                                            
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                        <div className='hidden justify-start items-center gap-4 text-black'>
                            <a href="#"><FaFacebookF /></a>
                            <a href="#"><FaTwitter /> </a>
                            <a href="#"><FaLinkedin /></a>
                            <a href="#"><FaGithub /> </a> 
                        </div>
                        <div className='w-full flex justify-end md-lg:justify-start gap-3 items-center'>
                            <div className='w-[48px] h-[48px] rounded-full flex bg-[#f5f5f5] justify-center items-center '>
                                <span style={{color:sellerPrimaryColor2}}><FaPhoneAlt /></span>
                            </div>
                            <div className='flex justify-end flex-col gap-1'>
                                <h2 className='text-sm font-medium' style={{color:sellerPrimaryColor2}}>{sellerCompanyPhoneNumber}</h2>
                                <span className='text-xs' style={{color:sellerPrimaryColor2}}>Call Us!!</span> 
                            </div>
                        </div>
                        <ul className='flex flex-col justify-start items-start gap-3' style={{color:sellerPrimaryColor2}}>
                            <li className='flex justify-start items-center gap-2 text-sm'>
                                <span><MdEmail /></span>
                                <span>{sellerCompanyEmailAddress}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='w-[85%] lg:w-[90%] mx-auto'>
                <div className='flex w-full flex-wrap md-lg:gap-8'>
                    <div className='w-3/12 md-lg:w-full'>
                        <div className='hidden'>set to  hidden extend the plian drop downs and seach all the way acros</div>
                        <div className='bg-white relative'>
                            <div onClick={() => setCategoryShow(!categoryShow) } 
                                className={`h-[40px] flex justify-center md-lg:justify-between md-lg:px-6 items-center gap-3 
                                font-bold text-md cursor-pointer text-white`} 
                                style={{backgroundColor:sellerPrimaryColor1}}>
                                <div className='flex justify-center items-center gap-3'>
                                    <span><FaList/></span>
                                    <span>All Categories</span>
                                </div>
                                <span className='pt-1'><IoIosArrowDown /></span>
                            </div>
                            <div className={`${categoryShow ? 'h-0' : 'h-[400px]'} 
                                overflow-hidden transition-all md-lg:relative duration-500 absolute z-[99999] w-full border-x`}
                                style={{backgroundColor:sellerSecondaryColor1}}>
                                <ul className='py-2 font-medium'>
                                    {
                                        categorys.map((c,i) => {
                                            return (
                                                <li key={i}
                                                    className={`flex justify-start items-center gap-2 px-[24px] py-[6px]`}>
                                                    <img src={c.image} alt=""
                                                        className={`w-[30px] h-[30px] rounded-full overflow-hidden`} />
                                                    <Link onClick={() => setCategoryShow(!categoryShow) } 
                                                        to={`/productsCategory?category=${c.name}`} className='text-sm block' 
                                                        style={{color:sellerPrimaryColor1}}>{c.name}</Link>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>

                            <div onClick={() => setMainIngredientShow(!mainIngredientShow) } 
                                className={`h-[40px] mt-1 flex justify-center md-lg:justify-between md-lg:px-6 items-center gap-3 font-bold text-md cursor-pointer 
                                text-white`} style={{backgroundColor:sellerPrimaryColor1}}>
                                <div className='flex justify-center items-center gap-3'>
                                    <span><FaList/></span>
                                    <span>All {sellerMainIngredientPluralTerm}</span>
                                </div>
                                <span className='pt-1'><IoIosArrowDown /></span>
                            </div>
                            <div className={`${mainIngredientShow ? 'h-0' : 'h-[400px]'} 
                                overflow-hidden transition-all md-lg:relative duration-500 absolute z-[99990]  w-full border-x`} 
                                style={{backgroundColor:sellerSecondaryColor1}}>
                                <ul className='py-2 font-medium'>
                                    {
                                        // link to new page
                                        mainIngredients.map((c,i) => {
                                            return (
                                            <li key={i} className={` flex justify-start items-center gap-2 px-[24px] py-[6px] `}>
                                                <img src={c.image} className='hidden w-[30px] h-[30px] rounded-full overflow-hidden' alt="" />
                                                <img src={c.image} alt=""
                                                    className={`w-[30px] h-[30px] rounded-full overflow-hidden`} />
                                                <Link onClick={() => setMainIngredientShow(!mainIngredientShow) } 
                                                    to={`/productsMainIngredient?mainIngredient=${c.name}`} className='text-sm block' 
                                                    style={{color:sellerPrimaryColor1}}>{c.name}</Link>
                                            </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div id='MiddleSecondRowSectionGood' className='w-9/12 pl-3 md-lg:pl-0 md-lg:w-full'>
                        <div className='flex flex-wrap w-full justify-between items-center md-lg:gap-6'>
                            <div className='w-9/12 md-lg:w-full'>
                                <div className={`border w-full h-[40px] mb-1 text-lg flex justify-center items-center uppercase font-bold tracking-widest  
                                    border-[#dbf3ed] `} style={{color:sellerPrimaryColor1}}>
                                    {sellerTaglineTop1}
                                </div>
                                <div className='flex border-none h-[40px] items-center relative gap-6'>
                                    <div className='hidden relative after:absolute after:h-[25px] after:w-[1px] after:bg-[#afafaf] 
                                        after:-right-[15px] md:hidden'>
                                        {
                                            //border-none px-2 h-full
                                        }
                                        <select onChange={(e) => setCategory(e.target.value)} name="" id="" 
                                            className='w-[140px] border font-semibold text-sm bg-transparent outline-0' 
                                            style={{color:sellerPrimaryColor1}}>
                                            <option value="">Categories</option>
                                            {
                                                categorys.map((c, i) => 
                                                    <option key={i} value={c.name} className={`text-sm block`}>{c.name}</option>
                                                )
                                            }
                                        </select>
                                    </div>
                                    <div className='hidden relative after:absolute after:h-[25px] after:w-[1px] after:bg-[#afafaf] 
                                        after:-right-[15px] md:hidden'>
                                        <select onChange={(e) => setMainIngredient(e.target.value)} name="" id="" 
                                            className='w-[140px] border font-semibold text-sm bg-transparent outline-0' 
                                            style={{color:sellerPrimaryColor1}}>
                                            <option value="">{sellerMainIngredientPluralTerm}</option>
                                            {
                                                mainIngredients.map((c, i) => 
                                                    <option key={i} value={c.name} className={`text-sm block`}>{c.name}</option>
                                                )
                                            }
                                        </select>
                                    </div>
                                    {
                                        //onChange={(e) => setMyReview(e.target.value)}
                                        // <input onChange={(e)=> setSearchValue(e.target.value)} type="text" name='' id='' placeholder='Search' 
                                        // className='w-full border rounded-l-lg relative bg-transparent text-slate-500 outline-0 px-3 h-full' />

                                    }
                                    <input onChange={(e)=> searchValueLocal(e.target.value)} value={searchValue} onKeyDown={handleKeyDown} type="text" name='' id='' placeholder='Menu Search' 
                                        className='w-full border rounded-l-lg relative bg-transparent text-slate-500 outline-0 px-3 h-full' />
                                    <button onClick={search} className='right-0 absolute rounded-r-lg px-2 w-[80px] h-full font-semibold uppercase text-white' style={{backgroundColor:sellerPrimaryColor1}}>
                                        Search
                                    </button>
                                </div>
                            </div>

                            <div className='w-3/12 block md-lg:hidden pl-3 md-lg:w-full md-lg:pl-0'>
                                
                                <div className='w-full border-none flex justify-end md-lg:justify-start gap-1 items-center'>
                                    { //w-[48px] h-[48px] bg-[#f5f5f5]
                                    }
                                    <div>
                                        <div className='w-[70px] h-[70px] rounded-full flex justify-center items-center border-none' 
                                             style={{backgroundColor:sellerSecondaryColor1, color:sellerPrimaryColor1}}>
                                            <span><FaPhoneAlt className='hidden' /></span>
                                            <span><MdOutlineRestaurantMenu className='text-[46px]' /></span>                                       
                                        </div>
                                    </div>
                                    <div className='flex justify-end flex-col gap-1'>
                                        <div className='hidden text-[12px] p-1 font-medium pr-2' style={{color:sellerPrimaryColor1}}>
                                            343-432-1234<br/>Menu Questions<br/> 
                                            718 781-4207<br/>Tech Support
                                        </div> 
                                        <div className='text-[12px] border-none leading-5' 
                                            style={{color:sellerPrimaryColor1}}>
                                            {sellerMarketingLine1}
                                        </div>
                                    </div>
                                </div>                   
                            </div>
                        </div>
                    </div>
                    <div className={`w-full my-1 border text-2xl h-[40px] mb-2 flex justify-center items-center uppercase font-bold tracking-widest  
                        border-[#dbf3ed] sm:hidden `} style={{color:sellerPrimaryColor1}}>
                        {sellerTaglineTop2}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
