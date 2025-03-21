/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, lazy } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import { MdOutlineRestaurantMenu } from "react-icons/md";

import { add_to_cart, add_to_wishlist, messageClear } from '../../store/reducers/cartReducer';

import { currencyFormat } from '../CurrencyFormat';
//import Rating from '../Rating';
import ShopProductCard from '../../components/products/ShopProductCard'
import toast from 'react-hot-toast';

//import Skeleton from '../Skeleton';

const Rating = lazy(()=> import('../Rating')) 

const FeatureProducts = ({products}) => {
    const { seller } = useSelector(state => state.seller)
    const { userInfo } = useSelector(state => state.auth)
    const { errorMessage, successMessage } = useSelector(state => state.cart)
    
    const sellerId = seller._id 
    const sellerPrimaryColor1 = seller.frontEndPrimaryColor1
    //const sellerPrimaryColor2 =  state.frontEndPrimaryColor2
    const sellerSecondaryColor1 = seller.frontEndSecondaryColor1
    const sellerShoppingTerm = seller.shoppingTerm
    const sellerProductPluralTerm = seller.productPluralTerm

    const sellerBoolShowSitePayments = seller.isVisibleSitePayments === 'Show' ? true : false
    const sellerBoolShowSiteWishList = seller.isVisibleSiteWishlist === 'Show' ? true : false
    const sellerBoolShowSiteRating = seller.isVisibleSiteRating === 'Show' ? true : false

    const navigate = useNavigate()
    const dispatch = useDispatch()

    
    const [portionSize, setPortionSize] = useState('')

    // const [skeletonLoading, setSkeletonLoading] = useState(true);                                       
    // useEffect(() => {
    //     setTimeout(() => {
    //         setSkeletonLoading(false);
    //     }, 1500);
    // }, []);
    
    const add_to_cart_local = (id) => {
        if (userInfo) {
            dispatch(add_to_cart({
                userId: userInfo.id,
                quantity : 1,
                productId : id,
                portionSize: portionSize
            }))
            setPortionSize('')
        } else {
            navigate('/login')
        }
    }

    const add_to_wishlist_local = (pro) => {
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
    }

    // const cartProductPortionSizeChangeLocal = (cart_id, newPortionSize) => {
    //     dispatch(cart_product_portion_size_change({
    //         cart_id: cart_id,
    //         newPortionSize: newPortionSize
    //     }))
    // }

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
    //console.log(products)

    return (
        <div className={` w-[85%] flex flex-wrap mx-auto`}>
            <div className='w-full'>
                <div className='text-center border-none flex justify-center items-center flex-col text-3xl 
                    font-bold relative pb-[10px] pt-[10px]'>
                    <h2 style={{color:sellerPrimaryColor1}}>Our Favorite {sellerProductPluralTerm}</h2>
                    <div className='w-[400px] h-[3px] mt-3' style={{backgroundColor:sellerSecondaryColor1}}></div>
                </div>
            </div>
            <div className='w-full grid grid-cols-3 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2'>
                {//use md-lg:grid-cols-[number] for how omage per row 
                    products.map((p,i) => 
                        <div key={i}>
                            <div className='border-none p-1 group transition-all duration-500 hover:shadow-md hover:-mt-2'>
                                {
                                    //skeletonLoading ? <Skeleton /> : <ShopProductCard product={p} parentPage={'FeatureProducts'} />
                                }
                                <ShopProductCard product={p} parentPage={'FeatureProducts'} />
                                <div className='hidden' >
                                    <div className='relative overflow-hidden'>
                                        {
                                            p.discount ? 
                                                <div className='flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2'>
                                                    {p.discount}%
                                                </div> : ''
                                        }
                                        <img className='sm:w-full w-full h-[240px]' src={p.images[0]} alt="" />  
                                        <ul className='flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3'>
                                            <li onClick={() => add_to_wishlist_local(p)} 
                                                className='w-[38px] h-[38px] cursor-pointer flex justify-center items-center rounded-full 
                                                hover:rotate-[720deg] transition-all bg-white hover:bg-[#059473] hover:text-white'>
                                                <FaRegHeart className={` ${sellerBoolShowSiteWishList ? '' : 'hidden'} `} />
                                            </li>
                                            {
                                                //bg-white hover:bg-[#059473 hover:text-white]
                                                ///${p.slug} p._id
                                                //look at homereducer to pass 2 values export const get_reviews = createAsyncThunk(
                                            }
                                            <Link to={`/product/details/${p._id}`}  
                                                className='w-[38px] h-[38px] cursor-pointer flex justify-center items-center rounded-full 
                                                hover:rotate-[720deg] transition-all bg-white hover:bg-[#059473] hover:text-white'>
                                                <FaEye />
                                            </Link>
                                            <li onClick={() => add_to_cart_local(p._id)} className='w-[38px] h-[38px] cursor-pointer flex justify-center items-center rounded-full 
                                                hover:rotate-[720deg] transition-all bg-white hover:bg-[#059473] hover:text-white'>
                                                + <MdOutlineRestaurantMenu />
                                            </li>
                                        </ul>
                                    </div>
                                    <div className='py-1 px-2' style={{color:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1}}>
                                        <span className='font-bold'>{p.name}</span>
                                        {
                                            //   <li onClick={() => add_to_wishlist_local(p)} className='w-[38px] h-[38px] cursor-pointer flex justify-center items-center rounded-full 
                                            //         hover:rotate-[720deg] transition-all bg-white hover:bg-[#059473 hover:text-white]'
                                            //         style={{backgroundColor:sellerPrimaryColor1}} >
                                            //        <FaRegHeart />
                                            //    </li>
                                        }
                                        <div className={`flex justify-start items-center gap-3`}>
                                            <span className={`${sellerBoolShowSitePayments ? '' : 'hidden'} text-md font-semibold`}>
                                                {currencyFormat.format(p.price)}
                                            </span>
                                            <span className={`${sellerBoolShowSiteRating ? 'flex' : 'hidden'} `}>
                                                <Rating ratings={p.rating} />
                                            </span>
                                            <span className={`${p.portionSizes !== '' ? 'py-1 px-1 w-full' : 'hidden'} `}>
                                                <select onChange={(e) => setPortionSize(e.target.value)} id='' name='' 
                                                    className='border rounded-md px-3 w-full text-[14px] font-semibold' 
                                                    style={{borderColor:sellerPrimaryColor1, color:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1}}>
                                                    <option value=''>Choose Portion Size</option>
                                                    {
                                                        p.portionSizes.split(';').map((p,i) => {
                                                            return( <option key={i} value={p}>{p}</option> )
                                                        })
                                                    }
                                                </select>
                                            </span>
                                            <span className={`${p.portionSizes === '' ? 'py-1 px-1 text-[14px] font-semibold' : 'hidden'} `}>
                                                {p.description?.substring(0,22)} ...
                                            </span>
                                        </div>
                                        <div>
                                            {
                                                userInfo ? 
                                                <button onClick={() => add_to_cart_local(p._id)} 
                                                    className='px-1 py-1 h-[34px] w-full rounded-lg text-sm cursor-pointer hover:shadow-lg 
                                                    hover:shadow-green-500/40] text-white' style={{backgroundColor:sellerPrimaryColor1}}>
                                                    Add To {sellerShoppingTerm} 
                                                </button> 
                                                : 
                                                <button onClick={() => add_to_cart_local(p._id)} 
                                                    className='px-1 py-1 h-[34px] w-full rounded-lg text-sm cursor-pointer hover:shadow-lg 
                                                    hover:shadow-green-500/40] text-white' style={{backgroundColor:sellerPrimaryColor1}}>
                                                    Please Login Or Register
                                                </button>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default FeatureProducts;
