/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import { get_customer_order_details } from '../../store/reducers/orderReducer';

import Moment from 'moment';
import { currencyFormat } from '../CurrencyFormat';

import config from '../../config';

const OrderDetails = () => {
    const sellerBoolShowBrand = config.BOOL_SHOW_PRODUCT_BRAND
    
    const { userInfo } = useSelector(state => state.auth)
    const { myOrder } = useSelector(state => state.order)
    const { seller } = useSelector(state => state.seller)
    // const { cart_products, cart_product_count, successMessage, price, buy_product_item, 
    //     shipping_fee, outofstock_products } = useSelector(state => state.cart) //outOfStockProduct

    const sellerId = seller._id 
    const sellerPrimaryColor1 = seller.frontEndPrimaryColor1
    const sellerSecondaryColor1 = seller.frontEndSecondaryColor1
    const sellerProductPluralTerm = seller.productPluralTerm

    const sellerBoolShowSitePayments = seller.isVisibleSitePayments === 'Show' ? true : false
    const sellerBoolShowSiteProductQuantities = seller.isVisibleSiteProductQuantities === 'Show' ? true : false

    const {orderId} = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(get_customer_order_details(orderId))
    },[orderId])

    //console.log(myOrder?.products.length) //text-lg pb-2 font-sans font-bold
    
    return (
        <div className='p-3 border rounded-md'
            style={{backgroundColor:sellerSecondaryColor1, color:sellerPrimaryColor1, borderColor:sellerPrimaryColor1}}>
            <div className='text-lg pb-2 font-sans font-bold' style={{color:sellerPrimaryColor1}}>
                Order Placed: {Moment(myOrder.date).format('MM/DD/yyyy h:mm a')}
            </div>
            
            <div className='pl-2 w-full grid grid-cols-3 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2'>
                <div className='font-semibold text-[14px] border p-1' 
                    style={{color:sellerPrimaryColor1, borderColor:sellerPrimaryColor1}}>
                    <div className='font-normal'>Event Name: </div>
                    <div>{myOrder.eventDetailsInfo?.eventName}</div>
                    {
                        myOrder.eventDetailsInfo?.depositGiven ? 'Deposit Given' : 'Deposit Not Given'
                    }
                </div>
                <div className='font-semibold text-[14px] border p-1' 
                    style={{color:sellerPrimaryColor1, borderColor:sellerPrimaryColor1}}>
                    <div>
                        <label className='font-normal'>Venue Name/Address:</label>
                    </div>
                    <div>
                        {myOrder.eventDetailsInfo?.venueName} {myOrder.eventDetailsInfo?.venueAddress}
                    </div>
                </div>
                <div className='font-semibold text-[14px] border p-1' 
                    style={{color:sellerPrimaryColor1, borderColor:sellerPrimaryColor1}}>
                    <div>
                        <label className='font-normal'>Event Type: </label>
                        {myOrder.eventDetailsInfo?.eventType}
                    </div>
                    <div>
                        <label className='font-normal'>Guest Count: </label>
                        {myOrder.eventDetailsInfo?.eventGuestCount}
                    </div>
                </div>
                <div className='font-semibold text-[14px] border p-1' 
                    style={{color:sellerPrimaryColor1, borderColor:sellerPrimaryColor1}}>
                    <label className='font-normal'>Event Date/Time: </label>
                    {Moment(myOrder.eventDetailsInfo?.eventDate + ' ' + myOrder.eventDetailsInfo?.eventStartTime).format('MM/DD/yyyy h:mm A')}
                </div>
                <div className='font-semibold text-[14px] border p-1' 
                    style={{color:sellerPrimaryColor1, borderColor:sellerPrimaryColor1}}>
                    <label className='font-normal'>Service Type: </label>
                    {myOrder.eventDetailsInfo?.eventServiceType}
                </div>
                <div className='font-semibold text-[14px] border p-1' 
                    style={{color:sellerPrimaryColor1, borderColor:sellerPrimaryColor1}}>
                    <label className='font-normal'>Place Settings: </label>
                    {myOrder.eventDetailsInfo?.eventPlaceSettings}
                </div>
                <div className='font-semibold text-[14px] border p-1' 
                    style={{color:sellerPrimaryColor1, borderColor:sellerPrimaryColor1}}>
                    <div>
                        <label className='font-normal'>Tablecloth Color: </label>
                        {myOrder.eventDetailsInfo?.eventTableclothColor}
                    </div>
                    <div>
                        <label className='font-normal'>Napkin Color: </label>
                        {myOrder.eventDetailsInfo?.eventNapkinColor}
                    </div>
                </div>
                <div className='font-semibold text-[14px] border p-1' 
                    style={{color:sellerPrimaryColor1, borderColor:sellerPrimaryColor1}}>
                    <div>
                        <label className='font-normal'>Manager Contact Info: </label>
                    </div>
                    <div>
                        {myOrder.eventDetailsInfo?.venueManagerContactInfo}
                    </div>
                </div>
                
                <div className='font-semibold text-[14px] border p-1' 
                    style={{color:sellerPrimaryColor1, borderColor:sellerPrimaryColor1}}>
                    <label className='font-normal'>Notes: </label>
                    {myOrder.eventDetailsInfo?.eventNotes}
                </div>
                <div className={`${sellerBoolShowSitePayments ? '' : 'hidden'} font-semibold text-[14px] border p-2`} 
                    style={{color:sellerPrimaryColor1, borderColor:sellerPrimaryColor1}}>
                    <label className='font-normal'>Order Total: </label>
                    {currencyFormat.format(myOrder.price)}
                </div>
                <div className={`${sellerBoolShowSitePayments ? '' : 'hidden'} font-semibold text-[14px] border p-2`} 
                    style={{color:sellerPrimaryColor1, borderColor:sellerPrimaryColor1}}>
                    <label className='font-normal'>Payment Status: </label>
                    <span className={`p-1 text-xs px-3 
                        ${myOrder.payment_status === 'paid' ? 'bg-green-300 text-green-800' 
                        : 'bg-red-300 text-red-800' } rounded-md`}> 
                        {myOrder.payment_status} 
                    </span>
                </div>
                <div className={`font-semibold text-[14px] border p-2`} 
                    style={{color:sellerPrimaryColor1, borderColor:sellerPrimaryColor1}}>
                    <label className='font-normal'>Order Status: </label>
                    <span className={`p-1 text-xs px-3 
                        ${myOrder.delivery_status === 'paid' ? 'bg-green-300 text-green-800' 
                        : 'bg-red-300 text-red-800' } rounded-md`}>
                        {myOrder.delivery_status}
                    </span>
                </div>
            </div>
            <div className='pt-2' style={{color:sellerPrimaryColor1}}>
                {
                    // <div className='' style={{color:sellerPrimaryColor1}}>
                    // <span className='text-xl font-semibold'>{buy_product_item} {sellerProductPluralTerm}, {sellerCompanyName}</span>
                    // <span className='ml-2 text-md' >(Sorted By Category, Name)</span>
                    // </div>
                    //text-lg pb-2 font-sans font-bold
                }
                <div className='' style={{color:sellerPrimaryColor1}}>
                    <span className='text-xl font-semibold' >{myOrder?.products?.length} Ordered {sellerProductPluralTerm}</span>
                    <span className='ml-2 text-md' >(Sorted By Category, Name)</span>
                </div>
            </div>
            
            <div className='pl-2 w-full grid grid-cols-3 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2'>
            {
                myOrder.products?.toSorted((a, b) => {
                    if (a?.category === b?.category) {
                        if (a?.name === b?.name) {
                            return 0
                        }
                        if (a?.name < b?.name) {
                            return -1
                        }
                        return 1
                    }
                    if (a.category < b?.category) {
                        return -1
                    }
                    return 1
                }).map((p,i) => 
                    <div key={i} className='border' style={{borderColor:sellerPrimaryColor1}}>
                        <div className='flex p-1 gap-5 justify-start items-center border'>
                            <div className='flex gap-2'>
                                <img className={` ${p.name === 'Deposit' ? 'hidden' : ''} w-[65px] h-[65px]`} src={p.images[0]} alt="" />
                                <div className='flex flex-col justify-start items-start'>
                                    <div className='text-sm font-semibold'>{p.name}</div>
                                    
                                    <div className='text-md font-semibold'>{p.category}</div>
                                    
                                    <p className={`${sellerBoolShowSitePayments ? '' : 'hidden'}`}>
                                        {currencyFormat.format(p.price - Math.floor((p.price * p.discount) / 100))}
                                    </p>
                                    <div className={`${p.name === 'Deposit' ? 'hidden' : ''}`} >
                                        <p className={`${sellerBoolShowBrand ? '' : 'hidden'}`}>
                                            <span>Brand:{p.brand}</span>
                                        </p>
                                        <p className={`${sellerBoolShowSiteProductQuantities ? '' : 'hidden'}`}>
                                            <span>Quantity : {p.quantity}</span>
                                        </p>
                                        <p className={`${p.portionSize !== '' ? '' : 'hidden'}`}>
                                            <span>Portion Size : {p.portionSize}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className='pl-4 flex flex-col border'>
                                <p className='hidden line-through'>{p.price}</p>
                                <p className='hidden'>-{p.discount}%</p>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    </div>         
    );
};

export default OrderDetails;
