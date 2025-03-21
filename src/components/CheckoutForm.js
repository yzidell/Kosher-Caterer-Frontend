/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import { PaymentElement, LinkAuthenticationElement, useStripe, useElements } from '@stripe/react-stripe-js' 
import { useDispatch, useSelector } from 'react-redux';

import config from '../config';

const CheckoutForm = ({orderId, isDeposit, stripePublishableKey, sellerPrimaryColor1, sellerSecondaryColor1}) => {
    const sellerFrontendURL = config.STR_FRONTEND_URL 
    const {userInfo} = useSelector(state => state.auth) 
    
    localStorage.setItem('orderId', orderId)
    localStorage.setItem('isDeposit', isDeposit)
    localStorage.setItem('stripePublishableKey', stripePublishableKey)    
    localStorage.setItem('sellerPrimaryColor1', sellerPrimaryColor1)
    localStorage.setItem('sellerSecondaryColor1', sellerSecondaryColor1)

    const stripe = useStripe()
    const elements = useElements()
    const [message, setMessage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const paymentElementOptions = {
        layout: 'tabs'//loyout
    }

    const submit = async (e) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return
        }
        setIsLoading(true)
        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                //return_url: 'http://localhost:3000/order/confirm'//confirmStripePayment
                return_url: `${sellerFrontendURL}/order/confirm`
            } 
        })

        //console.log('userInfo.id ', userInfo.id, 'isDeposit ', isDeposit, 'error.type ', error.type)
    
        if (error.type === 'card_error' || error.type === 'validation_error') {
            setMessage(error.message)
        } else {
            setMessage('An Unexpected error occured')
        }
        setIsLoading(false)
    }

    return (
        <form onSubmit={submit} id='payment-form'>
            <LinkAuthenticationElement id='link-authentication-element'/>
            <PaymentElement id='payment-element' options={paymentElementOptions} />

            <button disabled={isLoading || !stripe || !elements} id='submit' 
                className='px-10 py-[6px] rounded-lg hover:shadow-green-700/30 hover:shadow-lg bg-green-700 text-white'>
                <span id='button-text'>
                    {
                        isLoading ? <div>Loading...</div> : "Pay Now"
                    }
                </span> 
            </button>
            {message && <div>{message}</div>}
        </form>
    );
};

export default CheckoutForm;
