/* eslint-disable no-useless-concat */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, lazy } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { FaEye, FaRegHeart, FaHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { IoMdRestaurant } from "react-icons/io";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";

import { add_to_cart, add_to_wishlist, messageClear } from '../../store/reducers/cartReducer';

import toast from 'react-hot-toast';
import { currencyFormat } from '../CurrencyFormat';
import useWindowSize from '../../utils/useWindowSize';

const Rating  = lazy(()=> import('../Rating')) 

const ShopProductGridListView = ({styles, products}) => {
    const { userInfo } = useSelector(state => state.auth)
    const { errorMessage, successMessage } = useSelector(state => state.cart)
    const { seller } = useSelector(state => state.seller)
    const { screenWidth, screenHeight } = useWindowSize();
    //const [productNameSnippet, setProductNameSnippet] = useState('')
    
    //console.log(products)

    const sellerId = seller._id 
    const sellerPrimaryColor1 = seller.frontEndPrimaryColor1
    const sellerSecondaryColor1 = seller.frontEndSecondaryColor1
    const sellerShoppingTerm = seller.shoppingTerm
    const sellerProductPluralTerm = seller.productPluralTerm

    const sellerBoolShowSitePayments = seller.isVisibleSitePayments === 'Show' ? true : false
    const sellerBoolShowSiteWishList = seller.isVisibleSiteWishlist === 'Show' ? true : false
    const sellerBoolShowSiteRating = seller.isVisibleSiteRating === 'Show' ? true : false
    const sellerBoolShowSiteChat = seller.isVisibleSiteChat === 'Show' ? true : false

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [portionSize, setPortionSize] = useState('')

    let buttonTextGrid =  userInfo ? 'Add To ' + sellerShoppingTerm : 'Please Login Or Register'
    let buttonTextAddToWishList =  userInfo ? 'Add To Wish List' : 'Please Login'
    let buttonTextAddToMenuList =  userInfo ? 'Add To ' + sellerShoppingTerm : 'Please Login'
    let descriptionHeight = 30
    
    const add_to_wishlist_local = (pro) => {
        if (userInfo) {
            dispatch(add_to_wishlist({
                userId: userInfo.id,
                productId: pro._id,
                name: pro.name,
                price: pro.price,
                image: pro.images[0],
                discount: pro.discount,
                rating: pro.rating,
                slug: pro.slug,
                portionSizes: pro.portionSizes,
                description: pro.description
            }))
        } else {
            navigate('/login')
        }
    }

    const add_to_cart_local = (id) => {
        if (userInfo) {
            dispatch(add_to_cart({
                userId: userInfo.id,
                quantity : 1,
                productId : id,// product._id,
                portionSize: portionSize
            }))
            setPortionSize('')
        } else {
            navigate('/login')
        }
    }

    const redirect_chat_page = (chatTopic) => {
        if (userInfo) {
            navigate(`/customerDashboard/chat/${chatTopic}`)
        } else {
            navigate('/login')
        }
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
    },[successMessage, errorMessage])

    return (
        <div className={`w-full grid ${styles === 'grid' ? 
            'grid-cols-3 md-lg:grid-cols-2 md:grid-cols-1' : 
            'grid-cols-1 md-lg:grid-cols-2 md:grid-cols-1'} gap-3 `}>
            {   
                //md:grid-cols-2
                products.map((p, i)=> 
                    <div key={i} 
                        className={`flex border-2 transition-all duration-1000 hover:shadow-md hover:-translate-y-3 
                        ${styles === 'grid' ? 
                        'flex-col justify-start items-start' 
                        : 
                        'justify-start items-center md-lg:flex-col md-lg:justify-start md-lg:items-start'} 
                        w-full gap-1 bg-white p-1`}
                        style={{color:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1, borderColor:sellerPrimaryColor1}}>
                        
                        <div className={styles === 'grid' ? 
                            'w-full relative group h-[210px] md:h-[270px] xs:h-[170px] overflow-hidden' 
                            : 
                            'md-lg:w-full relative group h-[210px] md:h-[270px] w-[270px] overflow-hidden'}>
                            {
                                // product={p} parentPage={'ShopProducts'} descriptionSubstringLength={36}
                                //w-[240px] md:w-[270px] xs:w-[170px]
                                // style={{color:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1, borderColor:sellerPrimaryColor1}}
                            }
                            <div id='ImageAndIcons' style={{color:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1}} >
                                <img src={p.images[0]} alt="" className='h-[240px] md:h-[270px] xs:h-[170px] w-full object-cover' />
                                <ul className={`flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3`}>
                                    <li onClick={() => add_to_cart_local(p._id)} 
                                        className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full 
                                        hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'>
                                        + <MdOutlineRestaurantMenu />
                                    </li>
                                    <li onClick={() => add_to_wishlist_local(p)}
                                        className={` ${sellerBoolShowSiteWishList ? '' : 'hidden'} 
                                            w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full  
                                            hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all`}>
                                        <FaRegHeart />
                                    </li>
                                    <Link to={`/product/details/${p._id}`}  
                                        className='w-[38px] h-[38px] cursor-pointer flex justify-center items-center rounded-full 
                                        hover:rotate-[720deg] transition-all bg-white hover:bg-[#059473] hover:text-white'>
                                        <FaEye />
                                    </Link>
                                    {/*onClick={redirect_chat_page}*/}
                                    <span onClick={() => redirect_chat_page(p.name)}  
                                        className={` ${sellerBoolShowSiteChat ? '' : 'hidden'} w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full 
                                        hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all` }>
                                        <IoChatbubbleEllipsesSharp/>
                                    </span>
                                </ul>
                            </div>
                        </div>
                        <div className='flex w-full justify-start items-start flex-col gap-1 p-1' style={{color:sellerPrimaryColor1}}>
                            <div className={` ${styles === 'grid' ? 'hidden font-bold' : 'hidden'} `}>
                                { p.name.length > 26 ? p.name.substring(0, 26) + ' ...' : p.name }
                            </div>
                            <div className={` ${styles === 'grid' ? 'font-bold' : 'hidden'} `}>
                                <span>{p.name?.substring(0, parseInt(screenWidth / 52))}</span>
                                <span className={` ${(p.name?.substring(0, parseInt(screenWidth / 52))?.length >= p.name?.length) ? 'hidden' : '' } `}> ...</span>
                            </div>

                            <span className={` ${styles === 'list' ? 'text-xl font-bold' : 'hidden'} `}>
                                {p.name}
                            </span>

                            <div className={`flex justify-start items-center gap-3`}>
                                <span className={`${sellerBoolShowSitePayments ? '' : 'hidden'} text-md font-semibold`} style={{color:sellerPrimaryColor1}} >
                                    {currencyFormat.format(p.price)}
                                </span>
                                <span className={` ${sellerBoolShowSiteRating ? 'flex' : 'hidden'} `}>
                                    <Rating ratings={p.rating} />
                                </span>
                            </div>
                            <div className={` ${styles === 'grid' ? 'w-full' : 'hidden'} `} >
                                <div className={`${p.portionSizes !== '' ? 'w-full' : 'hidden'} `}>
                                    <select onChange={(e) => setPortionSize(e.target.value)} id='' name='' 
                                        className='border rounded-md px-3 mb-1 mt-2 w-full text-[14px] font-semibold' 
                                        style={{borderColor:sellerPrimaryColor1, color:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1}}>
                                        <option value=''>Choose Portion Size</option>
                                        {
                                            p.portionSizes.split(';').map((p,i) => {
                                                return( <option key={i} value={p}>{p}</option> )
                                            })
                                        }
                                    </select>
                                </div>
                                <div>
                                    <div className={`${p.portionSizes === '' ? '' : 'hidden'} py-1 px-1 mb-1 border text-[14px] font-semibold`}
                                        style={{borderColor:sellerPrimaryColor1, color:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1}}>
                                        <span className='hidden'>{p.description?.substring(0, 28)} ...</span>

                                        <span>{p.description?.substring(0, parseInt(screenWidth / 42))}</span>
                                        <span className={` ${(p.description?.substring(0, parseInt(screenWidth / 42))?.length >= p.description?.length) ? 'hidden' : '' } `}> ...</span>
                                    </div>
                                </div>      
                                <div className='w-full' >            
                                    <button onClick={() => add_to_cart_local(p._id)} 
                                        className='px-1 py-1 mb-1 h-[34px] flex w-full justify-center items-center rounded-lg text-md cursor-pointer hover:shadow-lg 
                                        hover:shadow-green-500/40 bg-[#059473] text-white' 
                                        style={{backgroundColor:sellerPrimaryColor1}}>
                                        <MdOutlineRestaurantMenu className='mr-1' />{buttonTextGrid}
                                    </button>     
                                </div>
                            </div>
                            <div className={` ${styles === 'list' ? 'h-[146px]' : 'hidden'} `}>
                                <div className='hidden' >
                                {
                                    descriptionHeight = p.portionSizes !== '' ? '84px' : '110px'
                                }
                                </div>
                                    <div className='w-[99%] border text-[13px] p-1 mr-1 overflow-auto'
                                        style={{borderColor:sellerPrimaryColor1, color:sellerPrimaryColor1, 
                                            backgroundColor:sellerSecondaryColor1, height: descriptionHeight}}>
                                            {p.description}
                                    </div>
                                    <div className={`${p.portionSizes !== '' ? 'w-full' : 'hidden'} `}>
                                        <select onChange={(e) => setPortionSize(e.target.value)} id='' name='' 
                                            className='border rounded-md px-3 mt-1 w-[180px] text-[14px] font-semibold' 
                                            style={{borderColor:sellerPrimaryColor1, color:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1}}>
                                            <option value=''>Choose Portion Size</option>
                                            {
                                                p.portionSizes.split(';').map((p,i) => {
                                                    return( <option key={i} value={p}>{p}</option> )
                                                })
                                            }
                                        </select>
                                    </div>
                                <div className='flex gap-2 mt-1 mb-1 '>  
                                    <button onClick={() => add_to_cart_local(p._id)} 
                                        className='px-1 py-1 h-[30px] w-[140px] flex rounded-lg text-sm cursor-pointer hover:shadow-lg 
                                        hover:shadow-green-500/40 bg-[#059473] text-white' 
                                        style={{backgroundColor:sellerPrimaryColor1}}>
                                        <IoMdRestaurant className='mt-1 mr-1 text-[16px]' />{buttonTextAddToMenuList}
                                    </button>
                                    <div onClick={() => add_to_wishlist_local(p)} style={{backgroundColor:sellerPrimaryColor1}}
                                        className={` ${sellerBoolShowSiteWishList ? '' : 'hidden'}  
                                            h-[30px] w-[140px] rounded-lg flex text-sm justify-center items-center  
                                            cursor-pointer hover:shadow-lg hover:shadow-cyan-500/40 text-white`}>
                                        <FaHeart className='mr-1' /> {buttonTextAddToWishList}
                                    </div>
                                   
                                    <button onClick={() => navigate(`/product/details/${p._id}`)} 
                                        className='px-1 py-1 h-[30px] w-[140px] flex rounded-lg text-sm cursor-pointer hover:shadow-lg 
                                        hover:shadow-green-500/40 bg-[#059473] text-white' 
                                        style={{backgroundColor:sellerPrimaryColor1}}>
                                        <FaEye className='mt-1 mr-1 ml-1 text-[16px]' /> View Details
                                    </button>
                                    <button onClick={() => redirect_chat_page(p.name)}
                                        className={` ${sellerBoolShowSiteChat ? '' : 'hidden'} 
                                        px-1 py-1 h-[30px] w-[140px] flex rounded-lg text-sm cursor-pointer hover:shadow-lg 
                                        hover:shadow-green-500/40 bg-[#059473] text-white`} 
                                        style={{backgroundColor:sellerPrimaryColor1}}>
                                        <IoChatbubbleEllipsesSharp className='mt-1 mr-1 ml-1 text-[16px]' /> Chat With Us
                                    </button>
                                </div>
                            </div>
                        </div>   
                    </div>
                )
            }
        </div>
    );
};

export default ShopProductGridListView;
