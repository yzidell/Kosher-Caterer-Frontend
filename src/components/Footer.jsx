/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { FaFacebookF, FaLinkedin, FaGithub} from "react-icons/fa";
import { FaTwitter, FaHeart, FaCartShopping } from "react-icons/fa6";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";

import { toTitleCase } from '../components/toTitleCase';

import config from '../config';

import { Text } from '@react-pdf/renderer';

const Footer = () => {
    //const sellerFrontendURL = config.STR_FRONTEND_URL 

    const { seller } = useSelector(state => state.seller)
    const { userInfo } = useSelector(state => state.auth) 
    const { cart_product_count, wishlist_count } = useSelector(state => state.cart) 
                
    const sellerId = seller._id 
    const sellerPrimaryColor1 = seller.frontEndPrimaryColor1
    const sellerPrimaryColor2 =  seller.frontEndPrimaryColor2
    const sellerSecondaryColor1 = seller.frontEndSecondaryColor1    
    const sellerCompanyPhoneNumber = seller.phoneNumber
    const sellerCompanyLogo = seller.logoImage
    const sellerImage = seller.sellerImage
    const sellerCompanyEmailAddress = seller.emailAdress
    const sellerCompanyKosherSupervision = seller.kosherSupervision
    const sellerCompanyMarketingLine1 = seller.marketingLine1
    const sellerCompanyOwnerNames = seller.ownerNames
    const sellerCompanyName = seller.shopName
    const sellerCompanyAddress1 = seller.address1
    const sellerCompanyAddress2 = seller.address2
    const sellerCompanyCity = seller.city
    const sellerCompanyState = seller.sellerState
    const sellerCompanyZipCode = seller.zipCode
    const sellerCompanyContactPerson = seller.contactPerson
    
    const sellerBoolShowSiteWishList = seller.isVisibleSiteWishlist === 'Show' ? true : false
    const sellerBoolShowSiteSocialMedia = seller.isVisibleSiteSocialMedia === 'Show' ? true : false
    const sellerBoolShowSiteChat = seller.isVisibleSiteChat === 'Show' ? true : false

    let footerKosherSupervisionURL = ''
    if (sellerCompanyKosherSupervision=== 'OU') {
        footerKosherSupervisionURL = '/images/kashrus/OU-Logo-Footer.png'
    } else if (sellerCompanyKosherSupervision === 'CRC') {
        footerKosherSupervisionURL = '/images/kashrus/CRC-Logo-Footer.png'
    } else if (sellerCompanyKosherSupervision === 'KCL') {
        footerKosherSupervisionURL = '/images/kashrus/KCL-Logo-Footer.png'
    }
    
    let arrOwnerNames = []
    try {
        if (sellerCompanyOwnerNames.includes(';')) {
            arrOwnerNames = sellerCompanyOwnerNames.split(';')
        } else {
            arrOwnerNames[0] = sellerCompanyOwnerNames
        }
    } catch (error) {
        
    }

    const dispatch = useDispatch()
    const navigate = useNavigate() 

    const redirect_chat_page = () => {
        if (userInfo) {
            navigate(`/customerDashboard/chat`)
            ///${sellerId}
        } else {
            navigate('/login')
        }
    }

    return (
        <footer className='bg-[#f3f6fa]'>
            <div className='w-[80%] flex flex-wrap mx-auto border-b py-6 md-lg:pb-10 sm:pb-6'>
                <div className='w-3/12 lg:w-4/12 sm:w-full'>
                    <h2 className='font-bold text-lg mb-1' style={{color:sellerPrimaryColor1}}>About Us (A Little)</h2>
                    <table className='table-auto'>
                        <tbody>
                            <tr>
                                <td style={{verticalAlign:'top'}} >
                                    <img className='w-[190px] h-[70px]' src={sellerCompanyLogo} alt="logo.png" />
                                </td>
                                <td align='left' >
                                    <img className='w-[50px] border-0 rounded-lg' src={sellerImage} alt="sellerImage" />
                                </td>
                            </tr>
                            <tr>
                                <td className='text-sm font-semibold' style={{color:sellerPrimaryColor1}} align='center' colSpan={2} >
                                    {
                                        // key={i}
                                        arrOwnerNames.map((p,i) => {
                                            return( toTitleCase(p) + ', ' )
                                        })
                                    }
                                    <br/>At Your Service!
                                </td>
                            </tr>
                            <tr className='hidden' >
                                <td>
                                    <img className='w-[50px] border-0 rounded-lg' src={sellerImage} alt="sellerImage" />
                                </td>
                                <td className='text-sm font-semibold' style={{color:sellerPrimaryColor1}}>
                                    <div>
                                        <ul className={`flex flex-col ml-2 gap-1 text-sm font-semibold`}
                                            style={{color:sellerPrimaryColor1}}>
                                            {
                                                arrOwnerNames.map((p,i) => {
                                                    return( <li key={i}>{toTitleCase(p)}</li> )
                                                })
                                            }
                                            <li>At Your Service!</li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='w-5/12 lg:w-7/12 sm:w-full'>
                    <div className='flex justify-center sm:justify-start sm:mt-6 w-full'>
                        <div className=''>
                            <h2 className='font-bold text-lg mb-1' style={{color:sellerPrimaryColor1}}>Contact Info</h2>
                            <div className='flex justify-between gap-[30px] lg:gap-[10px]'>
                                <ul className='flex flex-col ml-2 gap-2 text-sm font-semibold' style={{color:sellerPrimaryColor1}}>
                                    <li>{sellerCompanyName}</li>
                                    <li>{sellerCompanyAddress1} {sellerCompanyAddress2}</li>
                                    <li>{sellerCompanyCity}, {sellerCompanyState} {sellerCompanyZipCode}</li>
                                    {
                                        // <li><Link>About Us </Link></li>
                                        // <li><Link>About Our Shop </Link></li>
                                        // <li><Link>Delivery Information </Link></li>
                                        // <li><Link>Privacy Policy</Link></li>
                                        // <li><Link>Blogs</Link></li>
                                    }
                                </ul>
                                <ul className='flex flex-col gap-2 text-sm font-semibold' style={{color:sellerPrimaryColor1}}>
                                    <li>Phone: {sellerCompanyPhoneNumber}</li>
                                    <li>Contact: {sellerCompanyContactPerson}</li>
                                    <li>Email: {sellerCompanyEmailAddress}</li>
                                </ul>
                                {
                                       
                                    //     <li><Link>Our Service </Link></li>
                                    //     <li><Link>Company Profile</Link></li>
                                    //     <li><Link>Privacy Policy </Link></li>
                                    //     <li><Link>Blogs  </Link></li>
                                }
                            </div>
                            <div className='w-full items-center justify-center'>
                                <div onClick={redirect_chat_page} 
                                    className={` ${sellerBoolShowSiteChat ? '' : 'hidden' } 
                                    mt-2 px-1 py-1 text-sm font-semibold flex h-[34px] w-full justify-center items-center rounded-lg  
                                    cursor-pointer hover:shadow-lg hover:shadow-red-500/40 text-white `}
                                    style={{backgroundColor:sellerPrimaryColor1}}>
                                    <IoChatbubbleEllipsesSharp className='mr-2' />Chat With Us
                                </div>
                                <div className='w-full flex flex-wrap justify-center items-center mx-auto py-5 text-center' style={{color:sellerPrimaryColor1}}>
                                    <span className='font-semibold'>Copyright @ 2025 Platinum Event Management LLC</span>
                                </div>
                            </div>
                        </div> 
                    </div> 
                </div>
                <div className='w-4/12 lg:w-8/12 sm:w-full'>
                    <div className='flex justify-center sm:justify-start sm:mt-6 w-full'>
                        <div>
                            <h2 className='font-bold text-lg mb-1' style={{color:sellerPrimaryColor1}}>About Our Kitchen</h2>
                            <div className='flex justify-between gap-[80px] lg:gap-[40px]'>
                                <ul className='flex flex-col ml-2 gap-2 text-sm font-semibold' style={{color:sellerPrimaryColor1}}>
                                    <li className='w-[80%]'>{sellerCompanyMarketingLine1}</li>
                                    <li>
                                        <img className='' src={footerKosherSupervisionURL}  alt='KosherLogo' />
                                    </li>                                   
                                </ul>
                            </div>
                            
                            <div className={` ${sellerBoolShowSiteSocialMedia ? 'mt-2' : 'hidden' } `}>
                                <ul className='flex justify-start items-center gap-3'>
                                    <li className={`font-semibold`} style={{color:sellerPrimaryColor1}}>
                                        Share On
                                    </li>
                                    <li>
                                        <a className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-indigo-500 rounded-full text-white' href="#">
                                            <FaFacebookF />
                                        </a>
                                    </li>
                                    <li>
                                        <a className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-cyan-500 rounded-full text-white' href="#">
                                            <FaTwitter />
                                        </a>
                                    </li>
                                    <li>
                                        <a className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-purple-500 rounded-full text-white' href="#">
                                            <FaLinkedin />
                                        </a>
                                    </li>
                                    <li>
                                        <a className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-blue-500 rounded-full text-white' href="#">
                                            <FaGithub />
                                        </a>
                                    </li>
                                </ul> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                //flex
            }
            <div className='hidden w-full flex-wrap justify-center items-center mx-auto py-5 text-center' style={{color:sellerPrimaryColor1}}>
                <span className='font-semibold'>Copyright @ 2025 Platinum Event Management LLC</span>
            </div>
            {
                //slider on lower right in mobile view
            }
            <div className={`${userInfo ? '' : 'hidden'}`} >
                <div className={`hidden fixed md-lg:block w-[50px] h-[220px] bottom-3 right-2 bg-white rounded-full p-2`}>
                    <div className='w-full h-full flex gap-5 flex-col justify-center items-center'>
                        
                        <div onClick={() => navigate(userInfo ? '/cart' : '/login') }  
                            className='relative flex justify-center items-center cursor-pointer mb-2 w-[35px] h-[70px] rounded-full' 
                            style={{backgroundColor:sellerSecondaryColor1}}>
                            <span className='text-xl' style={{color:sellerPrimaryColor1}}>
                                <MdOutlineRestaurantMenu className='pb-1 text-3xl' />
                                <FaCartShopping className='pl-1 text-2xl'/>
                            </span>
                                {
                                cart_product_count !== 0 && 
                                <div className='w-[30px] h-[22px] absolute bg-red-500 rounded-full text-white flex 
                                    justify-center items-center -top-[15px] -right-[-2px]'>
                                    {
                                        cart_product_count
                                    }
                                </div>
                            }
                        </div>
                        
                        <div onClick={() => navigate(userInfo ? '/customerDashboard/myWishlist' : '/login') } 
                            className={` ${sellerBoolShowSiteWishList ? '' : 'hidden'} 
                            relative flex justify-center items-center cursor-pointer rounded-full w-35px] h-[70px] `}
                            style={{backgroundColor:sellerSecondaryColor1}}>
                            <span className='text-xl' style={{color:sellerPrimaryColor1}}>
                                <MdOutlineRestaurantMenu className='pb-1 text-3xl' />
                                <FaHeart className='pl-1 text-2xl' />
                            </span>
                            {
                                wishlist_count !== 0 && 
                                <div className='w-[30px] h-[22px] absolute bg-red-500 rounded-full text-white flex 
                                    justify-center items-center -top-[15px] -right-[0px]'>
                                    {
                                        wishlist_count 
                                    }
                                </div>
                            }
                        </div>

                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
