/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate  } from 'react-router-dom';

import { FaCircleCheck } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { CiCircleCheck } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { update_event_details, get_event_details, messageClear } from '../store/reducers/eventDetailsReducer';

import Header from '../components/Header';
import Footer from '../components/Footer';
import { place_order } from '../store/reducers/orderReducer';
import { currencyFormat } from '../components/CurrencyFormat';
import { toTitleCase } from '../components/toTitleCase';
import ShopBanner from '../components/ShopBanner';
import MyProfile from '../components/customerDashboard/MyProfile';

import Moment from 'moment';
import toast from 'react-hot-toast';

import config from '../config';

const EventDetails = () => {
    const sellerFrontendURL = config.STR_FRONTEND_URL
    const sellerArrEventTypes = config.STR_ARR_FRONTEND_EVENT_TYPES
    const sellerArrServiceTypes = config.STR_ARR_FRONTEND_SERVICE_TYPES
    const sellerArrPlaceSettings = config.STR_ARR_FRONTEND_PLACE_SETTINGS
    const sellerArrClothColors = config.STR_ARR_FRONTEND_CLOTH_COLORS
    const sellerBoolShowBrand = config.BOOL_SHOW_PRODUCT_BRAND
    const sellerRequiredFieldColor = config.STR_FRONTEND_REQUIRED_FIELD_COLOR
    
    const { seller } = useSelector(state => state.seller)
    const { userInfo } = useSelector(state => state.auth) 
    const { eventDetails, errorMessage, successMessage } = useSelector(state => state.eventDetails);
            
    const sellerCompanyName = seller.shopName
    const sellerPrimaryColor1 = seller.frontEndPrimaryColor1
    const sellerPrimaryColor2 =  seller.frontEndPrimaryColor2
    const sellerSecondaryColor1 = seller.frontEndSecondaryColor1  
    const sellerProductTerm = seller.productTerm
    const sellerProductPluralTerm = seller.productPluralTerm
    const stripePublishableKey = seller.stripeTestPublishableKey

    const sellerBoolShowSitePayments = seller.isVisibleSitePayments === 'Show' ? true : false
    //console.log('sellerBoolShowSitePayments ', sellerBoolShowSitePayments)
    //console.log(seller)

    //STR_STRIPE_TEST_PUBLISHABLE_KEY: seller.stripeTestPublishableKey
    // const {cart_products, cart_product_count, successMessage, price, buy_product_item, 
    // shipping_fee, outofstock_products} = useSelector(state => state.cart) //outOfStockProduct

    const { state: {products, price, shipping_fee, items }} = useLocation()
    // const {cart_products, cart_product_count, successMessage, price, buy_product_item, 
    // shipping_fee, outofstock_products} = useSelector(state => state.cart) //outOfStockProduct
    // const {cart_products} = useSelector(state => state.cart)
    
    const productName = products[0].products[0].productInfo.name
    //console.log(productName)
    const isDeposit = productName === 'Deposit' ? 'true' : 'false'
    //console.log(isDeposit)

    let sellerBoolDepositShowPayments = false
    if (sellerBoolShowSitePayments) {
        sellerBoolDepositShowPayments = true
    } else if (sellerBoolShowSitePayments) {
        sellerBoolDepositShowPayments = false
        if (isDeposit === 'true') {
            sellerBoolDepositShowPayments = true
        }
    }
    //console.log('sellerBoolDepositShowPayments ', sellerBoolDepositShowPayments)

    //const eventDetailsHeader = productName === 'Deposit' ? 'eventName  venueName    venueAddress eventType    eventDate  eventStartTime' : ''
    //eventName &&    venueName &&    venueAddress && eventType &&    eventDate  && eventStartTime
    //console.log('cart_products ', cart_products)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [res, setRes] = useState(false)

    useEffect(() => {
        dispatch(get_event_details(userInfo.id))
    },[userInfo.id])
    
    const [state, setState] = useState({
        depositGiven: isDeposit, eventName: '', venueName: '', venueAddress: '', eventType: '', eventDate: '', eventStartTime: '',
        eventServiceType: '', eventPlaceSettings: '', eventTableclothColor:'', eventNapkinColor: '',
        venueManagerContactInfo: '', eventGuestCount: '', eventNotes: ''
    })
    //console.log(state)

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
        //console.log(state)
        //console.log(e.target.value)
    }

    const close_set_time  = (e) => {
        e.preventDefault()
    }

     useEffect(() => {
        setState({
            depositGiven: eventDetails?.depositGiven,
            eventName: eventDetails?.eventName, 
            venueName: eventDetails?.venueName, 
            venueAddress: eventDetails?.venueAddress,
            eventType: eventDetails?.eventType, 
            eventDate: eventDetails?.eventDate, 
            eventStartTime: eventDetails?.eventStartTime,
            eventServiceType: eventDetails?.eventServiceType, 
            eventPlaceSettings: eventDetails?.eventPlaceSettings, 
            eventTableclothColor: eventDetails?.eventTableclothColor, 
            eventNapkinColor: eventDetails?.eventNapkinColor,
            venueManagerContactInfo: eventDetails?.venueManagerContactInfo, 
            eventGuestCount: eventDetails?.eventGuestCount, 
            eventNotes: eventDetails?.eventNotes,
        })
        //dispatch(messageClear())
    }, [eventDetails])

    const saveEventDetailsLocal = (e) => {
        e.preventDefault()

        let {eventName,   venueName,      venueAddress,   eventType,      eventDate,  eventStartTime, 
            eventServiceType, eventPlaceSettings, eventTableclothColor, eventNapkinColor,
            venueManagerContactInfo, eventGuestCount, eventNotes } = state;
        
        state.eventName = toTitleCase(state.eventName)
        state.venueName = toTitleCase(state.venueName)
        
        if (userInfo) {
            //console.log(pro)
            dispatch(update_event_details({
                customerId: userInfo.id,
                depositGiven: isDeposit, //false,
                eventName: state.eventName, 
                venueName: state.venueName, 
                venueAddress: state.venueAddress,
                eventType: state.eventType, 
                eventDate: state.eventDate, 
                eventStartTime: state.eventStartTime,
                eventServiceType: state.eventServiceType, 
                eventPlaceSettings: state.eventPlaceSettings, 
                eventTableclothColor: state.eventTableclothColor, 
                eventNapkinColor: state.eventNapkinColor,
                venueManagerContactInfo: state.venueManagerContactInfo, 
                eventGuestCount: state.eventGuestCount, 
                eventNotes: state.eventNotes
                }))
        } else {
            navigate('/login')
        }
        
        if (isDeposit === 'false') {
            if (eventName &&    venueName &&    venueAddress && eventType &&    eventDate && eventStartTime 
                && eventServiceType && eventPlaceSettings && eventTableclothColor && eventNapkinColor
                && venueManagerContactInfo && eventGuestCount) 
                {
                    setRes(true) //state.myOrder // && eventNotes
                }
        } else if(isDeposit === 'true') {
            if (eventName &&    venueName &&    venueAddress && eventType &&    eventDate  && eventStartTime) 
                {
                    setRes(true) //state.myOrder // && eventNotes
                }
        }
    }

    const place_Order_Local = () => {
        //console.log(products)
        //console.log(state)
        dispatch(place_order({
            customerName: userInfo.name, customerEmail:userInfo.email, customerPhone: userInfo.phoneNumber,
            price, products, shipping_fee, items, eventDetailsInfo : state, userId: userInfo.id, navigate, 
            isDeposit, stripePublishableKey, sellerPrimaryColor1, sellerSecondaryColor1, sellerBoolShowSitePayments 
        }))
    }
    
    useEffect(() => { 
        if (successMessage) {
            //console.log(successMessage)
            toast.success(successMessage)
            dispatch(messageClear())  
        } 
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())  
        } 
    },[successMessage, errorMessage])

    return (
        <div>
            <Header/>
            <ShopBanner homePage={'Home'} homeLink={'/'} currentPageTop={'Event Details'} currentPageTopLink={''} 
                currentPageBottom1={'Event Details'} currentPageBottomLink1={''}
                currentPageBottom2={''} currentPageBottomLink2={''} />
            <section className='bg-[#eeeeee]'>
                <div className='w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16'>
                    <div className='w-full flex flex-wrap'>
                        <div className='w-[67%] md-lg:w-full'>
                            <div className='flex flex-col gap-3'>
                                <div className='border p-6 shadow-sm' 
                                    style={{backgroundColor:sellerSecondaryColor1, borderColor:sellerPrimaryColor1}}>
                                    <div className='text-2xl font-bold pb-3' style={{color:sellerPrimaryColor1}}>
                                        Event Details <span className='text-xl font-semibold'>Please Fill In All Fields</span>
                                    </div>
                                    
                                    {
                                        //show form
                                        !res && <>
                                            <form onSubmit={saveEventDetailsLocal}>
                                                <div className='flex md:flex-col md:gap-2 w-full gap-5' style={{color:sellerPrimaryColor1}}>
                                                    <div className='flex flex-col gap-1 mb-2 w-full'>
                                                        <label className='font-bold' htmlFor="eventName">
                                                            Event Name <span style={{color:sellerRequiredFieldColor}}>(Required)</span>
                                                        </label>
                                                        <input required onChange={inputHandle} value={state.eventName} name="eventName" id="eventName" type="text" 
                                                            placeholder='Event Name e.g The Bar Mitzvah Of Ari Cohen' 
                                                            className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md' /> 
                                                    </div>
                                                    <div className='flex flex-col gap-1 mb-2 w-full'>
                                                        <label className='font-bold' htmlFor="venueName">
                                                            Venue Name <span style={{color:sellerRequiredFieldColor}}>(Required)</span>
                                                        </label>
                                                        <input required onChange={inputHandle} value={state.venueName} name="venueName" id="venueName" type="text" 
                                                            placeholder='Venue Name e.g Cong Adath Israel' 
                                                            className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md' /> 
                                                    </div>
                                                </div>
                                                <div className='flex md:flex-col md:gap-2 w-full gap-5' style={{color:sellerPrimaryColor1}}>
                                                    <div className='flex flex-col gap-1 mb-2 w-full'>
                                                        <label className='font-bold' htmlFor="venueAddress">
                                                            Venue Address <span style={{color:sellerRequiredFieldColor}}>(Required)</span>
                                                        </label>
                                                        <input required onChange={inputHandle} value={state.venueAddress} name="venueAddress" id="venueAddress"  type="text" 
                                                            placeholder='Venue Full Address, City, State, Zipcode' 
                                                            className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md' /> 
                                                    </div>
                                                    <div className='flex flex-col gap-1 mb-2 w-full'>
                                                        <label className='font-bold' htmlFor="eventType">
                                                            Event Type <span style={{color:sellerRequiredFieldColor}}>(Required)</span>
                                                        </label>
                                                        <select required onChange={inputHandle} value={state.eventType} name="eventType" id="eventType" 
                                                            className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'>
                                                            <option value="">Event Type</option>
                                                            {
                                                                sellerArrEventTypes.sort().map((p, i) =>
                                                                    <option key={i} value={p}>{p}</option>
                                                                )
                                                                // onChange={(e) => setCategory(e.target.value) 
                                                            }
                                                        </select>
                                                    </div>
                                                </div>  
                                                {
                                                    //<DatePicker selected={startDate} onChange={(date) => setStartDate(date)}  
                                                    //name="eventDate" id="eventDate" />
                                                    //{(date) => setStartDate(date)}
                                                    //import { FaCalendar } from "react-icons/fa";
                                                    //handleClickEvent()
                                                    //https://www.npmjs.com/package/react-datepicker

                                                    //<input aria-label="Time" type="time" />

                                                    //<input aria-label="Date" type="date" />
                                                }
                                                <div className='flex md:flex-col md:gap-2 w-full gap-5' style={{color:sellerPrimaryColor1}}>
                                                    <div className='flex flex-col gap-1 mb-2 w-full'>
                                                        <label className='font-bold' htmlFor="eventDate">
                                                            Event Date <span style={{color:sellerRequiredFieldColor}}>(Required)</span>
                                                        </label>
                                                        <input required onChange={inputHandle} value={state.eventDate} name="eventDate" id="eventDate" 
                                                            type="date" className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md' /> 
                                                    </div>
                                                    <div className='flex flex-col gap-1 mb-2 w-full'>
                                                        <label className='font-bold flex' htmlFor="eventStartTime">
                                                            Event Start Time <span style={{color:sellerRequiredFieldColor}}>(Required)</span>
                                                            <button onClick={close_set_time} 
                                                                className='ml-2 px-2 py-[2px] flex rounded-md hover:shadow-green-500/50 hover:shadow-lg text-white' 
                                                                style={{backgroundColor:sellerPrimaryColor1}}>
                                                                <FaCircleCheck className='mr-1 mt-1' /> Done
                                                            </button>
                                                        </label>
                                                        <input required onChange={inputHandle} value={state.eventStartTime} name="eventStartTime" id="eventStartTime" 
                                                            type="time" className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md' /> 
                                                    </div>
                                                </div>
                                                <div className='flex md:flex-col md:gap-2 w-full gap-5' style={{color:sellerPrimaryColor1}}>
                                                    <div className='flex flex-col gap-1 mb-2 w-full'>
                                                        <label className='font-bold' htmlFor="eventServiceType">
                                                            Event Service Type <span className={`${isDeposit === 'true' ? 'hidden' : ''} `} style={{color:sellerRequiredFieldColor}}>(Required)</span>
                                                        </label>
                                                        <select required={isDeposit === 'false'} onChange={inputHandle} value={state.eventServiceType} name="eventServiceType" id="eventServiceType" 
                                                            className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'>
                                                            <option value="">Service Type</option>
                                                            {
                                                                sellerArrServiceTypes.sort().map((p, i) =>
                                                                    <option key={i} value={p}>{p}</option>
                                                                )
                                                                // onChange={(e) => setCategory(e.target.value) 
                                                            }
                                                        </select>
                                                    </div>
                                                    <div className='flex flex-col gap-1 mb-2 w-full'>
                                                        <label className='font-bold' htmlFor="eventPlaceSettings">
                                                            Place Settings <span className={`${isDeposit === 'true' ? 'hidden' : ''} `} style={{color:sellerRequiredFieldColor}}>(Required)</span>
                                                        </label>
                                                        <select required={isDeposit === 'false'} onChange={inputHandle} value={state.eventPlaceSettings} name="eventPlaceSettings" id="eventPlaceSettings" 
                                                            className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'>
                                                            <option value="">Place Settings</option>
                                                            {
                                                                sellerArrPlaceSettings.sort().map((p, i) =>
                                                                    <option key={i} value={p}>{p}</option>
                                                                )
                                                                // onChange={(e) => setCategory(e.target.value) 
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className='flex md:flex-col md:gap-2 w-full gap-5' style={{color:sellerPrimaryColor1}}>
                                                    <div className='flex flex-col gap-1 mb-2 w-full'>
                                                        <label className='font-bold' htmlFor="eventTableclothColor">
                                                            Tablecloth Color <span className={`${isDeposit === 'true' ? 'hidden' : ''} `} style={{color:sellerRequiredFieldColor}}>(Required)</span>
                                                        </label>
                                                        <select required={isDeposit === 'false'} onChange={inputHandle} value={state.eventTableclothColor} name="eventTableclothColor" id="eventTableclothColor" 
                                                            className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'>
                                                            <option value="">Tablecloth Color</option>
                                                            {
                                                                sellerArrClothColors.sort().map((p, i) =>
                                                                    <option key={i} value={p}>{p}</option>
                                                                )
                                                                // onChange={(e) => setCategory(e.target.value) 
                                                            }
                                                        </select>
                                                    </div>
                                                    <div className='flex flex-col gap-1 mb-2 w-full'>
                                                        <label className='font-bold' htmlFor="eventNapkinColor">
                                                            Napkin Color <span className={`${isDeposit === 'true' ? 'hidden' : ''} `} style={{color:sellerRequiredFieldColor}}>(Required)</span>
                                                        </label>
                                                        <select required={isDeposit === 'false'} onChange={inputHandle} value={state.eventNapkinColor} name="eventNapkinColor" id="eventNapkinColor" 
                                                            className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'>
                                                            <option value="">Napkin Color</option>
                                                            {
                                                                sellerArrClothColors.sort().map((p, i) =>
                                                                    <option key={i} value={p}>{p}</option>
                                                                )
                                                                // onChange={(e) => setCategory(e.target.value) 
                                                            }
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className='flex md:flex-col md:gap-2 w-full gap-5' style={{color:sellerPrimaryColor1}}>
                                                    <div className='flex flex-col gap-1 mb-2 w-full'>
                                                        <label className='font-bold' htmlFor="venueManagerContactInfo">
                                                            Venue Manager Contact Info <span className={`${isDeposit === 'true' ? 'hidden' : ''} `} style={{color:sellerRequiredFieldColor}}>(Required)</span>
                                                        </label>
                                                        <input required={isDeposit === 'false'} onChange={inputHandle} value={state.venueManagerContactInfo} name="venueManagerContactInfo" id="venueManagerContactInfo" 
                                                            placeholder='Name And/Or Phone Number Or N/A' type="text"
                                                            className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md' /> 
                                                        </div>
                                                    <div className='flex flex-col gap-1 mb-2 w-full'>
                                                        <label className='font-bold'  htmlFor="eventGuestCount">
                                                            Guest Count <span className={`${isDeposit === 'true' ? 'hidden' : ''} `} style={{color:sellerRequiredFieldColor}}>(Required)</span>
                                                        </label>
                                                        <input required={isDeposit === 'false'} onChange={inputHandle} value={state.eventGuestCount} name="eventGuestCount" id="eventGuestCount" placeholder='How Many People Are Coming?' type="number"
                                                            className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md' /> 
                                                    </div>
                                                </div>
                                                <div className='flex md:flex-col md:gap-2 w-full gap-5' style={{color:sellerPrimaryColor1}}>
                                                    <div className='flex flex-col gap-1 mb-2 w-full'>
                                                        <label className='font-bold' htmlFor="eventNotes">Event Notes (Optional)</label>
                                                        <textarea onChange={inputHandle} value={state.eventNotes} name="eventNotes" id="eventNotes" placeholder='Is There Anything Else We Need To Know?' type="text"
                                                            className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'  />
                                                    </div>
                                                </div>
                                                <div className='flex flex-col gap-1 mt-7 mb-2 w-full'>
                                                    <button className='px-3 py-[6px] rounded-lg hover:shadow-green-500/50 hover:shadow-lg
                                                        text-white' style={{backgroundColor:sellerPrimaryColor1}}>
                                                        Save Event Details
                                                    </button>
                                                </div> 
                                            </form>
                                        </>
                                    }
                                    {
                                        res && 
                                        <div className='flex flex-col gap-1'>
                                            <h2 className='text-slate-600 font-semibold pb-2'>
                                                {state.eventName} Event Details Summary 
                                            </h2>
                                            <p>
                                                <span className=' hidden bg-blue-200 text-blue-800 text-sm font-medium mr-2 px-2 py-1 rounded'>Home</span>
                                                
                                                <div className='flex md:flex-col md:gap-2 w-full gap-1' style={{color:sellerPrimaryColor1}}>
                                                    <div className='flex flex-col gap-1 mb-2 w-full border p-1'
                                                        style={{borderColor:sellerPrimaryColor1}}>
                                                        <span className='font-semibold'>Venue Name</span> 
                                                        {state.venueName}
                                                    </div>
                                                    <div className='flex flex-col gap-1 mb-2 w-full border p-1'
                                                        style={{borderColor:sellerPrimaryColor1}}>
                                                        <span className='font-semibold'>Venue Address</span>
                                                        {eventDetails?.venueAddress}
                                                    </div>
                                                    <div className='flex flex-col gap-1 mb-2 w-full border p-1'
                                                        style={{borderColor:sellerPrimaryColor1}}>
                                                        <span className='font-semibold'>Deposit</span>
                                                        {
                                                            eventDetails?.depositGiven ? 'Deposit Given' : 'Deposit Not Given'
                                                        }
                                                    </div>
                                                    <div className='flex flex-col gap-1 mb-2 w-full border p-1'
                                                        style={{borderColor:sellerPrimaryColor1}}>
                                                        <span className='font-semibold'>Event Date/Time</span>
                                                        {Moment(eventDetails?.eventDate + ' ' + eventDetails?.eventStartTime).format('MM/DD/yyyy h:mm A')}
                                                    </div>
                                                </div>
                                                <div className='flex md:flex-col md:gap-2 w-full gap-1' style={{color:sellerPrimaryColor1}}>
                                                    <div className='flex flex-col gap-1 mb-2 w-full border p-1'
                                                        style={{borderColor:sellerPrimaryColor1}}>
                                                        <span className='font-semibold'>Event Type</span>
                                                        {eventDetails?.eventType}
                                                    </div>
                                                    <div className='flex flex-col gap-1 mb-2 w-full border p-1'
                                                        style={{borderColor:sellerPrimaryColor1}}>
                                                        <span className='font-semibold'>Service Type</span>
                                                        {eventDetails?.eventServiceType}
                                                    </div>
                                                    <div className='flex flex-col gap-1 mb-2 w-full border p-1'
                                                        style={{borderColor:sellerPrimaryColor1}}>
                                                        <span className='font-semibold'>Place Settings</span>
                                                        {eventDetails?.eventPlaceSettings}
                                                    </div>
                                                    <div className='flex flex-col gap-1 mb-2 w-full border p-1'
                                                        style={{borderColor:sellerPrimaryColor1}}>
                                                        <span className='font-semibold'>Tablecloth Color</span>
                                                        {eventDetails?.eventTableclothColor}
                                                    </div>
                                                </div>
                                                <div className='flex md:flex-col md:gap-2 w-full gap-1' style={{color:sellerPrimaryColor1}}>
                                                    <div className='flex flex-col gap-1 mb-2 w-full border p-1'
                                                        style={{borderColor:sellerPrimaryColor1}}>
                                                        <span className='font-semibold'>Napkin Color</span>
                                                        {eventDetails?.eventNapkinColor}
                                                    </div>
                                                    <div className='flex flex-col gap-1 mb-2 w-full border p-1'
                                                        style={{borderColor:sellerPrimaryColor1}}>
                                                        <span className='font-semibold'>Manager Contact Info</span>
                                                        {eventDetails?.venueManagerContactInfo}
                                                    </div>
                                                    <div className='flex flex-col gap-1 mb-2 w-full border p-1'
                                                        style={{borderColor:sellerPrimaryColor1}}>
                                                        <span className='font-semibold'>Guest Count</span>
                                                        {eventDetails?.eventGuestCount}
                                                    </div>
                                                    <div className='flex flex-col gap-1 mb-2 w-full border p-1'
                                                        style={{borderColor:sellerPrimaryColor1}}>
                                                        <span className='font-semibold'>Notes</span>
                                                        {eventDetails?.eventNotes}
                                                    </div>
                                                </div>
                                                <div className='flex md:flex-col md:gap-2 w-full gap-1' style={{color:sellerPrimaryColor1}}>
                                                    <div className='flex flex-col gap-1 mb-2 w-full border p-1'>
                                                    <button onClick={() => setRes(false)} 
                                                        className='px-5 py-[6px] rounded-lg text-sm text-white uppercase' 
                                                        style={{backgroundColor:sellerPrimaryColor1}}>Change Event Details</button>
                                                    </div>
                                                </div>
                                                <span onClick={() => setRes(false)} className='hidden text-indigo-500 cursor-pointer'>
                                                    Change
                                                </span>
                                            </p>
                                            <p className='hidden text-slate-600 text-sm' >Email To {userInfo?.email}</p>
                                        </div>
                                    }
                                </div>
                                {
                                    products.map((p,i) => 
                                        <div key={i} className='flex border p-4 flex-col gap-2' 
                                            style={{backgroundColor:sellerSecondaryColor1, borderColor:sellerPrimaryColor1}}>
                                            <div className='flex justify-start items-center'>
                                                <h2 className='text-xl font-bold' style={{color:sellerPrimaryColor1}}>
                                                    {sellerCompanyName} 
                                                </h2>
                                            </div>
                                            {
                                                p.products.map((pt,i) => 
                                                    <div key={i} className='w-full border p-2 flex flex-wrap'>
                                                        <div className='flex sm:w-full gap-2 w-7/12'>
                                                            <div className='flex gap-2 justify-start items-center'>
                                                                <div className={` ${pt.productInfo.name === 'Deposit' ? 'hidden' : ''} `} >
                                                                    <img className='w-[80px] h-[80px]' src={pt.productInfo.images[0]} alt="" />
                                                                </div>
                                                                <div className='pr-4' style={{color:sellerPrimaryColor1}}>
                                                                    <h2 className='text-md font-semibold'>
                                                                        {pt.productInfo.name}
                                                                    </h2>
                                                                    <span className={` ${sellerBoolShowBrand ? 'text-sm' : 'hidden' } `}>
                                                                        Brand: {pt.productInfo.brand}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='flex justify-between w-5/12 sm:w-full sm:mt-3'>
                                                            <div className='pl-4 sm:pl-0'>
                                                                <h2 className={` ${sellerBoolShowSitePayments ? 'text-lg' : 'hidden'} `} style={{color:sellerPrimaryColor1}}>
                                                                    {currencyFormat.format(pt.productInfo.price - Math.floor((pt.productInfo.price * pt.productInfo.discount) / 100))}
                                                                </h2>
                                                                <p className='hidden line-through'>$300</p>
                                                                <p className='hidden'>-15%</p>
                                                            </div>
                                                        </div>
                                                    </div>                    
                                                )
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <div className='w-[33%] md-lg:w-full'>
                            <div className='pl-3 md-lg:pl-0 md-lg:mt-5'>
                                <div className='border p-4 flex flex-col gap-3' 
                                    style={{backgroundColor:sellerSecondaryColor1, borderColor:sellerPrimaryColor1, color:sellerPrimaryColor1}}>
                                    <div className='text-xl font-bold'>
                                        <span className={` ${productName === 'Deposit' ? 'hidden' : ''} `}>
                                            {sellerProductPluralTerm}
                                        </span> Summary
                                        {/*productName isDeposit sellerBoolDepositShowPayments sellerBoolShowSitePayments */}
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        {
                                            // <span className={` ${productName === 'Deposit' ? 'hidden' : ''} `}>
                                            //     {items} {sellerProductPluralTerm}
                                            // </span>
                                        }
                                        <span className={` ${sellerBoolDepositShowPayments ? 'hidden' : 'font-semibold'} `}>
                                            {items} {sellerProductPluralTerm}
                                        </span>
                                        <span className={`${sellerBoolDepositShowPayments ? 'font-semibold' : 'hidden'} `}>
                                            Deposit
                                        </span>
                                        <span className={` ${sellerBoolDepositShowPayments ? '' : 'hidden'} `}>
                                            {currencyFormat.format(price)}
                                        </span>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <span className='hidden'>Shipping Fee</span>
                                        <span className='hidden'>${shipping_fee}</span>
                                    </div>
                                    <div className='flex justify-between items-center'>
                                        <span className={` ${sellerBoolShowSitePayments ? '' : 'hidden'} `}>Total</span>
                                        <span className={` ${sellerBoolShowSitePayments ? 'text-lg' : 'hidden'} `}>
                                            {currencyFormat.format(price)}
                                        </span>
                                    </div>
                                <div className={``}>
                                    <div>
                                        Once You Finalize Your Order, We Will Send You A Final Quote.
                                    </div>
                                    <div className={` ${res ? 'hidden' : ''} mt-2 font-semibold`} >
                                        If The Button Is Disabled, Please Complete The Event Details Section 
                                        And Click Save Event Details.
                                    </div>
                                </div>
                                <button onClick={place_Order_Local} disabled={res ? false : true} 
                                    className={` ${res ? 'bg-green-600' : 'bg-green-300'} 
                                    hover:shadow-red-500/50 hover:shadow-lg cursor-pointer px-5 py-[6px] 
                                    rounded-lg text-sm text-white uppercase`}>Finalize My Order</button>
                                <button onClick={place_Order_Local} 
                                    className='hidden px-5 py-[6px] rounded-lg text-sm text-white uppercase' 
                                    style={{backgroundColor:sellerPrimaryColor1}}>test payment</button>
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

export default EventDetails;
