/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";

import config from '../config';
//const Search = ({setParPage, setSearchValue, searchValue, pageTitle}) => {
//<Search setParPage = {setParPage} setSearchValue = {setSearchValue} searchValue = {searchValue} pageTitle = 'Categories'/>

const ShopBanner = ({homePage, homeLink, currentPageTop, currentPageTopLink, 
    currentPageBottom1, currentPageBottomLink1, currentPageBottom2, currentPageBottomLink2 }) => {
    
    const sellerFrontendURL = config.STR_FRONTEND_URL
    const { seller } = useSelector(state => state.seller)
    const sellerPrimaryColor1 = seller.frontEndPrimaryColor1
    const sellerSecondaryColor1 = seller.frontEndSecondaryColor1 + '8a'

    //https://tailwind-to-css.vercel.app/
    //convert tailwind to normal css

    //position: relative; 
    // margin-top: 1.5rem; 
    // background-position: left; 
    // background-repeat: no-repeat; 
    // background-size: cover; 
    // background: url("http://localhost:3000/images/banner/Caterer5.png");
    // height: 220px;

    //{"position":"relative","marginTop":"1.5rem","backgroundPosition":"left","backgroundRepeat":"no-repeat",
    //"backgroundSize":"cover","background":"url(\"http://localhost:3000/images/banner/Caterer5.png\")","height":"220px"}

    //, backgroundSize: 'cover'
    const bgImageURL = 'url(' + sellerFrontendURL +  '/images/banner/Caterer13.png)'

    return (
        
        <div>

        {
            // <section style={{
            //     position: "relative", marginTop: "1.5rem", backgroundPosition: "left", backgroundRepeat: "no-repeat", 
            //     backgroundSize: "cover", backgroundImage: "url(" + bgImageURL + ")"
            
            // }} >
    
            //     <div className='absolute left-0 top-0 w-full h-full bg-[#2422228a]'>
            //         <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
            //             <div className='flex flex-col justify-center gap-1 items-center h-full w-full text-white'>
            //                 <h2 className='text-3xl font-bold'>{currentPageTop}</h2>
            //                 <div className='flex justify-center items-center gap-2 text-2xl w-full'>
            //                     sdasd
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            // </section>
            //style bg url
            
            //original
            // <section className={`bg-[url("http://localhost:3000/images/banner/Caterer12.png")] 
            //     h-[220px] mt-1 bg-cover bg-left bg-no-repeat relative `}>

            //     <div className='absolute left-0 top-0 w-full h-full bg-[#2422228a]'>
            //         <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
            //             <div className='flex flex-col justify-center gap-1 items-center h-full w-full text-white'>

            //waiter-serving.jpg
            //const bgImageURL = 'url(' + sellerFrontendURL +  '/images/banner/Caterer12.png)'
            //bg-[url("http://localhost:3000/images/banner/Caterer13.png")]
            //<div className='absolute left-0 top-0 w-full h-full bg-[#2222248a]'
            //CSS 8 Digit Hex Colors fae8f3
            //style={{backgroundColor:'#2222248a'}} style={{backgroundColor:sellerSecondaryColor1}}  sellerSecondaryColor1
        }
        
        {   
            <section className={`h-[220px] mt-1 bg-contain bg-no-repeat relative `}
                style={{backgroundImage:bgImageURL}}>
                <div className='absolute left-0 top-0 w-full h-full ' style={{backgroundColor:'#2222248a'}}>
                    <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                        <div className='flex flex-col justify-center gap-1 items-center h-full w-full text-white'>
                            <h2 className='text-3xl font-bold'>{currentPageTop}</h2>
                            <div className='flex justify-center items-center gap-2 text-2xl w-full'>
                                <Link to={homeLink}>{homePage}</Link>
                                <span className='pt-1'><IoIosArrowForward /></span>
                                <Link to={currentPageBottomLink1}>{currentPageBottom1}</Link>
                                <span className={`${currentPageBottom2 === '' ? 'hidden' : 'pt-1'}`}><IoIosArrowForward /></span>
                                <Link className={`${currentPageBottom2 === '' ? 'hidden' : ''}`}>{currentPageBottom2}</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        }
        </div>
    );
};

export default ShopBanner;

/*
from shops.jsx
<section className={` bg-[url("http://localhost:3000/images/banner/Caterer5.png")] 
                h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left`}>
                <div className='absolute left-0 top-0 w-full h-full bg-[#2422228a]'>
                    <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                        <div className='flex flex-col justify-center gap-1 items-center h-full w-full text-white'>
                            <h2 className='text-3xl font-bold'>Shop Page</h2>
                            <div className='flex justify-center items-center gap-2 text-2xl w-full'>
                                <Link to='/'>Home</Link>
                                <span className='pt-1'>
                                    <IoIosArrowForward />
                                </span>
                                <span>My Menu</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            from CategoryShop.jsx

            <section className='bg-[url("http://localhost:3000/images/banner/shop.png")] 
                h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
                <div className='absolute left-0 top-0 w-full h-full bg-[#2422228a]'>
                    <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                        <div className='flex flex-col justify-center gap-1 items-center h-full w-full text-white'>
                            <h2 className='text-3xl font-bold'>Category Page</h2>
                            <div className='flex justify-center items-center gap-2 text-2xl w-full'>
                                <Link to='/'>Home</Link>
                                <span className='pt-1'>
                                    <IoIosArrowForward />
                                </span>
                                {
                                    //{category}
                                }
                                <span>Category</span>
                            </div>
                        </div> 
                    </div> 
                </div> 
            </section>

            from MainIngredientShop.jsx
             <section className='bg-[url("http://localhost:3000/images/banner/shop.png")] 
                h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
                <div className='absolute left-0 top-0 w-full h-full bg-[#2422228a]'>
                    <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                        <div className='flex flex-col justify-center gap-1 items-center h-full w-full text-white'>
                            <h2 className='text-3xl font-bold'>{Config2().STR_MAIN_INGREDIENT_TERM} Page</h2>
                            <div className='flex justify-center items-center gap-2 text-2xl w-full'>
                                <Link to='/'>Home</Link>
                                <span className='pt-1'>
                                    <IoIosArrowForward />
                                </span>
                                {
                                    //{category}
                                }
                                <span>{Config2().STR_MAIN_INGREDIENT_TERM}</span>
                            </div>
                        </div> 
                    </div> 
                </div> 
            </section>

            from SearchProducts.jsx
            <section className='bg-[url("http://localhost:3000/images/banner/shop.png")] 
                h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
                <div className='absolute left-0 top-0 w-full h-full bg-[#2422228a]'>
                    <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                        <div className='flex flex-col justify-center gap-1 items-center h-full w-full text-white'>
                            <h2 className='text-3xl font-bold'>Category Page </h2>
                            <div className='flex justify-center items-center gap-2 text-2xl w-full'>
                                <Link to='/'>Home</Link>
                                <span className='pt-1'>
                                    <IoIosArrowForward />
                                </span>
                                <span>Category </span>
                            </div>
                        </div> 
                    </div> 
                </div> 
           </section>
           from details.jsx
           <section className='bg-[url("http://localhost:3000/images/banner/Caterer5.png")] 
                h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
                <div className='absolute left-0 top-0 w-full h-full bg-[#2422228a]'>
                    <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                        <div className='flex flex-col justify-center gap-1 items-center h-full w-full text-white'>
                            <h2 className='text-3xl font-bold'>{Config2().STR_PRODUCT_TERM} Details</h2>
                            <div className='flex justify-center items-center gap-2 text-2xl w-full'>
                                <Link to='/'>Home</Link>
                                <span className='pt-1'><IoIosArrowForward /></span>
                                <Link to='/'>{ product.category }</Link>
                                <span className='pt-1'><IoIosArrowForward /></span>
                                <span>{ product.name }</span>
                            </div>
                        </div> 
                    </div>
                </div> 
            </section>

            from cart.jsx
            <section className='bg-[url("http://localhost:3000/images/banner/Caterer5.png")]
                h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
                <div className='absolute left-0 top-0 w-full h-full bg-[#2422228a]'>
                    <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                        <div className='flex flex-col justify-center gap-1 items-center h-full w-full text-white'>
                            <h2 className='text-3xl font-bold'>My {Config2().STR_PRODUCT_TERM_PLURAL} Cart</h2>
                            <div className='flex justify-center items-center gap-2 text-2xl w-full'>
                                <Link to='/'>Home</Link>
                                <span className='pt-1'>
                                    <IoIosArrowForward />
                                </span>
                                <span>My {Config2().STR_PRODUCT_TERM_PLURAL}</span>
                            </div>
                        </div> 
                    </div>
                </div> 
            </section>

            from EventDetails.jsx
            <section className='bg-[url("http://localhost:3000/images/banner/Caterer5.png")] 
                h-[220px] mt-6 bg-cover bg-no-repeat relative bg-left'>
                <div className='absolute left-0 top-0 w-full h-full bg-[#94a3dd8a]'>
                    <div className='w-[85%] md:w-[80%] sm:w-[90%] lg:w-[90%] h-full mx-auto'>
                        <div className='flex flex-col justify-center gap-1 items-center h-full w-full text-white'>
                        <h2 className='text-3xl font-bold'>Event Details</h2>
                            <div className='flex justify-center items-center gap-2 text-2xl w-full'>
                                <Link to='/'>Home</Link>
                                <span className='pt-1'>
                                    <IoIosArrowForward />
                                </span>
                                <span>Event Details</span>
                            </div>
                        </div> 
                    </div> 
                </div> 
            </section>

*/