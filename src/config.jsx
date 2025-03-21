/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { get_seller_by_webSiteOrigin } from '../src/store/reducers/sellerReducer'
import { useDispatch, useSelector } from 'react-redux';

//In the configuration file, you can use environment variables defined in the .env file.
// Make sure to prefix them with REACT_APP_.
//import config from '../config';
//{config.COMPANY_NAME}


  const url = window.location.href;
  const pathname = window.location.pathname;
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  const webSiteOrigin = window.location.origin; //works
  const webSiteOriginArr = webSiteOrigin.split(':')

  const frontEndURL = webSiteOriginArr[0] + ":" + webSiteOriginArr[1] + ":3000"
  const dashBoardURL = webSiteOriginArr[0] + ":" + webSiteOriginArr[1] + ":3001"
  const backEndURL = webSiteOriginArr[0] + ":" + webSiteOriginArr[1] + ":5000"
    
    //const domain =  window.location.domain
    
    //   return (
    //     <div>
    //       You are currently accessing <b>{url}</b><br />
    //       Pathname: <b>{pathname}</b><br />
    //       Protocol: <b>{protocol}</b><br />
    //       Hostname: <b>{hostname}</b>
    //     </div>
    //   );
    // }
    
    // immediate function
    //CREATE DEAFULT VALUES WHEN NEW SELLER REGISTERS
    //const {sellerId} = useSelector(state => state.seller)
    
  // from homereducer
  //   export const get_category = createAsyncThunk(
  //     'product/get_category',
  //     async(webSiteOrigin, { fulfillWithValue }) => {
    //async(info no brackets
  //         try {
  //             //const {data} = await api.get(`/products-get?page=${page}&&searchValue=${searchValue}&&parPage=${parPage}`,{withCredentials: true}) 
  //             //const {data} = await api.get('/home/get-categorys')
  //             const {data} = await api.get(`/home/get-categorys?webSiteOrigin=${encodeURIComponent(webSiteOrigin)}`)
  //             //console.log('homeReducer /home/get-categorys')
  //             //console.log(data)
  //             return fulfillWithValue(data)
  //         } catch (error) {
  //             console.log(error.response)
  //         }
  //     }
  // )
  // // End Method

  //dispatch(admin_order_status_update({orderId, info: {status: e.target.value} }))
  
    //const Chat = () => {
    //const config = () => {
    const config = {

      
        //apiUrl: process.env.REACT_APP_API_URL || 'https://api.example.com',
        //otherVariable: process.env.REACT_APP_OTHER_VARIABLE || 'defaultValue',
        //http://localhost:3000/images/kosher-catering.png
        //process.env.REACT_APP_COMPANY_NAME ||  process.env.REACT_APP_COMPANY_LOGO3 || process.env.REACT_APP_COMPANY_LOGO || 
        //process.env.REACT_APP_PRODUCT_TERM || process.env.REACT_APP_SHOW_PAYMENTS || process.env.REACT_APP_SHOW_CATEGORY_IMAGES ||
        //process.env.REACT_APP_SHOW_INGREDIENTS_IMAGES ||

        STR_FRONTEND_URL: frontEndURL, 
        STR_DASHBOARD_URL: dashBoardURL,
        STR_BACKEND_URL: backEndURL,

        //configure site functionality
        //config.
        
        //for seller dashboard
        //BOOL_CHAT_ONLINE: true,
        //static not in database
        BOOL_SHOW_PRODUCT_STOCK: false, 
        BOOL_SHOW_PRODUCT_OUT_OF_STOCK: false, 
        BOOL_SHOW_PRODUCT_BRAND: false, 
        BOOL_SHOW_PRODUCT_DISCOUNT: false,  
      
        INT_FRONTEND_PRICE_RANGE_STEP: 1,

        STR_FRONTEND_REQUIRED_FIELD_COLOR: '#c8894a',
        
        STR_ARR_SAMPLE_MENU_DISPLAY_NAMES: ['Bar_Bas_Mitzvah', 'Bris', 'Shabbos_Kiddush', 'Shabbos_Dinner'],

        STR_ARR_SAMPLE_MENU_FILE_NAMES: ['Kosher_Catering_Meat_Bar_Bas_Mitzvah_Sample_Menu.pdf', 
          'Kosher_Catering_Meat_Bris_Sample_Menu.pdf', 'Kosher_Catering_Meat_Shabbos_Kiddush_Sample_Menu.pdf',
          'Kosher_Catering_Meat_Shabbos_Dinner_Sample_Menu.pdf'],

        STR_ARR_FRONTEND_CLOTH_COLORS: ['White','Black','Grey','Navy','Aqua','Pink','Purple', 'Red', 'Green'],
        STR_ARR_FRONTEND_EVENT_TYPES: ['Wedding','Bar Mitzvah','Bat Mitzvah','Shaboss Kiddush','Shaboss Kiddush + Luncheon'],
        STR_ARR_FRONTEND_SERVICE_TYPES: ['Drop Off','Buffet Style', 'Full Service Plated Waiter Served'],
        STR_ARR_FRONTEND_PLACE_SETTINGS: ['China Tableware','High Quality Plastic Tableware'],
        
        STR_ARR_PRODUCT_FMP: ['Fleishig-Meat', 'Milchig-Dairy','Pareve','Pareve-Meat-Utensils','Pareve-Dairy-Utensils'],
        STR_ARR_PRODUCT_ALLERGIES: ['None', 'Eggs','Milk', 'Fish', 'Nuts','Wheat','Soybeans'],
      };
      
    export default config;
    
    //config.STR_FRONTEND_PRIMARY_COLOR1
        // STR_FRONTEND_PRIMARY_COLOR1: '#0c6bf2',  //#0c6bf2 blue  #059473 green #7a2757 #FF0000 red #0cf264 light green
        // STR_FRONTEND_PRIMARY_COLOR2: '#475569',  //#475569 slate, 370839e medium slate, #0c6bf2, blue #ff0000 red, #0cf264 bright green
        // STR_FRONTEND_SECONDARY_COLOR1: '#ede8f5', //# light pruple
        // STR_FRONTEND_SECONDARY_COLOR2: '', //
        
        //STR_FRONTEND_TEXT_COLOR1: '#FFFFFF', //
        //STR_FRONTEND_TEXT_COLOR2: '', //
        //STR_FRONTEND_BODY_TEXT_COLOR1: '#000000', //
        //STR_FRONTEND_BODY_TEXT_COLOR2: '', //
        //STR_COMPANY_LOGO2: webSiteOrigin + '/images/kosher-catering.png',
        //STR_COMPANY_NAME: 'Kosher Catering', //shopName in code and database
        //STR_STRIPE_TEST_PUBLISHABLE_KEY: 'pk_test_Wa6x5crPoL7vFLPpKZwVakMP',
        //STR_STRIPE_TEST_SECRET_KEY: 'sk_test_ZkCPHupxTujQ2DCaFePY9mSA',
        //STR_COMPANY_PHONE: '(212) 555-1212',
        //STR_COMPANY_EMAIL: 'someone@gmail.com',
        //STR_MARKETING_LINE1: 'We Cook Everything Fresh, From Scratch, With Love And Care For Your Simcha/Party',
        //STR_BEFORE_YOU_REGISTER: 'Please Contact Us To Make Sure That We Can Cater Your Simcha/Party',
        //STR_FRONTEND_TAGLINE_TOP: 'Craft Your Own Menu For Your Next Simcha',
        //STR_FRONTEND_TAGLINE_MAIN: 'Kosher Caterer - Craft Your Very Own Menu',
        //STR_SHOPPING_TERM: 'My Menu',
        //STR_MAIN_INGREDIENT_TERM: 'Primary Ingredient',
        //STR_MAIN_INGREDIENT_TERM_PLURAL: 'Primary Ingredients',
        //STR_PRODUCT_TERM: 'Menu Item',
        //STR_PRODUCT_TERM_PLURAL: 'Menu Items',
        //BOOL_SHOW_FRONTEND_LATEST_PRODUCTS: true, //removed
        //BOOL_SHOW_FRONTEND_TOP_RATED_PRODUCTS: true, //removed
        //BOOL_SHOW_FRONTEND_DISCOUNT_PRODUCTS: true, //removed
        
        //home page features
        //BOOL_SHOW_HOMEPAGE_BANNER: false,
        //BOOL_SHOW_HOMEPAGE_CATEGORIES_TOP: false,
        //BOOL_SHOW_HOMEPAGE_CATEGORIES_BOTTOM: false,
        //BOOL_SHOW_HOMEPAGE_MAIN_INGREDIENTS_TOP: false,
        //BOOL_SHOW_HOMEPAGE_MAIN_INGREDIENTS_BOTTOM: false,
        //BOOL_SHOW_HOMEPAGE_FAVORITE_PRODUCTS: true,
        //BOOL_SHOW_HOMEPAGE_THREE_PRODUCT_COLUMNS: true,

        //removed
        //BOOL_SHOW_CATEGORIES_IMAGES: true, 
        //BOOL_SHOW_MAIN_INGREDIENTS_IMAGES: true, 
        //BOOL_SHOW_SHOP_PAGE_LATEST_PRODUCTS:true,
        //BOOL_SHOW_PAYMENTS: true, 
        //BOOL_SHOW_SOCIAL_MEDIA: false, 
        //BOOL_SHOW_WISHLIST: true, 
        //BOOL_SHOW_FRONTEND_RATING: true,
        //BOOL_SHOW_FRONTEND_PRODUCT_QUANTITIES: true,
        //BOOL_SHOW_FRONTEND_COOKING_METHODS: true,
        //BOOL_SHOW_FRONTEND_DISCOUNT_PRODUCTS_UNDER_FILTER: true,
      
        //BOOL_SHOW_PRODUCT_REVIEWS: true, 
        //BOOL_SHOW_SELLER_PACKAGES: true,
        //BOOL_SHOW_SELLER_SAMPLE_MENUS: true,
        //BOOL_SHOW_CHAT: true, 
      //STR_DEPOSIT: '500',
                                


