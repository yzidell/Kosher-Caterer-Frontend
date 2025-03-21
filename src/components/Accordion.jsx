/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';

import { currencyFormat } from '../components/CurrencyFormat';

import config from '../config';

const Accordion = ({title, intro, pricePerPerson, minNumberPeople, description}) => {
    const { seller } = useSelector(state => state.seller)
    const [accordionOpen, setAccordionOpen] = useState(false)
    
    const sellerId = seller._id 
    const sellerPrimaryColor1 = seller.frontEndPrimaryColor1
    const sellerPrimaryColor2 =  seller.frontEndPrimaryColor2
    const sellerSecondaryColor1 = seller.frontEndSecondaryColor1
    
    //description = description.replace("<li>", "<li style='margin-left:26px;'>**")//<span>&#46;</span>
    description = description.replace("<ul>", "<ul style='list-style-type: disc; margin-left:20px;'>")//<span>&#46;</span>

    return (
        <div className='py-0' >
            {
                //bg-gray-200
                //hover:pl-1 hover:pr-1 hover:pt-1 bg-gray-200
                //style={{borderColor:sellerPrimaryColor1, color:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1}}
            }
            <button onClick={() => setAccordionOpen(!accordionOpen)} 
                className='hover:bg-gray-300 hover:rounded-lg pl-2 pt-1 hover:pl-2 hover:pt-1
                    flex justify-between w-full cursor-hand rounded-lg'>
                <span className='font-bold' style={{color:sellerPrimaryColor1}}>{title}</span>
                {   /*accordionOpen ? <span>-</span> : <span>+</span>*/
                    //mt-2 mb-2 mr-2
                }
                <svg className="fill-indigo-500 shrink-0 ml-8 mt-2 mb-2 mr-2" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                    <rect y="7" width="16" height="2" rx="1"
                        className={`transform origin-center transition duration-200 ease-out ${
                            accordionOpen && "!rotate-180"
                        }`}
                    />
                    <rect y="7" width="16" height="2" rx="1"
                        className={`transform origin-center rotate-90 transition duration-200 ease-out ${
                            accordionOpen && "!rotate-180"
                        }`}
                    />
              </svg>
            </button>

            <div className={`bg-gray-300 w-[99%] rounded-lg ml-1 mt-2 mb-2 grid overflow-hidden translate-all duration-300 ease-in-out text-slate-600 text-sm 
                 ${accordionOpen ? 
                 'grid-rows-[1fr] opacity-100 p-3' : 
                 'grid-rows-[0fr] opacity-0'} `}>
                <div className='overflow-hidden'>
                    <div className='flex md:flex-col md:gap-2 gap-1'>
                        <div className='grid grid-cols-2 gap-1 mb-2 border-none pr-1'>{intro}</div>
                    </div>
                    <div className='flex md:flex-col md:gap-2 gap-1'>
                        <div className='grid grid-cols-2 gap-1 mb-2 border-none pr-1'>
                            <div>Price Per Person: </div><div className='font-semibold'>{currencyFormat.format(pricePerPerson)}</div> 
                        </div>
                        <div className='grid grid-cols-2 gap-1 mb-2 border-none p-0'>
                            <div>Minimum Number People: </div><div className='font-semibold'>{minNumberPeople}</div>
                        </div>
                    </div>
                    <div dangerouslySetInnerHTML={{__html: description}} />
                </div>
            </div>
        </div>
    );
};

export default Accordion