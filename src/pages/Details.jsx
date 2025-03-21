/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, lazy }  from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { IoIosArrowForward } from "react-icons/io";
import { FaHeart, FaTwitter } from "react-icons/fa6"; 
import { FaLinkedin, FaGithub, FaFacebookF, FaEye, FaRegHeart } from "react-icons/fa";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";

import Carousel from 'react-multi-carousel'; 
import 'react-multi-carousel/lib/styles.css'

import {Pagination } from 'swiper/modules';
import 'swiper/css'; 
import 'swiper/css/pagination';
import {Swiper, SwiperSlide } from 'swiper/react';

import { get_product_details } from '../store/reducers/homeReducer';
import { add_to_cart, add_to_wishlist, messageClear } from '../store/reducers/cartReducer';

import { currencyFormat } from '../components/CurrencyFormat';
import toast from 'react-hot-toast';

import config from '../config';

const Header  = lazy(()=> import('../components/Header')) 
const Footer  = lazy(()=> import('../components/Footer')) 
const Rating  = lazy(()=> import('../components/Rating')) 
const Reviews  = lazy(()=> import('../components/Reviews')) 
const ShopBanner  = lazy(()=> import('../components/ShopBanner')) 

//loading css  https://www.youtube.com/shorts/sqFOv1NzGUQ

const Details = () => {
    const sellerBoolShowStock = config.BOOL_SHOW_PRODUCT_STOCK

    const { seller } = useSelector(state => state.seller)
    const { userInfo } = useSelector(state => state.auth)
    const { errorMessage, successMessage } = useSelector(state => state.cart)
    const { product, relatedProducts, moreProducts } = useSelector(state => state.home)
        
    const sellerId = seller._id 
    const sellerPrimaryColor1 = seller.frontEndPrimaryColor1
    const sellerPrimaryColor2 =  seller.frontEndPrimaryColor2
    const sellerSecondaryColor1 = seller.frontEndSecondaryColor1
    const sellerShoppingTerm = seller.shoppingTerm
    const sellerProductTerm = seller.productTerm
    const sellerProductPluralTerm = seller.productPluralTerm
    const sellerCompanyMarketingLine1 = seller.marketingLine1

    const sellerBoolShowSitePayments = seller.isVisibleSitePayments === 'Show' ? true : false
    const sellerBoolShowSiteWishList = seller.isVisibleSiteWishlist === 'Show' ? true : false
    const sellerBoolShowSiteSocialMedia = seller.isVisibleSiteSocialMedia === 'Show' ? true : false
    const sellerBoolShowSiteRating = seller.isVisibleSiteRating === 'Show' ? true : false
    const sellerBoolShowSiteProductQuantities = seller.isVisibleSiteProductQuantities === 'Show' ? true : false
    const sellerBoolShowSiteProductReviews = seller.isVisibleSiteProductReviews === 'Show' ? true : false
    const sellerBoolShowSiteChat = seller.isVisibleSiteChat === 'Show' ? true : false

    const [image, setImage] = useState('')
    //const [state, setState] = useState('reviews') //from kazi
    const [portionSize, setPortionSize] = useState('')
    
    //const {productId} = useParams() // comes in as undefined
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {slug} = useParams() //really productId
    //console.log('productId ', productId)//, 'slug', slug)

    let buttonText =  userInfo ? 'Add To ' + sellerShoppingTerm : 'Please Login Or Register'
    
    useEffect(() => {
        dispatch(get_product_details(slug)) //slug is productId
        //console.log('slug ', slug)
    },[slug])

    useEffect(() => { 
        if (successMessage) {
            toast.success(successMessage)
            setPortionSize('')
            dispatch(messageClear())  
        } 
        if (errorMessage) {
            toast.error(errorMessage)
            setPortionSize('')
            dispatch(messageClear())  
        } 
    },[successMessage, errorMessage])

    const responsive = {
        superLargeDesktop:  { breakpoint: { max: 4000, min: 3000 }, items: 5 },
        desktop:            { breakpoint: { max: 3000, min: 1024 }, items: 5 },
        tablet:             { breakpoint: { max: 1024, min: 464 }, items: 4 },
        mdtablet:           { breakpoint: { max: 991, min: 464 }, items: 4 },
        mobile:             { breakpoint: { max: 464, min: 0 }, items: 3 },
        smmobile:           { breakpoint: { max: 640, min: 0 }, items: 2 },
        xsmobile:           { breakpoint: { max: 440, min: 0 }, items: 1 },
    }

    const [quantity, setQuantity] = useState(1)
    const cartProductQuantityIncrementLocal = () => {
        if (quantity >= product.stock) {
            toast.error('Out of Stock')
        } else {
            setQuantity(quantity + 1)
        }
    }
    const cartProductQuantityDecrementLocal = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
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
    const add_to_cart_local = () => {
        if (userInfo) {
           dispatch(add_to_cart({
            userId : userInfo.id,
            quantity,
            productId : product._id,
            portionSize: portionSize
           }))
           setPortionSize('')
        } else {
            navigate('/login')
        }
    }

    const add_to_cart_list_local = (prodID) => {
        if (userInfo) {
           dispatch(add_to_cart({
            userId : userInfo.id,
            quantity,
            productId : prodID,
            portionSize: portionSize
           }))
           setPortionSize('')
        } else {
            navigate('/login')
        }
    }

    const add_to_wishlist_local = () => {
        if (userInfo) {
            dispatch(add_to_wishlist({
                userId: userInfo.id,
                productId: product._id,
                name: product.name,
                price: product.price,
                image: product.images[0],
                discount: product.discount,
                rating: product.rating,
                slug: product.slug,
                portionSizes: product.portionSizes,
                description: product.description
            }))
        } else {
            navigate('/login')
        }
    }

    const add_to_wishlist_list_local = (pro) => {
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

    return (        
        <div>
            <Header/>
            <ShopBanner homePage={'Home'} homeLink={'/'} currentPageTop={sellerProductTerm  + ' Details'} currentPageTopLink={''} 
                currentPageBottom1={ product.category } currentPageBottomLink1={'/productsCategory?category=' + product.category} 
                currentPageBottom2={product.name} currentPageBottomLink2={''} />
            <section>
                <div className='py-5 mb-5'
                    style={{color:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1}}>
                    <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                        <div className='flex justify-start items-center text-md w-full'>
                            <Link to='/'>Home</Link>
                            <span className='pt-1'><IoIosArrowForward /></span>
                            <Link to='/'>{ product.category }</Link>
                            <span className='pt-1'><IoIosArrowForward /></span>
                            <span>{ product.name }</span>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                    <div className='grid grid-cols-2 md-lg:grid-cols-1 gap-4'>
                        <div>
                            <div className='p-5 border'>
                                <img className='h-[400px] w-full' src={image ? image : product.images?.[0]} alt={product.name} />
                                <div className='italic' style={{color:sellerPrimaryColor1}}>
                                    {sellerCompanyMarketingLine1}
                                </div>
                            </div>
                            <div className='py-3'>
                                {   
                                    product.images && product.images?.[1] &&
                                    <Carousel autoPlay={true} infinite={true} responsive={responsive} transitionDuration={500}>
                                        { 
                                            product.images.map((img, i) => {
                                                return (
                                                    <div key={i} onClick={() => setImage(img)}>
                                                        <img className='h-[120px] w-[100px] object-cover cursor-pointer' src={img} alt="" /> 
                                                    </div>
                                                )
                                            })
                                        } 
                                    </Carousel>
                                }
                            </div>    
                        </div>
                        {
                            // category:       { type: String, required : true },
                            // mainIngredient: { type: String, required : true },
                            // price:          { type: Number, required : false },
                            // stock:          { type: Number, required : false },
                            // discount:       { type: Number, required : false },
                            // description:    { type: String, required : true },
                            // shopName:       { type: String, required : true },
                            // images:         { type: Array, required : true },
                            // rating:         { type: Number, default : 0 },
                            // allergies:      { type: String, required : false },
                            // FMP:            { type: String, required : false },
                            // portionSizes:   { type: String, required : false }
                        }
                        <div className='flex flex-col gap-2'>
                            <div className='text-3xl font-bold'>
                                <h3 style={{color:sellerPrimaryColor1}}>{product.name}</h3>
                            </div>
                            <div className={` ${sellerBoolShowSiteRating ? '' : 'hidden'} flex justify-start items-center gap-2`}>
                                <div className='flex text-xl' >
                                    <Rating ratings={4.5} />
                                </div>
                                <span className={` ${sellerBoolShowSiteProductReviews ? 'hidden' : 'hidden'} `} 
                                    style={{color:sellerPrimaryColor1}}>(24 reviews)</span> 
                            </div>
                            <div className={` ${sellerBoolShowSitePayments ? 'text-2xl font-bold flex gap-2' : 'hidden'} `}
                                style={{color:sellerPrimaryColor1}}>
                                {
                                    // discount !== 0 ? <>
                                    // Price : <h2 className='line-through'>$500</h2>
                                    // <h2>${500 - Math.floor((500 * discount) / 100)} (-{discount}%) </h2>
                                    // </> : <h2> Price : $200 </h2>
                                }
                                Price: {currencyFormat.format(product.price)}
                            </div>      
                            <div className=''>
                                <textarea required name="" id="" cols="30" rows="5" 
                                    className='border outline-0 w-full' 
                                    style={{color:sellerPrimaryColor1}}
                                    value={product.description} />
                            </div>
                            <div className='hidden gap-2 p-1 border font-semibold'
                                style={{color:sellerPrimaryColor1, borderColor:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1}}>
                                {sellerCompanyMarketingLine1}
                            </div>
                            <div className='gap-2 p-1 border'
                                style={{color:sellerPrimaryColor1, borderColor:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1}}>
                                <span className='font-semibold'>{sellerProductTerm} Details: </span>
                                <span className={` ${product.FMP === '' ? 'hidden' : ''} `}>{product.FMP}; </span> 
                                <span className=''> Category: <b>{product.category}</b>; </span>
                                <span className={` ${product.allergies !== 'None' ? 'font-semibold text-red-500' : ''} `}>
                                    Allergies: <b>{product.allergies}</b>;  
                                </span>
                                <span className=''> Cooking Method: <b>{product.cookingMethod}</b>; </span>
                            </div>
                            {
                                //pl-2 w-full grid grid-cols-3 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2
                                //flex gap-2 pb-2 border-b
                            }
                            <div className={`grid grid-cols-3 gap-2`}>
                                <div className={` ${sellerBoolShowSiteProductQuantities ?  '' : 'hidden' } 
                                    flex border rounded-lg w-[90px] h-[34px] justify-center items-center `}
                                    style={{borderColor:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1}}>
                                    <div onClick={cartProductQuantityDecrementLocal}  
                                        className='px-2 cursor-pointer text-[15px] font-semibold' style={{color:sellerPrimaryColor1}}>-</div> 
                                    <div className='px-2 text-[15px] font-semibold' style={{color:sellerPrimaryColor1}}>{quantity}</div> 
                                    <div onClick={cartProductQuantityIncrementLocal}  
                                        className='px-2 cursor-pointer text-[15px] font-semibold' style={{color:sellerPrimaryColor1}}>+</div> 
                                </div>
                                <div>
                                    <button onClick={add_to_cart_local} 
                                        className='px-3 py-1 flex h-[34px] w-[162px] text-[15px] mr-1 justify-center items-center rounded-lg font-semibold cursor-pointer hover:shadow-lg 
                                        hover:shadow-green-500/40 text-white'
                                        style={{backgroundColor:sellerPrimaryColor1}}>
                                        <MdOutlineRestaurantMenu className='mr-1' />
                                        {
                                            userInfo ? 'Add To ' + sellerShoppingTerm : 'Please Login Or Register'
                                        }
                                    </button>
                                </div>
                                
                                
                            </div>
                            {
                                //grid grid-cols-3 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2
                                //flex py-2 gap-2
                            }
                            <div className='grid grid-cols-3 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2'>
                                <div className={`${product.portionSizes !== '' ? '' : 'hidden'} `}>
                                    <select onChange={(e) => setPortionSize(e.target.value)} id='' name='' 
                                        className='flex border px-3 rounded-lg text-[13px] w-[170px] h-[34px] font-semibold' 
                                        style={{borderColor:sellerPrimaryColor1, color:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1}}>
                                        <option value=''>Choose Portion Size</option>
                                        {
                                            product.portionSizes?.split(';').map((p,i) => {
                                                return( <option key={i} value={p}>{p}</option> )
                                            })
                                        }
                                    </select>
                                </div>
                                <div onClick={add_to_wishlist_local} style={{backgroundColor:sellerPrimaryColor1}}
                                    className={` ${sellerBoolShowSiteWishList ? '' : 'hidden'}  
                                        h-[34px] w-[170px] rounded-lg flex justify-center items-center  
                                        cursor-pointer hover:shadow-lg hover:shadow-cyan-500/40 text-white`}>
                                    <FaHeart className='mr-1' />Add To Wishlist
                                </div>
                                {/*onClick={redirect_chat_page}*/}
                                <div>
                                    <div onClick={() => redirect_chat_page(product.name)}  
                                        className={` ${sellerBoolShowSiteChat ? 'px-1 py-1 flex h-[34px] w-[170px] justify-center items-center rounded-lg cursor-pointer hover:shadow-lg hover:shadow-red-500/40 text-white' : 'hidden' } `}
                                        style={{backgroundColor:sellerPrimaryColor1}}>
                                        <IoChatbubbleEllipsesSharp className='mr-1' />Chat With Us
                                    </div>
                                </div>
                            </div>
                            <div className='flex py-2 gap-2'>
                                <div className='w-[150px] text-black font-bold text-xl flex flex-col gap-5'>
                                    <span className={` ${sellerBoolShowStock ? '' : 'hidden' } `}>
                                        Availability
                                    </span>
                                    <span className={` ${sellerBoolShowSiteSocialMedia ? 'ml-4' : 'hidden' } `}
                                        style={{color:sellerPrimaryColor1}}>
                                        Share On
                                    </span>
                                </div>
                                <div className={`flex flex-col gap-2`}>
                                    <div className={` ${sellerBoolShowStock ? '' : 'hidden' } `}>
                                        <span className={`text-${product.stock ? 'green' : 'red'}-500`}>
                                            {product.stock ? `In Stock(${product.stock})` : 'Out Of Stock'}
                                        </span>
                                    </div>
                                    <div className={` ${sellerBoolShowSiteSocialMedia ? '' : 'hidden' } `}>
                                        <ul className='flex justify-start items-center gap-3'>
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
                            <div className='flex gap-3'>
                                <button className='hidden px-8 py-3 mb-2 h-[50px] cursor-pointer hover:shadow-lg 
                                    hover:shadow-green-500/40 text-white'
                                    style={{backgroundColor:sellerPrimaryColor1}}>
                                    Event Details
                                </button>
                            </div>
                        </div>
                    </div>
                </div> 
            </section>
            <section>
                <div className={` ${sellerBoolShowSiteProductReviews ? '' : 'hidden' } 
                    w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto `}>
                    {
                        //w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto pb-16
                        //
                    }
                    <div className='flex flex-wrap'>
                        <div className='w-[75%] md-lg:w-full'>
                            <div>
                                <Reviews product={product} />
                            </div> 
                            <div className='pr-4 md-lg:pr-0'>
                                <div className='grid grid-cols-2'>
                                    <span 
                                        className='hidden py-1 px-5 border font-bold text-md' 
                                        style={{color:sellerPrimaryColor1, borderColor:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1}}>
                                        Reviews
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='w-[25%] md-lg:w-full'>
                            <div className='pl-1 md-lg:pl-0'>
                                <div className='px-3 py-1 border mt-8'
                                    style={{color:sellerPrimaryColor1, borderColor:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1}}>
                                    <h2 className='font-bold h-[24px]'>From Our Menu</h2>
                                </div>
                                <div className='flex flex-col gap-3 mt-1 border p-3 mb-2'
                                    style={{color:sellerPrimaryColor1,  borderColor:sellerPrimaryColor1}}>
                                    {
                                        //, backgroundColor:sellerSecondaryColor1 style={{borderColor:sellerPrimaryColor1}}
                                        // <ShopProductCard  product={p} parentPage={'Details'} />
                                        moreProducts.map((p,i) => {
                                            return (
                                                <div key={i} className='block'
                                                    >
                                                    {
                                                        //console.log(moreProducts)
                                                        // <div key={j} 
                                                        // className='flex mt-2 justify-start items-start transition-all duration-1000 hover:-translate-y-3 flex-col'>
                                                        // <div className={` w-full relative group h-[210px] md:h-[270px] xs:h-[170px] overflow-hidden `} >
                                                    }
                                                    <div className='flex mt-0 border-2 justify-start items-start transition-all duration-1000 hover:-translate-y-2 flex-col' 
                                                        style={{color:sellerPrimaryColor1, borderColor:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1}}>
                                                        <div className='w-full relative group h-[154px] md:h-[270px] xs:h-[170px] overflow-hidden'>
                                                            <img className='w-full h-[200px] border object-cover' src={p.images[0]} alt="" /> 
                                                            <ul className='flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3'>
                                                                <li onClick={() => add_to_cart_list_local(p._id)} 
                                                                    className={` w-[38px] h-[38px] cursor-pointer flex justify-center items-center rounded-full 
                                                                    hover:rotate-[720deg] transition-all bg-white hover:bg-[#059473] hover:text-white`}>
                                                                    + <MdOutlineRestaurantMenu />
                                                                </li>
                                                                <li onClick={() => add_to_wishlist_list_local(p)} 
                                                                    className={` ${sellerBoolShowSiteWishList ? '' : 'hidden'} w-[38px] h-[38px] cursor-pointer flex justify-center items-center rounded-full 
                                                                    hover:rotate-[720deg] transition-all bg-white hover:bg-[#059473] hover:text-white`}>
                                                                    <FaRegHeart />
                                                                </li>
                                                                <Link to={`/product/details/${p._id}`}  
                                                                    className={`  w-[38px] h-[38px] cursor-pointer flex justify-center items-center rounded-full 
                                                                    hover:rotate-[720deg] transition-all bg-white hover:bg-[#059473] hover:text-white`}>
                                                                    <FaEye />
                                                                </Link>
                                                                <li onClick={() => redirect_chat_page(p.name)}
                                                                    className={`  w-[38px] h-[38px] cursor-pointer flex justify-center 
                                                                    items-center rounded-full hover:rotate-[720deg] transition-all bg-white hover:bg-[#059473] hover:text-white  `}>
                                                                    <IoChatbubbleEllipsesSharp />
                                                                </li>
                                                            </ul>
                                                            {
                                                                // p.discount !== 0 && 
                                                                // <div className='flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2'>
                                                                //     {p.discount}%
                                                                // </div>
                                                            }
                                                        </div>
                                                        <div className='py-1 font-bold ml-1' style={{color:sellerPrimaryColor1}}>
                                                            {p.name}
                                                        </div>
                                                        <div className='flex gap-2 ml-1'  style={{color:sellerPrimaryColor1}}>
                                                            <div className={` ${sellerBoolShowSitePayments ? 'text-lg font-bold' : 'hidden'} `}>
                                                                {currencyFormat.format(p.price)}
                                                            </div>
                                                            <div className={` ${sellerBoolShowSiteRating ? 'flex items-center gap-2' : 'hidden'} `}>
                                                                <Rating ratings={p.rating}  />
                                                            </div>
                                                        </div>
                                                        <div className={`${p.portionSizes !== '' ? 'w-full' : 'hidden'} `}>
                                                            <select onChange={(e) => setPortionSize(e.target.value)} id='' name='' 
                                                                className='border rounded-md px-3 m-1 w-[97%] text-[14px] font-semibold' 
                                                                style={{borderColor:sellerPrimaryColor1, color:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1}}>
                                                                <option value=''>Choose Portion Size</option>
                                                                {
                                                                    p.portionSizes.split(';').map((p,i) => {
                                                                        return( <option key={i} value={p}>{p}</option> )
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                        <div className={`${p.portionSizes === '' ? 'w-full' : 'hidden'} `}>
                                                            <div className={`${p.portionSizes === '' ? 'py-1 px-1 m-1 w-[97%] border text-[14px] font-semibold' : 'hidden'} `}
                                                                style={{borderColor:sellerPrimaryColor1, color:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1}}>
                                                                {p.description?.substring(0, 32)} ...
                                                            </div>
                                                        </div>
                                                        <div className='w-full justify-center items-center' >            
                                                            <button onClick={() => add_to_cart_list_local(p._id)} 
                                                                className='px-1 py-1 m-1 h-[34px] flex w-[97%] justify-center items-center rounded-lg text-md cursor-pointer hover:shadow-lg 
                                                                hover:shadow-green-500/40 bg-[#059473] text-white' 
                                                                style={{backgroundColor:sellerPrimaryColor1}}>
                                                                <MdOutlineRestaurantMenu className='mr-1' />{buttonText}
                                                            </button>     
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                    <h2 className='text-2xl py-2 pl-3 border mb-2'
                        style={{color:sellerPrimaryColor1,  borderColor:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1}}>
                        Related {sellerProductPluralTerm}
                    </h2>
                    <div>
                        <Swiper
                            slidesPerView='auto'
                            breakpoints={{ 1280 : { slidesPerView: 3 }, 565 :  { slidesPerView: 2 } }}
                            spaceBetween={10} loop={true}
                            pagination={{ clickable: true, el: '.custom_bullet' }}
                            modules={[Pagination]} className='mySwiper'> 
                            {
                                relatedProducts.map((p, i) => {
                                    return (
                                        <SwiperSlide key={i}>
                                            <div className='block border-2'
                                                style={{color:sellerPrimaryColor1,  borderColor:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1}}>
                                                <div  className={` w-full relative group h-[210px] md:h-[270px] xs:h-[170px] overflow-hidden `} >
                                                    <img className='w-full h-[270px] object-cover' src={p.images[0] } alt="" />
                                                    <ul className={`flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 
                                                        absolute w-full group-hover:bottom-3`}>
                                                        <li onClick={() => add_to_cart_list_local(p._id)} 
                                                            className='w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full 
                                                            hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all'>
                                                            + <MdOutlineRestaurantMenu />
                                                        </li>
                                                        <li onClick={() => add_to_wishlist_list_local(p)}
                                                            className={` ${sellerBoolShowSiteWishList ? '' : 'hidden'} 
                                                                w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center  
                                                                rounded-full hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all`}>
                                                            <FaRegHeart />
                                                        </li>
                                                        <li>
                                                            <Link to={`/product/details/${p._id}`}  
                                                                className='w-[38px] h-[38px] cursor-pointer flex justify-center items-center rounded-full 
                                                                hover:rotate-[720deg] transition-all bg-white hover:bg-[#059473] hover:text-white'>
                                                                <FaEye />
                                                            </Link>
                                                        </li>
                                                        <li onClick={() => redirect_chat_page(p.name)}
                                                            className={` ${sellerBoolShowSiteChat ? '' : 'hidden'} 
                                                            w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full 
                                                            hover:bg-[#059473] hover:text-white hover:rotate-[720deg] transition-all` }>
                                                            <IoChatbubbleEllipsesSharp/>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className='p-1 flex flex-col gap-1' style={{color:sellerPrimaryColor1}}>
                                                    <div className='text-lg font-bold'>{p.name}</div>
                                                    <div className='flex justify-start items-center gap-3'>
                                                        <div className={` ${sellerBoolShowSitePayments ? 'text-lg font-bold' : 'hidden'} `}>
                                                            {currencyFormat.format(p.price)}
                                                        </div>
                                                        <div className={` ${sellerBoolShowSiteRating ? 'flex' : 'hidden'} `}>
                                                            <Rating ratings={p.rating}  />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className={`${p.portionSizes !== '' ? 'w-full' : 'hidden'} `}>
                                                    <select onChange={(e) => setPortionSize(e.target.value)} id='' name='' 
                                                        className='border rounded-md px-3 m-1 w-[97%] h-[28px] text-[14px] font-semibold' 
                                                        style={{borderColor:sellerPrimaryColor1, color:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1}}>
                                                        <option value=''>Choose Portion Size</option>
                                                        {
                                                            p.portionSizes.split(';').map((p,i) => {
                                                                return( <option key={i} value={p}>{p}</option> )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                                <div className={`${p.portionSizes === '' ? 'w-full' : 'hidden'} `}>
                                                    <div className={`${p.portionSizes === '' ? 'py-1 px-1 m-1 w-[97%] border text-[14px] font-semibold' : 'hidden'} `}
                                                        style={{borderColor:sellerPrimaryColor1, color:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1}}>
                                                        {p.description?.substring(0, 32)} ...
                                                    </div>
                                                </div>
                                                <div className='w-full justify-center items-center' >            
                                                    <button onClick={() => add_to_cart_list_local(p._id)} 
                                                        className='px-1 py-1 m-1 h-[34px] flex w-[97%] justify-center items-center rounded-lg text-md cursor-pointer hover:shadow-lg 
                                                        hover:shadow-green-500/40 bg-[#059473] text-white' 
                                                        style={{backgroundColor:sellerPrimaryColor1}}>
                                                        <MdOutlineRestaurantMenu className='mr-1' />{buttonText}
                                                    </button>   
                                                    
                                                </div>


                                            </div>
                                        </SwiperSlide>
                                    )
                                })
                            }
                        </Swiper>
                    </div>
                    <div className='w-full flex justify-center items-center py-8'>
                        <div className='custom_bullet justify-center gap-3 !w-auto'> 
                        </div>            
                  </div>
                </div>                    
            </section>                 
            <Footer/> 
        </div>
    );
};

export default Details;
