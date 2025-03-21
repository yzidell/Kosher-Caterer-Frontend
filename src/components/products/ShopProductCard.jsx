/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, lazy } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { FaEye, FaRegHeart } from "react-icons/fa";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { RiShoppingCartLine } from "react-icons/ri";
import { MdOutlineRestaurantMenu } from "react-icons/md";

import { add_to_cart, add_to_wishlist, messageClear } from '../../store/reducers/cartReducer';
import { currencyFormat } from '../CurrencyFormat';
import useWindowSize from '../../utils/useWindowSize';
const Rating  = lazy(()=> import('../Rating')) 
//<Search setParPage = {setParPage} setSearchValue = {setSearchValue} searchValue = {searchValue} pageTitle = 'Categories'/>

const ShopProductCard = ({product, parentPage}) => {

    const { userInfo } = useSelector(state => state.auth)
    const { errorMessage, successMessage } = useSelector(state => state.cart)
    const { seller } = useSelector(state => state.seller)

    const [portionSize, setPortionSize] = useState('')
    const { screenWidth, screenHeight } = useWindowSize();
    
    const productNameSnippet = product.name?.substring(0, parseInt(screenWidth / 36))
    //console.log(productNameSnippet)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const sellerId = seller._id 
    const sellerPrimaryColor1 = seller.frontEndPrimaryColor1
    const sellerSecondaryColor1 = seller.frontEndSecondaryColor1
    const sellerShoppingTerm = seller.shoppingTerm
    const sellerProductPluralTerm = seller.productPluralTerm

    const sellerBoolShowSitePayments = seller.isVisibleSitePayments === 'Show' ? true : false
    const sellerBoolShowSiteWishList = seller.isVisibleSiteWishlist === 'Show' ? true : false
    const sellerBoolShowSiteRating = seller.isVisibleSiteRating === 'Show' ? true : false
    const sellerBoolShowSiteChat = seller.isVisibleSiteChat === 'Show' ? true : false

    let imageWidth = '100%'
    let ImageHeight = '240px'
    let boolShowAddToMenu = false
    let boolShowViewDetails = false

    if (parentPage === 'FeatureProducts') {
        imageWidth = '100%' //width: 150px; width: 50%;
        ImageHeight = '240px' //50px;
        boolShowAddToMenu = true
        boolShowViewDetails = true
    } else if (parentPage === 'Details') {
        imageWidth = '100%' //width: 150px; width: 50%;
        ImageHeight = '240px' //50px;
        boolShowAddToMenu = true
        boolShowViewDetails = true
        //alert(boolShowAddToMenu)
        
        // if  (parentPage === 'ShopProducts') { //
        //     ImageWidth = '100%' //width: 150px; width: 50%;
        //     ImageHeight = '240px' //50px;
    }
    let imageURL = ''
    let buttonText =  userInfo ? 'Add To ' + sellerShoppingTerm : 'Please Login Or Register'

    //caled from FeatureProducts
    // const Search = ({setParPage, setSearchValue, searchValue, pageTitle}) => {

    const add_to_cart_local = (id) => {
        if (userInfo) {
            //console.log('productId ', id)
            //console.log('userId ', userInfo.id)
            dispatch(add_to_cart({
                userId: userInfo.id,
                quantity : 1,
                productId : id, // product._id,
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

    const redirect_chat_page = (chatTopic) => {
        if (userInfo) {
            navigate(`/customerDashboard/chat/${chatTopic}`)
        } else {
            navigate('/login')
        }
    }

    useEffect(() => { 
        if (successMessage) {
            //toast.success(successMessage)
            dispatch(messageClear())  
        } 
        if (errorMessage) {
            //toast.error(errorMessage)
            dispatch(messageClear())  
        } 
    },[successMessage, errorMessage])
    
    return (
        <div className={`border-2`}
            style={{borderColor:sellerPrimaryColor1, color:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1}}>
            <div className='relative overflow-hidden'>
                {//product.orderNumber
                }
                {//product.webSiteOrigin
                //<img className='sm:w-full' style={{width:ImageWidth, height:ImageHeight}} src={product.images[0]} alt="" /> 
                
                    //parentPage === 'FeatureProducts'
                    // <img className={` ${parentPage === 'FeatureProducts' ? '' : 'hidden'}   sm:w-full`} 
                    //                     style={{width:ImageWidth, height:ImageHeight}} src={product.images[0]} alt="" /> 

                    //imageURL = product.image
                    // <div className={` ${parentPage === 'FeatureProducts' ? '' : 'hidden'}`}>
                    //</div>
                }
                
                <img className={`sm:w-full object-cover `} style={{width:imageWidth, height:ImageHeight}} src={product.images[0]} alt="" /> 
                
                <ul className='flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3'>
                    <li onClick={() => add_to_cart_local(product._id)} 
                        className={` ${boolShowAddToMenu ? '' : 'hidden'} w-[38px] h-[38px] cursor-pointer flex justify-center items-center rounded-full 
                        hover:rotate-[720deg] transition-all bg-white hover:bg-[#059473] hover:text-white`}>
                        + <MdOutlineRestaurantMenu />
                    </li>
                    <li onClick={() => add_to_wishlist_local(product)} 
                        className={` ${sellerBoolShowSiteWishList ? '' : 'hidden'} w-[38px] h-[38px] cursor-pointer flex justify-center items-center rounded-full 
                        hover:rotate-[720deg] transition-all bg-white hover:bg-[#059473] hover:text-white`}>
                        <FaRegHeart />
                    </li>
                    <Link to={`/product/details/${product._id}`}  
                        className={` ${boolShowViewDetails ? '' : 'hidden'} w-[38px] h-[38px] cursor-pointer flex justify-center items-center rounded-full 
                        hover:rotate-[720deg] transition-all bg-white hover:bg-[#059473] hover:text-white`}>
                        <FaEye />
                    </Link>
                    {/*onClick={redirect_chat_page}*/}
                    <span onClick={() => redirect_chat_page(product.name)}
                        className={` ${sellerBoolShowSiteChat ? '' : 'hidden'}  w-[38px] h-[38px] cursor-pointer flex justify-center 
                        items-center rounded-full hover:rotate-[720deg] transition-all bg-white hover:bg-[#059473] hover:text-white  `}>
                        <IoChatbubbleEllipsesSharp />
                    </span>
                </ul>
            </div>
            <div className='py-1 px-2' style={{color:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1}}>
                {/*product.description?.substring(0, descriptionSubstringLength) screenWidth*/
                //{product.name?.substring(0, parseInt(screenWidth / 30))} ...
                }
                
                <span className={`hidden font-semibold`}>{product.name}</span>
                
                <span className={` font-semibold`} >{productNameSnippet}</span>
                
                <span className={` ${(productNameSnippet?.length >= product.name?.length) ? 'hidden' : '' } `}> ...</span>
                
                <div className='hidden'> {productNameSnippet?.length} {product.name?.length}</div>
                
                <div className='hidden'>desc length: {product.description?.length}</div>
                
                <div className='hidden'>screen Width: {parseInt(screenWidth / 30)}</div>
                
                <div className={`flex justify-start items-center gap-3`}>
                    <span className={`${sellerBoolShowSitePayments ? 'text-md font-semibold' : 'hidden'}`}>
                        {currencyFormat.format(product.price)}
                    </span>
                    <span className={`${sellerBoolShowSiteRating ? 'flex m-1' : 'hidden'} `}>
                        <Rating ratings={product.rating} />
                    </span>
                </div>
                <div>
                    <div className={`${product.portionSizes !== '' ? 'w-full' : 'hidden'} `}>
                        <select onChange={(e) => setPortionSize(e.target.value)} id='' name='' 
                            className='border rounded-md px-3 py-1 mb-1 w-full text-[14px] font-semibold' 
                            style={{borderColor:sellerPrimaryColor1, color:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1}}>
                            <option value=''>Choose Portion Size</option>
                            {
                                product.portionSizes.split(';').map((p,i) => {
                                    return( <option key={i} value={p}>{p}</option> )
                                })
                            }
                        </select>
                    </div>
                    <div className={`${product.portionSizes === '' ? 'border px-1 py-1 mb-1 w-full text-[14px] font-semibold' : 'hidden'} `}
                        style={{borderColor:sellerPrimaryColor1, color:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1}}>
                        {product.description?.substring(0, parseInt(screenWidth / 34))} ...
                    </div>
                </div>
                <div>
                    <button onClick={() => add_to_cart_local(product._id)} 
                        className={` ${boolShowAddToMenu ? '' : 'hidden'} 
                        justify-center items-center flex px-1 py-1 mb-1 h-[34px] w-full rounded-lg text-md cursor-pointer
                        hover:shadow-lg hover:shadow-green-500/40] text-white`} 
                        style={{backgroundColor:sellerPrimaryColor1}}>
                        <MdOutlineRestaurantMenu className='mr-1' />
                        {buttonText} 
                    </button> 
                </div>
            </div>
        </div>
    );
};

export default ShopProductCard;
