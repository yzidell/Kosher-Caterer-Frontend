/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js' 
import { Elements } from '@stripe/react-stripe-js' 
import axios from 'axios';
import CheckoutForm from './CheckoutForm';

import config from '../config';

const Stripe = ({ price, orderId, isDeposit, stripePublishableKey, sellerPrimaryColor1, sellerSecondaryColor1 }) => {
    const { seller } = useSelector(state => state.seller)
    const {userInfo} = useSelector(state => state.auth) 

    //const sellerFrontendURL = config.STR_FRONTEND_URL
    const sellerBackendURL = config.STR_BACKEND_URL
    const sellerBoolShowSitePayments = seller.isVisibleSitePayments === 'Show' ? true : false

    const stripePromise = loadStripe(stripePublishableKey)
    
    let sellerBoolDepositShowPayments = false
    if (sellerBoolShowSitePayments) {
        sellerBoolDepositShowPayments = true
    } else if (!sellerBoolShowSitePayments) {
        sellerBoolDepositShowPayments = false
        if (isDeposit === 'true') {
            sellerBoolDepositShowPayments = true
        }
    }

    const [clientSecret, setClientSecret] = useState('')
    const appearance    = {
        theme: 'stripe'
    }
    const options = {
        appearance,
        clientSecret
    }

    const create_payment = async () => {
        try {
            //const { data } = await axios.post('http://localhost:5000/api/order/create-payment', {price}, {withCredentials:true})
            //const { data } = await axios.post(`${config.STR_BACKEND_URL}/api/order/create-payment`, {price}, {withCredentials:true})
            const { data } = await axios.post(`${sellerBackendURL}/api/order/create-payment`, {price}, {withCredentials:true})
            //console.log(data)
            setClientSecret(data.clientSecret)
        } catch (error) {
            console.log(error.response.data)
        }
    }

    return (
        <div className='mt-1'>
            {
                clientSecret ? (
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm orderId={orderId} isDeposit={isDeposit} stripePublishableKey={stripePublishableKey} 
                            sellerPrimaryColor1={sellerPrimaryColor1} sellerSecondaryColor1={sellerSecondaryColor1} />
                    </Elements>
                ) 
                : 
                //BOOL_SHOW_PAYMENTS
                //sellerBoolDepositShowPayments
                <div>
                    <button onClick={create_payment}
                        className={` ${sellerBoolDepositShowPayments ? 'px-10 py-[6px] font-semibold border-2 rounded-lg hover:shadow-green-700/30 hover:shadow-lg text-white' : 'hidden'} `} 
                        style={{color:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1, borderColor:sellerPrimaryColor1}}>
                        Start Payment Now
                    </button>
                    <div
                        className={` ${sellerBoolDepositShowPayments ? 'hidden' : 'font-semibold'} `} 
                        style={{color:sellerPrimaryColor1}} >
                        Thank You For Your Order
                    </div>
                </div>
            }
        </div>
    );
}; 

export default Stripe;
