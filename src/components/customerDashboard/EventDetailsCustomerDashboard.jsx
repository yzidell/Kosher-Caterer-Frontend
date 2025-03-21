/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { FaCircleCheck } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { CiCircleCheck } from "react-icons/ci";

import { update_event_details, get_event_details, messageClear } from '../../store/reducers/eventDetailsReducer';

import GiveDeposit from '../GiveDeposit';
import toast from 'react-hot-toast';

import config from '../../config';

const EventDetailsCustomerDashboard = () => {
    const sellerFrontendURL = config.STR_FRONTEND_URL
    const sellerArrEventTypes = config.STR_ARR_FRONTEND_EVENT_TYPES
    const sellerArrServiceTypes = config.STR_ARR_FRONTEND_SERVICE_TYPES
    const sellerArrPlaceSettings = config.STR_ARR_FRONTEND_PLACE_SETTINGS
    const sellerArrClothColors = config.STR_ARR_FRONTEND_CLOTH_COLORS
    
    const { loader,  userInfo } = useSelector(state => state.auth);
    const { eventDetails, errorMessage, successMessage } = useSelector(state => state.eventDetails);
    const { seller } = useSelector(state => state.seller)

    const navigate = useNavigate();
    const dispatch = useDispatch();
     
    const sellerId = seller._id 
    const sellerPrimaryColor1 = seller.frontEndPrimaryColor1
    const sellerPrimaryColor2 =  seller.frontEndPrimaryColor2
    const sellerSecondaryColor1 = seller.frontEndSecondaryColor1
   
    useEffect(() => {
        dispatch(get_event_details(userInfo.id))
    },[userInfo.id])

    const [state, setState] = useState({
            depositGiven: 'false', eventName:'', venueName:'', venueAddress:'', eventType: '', eventDate: '', eventStartTime: '',
            eventServiceType: '', eventPlaceSettings: '', eventTableclothColor:'', eventNapkinColor: '',
            venueManagerContactInfo: '', eventGuestCount: 0, eventNotes: ''
    })
    
    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
        // console.log(state)
        // console.log(e.target.name)
        // console.log(e.target.value)
    }

    const close_set_time  = (e) => {
        e.preventDefault()
    }

    const update_event_details_local = (e) => {
        e.preventDefault()
        if (userInfo) {
            //console.log(pro)
            dispatch(update_event_details({
                customerId: userInfo.id,
                depositGiven: 'false',
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
    }

    useEffect(() => {
        setState({
            depositGiven: eventDetails?.depositGiven?.toString,
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
            eventNotes: eventDetails?.eventNotes
        })
        //dispatch(messageClear())
    }, [eventDetails])

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

   // console.log(eventName)

    return (
        <div>
            <div className='border p-4 rounded-md'
                style={{backgroundColor:sellerSecondaryColor1, color:sellerPrimaryColor1, borderColor:sellerPrimaryColor1}}>
                {
                    // EventDetailsCustomerDashboard
                    // deposit buy now section 83 
                    // move felids from customer registartion to this form
                    // section 83 depositGiven
                }                
                <form onSubmit={update_event_details_local}>
                    <div className='flex md:flex-col md:gap-2 w-full gap-5' style={{color:sellerPrimaryColor1}}>
                        <div className='text-2xl font-bold flex flex-col gap-1 mb-2 '>
                            Event Details
                        </div>
                        <div>
                            {
                                //<Accordion title={item.title} intro={item.intro} pricePerPerson={item.pricePerPerson} minNumberPeople={item.minNumberPeople} description={item.description}/>
                            }
                            <GiveDeposit/>
                        </div>
                    </div>
                    <div className='flex md:flex-col md:gap-2 w-full gap-5' style={{color:sellerPrimaryColor1}}>
                        <div className='flex flex-col gap-1 mb-2 w-full'>
                            <label className='font-bold' htmlFor="eventName">Event Name</label>
                            <input required onChange={inputHandle} value={state.eventName} name="eventName" id="eventName" type="text" 
                                placeholder='Event Name e.g The Bar Mitzvah Of Ari Cohen' 
                                className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md' /> 
                        </div>
                        <div className='flex flex-col gap-1 mb-2 w-full'>
                            <label className='font-bold' htmlFor="venueName">Venue Name</label>
                            <input onChange={inputHandle} value={state.venueName} name="venueName" id="venueName" type="text" 
                                placeholder='Venue Name e.g Cong Adath Israel' 
                                className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md' /> 
                        </div>
                        <div className='flex flex-col gap-1 mb-2 w-full'>
                            <label className='font-bold' htmlFor="venueAddress">Venue Address</label>
                            <input onChange={inputHandle} value={state.venueAddress} name="venueAddress" id="venueAddress"  type="text" 
                                placeholder='Venue Full Address, City, State, Zipcode' 
                                className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md' /> 
                        </div>
                    </div>
                    <div className='flex md:flex-col md:gap-2 w-full gap-5' style={{color:sellerPrimaryColor1}}>
                        <div className='flex flex-col gap-1 mb-2 w-full'>
                            <label className='font-bold h-[30px]' htmlFor="eventType">Event Type</label>
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
                        <div className='flex flex-col gap-1 mb-2 w-full'>
                            <label className='font-bold h-[28px]' htmlFor="eventDate">Event Date</label>
                            <input onChange={inputHandle} value={state.eventDate} name="eventDate" id="eventDate" 
                                type="date" className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md' /> 
                        </div>
                        <div className='flex flex-col gap-1 mb-2 w-full'>
                            <label className='font-bold flex h-[28px]' htmlFor="eventStartTime">
                                Event Start Time
                                <button onClick={close_set_time}
                                    className='ml-2 px-2 py-[2px] flex text-[14px] rounded-md hover:shadow-green-500/50 hover:shadow-lg text-white' 
                                    style={{backgroundColor:sellerPrimaryColor1}}>
                                    <FaCircleCheck className='mr-1 mt-1' /> Done
                                </button>
                            </label>
                            <input onChange={inputHandle} value={state.eventStartTime} name="eventStartTime" id="eventStartTime" 
                                type="time" className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md' /> 
                        </div>   
                    </div>
                    <div className='flex md:flex-col md:gap-2 w-full gap-5' style={{color:sellerPrimaryColor1}}>
                        <div className='flex flex-col gap-1 mb-2 w-full'>
                            <label className='font-bold' htmlFor="eventServiceType">Event Service Type</label>
                            <select onChange={inputHandle} value={state.eventServiceType} name="eventServiceType" id="eventServiceType" 
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
                            <label className='font-bold' htmlFor="eventPlaceSettings">Place Settings</label>
                            <select onChange={inputHandle} value={state.eventPlaceSettings} name="eventPlaceSettings" id="eventPlaceSettings" 
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
                        <div className='flex flex-col gap-1 mb-2 w-full'>
                            <label className='font-bold' htmlFor="eventTableclothColor">Tablecloth Color</label>
                            <select onChange={inputHandle} value={state.eventTableclothColor} name="eventTableclothColor" id="eventTableclothColor" 
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
                    </div>
                    <div className='flex md:flex-col md:gap-2 w-full gap-5' style={{color:sellerPrimaryColor1}}>
                        <div className='flex flex-col gap-1 mb-2 w-full'>
                            <label className='font-bold' htmlFor="eventNapkinColor">Napkin Color</label>
                            <select onChange={inputHandle} value={state.eventNapkinColor} name="eventNapkinColor" id="eventNapkinColor" 
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
                        <div className='flex flex-col gap-1 mb-2 w-full'>
                            <label className='font-bold' htmlFor="venueManagerContactInfo">Venue Manager Contact Info</label>
                            <input onChange={inputHandle} value={state.venueManagerContactInfo} name="venueManagerContactInfo" id="venueManagerContactInfo" 
                                placeholder='Name And/Or Phone Number Or N/A' type="text"
                                className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md' /> 
                        </div>
                        <div className='flex flex-col gap-1 mb-2 w-full'>
                            <label className='font-bold'  htmlFor="eventGuestCount">Guest Count</label>
                            <input onChange={inputHandle} value={state.eventGuestCount} name="eventGuestCount" id="eventGuestCount" placeholder='How Many People Are Coming?' type="number"
                                className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md' /> 
                        </div>
                    </div>
                    <div className='flex md:flex-col md:gap-2 w-full gap-5' style={{color:sellerPrimaryColor1}}>
                        <div className='flex flex-col gap-1 mb-2 w-full'>
                            <label className='font-bold'  htmlFor="eventNotes">Event Notes (Optional)</label>
                            <textarea onChange={inputHandle} value={state.eventNotes} name="eventNotes" id="eventNotes" placeholder='Is There Anything Else We Need To Know?' type="text"
                                className='w-full px-3 py-2 border border-slate-200 outline-none focus:border-green-500 rounded-md'  />
                        </div>
                    </div>
                    <div className='flex flex-col gap-1 mt-3 mb-2 w-full'>
                        <button className='px-3 py-[6px] rounded-lg hover:shadow-green-500/50 hover:shadow-lg
                            text-white' style={{backgroundColor:sellerPrimaryColor1}}>
                            Save Event Details
                        </button>
                    </div>


                </form>
            </div>
           
        </div>
    );
};

export default EventDetailsCustomerDashboard;
