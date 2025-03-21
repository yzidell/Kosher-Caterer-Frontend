/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState }  from 'react';
import {  useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdPayment } from "react-icons/md";

import { get_product_deposit_details } from '../store/reducers/homeReducer';
import { update_event_details, get_event_details, messageClear } from '../store/reducers/eventDetailsReducer';

import { currencyFormat } from '../components/CurrencyFormat';

import config from '../config';

//const Accordion = ({title, intro, pricePerPerson, minNumberPeople, description}) => {

const GiveDeposit = () => {
    const sellerFrontendURL = config.STR_FRONTEND_URL

    const { userInfo } = useSelector(state => state.auth)
    const { product, relatedProducts, moreProducts} = useSelector(state => state.home)
    const { eventDetails, errorMessage, successMessage } = useSelector(state => state.eventDetails);
    const { seller } = useSelector(state => state.seller)

    const sellerId = seller._id 
    const sellerPrimaryColor1 = seller.frontEndPrimaryColor1
    const sellerPrimaryColor2 =  seller.frontEndPrimaryColor2
    const sellerSecondaryColor1 = seller.frontEndSecondaryColor1
    
    const [state, setState] = useState({
        depositGiven: 'false', eventName: '', venueName: '', venueAddress: '', eventType: '', eventDate: '', eventStartTime: '',
        eventServiceType: '', eventPlaceSettings: '', eventTableclothColor:'', eventNapkinColor: '',
        venueManagerContactInfo: '', eventGuestCount: '', eventNotes: ''
    })

    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(get_product_deposit_details(sellerFrontendURL)) //slug is productId
        dispatch(get_event_details(userInfo.id))
        //console.log('slug ', slug)
    },[])

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
            eventNotes: eventDetails?.eventNotes,
        })
        //dispatch(messageClear())
    }, [eventDetails])
    //const strDepositGiven  = eventDetails?.depositGiven === true ? 'Yes' : "No"
    //console.log(product)
    //console.log('eventDetails?.depositGiven.toString ', eventDetails?.depositGiven)

    // useEffect(() => {
    //   dispatch(get_event_details(userInfo.id))
    // },[userInfo.id])
    
    const buy_it_now_local = () => {
        // section 83 buy it now
        let price = product.price; //0;
        // if (product.discount !== 0) {
        //     price = product.price - Math.floor((product.price * product.discount) / 100)
        // } else {
        //     price = product.price
        // }

        const obj = [
            {
                sellerId: product.sellerId,
                shopName: product.shopName,
                price :  product.price, //quantity * (price - Math.floor((price * 5) / 100)),
                products : [
                    {
                        quantity: 1,
                        productInfo: product
                    }
                ]
            }
        ]
    
        navigate('/eventDetails',{
            state: {
                products : obj,
                price: price, // * quantity,
                shipping_fee : 0,
                items: 1
            }
        }) 
    }

    return (
        <div>
            {product && !eventDetails?.depositGiven && 
                <div>
                    <button onClick={buy_it_now_local}
                        className='px-3 py-1 flex h-[34px] w-[202px] text-[15px] mr-1 justify-center items-center rounded-lg 
                        font-semibold cursor-pointer hover:shadow-lg hover:shadow-green-500/40 text-white'
                        style={{backgroundColor:sellerPrimaryColor1}}>
                        <MdPayment className='mr-1'/> Give Deposit {currencyFormat.format(product.price)}
                    </button> 
                    <span className='font-semibold' style={{color:sellerPrimaryColor1}}>{product.description}</span>       
                </div>
            }
            
            {
                //<div> Deposit Given {strDepositGiven}</div>
            }
            
            
        </div>
    );
};

export default GiveDeposit;
