/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Document, Page, pdfjs, View, PDFViewer } from 'react-pdf';

// import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'; //create pdf in react

import Header from '../components/Header';
import Footer from '../components/Footer';
import ShopBanner from '../components/ShopBanner';

import { sampleMenu_webSiteOrigin_get } from '../store/reducers/sampleMenuReducer';

import config from '../config';
import pdfFileNameIntro from "./SampleMenuIntro.pdf"; //src/pages/SampleMenuIntro.pdf

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
  ).toString();

//https://www.youtube.com/watch?v=0FRyKY_PMLE
// How to View Pdf in React using React PDF || React PDF Viewer || Full setup React PDF || React JS

//npm install react-pdf
//https://www.npmjs.com/package/react-pdf

//uplaod similar file images form products

const SampleMenus = () => {
    const sellerFrontendURL = config.STR_FRONTEND_URL

    const { seller } = useSelector(state => state.seller)
    const {userInfo } = useSelector(state => state.auth)
    const {successMessage, errorMessage, sampleMenus, totalSampleMenu} = useSelector(state=> state.sampleMenu)
    
    const sellerId = seller._id 
    const sellerPrimaryColor1 = seller.frontEndPrimaryColor1
    const sellerSecondaryColor1 = seller.frontEndSecondaryColor1

    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [pdfFileName, setPdfFileName] = useState(pdfFileNameIntro);
    
    // const [divPdfWidth, setivPdfWidth] = useState('');
    // const [divPdfHeight, setDivPdfHeight] = useState('');
    // const [pdfPageScale, setDdfPageScale] = useState('');

    let divPdfWidth = ''
    let divPdfHeight = ''
    let pdfPageScale = ''

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(sampleMenu_webSiteOrigin_get(sellerFrontendURL))
    },[])

    //console.log(sampleMenus)
    //console.log(totalSampleMenu)

    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
    }

    //const [pdfFile, setPdfFile] = useState(null);
    // search react set variable based on tailwind screen size
    // import { useMediaQuery } from 'react-responsive';

    // function MyComponent() {
    //   const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });
    //   const isMediumScreen = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1023px)' });
    //   const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });
    
    //   return (
    //     <div>
    //       {isSmallScreen && <p>This is a small screen</p>}
    //       {isMediumScreen && <p>This is a medium screen</p>}
    //       {isLargeScreen && <p>This is a large screen</p>}
    //     </div>
    //   );
    // }

    const [screenSize, setScreenSize] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => {
        setScreenSize(window.innerWidth);
      };
  
    window.addEventListener('resize', handleResize);
      // Cleanup the event listener on component unmount
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    // let variable = 'large';
    if (screenSize <= 768) {
        //variable = 'small';
        divPdfWidth = '360'
        divPdfHeight = '180'
        pdfPageScale = '0.5'
    } else { //if (screenSize < 1024) {
        //variable = 'medium';
        divPdfWidth = '720'
        divPdfHeight = '360'
        pdfPageScale = '1.0'
    }

    //original
    //<div className='w-full p-[50px] bg-[#dedede] mt-[50px]'> first
    //<div className='w-[85%] items-center border p-1 mr-1 overflow-auto' third

    // <div className='w-full mt-2'>
    // <div className='w-[85%] flex-wrap mx-auto'>
    // <div className='p-4 bg-gray-200 rounded-lg mb-2' >
    //items-center justify-center 

    return (
        <div>
            <Header/>
            <ShopBanner homePage={'Home'} homeLink={'/'} currentPageTop={'Sample Menus'} currentPageTopLink={''} 
                currentPageBottom1={'Sample Menus'} currentPageBottomLink1={''} 
                currentPageBottom2={''} currentPageBottomLink2={''} />
            <div className='w-full bg-[#dedede] mt-2'>
            {
                //2xs:hidden xs:hidden md:hidden w-[85%]
                //mx-auto grid grid-cols-1 place-content-around
            }
                <div className=' border-none border-black '>
                    <table width={'100%'}>
                        <tr>
                            <td align='center'>
                                <p className='hidden'>Page {pageNumber} of {numPages} - {screenSize}</p>
                                <div className='border mb-1 mt-1 font-medium'
                                style={{borderColor:sellerPrimaryColor1, color:sellerPrimaryColor1, 
                                    backgroundColor:sellerSecondaryColor1, width: divPdfWidth + 'px'}}>
                                    <p className=''>Here are our sample menus to give you some ideas for creating your own menu</p>
                                    <select onChange={(e) => setPdfFileName(e.target.value)}
                                        className='w-[200px] m-1 border rounded-lg px-2 font-semibold text-sm' 
                                        style={{color:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1, borderColor:sellerPrimaryColor1}}>
                                        <option value={pdfFileNameIntro}>Choose Sample Menu</option>
                                        {
                                            sampleMenus.map((c, i) => 
                                                <option key={i} value={c.pdfFile} className={`text-sm block`}>{c.title}</option>
                                            )
                                        }
                                    </select>
                                </div>
                               
                                <div className='border p-1 overflow-auto'
                                    style={{borderColor:sellerPrimaryColor1, color:sellerPrimaryColor1, backgroundColor:sellerSecondaryColor1, 
                                    width:divPdfWidth + 'px', height: divPdfHeight + 'px'}}>
                                    {
                                        //  , overflowY: 'scroll'
                                        //width='100%' height='500px' #zoom=50 after file name
                                        //https://res.cloudinary.com/yzidell/image/upload/v1736441872/pdf_files/hi3awgfzfpgw6bymxr8v.pdf
                                        //https://res.cloudinary.com/yzidell/image/upload/v1736439815/pdf_files/mm3l4oimcazckdjggupp.pdf
                                    
                                        //<embed src="/your-pdf-url.pdf" width="100%" height="600px" type="application/pdf" />

                                        //<object data="/your-pdf-url.pdf" width="100%" height="600px" type="application/pdf">
                                        //   <p>Your browser doesn’t support PDFs. Please download the PDF to view it: <a href="/your-pdf-url.pdf">Download PDF</a>.</p>
                                        // </object>
                                        // file={Bar_Bas_Mitzvah_Pdf}
                                        // <iframe className='hidden' title='pdf' src='http://res.cloudinary.com/yzidell/image/upload/v1736439815/pdf_files/mm3l4oimcazckdjggupp.pdf' 
                                        // style={{width:divPdfWidth2 + 'px', height: '390px'}} />
                                        //setPdfFileName
                                        //file="https://res.cloudinary.com/yzidell/image/upload/v1736439815/pdf_files/mm3l4oimcazckdjggupp.pdf" 
                                    }
                                   
                                    <Document className='' 
                                        file={pdfFileName} 
                                        onLoadSuccess={onDocumentLoadSuccess}>
                                        {/*scale={0.9} scale={1.0}*/}
                                        {Array.apply(null, Array(numPages))
                                            .map((x,i) => i+1)
                                            .map(page => { return(
                                                <Page className='mb-[10px]'
                                                    pageNumber={page} scale={pdfPageScale}
                                                    renderTextLayer={false} 
                                                    renderAnnotationLayer={false} 
                                                />
                                            )
                                        })}
                                    </Document>    
                                </div>
                                    
                                  {

                                   

                                    //http://res.cloudinary.com/yzidell/image/upload/v1736439815/pdf_files/mm3l4oimcazckdjggupp.pdf
                                    //<iframe title='pdf' src='http://res.cloudinary.com/yzidell/image/upload/v1736439815/pdf_files/mm3l4oimcazckdjggupp.pdf' width='100%' height='500px' />
                                    //https://cdn.simplepdf.com/simple-pdf/assets/sample.pdf
                                    //../pages/clientPages/Kosher_Catering_Meat_Bar_Bas_Mitzvah_Sample_Menu.pdf
                                    // <div>
                                    // <iframe title='pdf' src='http://localhost:3000/src/pages/clientPages/Kosher_Catering_Meat_Bar_Bas_Mitzvah_Sample_Menu.pdf' width='100%' height='500px' />
                                    // </div>
                                   
                                  }
                                
                                    

                                {
                                    //<a href='https://cdn.simplepdf.com/simple-pdf/assets/sample.pdf'></a>
                                    //simplepdf shows compay header
                                    //     <EmbedPDF
                                    //     mode="inline"
                                    //     style={{ width: 900, height: 800 }}
                                    //     documentURL="http://localhost:3000/src/pages/clientPages/Kosher_Catering_Meat_Bar_Bas_Mitzvah_Sample_Menu.pdf"
                                    // />

                                }
                               
                            </td>
                        </tr>
                    </table>

                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default SampleMenus;
