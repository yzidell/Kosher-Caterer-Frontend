/* eslint-disable no-unused-vars */
import React, { lazy } from 'react';
import { useSelector } from 'react-redux';

import Header from '../components/Header';
import Footer from '../components/Footer';
import ShopBanner from '../components/ShopBanner';

const KosherCateringMeatAboutUs  = lazy(()=> import('./clientPages/KosherCateringMeatAboutUs')) 
const KosherCateringDairyAboutUs = lazy(()=> import('./clientPages/KosherCateringDairyAboutUs'))

const AboutUs = () => {
    const { seller } = useSelector(state => state.seller)
    
    const sellerCompanyName = seller.shopName

    return (
        <div>
            <Header/>
            <ShopBanner homePage={'Home'} homeLink={'/'} currentPageTop={'About Us'} currentPageTopLink={''} 
                currentPageBottom1={'About Us'} currentPageBottomLink1={''} 
                currentPageBottom2={''} currentPageBottomLink2={''} />
                <div className='w-full mt-2'>
                    <div className='w-[85%] flex-wrap mx-auto'>
                        <div className={` ${sellerCompanyName === 'Kosher Catering Meat' ? '' : 'hidden'} `}>
                            <KosherCateringMeatAboutUs className='hidden' />
                        </div>
                        <div className={` ${sellerCompanyName === 'Kosher Catering Dairy' ? '' : 'hidden'} `}>
                            <KosherCateringDairyAboutUs/>
                        </div>
                    </div>
                </div>
            <Footer/>
        </div>
    );
};

export default AboutUs;
