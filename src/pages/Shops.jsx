/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";

import { Range } from 'react-range';
import {AiFillStar} from 'react-icons/ai'
import {CiStar} from 'react-icons/ci'
import {BsFillGridFill} from 'react-icons/bs'
import {FaThList} from 'react-icons/fa'

import { price_range_product, query_products } from '../store/reducers/homeReducer';

import Products from '../components/products/Products';
import ShopProductGridListView from '../components/products/ShopProductGridListView';
import Pagination from '../components/Pagination';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ShopBanner from '../components/ShopBanner';

//import toast from 'react-hot-toast';

import config from '../config';

const Shops = () => {
    const sellerFrontendURL = config.STR_FRONTEND_URL 
    const intPriceRangeStep = config.INT_FRONTEND_PRICE_RANGE_STEP
    
    //error fix range

    const [filter, setFilter] = useState(true)
    const dispatch = useDispatch()
    const {categorys, mainIngredients, allSiteProducts, products, priceRange, latest_product, totalProduct, parPage} = useSelector(state => state.home)
    const { seller } = useSelector(state => state.seller)
    console.log(allSiteProducts)

    useEffect(() => {
        dispatch(price_range_product(sellerFrontendURL))
    },[])

    useEffect(() => { 
        setState({
            values: [priceRange.low, priceRange.high]
        })
    },[priceRange])
    //console.log(priceRange)

    const [state, setState] = useState({values: [priceRange.low, priceRange.high]})
    
    const priceRangeMinPrice = priceRange.low || 0; 
    const priceRangeMaxPrice = priceRange.high || 25; //100;
    
    //let priceRangeMaxPrice = priceRange.high < 100 ? priceRange.high : 100
    
    //console.log('priceRange.high ', priceRange.high, 'priceRangeMaxPrice ', priceRangeMaxPrice)

    const sellerId = seller._id 
    const sellerPrimaryColor1 = seller.frontEndPrimaryColor1
    const sellerPrimaryColor2 =  seller.frontEndPrimaryColor2
    const sellerSecondaryColor1 = seller.frontEndSecondaryColor1
    const sellerMainIngredientPluralTerm = seller.mainIngredientPluralTerm
    const sellerProductTerm = seller.productTerm
    const sellerProductPluralTerm = seller.productPluralTerm
    
    const sellerBoolShowSitePayments = seller.isVisibleSitePayments === 'Show' ? true : false
    const sellerBoolShowSiteRating = seller.isVisibleSiteRating === 'Show' ? true : false
    const sellerBoolShowSiteCookingMethods = seller.isVisibleSiteCookingMethods === 'Show' ? true : false
    const sellerBoolShowSiteProductsUnderFilter = seller.isVisibleSiteProductsUnderFilter === 'Show' ? true : false
      
    const [arrCategories, setArrCategories] = useState([]);
    const addToCategories = (val) => {
        if (val){
            //console.log(val)
            if (!arrCategories.includes(val)) {
                setArrCategories([...arrCategories, val])
            }
        }
    }

    const [arrMainIngredients, setArrMainIngredients] = useState([]);
    const addToMainIngredients = (val) => {
        if (val){
            //console.log(val)
            if (!arrMainIngredients.includes(val)) {
                setArrMainIngredients([...arrMainIngredients, val])
            }
        }
    }

    const [arrFMP, setArrFmp] = useState([]);
    const addToFMP = (val) => {
        if (val){
            //console.log(val)
            if (!arrFMP.includes(val)) {
                setArrFmp([...arrFMP, val])
            }
        }
    }

    const [arrCookingMethods, setArrCookingMethods] = useState([]);
    const addToCookingMethods = (val) => {
        if (val){
            //console.log(val)
            if (!arrCookingMethods.includes(val)) {
                setArrCookingMethods([...arrCookingMethods, val])
            }
        }      
    }

   
    const [rating, setRating] = useState('')
    const [styles, setStyles] = useState('grid')

    const [pageNumber, setPageNumber] = useState(1)
    const [sortPrice, setSortPrice] = useState('')

    const [category, setCategory] = useState('')
    const queryCategory = (e, value) => {
        if (e.target.checked) {
            setCategory(value)
        } else {
            setCategory('')
        }
    }

    const [mainIngredient, setMainIngredient] = useState('')
    const queryMainIngredient = (e, value) => {
        if (e.target.checked) {
            setMainIngredient(value)
        } else {
            setMainIngredient('')
        }
    }

    const [FMP, setFmp] = useState('')
    const queryFMP =  (e, value) => {
        //alert(value)
        if (e.target.checked) {
            setFmp(value)
        } else {
            setFmp('')
        }
        //alert(FMP)
    }

    const [cookingMethod, setCookingMethod] = useState('')
    const queryCookingMethod =  (e, value) => {
        //alert(value)
        if (e.target.checked) {
            setCookingMethod(value)
        } else {
            setCookingMethod('')
        }
        //alert(cookingMethod)
    }

    useEffect(() => { 
        dispatch(
            query_products({
                webSiteOrigin: sellerFrontendURL,
                low: state.values[0],
                high: state.values[1],
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
        setCategory('')
        setMainIngredient('')
        setFmp('')
        setCookingMethod('')
        dispatch(
            query_products({
                webSiteOrigin: sellerFrontendURL,
                low: state.values[0],
                high: state.values[1],
                category: '',
                mainIngredient: '',
                FMP:'',
                cookingMethod:'',
                rating: '',
                sortPrice,
                pageNumber
            }))
        dispatch(price_range_product(sellerFrontendURL))
    }

    return (
        <div>
            <Header/>
            <ShopBanner homePage={'Home'} homeLink={'/'} currentPageTop={'All ' + sellerProductPluralTerm} currentPageTopLink={''} 
                currentPageBottom1={'All ' + sellerProductPluralTerm} currentPageBottomLink1={''} 
                currentPageBottom2={''} currentPageBottomLink2={''} />
            <section className='py-16'>
                <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                    <div className={` md:block hidden ${!filter ? 'mb-6' : 'mb-0'} `}>
                        <button onClick={() => setFilter(!filter)} className='text-center rounded-lg w-full py-2 px-3 text-white'  
                            style={{backgroundColor:sellerPrimaryColor1}}>
                            Filter {sellerProductPluralTerm} 
                        </button> 
                    </div>
                    <div className='w-full border-0 flex flex-wrap'>
                        <div className={`w-3/12 md-lg:w-4/12 md:w-full pr-8 
                            ${filter ? 'md:h-0 md:overflow-hidden md:mb-6' : 'md:h-auto md:overflow-auto md:mb-0' } `}>
                            <div className={` ${filter ? 'text-2xl font-bold mb-3' : 'hidden'}  `} 
                                style={{color:sellerPrimaryColor1}}>
                                Filter {sellerProductPluralTerm}
                            </div>
                            <div className='text-xl font-bold' style={{color:sellerPrimaryColor1}}>
                                Categories
                            </div>
                            <div className='grid grid-cols-2 gap-1'>
                                {
                                    // categorys.map((c,i) => 
                                    //     <div key={i} 
                                    //         className={` ${c.webSiteOrigin === sellerFrontendURL ? 'border-none w-[124px] flex justify-start items-center gap-2 py-1' : 'hidden'}` } >
                                    //         <input type="checkbox" id={c.name} checked={category === c.name ? true : false} 
                                    //             onChange={(e)=>queryCategory(e,c.name)} />
                                    //         <label className='block cursor-pointer text-sm' 
                                    //             style={{color:sellerPrimaryColor1}} htmlFor={c.name}>{c.name}</label>
                                    //     </div>
                                    // )
                                    allSiteProducts.map((d,i) => 
                                        {
                                            addToCategories(d.category)
                                            addToMainIngredients(d.mainIngredient)
                                            addToFMP(d.FMP)
                                            addToCookingMethods(d.cookingMethod)
                                        }
                                    )
                                }
                                {
                                    arrCategories.sort().map((c,i) =>
                                        <div key={i} className='ml-2 w-full border-none flex justify-start items-center gap-1 py-1'>
                                            <div className='border-none align-top mr-1'>
                                                <input type="checkbox" id={c} 
                                                    className='border-none'
                                                    checked={category === c ? true : false} 
                                                    onChange={(e)=>queryCategory(e,c)} />
                                            </div>
                                            <label className='block border-none cursor-pointer text-sm' 
                                                style={{color:sellerPrimaryColor1}} htmlFor={c}>{c}</label>
                                        </div>
                                    )          
                                }
                            </div>
                            <div className='text-xl font-bold mt-3 mb-1' style={{color:sellerPrimaryColor1}}>
                                {sellerMainIngredientPluralTerm}
                            </div>
                            <div className='grid grid-cols-2 gap-1'>
                            {
                                // mainIngredients.map((c,i) => 
                                //     <div key={i} 
                                //         className={` ${c.webSiteOrigin === sellerFrontendURL ? 'w-[124px] flex justify-start items-center gap-2 py-1' : 'hidden'}` } >
                                //         <input type="checkbox" id={c.name} checked={mainIngredient === c.name ? true : false} 
                                //             onChange={(e)=>queryMainIngredient(e,c.name)} />
                                //         <label className='block cursor-pointer text-sm' 
                                //             style={{color:sellerPrimaryColor1}} htmlFor={c.name}>{c.name}</label>
                                //     </div>
                                // )

                                arrMainIngredients.sort().map((c,i) =>
                                    <div key={i} className='ml-2 w-full border-none flex justify-start items-center gap-1 py-1'>
                                        <div className='border-none align-top'>
                                            <input type="checkbox" id={c} 
                                                className='border-none'
                                                checked={mainIngredient === c ? true : false} 
                                                onChange={(e)=>queryMainIngredient(e,c)} />
                                        </div>
                                        <label className='block border-none cursor-pointer text-sm' 
                                            style={{color:sellerPrimaryColor1}} htmlFor={c}>{c}</label>
                                    </div>
                                )          
                            }
                            </div>
                            <div className='text-xl font-bold mt-3 mb-1' style={{color:sellerPrimaryColor1}}>
                                Fleishig/Milchig/Pareve
                            </div>
                            <div className='grid grid-cols-2 gap-0'>
                            {
                                arrFMP.sort().map((c,i) =>
                                    <div key={i} className='ml-2 w-full border-none flex justify-start items-center gap-1 py-1'>
                                        <div className='border-none align-top'>
                                            <input type="checkbox" id={c} 
                                                className='border-none'
                                                checked={FMP === c ? true : false} 
                                                onChange={(e)=>queryFMP(e,c)} />
                                        </div>
                                        <label className='block border-none cursor-pointer text-sm' 
                                            style={{color:sellerPrimaryColor1}} htmlFor={c}>{c}</label>
                                    </div>
                                )                                
                            } 
                            </div>
                            <div className={` ${sellerBoolShowSiteCookingMethods ? '' : 'hidden'} `} >
                                <div className='text-xl font-bold mt-3 mb-1' style={{color:sellerPrimaryColor1}}>
                                    Cooking Method
                                </div>
                                <div className='grid grid-cols-2 gap-0'>
                                {
                                    arrCookingMethods.sort().map((c,i) =>
                                        <div key={i} className='ml-2 w-full flex justify-start items-center gap-1 py-1'>
                                            <div className='border-none align-top'>
                                                <input type="checkbox" id={c} 
                                                    className='border-none'
                                                    checked={cookingMethod === c ? true : false} 
                                                    onChange={(e)=>queryCookingMethod(e,c)} />
                                            </div>
                                            <label className='block border-none cursor-pointer text-sm' 
                                                style={{color:sellerPrimaryColor1}} htmlFor={c}>{c}</label>
                                        </div>
                                    )
                                }
                                </div>
                            </div>
                            <div className='py-2 flex flex-col gap-5 border-none'>
                                <div className={` ${sellerBoolShowSitePayments ? 'py-2 flex flex-col gap-5' : 'hidden'} `}>
                                    <h2 className='text-2xl font-bold mb-3' style={{color:sellerPrimaryColor1}}>Price</h2>
                                    <Range
                                        step={intPriceRangeStep} 
                                        min={priceRange.low} //priceRange.low  priceRangeMinPrice
                                        max={priceRange.high}  //priceRange.high priceRangeMaxPrice 
                                        values={(state.values)}
                                        onChange={(values) => setState({values})}
                                        renderTrack={({props, children}) => (
                                            <div {...props} className='w-full h-[6px] bg-slate-200 rounded-full cursor-pointer'>
                                                {children}
                                            </div>
                                        )}
                                        renderThumb={({ props }) => (
                                            <div className='w-[15px] h-[15px] bg-[#059473] rounded-full' {...props}  />
                                        )} 
                                    />  
                                    <div>
                                        <span className='font-bold text-lg' style={{color:sellerPrimaryColor1}}>${Math.floor(state.values[0])} - ${Math.floor(state.values[1])}</span>            
                                    </div>
                                </div>
                                <div className={` ${sellerBoolShowSiteRating ? 'py-3 flex flex-col gap-4 border-none' : 'hidden'} `}>
                                    <h2 className='text-2xl font-bold mb-3' style={{color:sellerPrimaryColor1}}>Rating </h2>
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
                                <button onClick={resetFilter} className='text-center rounded-lg w-full mt-1 py-2 px-3 text-white' style={{backgroundColor:sellerPrimaryColor1}}>
                                    Reset Filter
                                </button> 
                                <div className={` ${sellerBoolShowSiteProductsUnderFilter ? '' : 'hidden'} py-3 flex gap-4 md:hidden`}>
                                    <Products title={'Latest '+ sellerProductPluralTerm} products={latest_product} parentPage={'Shops'} />
                                </div>
                            </div>
                        </div>
                        <div className='w-9/12 md-lg:w-8/12 md:w-full'>
                            <div className='pl-8 md:pl-0'>
                                <div className='py-2 bg-white mb-10 px-3 rounded-md flex justify-between items-start border'>
                                    <h2 className={`text-lg font-medium`} style={{color:sellerPrimaryColor1}}>
                                        {totalProduct} {sellerProductTerm}
                                        <span className= {` ${totalProduct > 1 ? '': 'hidden'} `} >s</span>
                                    </h2>
                                    <div className='flex justify-center items-center gap-3'>
                                        <select onChange={(e)=>setSortPrice(e.target.value)} name="" id="" 
                                            className={` ${sellerBoolShowSitePayments ? '' : 'hidden'} p-1 border outline-0 font-semibold`}
                                            style={{color:sellerPrimaryColor1}}>
                                            <option value="">Sort By</option>
                                            <option className={` ${sellerBoolShowSitePayments ? '' : 'hidden'} `} value="low-to-high">Low to High Price</option>
                                            <option className={` ${sellerBoolShowSitePayments ? '' : 'hidden'} `} value="high-to-low">High to Low Price </option>
                                        </select>
                                        
                                        <div className='flex justify-center items-start gap-4 md-lg:hidden'>
                                            <div onClick={()=> setStyles('grid')} 
                                                className={`p-2 ${styles === 'grid' && 'bg-slate-300'} 
                                                    hover:bg-slate-300 cursor-pointer rounded-sm`}>
                                                <BsFillGridFill style={{color:sellerPrimaryColor1}} /> 
                                            </div>
                                            <div onClick={()=> setStyles('list')} 
                                                className={`p-2 ${styles === 'list' && 'bg-slate-300'} 
                                                    hover:bg-slate-300 cursor-pointer rounded-sm `} >
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
                                            //<Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} totalItems={10} 
                                            // parPage={parPage} showItem={Math.floor(10 / 3 )} />
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

export default Shops;
