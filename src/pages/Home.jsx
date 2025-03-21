/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_products } from '../store/reducers/homeReducer';

import config from '../config';

const Header  = lazy(()=> import('../components/Header')) 
const Banner = lazy(()=> import('../components/Banner'))
const Categorys = lazy(()=> import('../components/Categorys'))
const MainIngredients = lazy(()=> import('../components/MainIngredients'))
const FeatureProducts = lazy(()=> import('../components/products/FeatureProducts'))
const Products = lazy(()=> import('../components/products/Products'))
const Footer = lazy(()=> import('../components/Footer'))

const Home = () => {
    const sellerFrontendURL = config.STR_FRONTEND_URL 

    const { seller } = useSelector(state => state.seller)
    const {products, latest_product, topRated_product, discount_product, featured_product} = useSelector(state => state.home)
    
    const sellerId = seller._id 
    const sellerProductPluralTerm = seller.productPluralTerm
    
    const sellerBoolShowHomePageBanner = seller.isVisibleHomePageBanner === 'Show' ? true : false
    const sellerBoolShowHomePageCategoriesTop = seller.isVisibleHomePageCategoriesTop === 'Show' ? true : false
    const sellerBoolShowHomePageCategoriesBottom = seller.isVisibleHomePageCategoriesBottom === 'Show' ? true : false
    const sellerBoolShowHomePageMainIngredientsTop = seller.isVisibleHomePageMainIngredientsTop === 'Show' ? true : false
    const sellerBoolShowHomePageMainIngredientsBottom = seller.isVisibleHomePageMainIngredientsBottom === 'Show' ? true : false
    const sellerBoolShowHomePageFavoriteProducts = seller.isVisibleHomePageFavoriteProducts === 'Show' ? true : false
    const sellerBoolShowHomePageThreeProductColumns = seller.isVisibleHomePageThreeProductColumns === 'Show' ? true : false
    
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(get_products(sellerFrontendURL))
    },[])

    //console.log('home page')
    //console.log(categorys)
    //console.log(mainIngredients)
    //console.log('home featured_product ', featured_product)//works here
    //console.log(products)//works here

    return (
        <div className='w-full'>
            <Header />
            <div className={` ${sellerBoolShowHomePageBanner ? 'w-full md-lg:mt-6' : 'hidden'} `}>
                <Banner />
            </div>
            <div className={` ${sellerBoolShowHomePageCategoriesTop ? '' : 'hidden'} `}>
                <Categorys />
            </div>
            <div className={` ${sellerBoolShowHomePageMainIngredientsTop ? '' : 'hidden'} `}>
                <MainIngredients />
            </div>
            <div className={` ${sellerBoolShowHomePageFavoriteProducts ? '' : 'hidden'} `}>
                <FeatureProducts products={featured_product} />                
            </div>
            <div className={` ${sellerBoolShowHomePageCategoriesBottom ? '' : 'hidden'} `}>
                <Categorys />
            </div>
            <div className={` ${sellerBoolShowHomePageMainIngredientsBottom ? '' : 'hidden'} `}>
                <MainIngredients />
            </div>            

            <div className={` ${sellerBoolShowHomePageThreeProductColumns ? 'py-10' : 'hidden'} `}>
                <div className='w-[85%] flex flex-wrap mx-auto'>
                    <div className='border-none grid w-full grid-cols-3 md-lg:grid-cols-2 md:grid-cols-1 gap-3'>
                        <div className={` overflow-hidden border-none justify-items-center `}>
                            <Products title={'Latest '+ sellerProductPluralTerm} products={latest_product} parentPage={'Home'} />
                        </div>
                        <div className={` overflow-hidden border-none justify-items-center `}>
                            <Products  title={'Top Rated '+ sellerProductPluralTerm} products={topRated_product} parentPage={'Home'} />
                        </div>
                        <div className={` overflow-hidden border-none justify-items-center `}>
                            <Products  title={'Select '+ sellerProductPluralTerm} products={discount_product} parentPage={'Home'} />
                        </div>
                    </div> 
                </div> 
            </div>
            <Footer/>
        </div>
    );
};

export default Home;
