/* eslint-disable no-useless-rename */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-template-curly-in-string */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { IoIosArrowForward } from "react-icons/io";

import { get_cart_products, delete_cart_product, messageClear, cart_product_quantity_increment, 
    cart_product_quantity_decrement, cart_product_portion_size_change } from '../store/reducers/cartReducer';
import toast from 'react-hot-toast';

import { currencyFormat } from '../components/CurrencyFormat';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ShopBanner from '../components/ShopBanner';

import config from '../config';

const Cart = () => {
    const sellerBoolShowBrand = config.BOOL_SHOW_PRODUCT_BRAND
    const sellerBoolProducOutOfStock  = config.BOOL_SHOW_PRODUCT_OUT_OF_STOCK

    const { seller } = useSelector(state => state.seller)
    const { userInfo } = useSelector(state => state.auth) 
    const { cart_products, cart_product_count, successMessage, price, buy_product_item, 
        shipping_fee, outofstock_products } = useSelector(state => state.cart) //outOfStockProduct
    
    // ?.productInfo?.name
    //const prodSort = [...cart_products].sort(cart_products.products[0]?.productInfo.name)
    const tempProduct = cart_products[0]?.products//.productInfo?.name //works  
    // const temp = [...cart_products[0]?.products].sort((a, b) => {
    //     return a?.productInfo.name
    // });

    //console.log(cart_products)

    //     {pt.productInfo.name}
    //     {pt.productInfo?.category}        
    // const prodSort = [...cart_products.products[0].productInfo].sort((a, b) => {
    //     //console.log(a)
    //     return a.name.localeCompare(b.name);
    // });

    //console.log(prodSort)

    const sellerId = seller._id 
    const sellerPrimaryColor1 = seller.frontEndPrimaryColor1
    const sellerSecondaryColor1 = seller.frontEndSecondaryColor1
    const sellerProductPluralTerm = seller.productPluralTerm
    const sellerCompanyName = seller.shopName

    const sellerBoolShowSitePayments = seller.isVisibleSitePayments === 'Show' ? true : false
    const sellerBoolShowSiteProductQuantities = seller.isVisibleSiteProductQuantities === 'Show' ? true : false

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    useEffect(() => {
        dispatch(get_cart_products(userInfo.id))
    },[])

    const redirect = () => {
        navigate('/eventDetails', {
            state: { 
                products : cart_products, 
                price: price, 
                shipping_fee : shipping_fee, 
                items: buy_product_item }
        })
    }

    useEffect(() => { 
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())  
            dispatch(get_cart_products(userInfo.id))
        } 
    },[successMessage])

    const cartProductQuantityIncrementLocal = (quantity, stock, cart_id) => {
        const temp = quantity + 1;
        if (temp <= stock) {
            dispatch(cart_product_quantity_increment(cart_id))
        }
    }

    const cartProductQuantityDecrementLocal = (quantity, card_id) => {
        const temp = quantity - 1;
        if (temp !== 0) {
            dispatch(cart_product_quantity_decrement(card_id))
        }
    }
    
    const cartProductPortionSizeChangeLocal = (cart_id, newPortionSize) => {
        dispatch(cart_product_portion_size_change({
            cart_id: cart_id,
            newPortionSize: newPortionSize
        }))
    }

    return (
        <div>
           <Header/>
           <ShopBanner homePage={'Home'} homeLink={'/'} currentPageTop={'My ' + sellerProductPluralTerm + ' Cart'} currentPageTopLink={''} 
                currentPageBottom1={'My ' + sellerProductPluralTerm + ' Cart'} currentPageBottomLink1={''} 
                currentPageBottom2={''} currentPageBottomLink2={''} />
            <section className='bg-[#eeeeee]'>
                <div className='w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16'>
                    {
                        cart_products.length > 0 || outofstock_products > 0 ? 
                            <div className='flex flex-wrap'>
                                <div className='w-[67%] md-lg:w-full'>
                                    <div className='pr-2 md-lg:pr-0'>
                                        <div className='flex flex-col gap-1'>
                                            <div className='bg-white p-4 border' 
                                                style={{borderColor:sellerPrimaryColor1}}>
                                                <div className='' style={{color:sellerPrimaryColor1}}>
                                                    <span className='text-xl font-semibold'>{buy_product_item} {sellerProductPluralTerm}, {sellerCompanyName}</span>
                                                    <span className='ml-2 text-md' >(Sorted By Category, Name)</span>
                                                </div>
                                                {
                                                    // pl-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 
                                                    // flex flex-col grid grid-cols-3  
                                                    cart_products.map((p, i) => 
                                                        <div key={i} className='grid grid-cols-2 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 bg-white p-4 gap-1'>
                                                            <div className='hidden justify-start items-center'>
                                                                <h2 className='text-md font-bold' style={{color:sellerPrimaryColor1}}>
                                                                    {sellerCompanyName}
                                                                </h2>
                                                            </div>
                                                            {
                                                                //const temp = p.products 
                                                                //yossi added toSorted
                                                            }
                                                            {
                                                                p.products.toSorted((a, b) => {
                                                                    //console.log('ab', a.productInfo?.name, b.productInfo?.name)
                                                                    if (a.productInfo?.category === b.productInfo?.category) {
                                                                        if (a.productInfo?.name === b.productInfo?.name) {
                                                                            return 0
                                                                        }
                                                                        if (a.productInfo?.name < b.productInfo?.name) {
                                                                            return -1
                                                                        }
                                                                        return 1
                                                                    }
                                                                    if (a.productInfo?.category < b.productInfo?.category) {
                                                                        return -1
                                                                    }
                                                                    return 1
                                                                }).map((pt, i) => 
                                                                    <div key={i} className='w-full border p-1 flex flex-wrap' 
                                                                        style={{borderColor:sellerPrimaryColor1, color:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1}}>
                                                                        <div className='flex sm:w-full gap-0 w-7/12'>
                                                                            <div className=''>
                                                                                <div className='flex gap-2 justify-start items-center'>
                                                                                    <span className='hidden' >{i+1}</span>
                                                                                    <img className='w-[80px] h-[80px]' src={pt.productInfo.images[0]} alt="" />
                                                                                    <div className='pr-4'>
                                                                                        <div className='text-sm font-semibold'>
                                                                                            {pt.productInfo.name}
                                                                                        </div>
                                                                                        <div className='text-md font-semibold'>
                                                                                            {pt.productInfo?.category}
                                                                                        </div>
                                                                                        <span className={` ${sellerBoolShowBrand ? 'text-sm' : 'hidden' } `}>
                                                                                            {pt.productInfo.brand}
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className='flex justify-between w-5/12 sm:w-full sm:mt-3'>
                                                                            <div className='pl-4 sm:pl-0'>
                                                                                <h2 className={` ${sellerBoolShowSitePayments ? 'text-lg' : 'hidden'} `} style={{color:sellerPrimaryColor1}}>
                                                                                    {currencyFormat.format(pt.productInfo.price - Math.floor((pt.productInfo.price * pt.productInfo.discount) / 100))}
                                                                                </h2>
                                                                                <p className='hidden line-through'>{pt.productInfo.price}</p>
                                                                                <p className='hidden'>-{pt.productInfo.discount}%</p>
                                                                            </div>
                                                                            <div className='flex gap-2 flex-col'>
                                                                                {
                                                                                    //bg-slate-200
                                                                                    //cartProductQuantityDecrementLocal
                                                                                    //(quantity, card_id) 
                                                                                }
                                                                                <div className={` ${sellerBoolShowSiteProductQuantities ? '' : 'hidden' } 
                                                                                    flex h-[26px] border rounded-md justify-center items-center text-md font-semibold`}
                                                                                    style={{borderColor:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1}}>
                                                                                    <div onClick={() => cartProductQuantityDecrementLocal(pt.quantity, pt._id )} 
                                                                                        className='px-2 cursor-pointer' style={{color:sellerPrimaryColor1}}>-</div> 
                                                                                    <div className='px-3' style={{color:sellerPrimaryColor1}}>{pt.quantity }</div> 
                                                                                    <div onClick={() => cartProductQuantityIncrementLocal(pt.quantity, pt.productInfo.stock, pt._id )} 
                                                                                        className='px-2 cursor-pointer' style={{color:sellerPrimaryColor1}}>+</div> 
                                                                                </div>
                                                                                <div className={`${pt.productInfo.portionSizes !== '' ? '' : 'hidden'}  `}>
                                                                                    <select onChange={(e) => cartProductPortionSizeChangeLocal(pt._id, e.target.value)}  
                                                                                        id='' name='' className='text-[14px] p-1 rounded-md font-semibold border w-[96px]'
                                                                                        style={{borderColor:sellerPrimaryColor1, color:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1}}>
                                                                                        <option className='text-md font-semibold' value=''>Choose Portion Size</option>
                                                                                        {
                                                                                            // selected={p === pt.portionSize}
                                                                                            // <option key={i} className='text-md font-semibold' value={p} 
                                                                                            // selected={p === pt.portionSize}>{p}</option> 
                                                                                            pt.productInfo.portionSizes.split(';').map((p,i) => {
                                                                                                return( 
                                                                                                    <option key={i} className='text-md font-semibold' value={p} 
                                                                                                        selected={p === pt.portionSize}>{p}</option> 
                                                                                                )
                                                                                            })
                                                                                        }
                                                                                    </select>
                                                                                </div>
                                                                                <button onClick={() => dispatch(delete_cart_product(pt._id))} 
                                                                                    className='px-5 py-[3px] text-white rounded-md' style={{backgroundColor:sellerPrimaryColor1}}>
                                                                                    Remove
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>                    
                                                                )
                                                            }
                                                        </div>
                                                    )
                                                }
                                                {
                                                    outofstock_products.length > 0 && sellerBoolProducOutOfStock &&
                                                        <div className='flex flex-col gap-3'>
                                                            <div className='bg-white p-4'>
                                                                <h2 className='text-md font-semibold' style={{color:sellerPrimaryColor1}}>
                                                                    Out of Stock {outofstock_products.length}
                                                                </h2>
                                                            </div>
                                                            <div className=' border bg-white p-4'>
                                                            {
                                                                outofstock_products.map((p,i) => 
                                                                    <div key={i} className='w-full flex flex-wrap'>
                                                                        <div className='flex sm:w-full gap-2 w-7/12'>
                                                                            <div className='flex gap-2 justify-start items-center'>
                                                                                <img className='w-[80px] h-[80px]' src={ p.products[0].images[0] } alt="" />
                                                                                <div className='pr-4' style={{color:sellerPrimaryColor1}}>
                                                                                    <h2 className='text-md font-semibold'>{p.products[0].name}</h2>
                                                                                    <span className='text-sm'>Brand: {p.products[0].brand}</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className='flex justify-between w-5/12 sm:w-full sm:mt-3'>
                                                                            <div className='pl-4 sm:pl-0'>
                                                                                <h2 className='text-lg' style={{color:sellerPrimaryColor1}}>
                                                                                    ${p.products[0].price - Math.floor((p.products[0].price * p.products[0].discount) / 100 )}
                                                                                </h2>
                                                                                <p className='line-through hidden'>${p.products[0].price}</p>
                                                                                <p className='hidden'>-{p.products[0].discount}%</p>
                                                                            </div>
                                                                            <div className='flex gap-2 flex-col'>
                                                                                <div className='flex bg-slate-200 h-[30px] justify-center items-center text-xl'>
                                                                                    <div onClick={() => cartProductQuantityDecrementLocal(p.quantity, p._id )}
                                                                                        className='px-3 cursor-pointer' style={{color:sellerPrimaryColor1}}>-</div> 
                                                                                    <div className='px-3' style={{color:sellerPrimaryColor1}}>{p.quantity}</div> 
                                                                                    <div onClick={() => cartProductQuantityIncrementLocal(p.quantity, p.productInfo.stock, p._id )} 
                                                                                        className='px-3 cursor-pointer' style={{color:sellerPrimaryColor1}}>+</div> 
                                                                                </div>
                                                                                <button onClick={() => dispatch(delete_cart_product(p._id))} 
                                                                                    className='px-5 py-[3px] text-white rounded-md' style={{backgroundColor:sellerPrimaryColor1}}>
                                                                                    Delete
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }
                                                            </div>
                                                        </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-[33%] md-lg:w-full'>
                                    <div className='pl-3 md-lg:pl-0 md-lg:mt-5'>
                                    {
                                        cart_products.length > 0 && 
                                            <div className='bg-white p-3 flex flex-col gap-3 border' 
                                                style={{color:sellerPrimaryColor1, borderColor:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1}}>
                                                <h2 className='text-xl font-bold'>Menu Summary</h2>
                                                <div className='flex justify-between items-center'>
                                                    <span>{buy_product_item}  {sellerProductPluralTerm}</span>
                                                    <span className={` ${sellerBoolShowSitePayments ? '' : 'hidden'} `}>
                                                        ${price}
                                                    </span>
                                                </div>
                                                <div className='flex justify-between items-center'>
                                                    <span className='hidden'>Shipping Fee</span>
                                                    <span className='hidden'>${shipping_fee}</span>
                                                </div>
                                                <div className='flex gap-2'>
                                                    <input  type="text" placeholder='Input Voucher Coupon' 
                                                        className='hidden w-full px-3 py-2 border border-slate-200 outline-0 focus:border-green-500 rounded-sm' />
                                                    <button className='hidden px-5 py-[1px] bg-[#059473] text-white rounded-sm uppercase text-sm'>Apply</button>
                                                </div>
                                                <div className='flex justify-between items-center'>
                                                    <span className={` ${sellerBoolShowSitePayments ? '' : 'hidden'} `}>
                                                        Total
                                                    </span>
                                                    <span className={` ${sellerBoolShowSitePayments ? 'text-lg' : 'hidden'}  `}>
                                                        {currencyFormat.format(price)}
                                                    </span>
                                                </div>
                                                <button onClick={redirect} className='px-5 py-[6px] rounded-lg hover:shadow-red-500/50 hover:shadow-lg text-sm text-white uppercase' 
                                                    style={{backgroundColor:sellerPrimaryColor1}}>
                                                    Proceed to Event Details
                                                </button>
                                            </div>
                                    }
                                    </div>
                                </div>
                            </div> 
                        : 
                            <div>
                                <Link to='/shops' className='px-4 py-2 rounded-lg text-white'
                                    style={{backgroundColor:sellerPrimaryColor1}}>
                                    Back To All {sellerProductPluralTerm}
                                </Link>
                            </div>
                    }
                </div>
            </section>
            <Footer/>
        </div>
    );
};

export default Cart;
