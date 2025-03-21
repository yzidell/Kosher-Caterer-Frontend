/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

import { customer_update, messageClear } from '../../store/reducers/authReducer';
import toast from 'react-hot-toast';

import config from '../../config';

import { loadStripe } from '@stripe/stripe-js';

const MyProfile = () => {
    const sellerFrontendURL = config.STR_FRONTEND_URL
  
    const { loader, errorMessage, successMessage, userInfo } = useSelector(state => state.auth);
    const { seller } = useSelector(state => state.seller)

    const sellerId = seller._id 
    const sellerPrimaryColor1 = seller.frontEndPrimaryColor1
    //const sellerPrimaryColor2 =  state.frontEndPrimaryColor2
    const sellerSecondaryColor1 = seller.frontEndSecondaryColor1

    const navigate = useNavigate();        
    const dispatch = useDispatch();
    
    let [state, setState] = useState({
        webSiteOrigin: sellerFrontendURL, 
        name: userInfo.name, 
        phoneNumber: userInfo.phoneNumber,
        email: userInfo.email //, password: ''
    })
    
    //console.log(userInfo)

    const [myPhoneNumber, setMyPhoneNumber] = useState(state.phoneNumber) //state.phoneNumber userInfo.phoneNumber
    const [phoneNumber, setPhoneNumber] = useState('');

    const inputHandle = (e) => {
        setState({
            ...state, 
            [e.target.name] : e.target.value
        })
        
    }

    const customer_update_local = (e) => {
        e.preventDefault()
        //console.log(userInfo.id)
        const obj = {
            customerId: userInfo.id,
            name: state.name, 
            phoneNumber: myPhoneNumber,
        }
        dispatch(customer_update(obj))
    }
    
    useEffect(() => { 
        if (successMessage) {
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
            <div className='p-4 rounded-md border'
                style={{backgroundColor:sellerSecondaryColor1, color:sellerPrimaryColor1, borderColor:sellerPrimaryColor1}}>
                <h2 className='text-xl pb-4'>My Profile</h2>
                <form onSubmit={customer_update_local} >
                    <div className='flex flex-col gap-1 mb-2'>
                        <label htmlFor="name">Name</label>
                        <input onChange={inputHandle} value={state.name} type="text" name="name" id="name" placeholder='Name'
                            className='outline-none w-52 px-3 py-1 border rounded-md' />
                    </div>
                    <div className='flex flex-col gap-1 mb-2'>
                        <label htmlFor="phoneNumber">Phone Number</label>
                        {
                            //onChange={setMyPhoneNumber} value={myPhoneNumber}
                            //hidden
                            //formatPhoneNumber(value) back readable
                            //{formatPhoneNumber(currentCustomer.phoneNumber)}
                            // <PhoneInput onChange={setMyPhoneNumber} value={myPhoneNumber} defaultCountry='US' country="US" 
                            // className='outline-none px-3 w-80 py-1 border rounded-md' />
                        }
                        <PhoneInput required onChange={setMyPhoneNumber} value={myPhoneNumber} defaultCountry='US' country="US" 
                            className='outline-none px-3 w-52 py-1 border rounded-md' />
                        <input onChange={inputHandle} value={state.phoneNumber} 
                            type="text" name="phoneNumber" id="phoneNumber" placeholder='Phone Number'
                            className='hidden outline-none px-3 w-52 py-1 border rounded-md' />
                    </div>
                    <div>
                        <button className='px-8 py-2 shadow-lg hover:shadow-green-500/30 text-white rounded-md' 
                            style={{backgroundColor:sellerPrimaryColor1}}>
                            Update My Profile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MyProfile;

/*
const EditForm = () => {
    // Initialize state for the form fields
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);
        // Here you can add code to handle the submitted data
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default EditForm;

*/
