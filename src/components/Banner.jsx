/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect }  from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css'

import { get_banners } from '../store/reducers/homeReducer';

import config from '../config';

const Banner = () => {
    const sellerFrontendURL = config.STR_FRONTEND_URL

    const { seller } = useSelector(state => state.seller)
    const { userInfo } = useSelector(state => state.auth)
    const { banners } = useSelector(state => state.home)
        
    const sellerId = seller._id 
    const sellerPrimaryColor1 = seller.frontEndPrimaryColor1
    const sellerPrimaryColor2 =  seller.frontEndPrimaryColor2
    const sellerSecondaryColor1 = seller.frontEndSecondaryColor1

    const dispatch = useDispatch()

    const responsive = {
        superLargeDesktop:  { breakpoint: { max: 4000, min: 3000 }, items: 1 },
        desktop:            { breakpoint: { max: 3000, min: 1024 }, items: 1 },
        tablet:             { breakpoint: { max: 1024, min: 464 }, items: 1 },
        mobile:             { breakpoint: { max: 464, min: 0 }, items: 1 }
    }
    //flex gap-8 flex-col-reverse
    
    useEffect(() => {
        dispatch(get_banners(sellerFrontendURL))
        //console.log('dispatch get_banners ', banners)
    },[])

    return (     
        <div className={` w-full md-lg:mt-6 `}>
            <div className='w-[85%] lg:w-[90%] mx-auto'>
                <div className='w-full flex flex-wrap md-lg:gap-8'>
                    <div className='w-full'>
                        <div className='my-8'>
                            <Carousel autoPlay={true} infinite={true} arrows={true} 
                                showDots={true} responsive={responsive} >
                            {   
                                // banners.length > 0 && banners.map((b, i) => 
                                //     <Link key={i} to={`product/details/${b.productId}`}>
                                //         <img style={{width: 1976, height:520}} src={ b.banner} alt="" />
                                //     </Link>

                                    //banner width 1976 height 520
                                    //style={{color:sellerPrimaryColor1}}>
                                    [1,2,3,4,5,6].map((img, i) => 
                                        <Link key={i} to='#'>
                                            <img src={`/images/banner/${img}.jpg`} alt="" />
                                        </Link> 
                                )
                            }
                            </Carousel>        
                        </div>
                    </div>
                </div> 
            </div> 
        </div>
    );
};

export default Banner;
