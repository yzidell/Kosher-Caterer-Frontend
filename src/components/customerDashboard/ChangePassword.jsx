/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';

const ChangePassword = () => {

    const { seller } = useSelector(state => state.seller)

    const sellerId = seller._id 
    const sellerPrimaryColor1 = seller.frontEndPrimaryColor1
    const sellerPrimaryColor2 =  seller.frontEndPrimaryColor2
    const sellerSecondaryColor1 = seller.frontEndSecondaryColor1

    return (
        <div className='p-4 rounded-md border'
            style={{backgroundColor:sellerSecondaryColor1, color:sellerPrimaryColor1, borderColor:sellerPrimaryColor1}}>
            <h2 className='text-xl pb-4'>Change Password</h2>
            <form>
                <div className='flex flex-col gap-1 mb-2'>
                    <label htmlFor="old_password">Old Password</label>
                    <input className='outline-none px-3 py-1 w-80 border rounded-md' type="password" name="old_password" id="old_password"  placeholder='Old Password'/>
                </div>
                <div className='flex flex-col gap-1 mb-2'>
                    <label htmlFor="new_password">New Password</label>
                    <input className='outline-none px-3 py-1 w-80 border rounded-md' type="password" name="new_password" id="new_password"  placeholder='New Password'/>
                </div>
                <div className='flex flex-col gap-1 mb-2'>
                    <label htmlFor="confirm_password">Confirm Password</label>
                    <input className='outline-none px-3 py-1 w-80 border rounded-md' type="password" name="confirm_password" id="confirm_password"  placeholder='Confirm Password'/>
                </div>
                <div>
                    <button className='px-8 py-2 shadow-lg hover:shadow-green-500/30 text-white rounded-md' 
                        style={{backgroundColor:sellerPrimaryColor1}}>
                        Update Password
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChangePassword;
