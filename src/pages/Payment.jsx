/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate  } from 'react-router-dom';

import Header from './../components/Header';
import Footer from './../components/Footer';

import { get_event_details, update_event_details } from '../store/reducers/eventDetailsReducer';

import Stripe from '../components/Stripe';
import { currencyFormat } from '../components/CurrencyFormat';

import config from '../config';

const Payment = () => {
    const sellerFrontendURL = config.STR_FRONTEND_URL

    const { seller } = useSelector(state => state.seller)
    const { userInfo } = useSelector(state => state.auth) 
    const { eventDetails, errorMessage, successMessage } = useSelector(state => state.eventDetails);
    
    //console.log(eventDetails)

    // const [state, setState] = useState({
    //     depositGiven: isDeposit, eventName: '', venueName: '', venueAddress: '', eventType: '', eventDate: '', eventStartTime: '',
    //     eventServiceType: '', eventPlaceSettings: '', eventTableclothColor:'', eventNapkinColor: '',
    //     venueManagerContactInfo: '', eventGuestCount: '', eventNotes: ''
    // })
        
    const sellerProductPluralTerm = seller.productPluralTerm
    const sellerBoolShowSitePayments = seller.isVisibleSitePayments === 'Show' ? true : false
    //console.log('payment sellerBoolShowSitePayments ', sellerBoolShowSitePayments)
    
    const { state: {price, items, orderId, isDeposit, stripePublishableKey, sellerPrimaryColor1, sellerSecondaryColor1}} = useLocation()
    const [paymentMethod, setPaymentMethod] = useState('stripe')
    
    console.log('Payments - isDeposit ', isDeposit, 'sellerBoolShowSitePayments ', sellerBoolShowSitePayments)

    const dispatch = useDispatch()
    const navigate = useNavigate()
      
    useEffect(() => {
        if (userInfo) {
            if (isDeposit === 'false' &&  !sellerBoolShowSitePayments) {
                dispatch(update_event_details({
                    customerId: userInfo.id,
                    depositGiven: 'false',
                    eventName: '', 
                    venueName: '', 
                    venueAddress: '',
                    eventType: '', 
                    eventDate: '', 
                    eventStartTime: '',
                    eventServiceType: '', 
                    eventPlaceSettings: '', 
                    eventTableclothColor: '', 
                    eventNapkinColor: '',
                    venueManagerContactInfo: '', 
                    eventGuestCount: 0, 
                    eventNotes: ''
                }))
                // } else {
                //     navigate('/login')
            } else if (isDeposit) {
                //upadet event deatails depoist given
            }   
       }
    }, [])

    return (
        <div>
            <Header/>
            <section className='bg-[#eeeeee]'>
                <div className='w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16 mt-4 '>
                    <div className='flex flex-wrap md:flex-col-reverse'>
                        <div className='w-7/12 md:w-full'>
                            <div className='pr-2 md:pr-0'>
                                <div className='flex flex-wrap'>
                                    <div onClick={() => setPaymentMethod('stripe')} 
                                        className={`hidden w-[20%] border-r cursor-pointer py-8 px-12 
                                            ${paymentMethod === 'stripe' ? 'bg-white':'bg-slate-100'} `} >
                                        <div className='flex flex-col gap-[3px] justify-center items-center'>
                                            <img src={`${sellerFrontendURL}/images/payment/stripe.png`} alt="" />
                                        </div>
                                        <span style={{color:sellerPrimaryColor1}}>Stripe</span>
                                    </div>
                                    <div onClick={() => setPaymentMethod('cod')} 
                                        className={`hidden w-[20%] border-r cursor-pointer py-8 px-12 
                                            ${paymentMethod === 'cod' ? 'bg-white':'bg-slate-100'} `} >
                                        <div className='flex flex-col gap-[3px] justify-center items-center'>
                                            <img src={`${sellerFrontendURL}/images/payment/cod.jpg`} alt="cod.jpg" />
                                        </div>
                                        <span className='' style={{color:sellerPrimaryColor1}}>COD</span> 
                                    </div>
                                </div> 
                            </div>
                            {
                                paymentMethod === 'stripe' && 
                                <div>
                                    <Stripe orderId={orderId} price={price} isDeposit={isDeposit} stripePublishableKey={stripePublishableKey}
                                        sellerPrimaryColor1={sellerPrimaryColor1} sellerSecondaryColor1={sellerSecondaryColor1} />
                                </div>
                               }
                            {
                                paymentMethod === 'cod' && 
                                <div className='w-full px-4 py-8 bg-white shadow-sm'>
                                    <button className='px-10 py-[6px] rounded-sm hover:shadow-green-500/20 hover:shadow-lg 
                                        text-white' style={{backgroundColor:sellerPrimaryColor1}}>
                                        Pay Now
                                    </button>
                                </div>
                            }
                        </div>
                        <div className='w-5/12 md:w-full'>
                            <div className='pl-2 md:pl-0 md:mb-0'>
                                <div className='border shadow p-5 flex flex-col gap-3' 
                                    style={{color:sellerPrimaryColor1, borderColor:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1}}>
                                    <h2 className='font-bold text-lg'>Order Summary</h2>
                                    <div className='flex justify-between items-center'>
                                        <div className={` ${isDeposit === 'true' ? 'hidden' : ''} `}>
                                            {items} {sellerProductPluralTerm}
                                        </div>
                                        <div className={` ${isDeposit === 'true' ? '' : 'hidden'} `}>
                                            Deposit
                                        </div>
                                        <span>{currencyFormat.format(price)}</span>
                                    </div>
                                    <div className='flex justify-between items-center font-semibold'>
                                        <span>Total Amount</span>
                                        <span className='text-lg' style={{color:sellerPrimaryColor1}}>
                                            {currencyFormat.format(price)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    );
};

export default Payment;
