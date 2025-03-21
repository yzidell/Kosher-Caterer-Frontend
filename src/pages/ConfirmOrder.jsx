/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';

import { loadStripe } from '@stripe/stripe-js'
import error from '../assets/error.png'
import success from '../assets/success.png'

import { update_event_details, get_event_details } from '../store/reducers/eventDetailsReducer';

import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

import config from '../config';

const load = async () => {
    return await loadStripe(localStorage.getItem('stripePublishableKey'))
}

const ConfirmOrder = () => {
    const sellerBackendURL = config.STR_BACKEND_URL
    
    const { userInfo } = useSelector(state => state.auth) 
    const { seller } = useSelector(state => state.seller)
     
    const sellerPrimaryColor1 = localStorage.getItem('sellerPrimaryColor1') 
    const sellerSecondaryColor1 = localStorage.getItem('sellerSecondaryColor1') 
    const isDeposit = localStorage.getItem('isDeposit')// === 
    const sellerBoolShowSitePayments = seller.isVisibleSitePayments === 'Show' ? true : false

    const [loader, setLoader] = useState(true)
    const [stripe, setStripe] = useState('')
    const [message, setMessage] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    console.log('ConfirmOrder - isDeposit ', isDeposit, 'sellerBoolShowSitePayments ', sellerBoolShowSitePayments)

    //console.log('userInfo.id ', userInfo.id)
    //console.log('localStorage.getItem(isDeposit) ', localStorage.getItem('isDeposit'))
    
    //console.log('1 userInfo.id ', userInfo.id, 'orderId ', orderId, 'isDeposit ', isDeposit)
        
    const [state, setState] = useState({
        depositGiven: localStorage.getItem('isDeposit'), eventName: '', venueName: '', venueAddress: '', eventType: '', eventDate: '', eventStartTime: '',
        eventServiceType: '', eventPlaceSettings: '', eventTableclothColor:'', eventNapkinColor: '',
        venueManagerContactInfo: '', eventGuestCount: '', eventNotes: ''
    })

    const redirect_customerDashboard_myOrders_page = () => {
        localStorage.removeItem('isDeposit')
        localStorage.removeItem('stripePublishableKey')
        localStorage.removeItem('sellerPrimaryColor1')
        localStorage.removeItem('sellerSecondaryColor1')
    
        navigate('/customerDashboard/myOrders')
    }

    useEffect(() => {
        if (!stripe) {
            return
        }
        const clientSecret = new URLSearchParams(window.location.search).get('payment_intent_client_secret')
        if (!clientSecret) {
            return
        }
        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch(paymentIntent.status){
                case "succeeded":
                    setMessage('succeeded')
                    break
                    case "processing":
                    setMessage('processing')
                    break
                    case "requires_payment_method":
                    setMessage('failed')
                    break
                    default:
                    setMessage('failed')
            }
        })
    },[stripe])

    const get_load = async () => {
        const tempStripe = await load()
        setStripe(tempStripe)
    }

    useEffect(() => {
        get_load()
    },[])

    const update_payment = async () => {
        const orderId = localStorage.getItem('orderId')
        
        //un comment this - i commented to test srtipe publishable key
        if (userInfo) {
            if (isDeposit === 'false') {
                dispatch(update_event_details({
                    customerId: userInfo.id,
                    depositGiven: localStorage.getItem('isDeposit'), //false,
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
            }
        }

        if (orderId) {
            try {
                //const { data } = await axios.post(`${localHostName}/api/order/create-payment`, {price}, {withCredentials:true})
                //await axios.get(`http://localhost:5000/api/order/confirm/${orderId}`)
                await axios.get(`${sellerBackendURL}/api/order/confirm/${orderId}`)

                localStorage.removeItem('orderId')

                //localStorage.removeItem('isDeposit')
                
                setLoader(false)
            } catch (error) {
                console.log(error.response.data)
            }
        }
    }

    useEffect(() => {
        if (message === 'succeeded') {
            //alert('update_payment new')
            update_payment()
        }
    },[message])
    
    return (
        <div>
            <Header/>
            {
                //w-screen h-screen
            }
                <div className='m-4 flex justify-center items-center flex-col gap-4'>
                {
                    (message === 'failed' || message === 'processing') ? <>
                    <img src={error} alt="" />
                    <button onClick={redirect_customerDashboard_myOrders_page} 
                        className='px-5 py-2 border-2 rounded-lg cursor-pointer text-white' 
                        style={{color:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1, borderColor:sellerPrimaryColor1}}>
                        Back To Customer Dashboard
                    </button>
                    </> : message === 'succeeded' ? loader ? <FadeLoader/> : <>
                    <img src={success} alt=" m-4" />
                    <div className='font-semibold' style={{color:sellerPrimaryColor1}}>Your Payment Was Successful</div>
                    <button onClick={redirect_customerDashboard_myOrders_page}  
                        className='px-5 py-2 border-2 cursor-pointer rounded-lg text-white' 
                        style={{color:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1, borderColor:sellerPrimaryColor1}}>
                        Back To Customer Dashboard
                    </button>
                    </> : <FadeLoader/> 
                }
                </div>
            <Footer/>
        </div>
    );
};

export default ConfirmOrder;
