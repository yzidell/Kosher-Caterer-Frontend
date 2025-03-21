/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, lazy }  from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';

import { FaEye, FaRegTrashAlt} from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { TbArrowBigRightLinesFilled } from "react-icons/tb";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
//import Rating from '../Rating';

import { get_wishlist_products, remove_from_wishlist, move_from_wishlist_to_cart, add_to_cart, 
    messageClear } from '../../store/reducers/cartReducer';

import useWindowSize from '../../utils/useWindowSize';
import toast from 'react-hot-toast';

import { currencyFormat } from '../CurrencyFormat';
const Rating = lazy(()=> import('../Rating')) 

const Wishlist = () => {
    const { seller } = useSelector(state => state.seller)
    const { userInfo } = useSelector(state => state.auth)
    const { wishlist, wishlist_count, errorMessage, successMessage } = useSelector(state => state.cart)
    //console.log(wishlist)
    const { screenWidth, screenHeight } = useWindowSize();

    const sellerId = seller._id 
    const sellerPrimaryColor1 = seller.frontEndPrimaryColor1
    const sellerSecondaryColor1 = seller.frontEndSecondaryColor1
    const sellerProductPluralTerm = seller.productPluralTerm

    const sellerBoolShowSitePayments = seller.isVisibleSitePayments === 'Show' ? true : false
    const sellerBoolShowSiteRating = seller.isVisibleSiteRating === 'Show' ? true : false
    const sellerBoolShowSiteChat = seller.isVisibleSiteChat === 'Show' ? true : false

    const [portionSize, setPortionSize] = useState('')
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const redirect_chat_page = (chatTopic) => {
        if (userInfo) {
            navigate(`/customerDashboard/chat/${chatTopic}`)
        } else {
            navigate('/login')
        }
    }

    const move_from_wishlist_to_cart_local = (id) => {
        if (userInfo) {
            dispatch(move_from_wishlist_to_cart(id))
            //console.log('productId ', id)
            //console.log('userId ', userInfo.id)
            // dispatch(add_to_cart({
            //     userId: userInfo.id,
            //     quantity : 1,
            //     productId : id, // product._id,
            //     portionSize: portionSize
            // }))
            // setPortionSize('')
        } else {
            navigate('/login')
        }
    }

    useEffect(() => {
       dispatch(get_wishlist_products(userInfo.id))
    },[])

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
    //console.log('wishlist ', wishlist)
   
    return (
        <div>
            <h2 className='border font-semibold mb-3' style={{color:sellerPrimaryColor1}}>
                My Wishlist - {wishlist_count} {sellerProductPluralTerm} That I Would Like To Consider
            </h2>
            <div className='w-full grid grid-cols-4 md-lg:grid-cols-4 md:grid-cols-1 sm:grid-cols-1 gap-2'>
                {
                    wishlist.map((p, i) => 
                        <div key={i} className='border-2 group transition-all duration-500 hover:shadow-md hover:-mt-3'
                            style={{backgroundColor:sellerSecondaryColor1, color:sellerPrimaryColor1, borderColor:sellerPrimaryColor1}}>
                            {
                                //<ShopProductCard product={p} parentPage={'Wishlist'} />
                                //console.log(p)
                            }
                            <div className='relative overflow-hidden'>
                                {
                                    // p.discount !== 0 && 
                                    // <div className='flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full 
                                    //     bg-red-500 font-semibold text-xs left-2 top-2'>{p.discount}%
                                    // </div> 
                                }
                                <img className={`sm:w-full w-full h-[200px]`} src={p.image}  alt="" />  
                                <ul className='flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3'>
                                    <span onClick={() => move_from_wishlist_to_cart_local(p._id)} 
                                        className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'>
                                        <TbArrowBigRightLinesFilled /> <MdOutlineRestaurantMenu />
                                    </span>
                                    <li onClick={() => dispatch(remove_from_wishlist(p._id))} 
                                        className='w-[38px] h-[38px] cursor-pointer flex bg-white justify-center items-center 
                                        rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'>
                                        <FaRegTrashAlt />
                                    </li>
                                    <li>
                                        <Link to={`/product/details/${p.productId}`} className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'>
                                            <FaEye />
                                        </Link>
                                    </li>
                                    {/*onClick={redirect_chat_page}*/}
                                     <span onClick={() => redirect_chat_page(p.name)} 
                                        className={` ${sellerBoolShowSiteChat ? '' : 'hidden'}  w-[38px] h-[38px] cursor-pointer flex justify-center 
                                        items-center rounded-full hover:rotate-[720deg] transition-all bg-white hover:bg-[#059473] hover:text-white  `}>
                                        <IoChatbubbleEllipsesSharp />
                                    </span>
                                </ul>
                            </div>
                            <div className='py-3 px-2'>
                                <div className='font-bold'>
                                    <span>{p.name?.substring(0, parseInt(screenWidth / 66))}</span>
                                    <span className={` ${(p.name?.substring(0, parseInt(screenWidth / 66))?.length >= p.name?.length) ? 'hidden' : '' } `}> ...</span>
                                </div>
                                
                                <div className='flex justify-start items-center gap-3'>
                                    <span className={`${sellerBoolShowSitePayments ? '' : 'hidden'} text-md font-semibold`}>
                                        {currencyFormat.format(p.price)}
                                    </span>
                                    <div className={`${sellerBoolShowSiteRating ? 'flex' : 'hidden'} `}>
                                        <Rating ratings={p.rating} />
                                    </div>
                                </div>
                            </div>
                            <div className='ml-1 mr-1' >
                                
                                <div className={`${p.portionSizes !== '' ? 'w-full hidden' : 'hidden'} `}>
                                    <select onChange={(e) => setPortionSize(e.target.value)} id='' name='' 
                                        className='border rounded-md px-3 py-1 mb-1 w-full text-[14px] font-semibold' 
                                        style={{borderColor:sellerPrimaryColor1, color:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1}}>
                                        <option value=''>Choose Portion Size</option>
                                        {
                                            p.portionSizes.split(';').map((p,i) => {
                                                return( <option key={i} value={p}>{p}</option> )
                                            })
                                        }            
                                    </select>
                                </div>
                                <div className={`${p.portionSizes === '' ? '' : ''} 
                                    border px-1 py-1 mb-1 w-full text-[14px] font-semibold`}
                                    style={{borderColor:sellerPrimaryColor1, color:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1}}>
                                    {/*{p.description?.substring(0,22)} ...*/}
                                    <span>{p.description?.substring(0, parseInt(screenWidth / 50))}</span>
                                        <span className={` ${(p.description?.substring(0, parseInt(screenWidth / 50))?.length >= p.description?.length) ? 'hidden' : '' } `}> ...</span>
                                </div>
                            </div>
                            
                            <div className='ml-1 mr-1' >
                                <button onClick={() => move_from_wishlist_to_cart_local(p._id)} 
                                    className={`px-1 py-1 mb-1 h-[34px] w-full rounded-lg text-md cursor-pointer
                                    hover:shadow-lg hover:shadow-green-500/40] text-white flex justify-center items-center `} 
                                    style={{backgroundColor:sellerPrimaryColor1}}>
                                    <TbArrowBigRightLinesFilled className='mr-1' /> Move To My Menu
                                </button> 
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Wishlist;
