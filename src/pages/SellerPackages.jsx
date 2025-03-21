/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RiArrowDropDownLine } from 'react-icons/ri'

import Header from '../components/Header';
import Footer from '../components/Footer';
import ShopBanner from '../components/ShopBanner';
import Accordion from '../components/Accordion';

import { get_sellerPackages_webSiteOrigin } from '../store/reducers/sellerPackageReducer';

import config from '../config';

//https://www.youtube.com/@codecommerce
//https://www.youtube.com/watch?v=oOXExNA8A48
//Build an Accordion Menu with React & Tailwind CSS

const SellerPackages = () => {
    const sellerFrontendURL = config.STR_FRONTEND_URL

    const { seller } = useSelector(state => state.seller)
    const {userInfo } = useSelector(state => state.auth)
    const {sellerPackages, totalSellerPackage} = useSelector(state => state.sellerPackage)
    
    const sellerId = seller._id 
    const sellerPrimaryColor1 = seller.frontEndPrimaryColor1
    const sellerSecondaryColor1 = seller.frontEndSecondaryColor1
    
    const dispatch = useDispatch()
        
    useEffect(() => {
        dispatch(get_sellerPackages_webSiteOrigin(sellerFrontendURL))
        //console.log('dispatch get_banners ', banners)
    },[])

    return (
        <div>
            <Header/>
            <ShopBanner homePage={'Home'} homeLink={'/'} currentPageTop={'Packages'} currentPageTopLink={''} 
                currentPageBottom1={'Packages'} currentPageBottomLink1={''} 
                currentPageBottom2={''} currentPageBottomLink2={''} />
            <div className='w-full mt-2'>
                <div className='w-[85%] flex-wrap mx-auto'>
                    {
                        //style={{borderColor:sellerPrimaryColor1, color:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1}}
                        //bg-gray-200
                    }
                    <div className='p-4 rounded-lg mb-2 border' 
                        style={{borderColor:sellerPrimaryColor1, color:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1}}>
                    {
                        sellerPackages.map((item, index) => 
                            <div className='w-full'  key={index}>
                                <Accordion title={item.title} intro={item.intro} pricePerPerson={item.pricePerPerson} minNumberPeople={item.minNumberPeople} description={item.description}/>
                            </div> 
                        )
                    }
                    </div>
                </div>
            </div>
            <Footer/>
        </div>  
    );
};

export default SellerPackages;

 
