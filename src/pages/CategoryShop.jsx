/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { Range } from 'react-range';

import { IoIosArrowForward } from "react-icons/io";
import {AiFillStar} from 'react-icons/ai'
import {CiStar} from 'react-icons/ci' 
import {BsFillGridFill} from 'react-icons/bs'
import {FaThList} from 'react-icons/fa'

import { price_range_product, query_products } from '../store/reducers/homeReducer';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Pagination from '../components/Pagination';
import ShopBanner from '../components/ShopBanner';
import Products from '../components/products/Products';
import ShopProductGridListView from '../components/products/ShopProductGridListView';

import config from '../config';

const CategoryShop = () => {
    const sellerFrontendURL = config.STR_FRONTEND_URL
    const intPriceRangeStep = config.INT_FRONTEND_PRICE_RANGE_STEP

    const { products, priceRange, latest_product, totalProduct, parPage } = useSelector(state => state.home)
    const { seller } = useSelector(state => state.seller)

    const sellerId = seller._id 
    const sellerPrimaryColor1 = seller.frontEndPrimaryColor1
    const sellerProductTerm = seller.productTerm
    const sellerProductPluralTerm = seller.productPluralTerm
    
    const sellerBoolShowSitePayments = seller.isVisibleSitePayments === 'Show' ? true : false
    const sellerBoolShowSiteRating = seller.isVisibleSiteRating === 'Show' ? true : false
    const sellerBoolShowSiteProductsUnderFilter = seller.isVisibleSiteProductsUnderFilter === 'Show' ? true : false
    
    let [searchParams, setSearchParams] = useSearchParams()
    const category = searchParams.get('category')
    const mainIngredient = ''
    const [FMP, setFmp] = useState('')
    const [cookingMethod, setCookingMethod] = useState('')
    
    //console.log(category)

    const dispatch = useDispatch()
    
    useEffect(() => { 
        dispatch(price_range_product(sellerFrontendURL))
    },[])
    
    useEffect(() => { 
        setState({
            values: [priceRange.low, priceRange.high]
        })
    },[priceRange])

    const [filter, setFilter] = useState(true) 

    const [state, setState] = useState({values: [priceRange.low, priceRange.high]})
    //console.log(priceRange.low)
    //console.log(priceRange.high)

    //const priceRangeMinPrice = state.priceRange.low || 0; 
    //const priceRangeMaxPrice = state.priceRange.high || 100;

    const [rating, setRating] = useState('')
    const [styles, setStyles] = useState('grid')

    const [pageNumber, setPageNumber] = useState(1)
    const [sortPrice, setSortPrice] = useState('') 

    useEffect(() => { 
        dispatch(
            query_products({
                webSiteOrigin: sellerFrontendURL,
                low: state.values[0] || '',
                high: state.values[1] || '',
                category,
                mainIngredient,
                FMP,
                cookingMethod,
                rating,
                sortPrice,
                pageNumber
            })
         )
    },[sellerFrontendURL, state.values[0], state.values[1], category, mainIngredient, FMP, cookingMethod, rating, sortPrice, pageNumber])
    
    const resetFilter = () => {
        setRating('')
        dispatch(
            query_products({
                webSiteOrigin: sellerFrontendURL,
                low: state.values[0],
                high: state.values[1],
                category,
                mainIngredient: '',
                rating: '',
                sortPrice,
                pageNumber
            })
         )
         dispatch(price_range_product(sellerFrontendURL))
    }
    
    return (
        <div>
            <Header/>
            <ShopBanner homePage={'Home'} homeLink={'/'} currentPageTop={'Category Page'} currentPageTopLink={''} 
                currentPageBottom1={category} currentPageBottomLink1={'/productsCategory?category=' + category} 
                currentPageBottom2={''} currentPageBottomLink2={''} />
            <section className='py-16'>
                <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                    <div className={` md:block hidden ${!filter ? 'mb-6' : 'mb-0'} `}>
                        <button onClick={() => setFilter(!filter)} 
                            className='text-center rounded-lg w-full py-2 px-3 text-white' 
                            style={{backgroundColor:sellerPrimaryColor1}}>
                            Filter {sellerProductPluralTerm}
                        </button> 
                    </div>
                    <div className='w-full flex flex-wrap'>
                        <div className={`w-3/12 md-lg:w-4/12 md:w-full pr-8 
                            ${filter ? 'md:h-0 md:overflow-hidden md:mb-6' : 'md:h-auto md:overflow-auto md:mb-0' } `}>
                            <div className={` ${sellerBoolShowSitePayments ? 'py-2 flex flex-col gap-5' : 'hidden'} `}>
                                <h2 className='text-2xl font-bold mb-3' style={{color:sellerPrimaryColor1}}>Price</h2>
                                <Range
                                    step={intPriceRangeStep} 
                                    min={priceRange.low} //  priceRangeMinPrice
                                    max={priceRange.high} //  priceRangeMaxPrice
                                    values={(state.values)} onChange={(values) => setState({values})}
                                    renderTrack={({props,children}) => (
                                        <div {...props} className='w-full h-[6px] bg-slate-200 rounded-full cursor-pointer'>
                                            {children}
                                        </div>
                                    )}
                                    renderThumb={({ props }) => (
                                        <div className='w-[15px] h-[15px] bg-[#059473] rounded-full' {...props} />
                                    )} 
                                />  
                                <div>
                                    <span className='font-bold text-lg' style={{color:sellerPrimaryColor1}}>${Math.floor(state.values[0])} - ${Math.floor(state.values[1])}</span>  
                                </div>
                            </div>
                            <div className={` ${sellerBoolShowSiteRating ? 'py-3 flex flex-col gap-4' : 'hidden'} `}>
                                <h2 className='text-2xl font-bold mb-3' style={{color:sellerPrimaryColor1}}>Rating</h2>
                                <div className='flex flex-col gap-3'>
                                    <div onClick={() => setRating(5)} className='text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer'>
                                        <span><AiFillStar/> </span>
                                        <span><AiFillStar/> </span>
                                        <span><AiFillStar/> </span>
                                        <span><AiFillStar/> </span>
                                        <span><AiFillStar/> </span>
                                    </div>
                                    <div onClick={() => setRating(4)} className='text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer'>
                                        <span><AiFillStar/> </span>
                                        <span><AiFillStar/> </span>
                                        <span><AiFillStar/> </span>
                                        <span><AiFillStar/> </span>
                                        <span><CiStar/> </span>
                                    </div>
                                    <div onClick={() => setRating(3)} className='text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer'>
                                        <span><AiFillStar/> </span>
                                        <span><AiFillStar/> </span>
                                        <span><AiFillStar/> </span>
                                        <span><CiStar/> </span>
                                        <span><CiStar/> </span>
                                    </div>
                                    <div onClick={() => setRating(2)} className='text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer'>
                                        <span><AiFillStar/> </span>
                                        <span><AiFillStar/> </span>
                                        <span><CiStar/> </span>
                                        <span><CiStar/> </span>
                                        <span><CiStar/> </span>
                                    </div>
                                    <div onClick={() => setRating(1)} className='text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer'>
                                        <span><AiFillStar/> </span>
                                        <span><CiStar/> </span>
                                        <span><CiStar/> </span>
                                        <span><CiStar/> </span>
                                        <span><CiStar/> </span>
                                    </div>
                                    <div className='text-orange-500 flex justify-start items-start gap-2 text-xl cursor-pointer'>
                                        <span><CiStar/> </span>
                                        <span><CiStar/> </span>
                                        <span><CiStar/> </span>
                                        <span><CiStar/> </span>
                                        <span><CiStar/> </span>
                                    </div> 
                                </div> 
                            </div>
                            <button onClick={resetFilter} style={{backgroundColor:sellerPrimaryColor1}} 
                                className={` ${(!sellerBoolShowSitePayments && !sellerBoolShowSiteRating) ? 'hidden' : ''} 
                                    text-center rounded-lg w-full py-2 px-3 text-white`}>
                                Reset Filter
                            </button>
                            <div className={` ${sellerBoolShowSiteProductsUnderFilter ? '' : 'hidden'} py-5 flex flex-col gap-4 md:hidden`}>
                                <Products title={'Latest '+ sellerProductPluralTerm} products={latest_product} parentPage={'CategoryShop'} />
                            </div> 
                        </div>
                        <div className='w-9/12 md-lg:w-8/12 md:w-full'>
                            <div className='pl-8 md:pl-0'>
                                <div className='py-2 bg-white mb-10 px-3 rounded-md flex justify-between items-start border'>
                                    <h2 className='text-lg font-medium' style={{color:sellerPrimaryColor1}}> 
                                        {totalProduct} {sellerProductTerm}
                                        <span className= {` ${totalProduct > 1 ? '': 'hidden'} `} >s </span>
                                        ({category})
                                    </h2>
                                    <div className='flex justify-center items-center gap-3'>
                                        <select onChange={(e)=>setSortPrice(e.target.value)}  name="" id=""
                                            className='p-1 border outline-0 font-semibold' style={{color:sellerPrimaryColor1}}>
                                            <option value="">Sort By</option>
                                            <option className={` ${sellerBoolShowSitePayments ? '' : 'hidden'} `} value="low-to-high">Low to High Price</option>
                                            <option className={` ${sellerBoolShowSitePayments ? '' : 'hidden'} `}  value="high-to-low">High to Low Price </option>
                                        </select>
                                        <div className='flex justify-center items-start gap-4 md-lg:hidden'>
                                            <div onClick={()=> setStyles('grid')} 
                                                className={`p-2 ${styles === 'grid' && 'bg-slate-300'} text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm `} >
                                                <BsFillGridFill style={{color:sellerPrimaryColor1}} />  
                                            </div>
                                            <div onClick={()=> setStyles('list')} 
                                                className={`p-2 ${styles === 'list' && 'bg-slate-300'} text-slate-600 hover:bg-slate-300 cursor-pointer rounded-sm `} >
                                                <FaThList style={{color:sellerPrimaryColor1}} />  
                                            </div> 
                                        </div> 
                                    </div> 
                                </div> 
                                <div className='pb-8'>
                                    <ShopProductGridListView products={products} styles={styles} />  
                                </div>
                                <div>
                                {
                                    totalProduct > parPage &&  
                                        <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} 
                                            totalItems={totalProduct} parPage={parPage} 
                                            showItem={Math.floor(totalProduct / parPage )} />
                                }
                                </div>
                            </div> 
                        </div>
                    </div>
                </div> 
            </section>
            <Footer/>
        </div>
    );
};

export default CategoryShop;