/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, lazy } from 'react';
import Carousel from 'react-multi-carousel';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import 'react-multi-carousel/lib/styles.css'
import { IoIosArrowBack,IoIosArrowForward } from "react-icons/io";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import { FaEye, FaRegHeart } from "react-icons/fa";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { RiShoppingCartLine } from "react-icons/ri";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { add_to_cart, add_to_wishlist, messageClear } from '../../store/reducers/cartReducer';

import toast from 'react-hot-toast';
//import Rating from '../Rating';
import { currencyFormat } from '../../components/CurrencyFormat';

import config from '../../config';

const Rating  = lazy(()=> import('../Rating')) 

const Products = ({title, products, parentPage}) => {
    const { userInfo } = useSelector(state => state.auth)
    const { seller } = useSelector(state => state.seller)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [portionSize, setPortionSize] = useState('')
    const [iconHeight, setIconHeight] = useState('')
    const [iconWidth, setIconWidth] = useState('')
    const [pageWidth, setPageWidth] = useState('')
    const [descriptionSubstringLength, setDescriptionSubstringLength] = useState('')
    const [nameSubstringLength, setNameSubstringLength] = useState('')
    const [buttonWidth, setButtonWidth] = useState('')
    const [imageWidth, setImageWidth] = useState('')
    
    const sellerId = seller._id 
    const sellerPrimaryColor1 = seller.frontEndPrimaryColor1
    const sellerPrimaryColor2 =  seller.frontEndPrimaryColor2
    const sellerSecondaryColor1 = seller.frontEndSecondaryColor1
    const sellerBoolShowSitePayments = seller.isVisibleSitePayments === 'Show' ? true : false
    const sellerBoolShowSiteWishList = seller.isVisibleSiteWishlist === 'Show' ? true : false
    const sellerBoolShowSiteRating = seller.isVisibleSiteRating === 'Show' ? true : false
    const sellerBoolShowSiteChat = seller.isVisibleSiteChat === 'Show' ? true : false

    //const [displayTitle, setDisplayTitle] = useState('')
    
    //parentPage CategoryShop Home MainIngredientShop SearchProducts
   
    useEffect(() => { 
        if (parentPage === 'Home') {
            setIconHeight('34px')
            setIconWidth('34px')
            setPageWidth('Wide')
            setDescriptionSubstringLength('37')
            setNameSubstringLength('30')
            setButtonWidth('98%')
            setImageWidth('98%')
        } else if (parentPage === 'Shops' || parentPage === 'SearchProducts' || parentPage === 'CategoryShop' || parentPage === 'MainIngredientShop') {
            setIconHeight('26px')
            setIconWidth('26px')
            setPageWidth('Narrow')
            setDescriptionSubstringLength('22')
            setNameSubstringLength('22')
            setButtonWidth('95%')
            setImageWidth('98%')
        }
    },[parentPage])

    const add_to_cart_local = (id) => {
        if (userInfo) {
            //console.log('productId ', id)
            //console.log('userId ', userInfo.id)
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
    
    const add_to_wishlist_local = (pro) => {
        if (userInfo) {
            //console.log(pro)
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

    // const redirect_chat_page = () => {
    //     if (userInfo) {
    //         navigate(`/customerDashboard/chat`)
    //         ///${sellerId}
    //     } else {
    //         navigate('/login')
    //     }
    // }

    const redirect_chat_page = (chatTopic) => {
        if (userInfo) {
            navigate(`/customerDashboard/chat/${chatTopic}`)
        } else {
            navigate('/login')
        }
    }
    
    const responsive = {
        superLargeDesktop:  { breakpoint: { max: 4000, min: 3000 }, items: 1 },
        desktop:            { breakpoint: { max: 3000, min: 1024 }, items: 1 },
        tablet:             { breakpoint: { max: 1024, min: 464 }, items: 1 },
        mobile:             { breakpoint: { max: 464, min: 0 }, items: 1 }
    }
    
    const ButtonGroup = ({next,previous}) => {
        return (
            <div className='flex justify-between items-center'>
                <div className='text-md font-bold' style={{color:sellerPrimaryColor1}}>
                    {title}
                </div>
                {
                    //bg-slate-300 border-slate-200
                }
                <div className='flex justify-center  items-center gap-3 text-slate-600'>
                    <button onClick={() => previous()} 
                        className='w-[30px] h-[30px] border rounded-lg flex justify-center items-center' 
                        style={{color:sellerPrimaryColor1, borderColor:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1}}>
                        <IoIosArrowBack />
                    </button>
                    <button onClick={() => next()} 
                        className='w-[30px] h-[30px] border rounded-lg flex justify-center items-center' 
                        style={{color:sellerPrimaryColor1, borderColor:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1}}>
                        <IoIosArrowForward /> 
                    </button>
                </div>
            </div>
        )
    }
    //<div className='flex gap-8 flex-col-reverse'>
    return (
        <div className={` ${pageWidth === 'Wide' ? 'w-[320px]' : 'w-[250px]'} flex border rounded-lg  gap-4 p-4 flex-col-reverse`}
            style={{color:sellerPrimaryColor1, borderColor:sellerPrimaryColor1}}>
            <Carousel autoPlay={false} infinite={false} arrows={false} responsive={responsive} 
                transitionDuration={500} renderButtonGroupOutside={true} customButtonGroup={<ButtonGroup/>} >
                {
                    products.map((p,i) => {
                        return(
                            <div key={i} className='flex flex-col justify-start gap-2'>
                            {
                                //hover:shadow-md 
                                //style={{color:sellerPrimaryColor1, borderColor:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1}}
                                p.map((pl, j) => 
                                    <div key={j} 
                                        className='flex mt-1 border-2 justify-start items-start transition-all duration-1000 hover:-translate-y-2 flex-col'
                                        style={{color:sellerPrimaryColor1, borderColor:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1}}>
                                        <div className={``}>
                                            <div className={` relative group h-[210px] md:h-[270px] xs:h-[170px] overflow-hidden `} >
                                                <img 
                                                    className=' h-[200px] md:h-[270px] xs:h-[180px] xs:w-[180px]  object-cover' 
                                                    style={{width:imageWidth}}
                                                    src={pl.images[0]} alt="" />
                                                <ul className={`flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 
                                                    absolute w-full group-hover:bottom-6`}>
                                                    <li onClick={() => add_to_cart_local(pl._id)} 
                                                        className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full 
                                                        hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'>
                                                        + <MdOutlineRestaurantMenu />
                                                    </li>
                                                    <li onClick={() => add_to_wishlist_local(pl)}
                                                        className={` ${sellerBoolShowSiteWishList ? '' : 'hidden' } 
                                                        w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full 
                                                        hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all` }>
                                                        <FaRegHeart  />
                                                    </li>
                                                    <li>
                                                        <Link to={`/product/details/${pl._id}`}  
                                                            className='w-[38px] h-[38px] cursor-pointer flex justify-center items-center rounded-full 
                                                            hover:rotate-[720deg] transition-all bg-white hover:bg-[#059473] hover:text-white'>
                                                            <FaEye />
                                                        </Link>
                                                    </li>
                                                    <span onClick={() => redirect_chat_page(pl.name)} 
                                                        className={` ${sellerBoolShowSiteChat ? '' : 'hidden'} w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full 
                                                        hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all` }>
                                                        <IoChatbubbleEllipsesSharp/>
                                                    </span>
                                                </ul>
                                            </div>
                                        {
                                            // ${pageWidth === 'Wide' ? 'w-[286px]' : 'w-[206px]'} 
                                        }
                                        <div className={` ${pageWidth === 'Wide' ? 'w-[286px]' : 'w-[216px]'} px-2 h-[124px]  border-none flex justify-start items-start flex-col`}>
                                            <span className={` text-md font-semibold`}>
                                                { 
                                                    pl.name.length > nameSubstringLength ? pl.name.substring(0, nameSubstringLength) + ' ...' : pl.name
                                                } 
                                            </span>
                                            <div className='grid grid-cols-2 justify-start items-center gap-0' >
                                                <span className={`${sellerBoolShowSitePayments ? '' : 'hidden'} text-md font-semibold`}>
                                                    {currencyFormat.format(pl.price)}
                                                </span>
                                                <span className={`${sellerBoolShowSiteRating ? 'flex mb-1' : 'hidden'} `}>
                                                    <Rating ratings={pl.rating} />
                                                </span>
                                            </div>

                                            <div className='w-full' >
                                                <div className={`${pl.portionSizes !== '' ? 'w-full' : 'hidden'} `}>
                                                    <select onChange={(e) => setPortionSize(e.target.value)} id='' name='' 
                                                        className='border rounded-md px-3 py-1 mb-1 w-full text-[14px] font-semibold' 
                                                        style={{borderColor:sellerPrimaryColor1, color:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1}}>
                                                        <option value=''>Choose Portion Size</option>
                                                        {
                                                            pl.portionSizes.split(';').map((p,i) => {
                                                                return( <option key={i} value={p}>{p}</option> )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                                <div className={`${pl.portionSizes === '' ? 'border px-1 py-1 mb-1 text-[14px] font-semibold' : 'hidden'} `}
                                                    style={{borderColor:sellerPrimaryColor1, color:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1, width:buttonWidth}}>
                                                    {pl.description?.substring(0, descriptionSubstringLength)} ...
                                                </div>
                                            </div>
                                            <div className='w-full' >
                                                <button onClick={() => add_to_cart_local(pl._id)} 
                                                    className={`   h-[34px] flex justify-center items-center rounded-lg text-md cursor-pointer
                                                    hover:shadow-lg hover:shadow-green-500/40] text-white`} 
                                                    style={{backgroundColor:sellerPrimaryColor1, width:buttonWidth}}>
                                                    <MdOutlineRestaurantMenu className='mr-1' />
                                                    Add To Menu
                                                </button> 
                                            </div>

                                            {
                                                //text-white sellerSecondaryColor1
                                                //flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3
                                                // icon bar
                                                // <div className={`  ${pageWidth === 'Wide' ? 'mt-5' : 'mt-7'} border rounded-lg`}
                                                // style={{borderColor:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1}}   >
                                                //     <div className={` hidden ${pageWidth === 'Wide' ? 'grid grid-cols-4' : 'grid grid-cols-4'}  pr-1`} >
                                                //         <div onClick={() => add_to_cart_local(pl._id)} 
                                                //             className={` m-1 border cursor-pointer flex justify-center items-center rounded-full 
                                                //             hover:rotate-[720deg] transition-all  bg-white hover:bg-[#059473] hover:text-white`}
                                                //             style={{borderColor:sellerPrimaryColor1, width:iconWidth, height:iconHeight}}>
                                                //             <MdOutlineRestaurantMenu />
                                                //         </div>
                                                //         <div onClick={() => add_to_wishlist_local(pl)} 
                                                //             className={` m-1 border cursor-pointer flex justify-center items-center rounded-full 
                                                //             hover:rotate-[720deg] transition-all bg-white hover:bg-[#059473] hover:text-white`}
                                                //             style={{borderColor:sellerPrimaryColor1, width:iconWidth, height:iconHeight}}>
                                                //             <FaRegHeart />
                                                //         </div>
                                                //         <div>
                                                //             <Link to={`/product/details/${pl._id}`}
                                                //                 className={` m-1 border cursor-pointer flex justify-center items-center rounded-full 
                                                //                 hover:rotate-[720deg] transition-all bg-white hover:bg-[#059473] hover:text-white`}
                                                //                 style={{borderColor:sellerPrimaryColor1, width:iconWidth, height:iconHeight}}>
                                                //                 <FaEye />
                                                //             </Link>
                                                //         </div>
                                                //         <div className={` m-1 border cursor-pointer flex justify-center 
                                                //             items-center rounded-full hover:rotate-[720deg] transition-all bg-white hover:bg-[#059473] hover:text-white  `}
                                                //             style={{borderColor:sellerPrimaryColor1, width:iconWidth, height:iconHeight}}>
                                                //             <IoChatbubbleEllipsesSharp />
                                                //         </div>
                                                //     </div>
                                                // </div>
                                            
                                            
                                            }

                                           



                                        </div>
                                        </div>
                                        

                                    </div> 
                                )
                            }
                            </div>      
                        )
                    })
                }
            </Carousel>   
        </div>
    );
};

export default Products;
