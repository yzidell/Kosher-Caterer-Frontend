/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css'

const MainIngredients = () => {    
    const { seller } = useSelector(state => state.seller)
    const { mainIngredients } = useSelector(state => state.home)
    
    const sellerId = seller._id 
    const sellerPrimaryColor1 = seller.frontEndPrimaryColor1
    const sellerSecondaryColor1 = seller.frontEndSecondaryColor1
    const sellerMainIngredientPluralTerm = seller.mainIngredientPluralTerm
    
    const responsive = {
        superLargeDesktop:  { breakpoint: { max: 4000, min: 3000 }, items: 6 },
        desktop:            { breakpoint: { max: 3000, min: 1024 }, items: 6 },
        tablet:             { breakpoint: { max: 1024, min: 464 }, items: 4 },
        mdtablet:           { breakpoint: { max: 991, min: 464 }, items: 4 },
        mobile:             { breakpoint: { max: 464, min: 0 }, items: 3 },
        smmobile:           { breakpoint: { max: 640, min: 0 }, items: 2 },
        xsmobile:           { breakpoint: { max: 440, min: 0 }, items: 1 },
    }
    
    return (
        <div className={` w-[85%] mx-auto relative`}>
            <div className='w-full'>
                <div className='text-center flex justify-center items-center flex-col text-3xl font-bold relative pb-[35px]'>
                    <h2 style={{color:sellerPrimaryColor1}}>Our Favorite {sellerMainIngredientPluralTerm}</h2>
                    <div className='w-[400px] h-[3px] mt-3' style={{backgroundColor:sellerSecondaryColor1}}></div>
                </div>
            </div>
            <Carousel autoPlay={true} infinite={true} arrows={true} responsive={responsive} transitionDuration={500}>
            {
                mainIngredients.map((c, i) =>
                    <Link className='h-[185px] border block' key={i} to={`/productsMainIngredient?mainIngredient=${c.name}`} >
                        <div className='w-full h-full relative p-2'>
                            <img className='h-[110px] w-full' src={c.image} alt="" />
                            <div className='absolute bottom-6 w-full mx-auto font-bold left-0 flex justify-center items-center'>
                                <span className='py-[2px] px-6 text-center w-full ml-2 mr-2' 
                                    style={{backgroundColor:sellerSecondaryColor1, color:sellerPrimaryColor1}} >
                                    {c.name}
                                </span>
                            </div>
                        </div>
                    </Link>
                )
            }
            </Carousel>
            
        </div>
    );
};

export default MainIngredients;
