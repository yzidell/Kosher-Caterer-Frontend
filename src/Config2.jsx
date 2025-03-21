/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unreachable */
/* eslint-disable no-unused-labels */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-labels */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { get_seller_by_frontEndURL } from './store/reducers/sellerReducer'
import { useDispatch, useSelector } from 'react-redux';

//usage console.log(config2().test2)
//console.log(config2().test2)
    
const Config2 = () => {
    const webSiteOrigin = window.location.origin; //works
    const webSiteOriginArr = webSiteOrigin.split(':')

    const frontEndURL = webSiteOriginArr[0] + ":" + webSiteOriginArr[1] + ":3000"
    const dashBoardURL = webSiteOriginArr[0] + ":" + webSiteOriginArr[1] + ":3001"
    const backEndURL = webSiteOriginArr[0] + ":" + webSiteOriginArr[1] + ":5000"

    //console.log(frontEndURL)
    //alert(frontEndURL)
    const dispatch = useDispatch()
    const { seller } = useSelector(state => state.seller)

    const [state, setState] =  useState({
        image: '', sellerImage: '', logoImage: '', shopName: '', ownerNames: '', address1: '', address2: '', city: '', sellerState: '', zipCode: '', phoneNumber: '',
        emailAdress: '', contactPerson: '', stripeTestPublishableKey: '', stripeLivePublishableKey: '',
        frontEndPrimaryColor1: '', frontEndPrimaryColor2: '', frontEndSecondaryColor1: '', frontEndSecondaryColor2: '',
        kosherSupervision: '', marketingLine1: '', beforeYouRegister1: '', taglineTop1: '', taglineTop2: '',
        shoppingTerm: '', mainIngredientTerm: '', mainIngredientPluralTerm: '', productTerm: '', productPluralTerm: '',
        isVisibleHomePageBanner: '', isVisibleHomePageCategoriesTop: '', isVisibleHomePageCategoriesBottom: '', 
        isVisibleHomePageMainIngredientsTop: '', isVisibleHomePageMainIngredientsBottom: '', isVisibleHomePageFavoriteProducts: '', 
        isVisibleHomePageThreeProductColumns: '',
        isVisibleSitePayments: '', isVisibleSiteSocialMedia: '', isVisibleSiteWishlist: '', isVisibleSiteRating: '',
        isVisibleSiteProductQuantities: '', isVisibleSiteCookingMethods: '', isVisibleSiteProductReviews: '', isVisibleSitePackages: '',
        isVisibleSiteSamplesMenus: '', isVisibleSiteProductsUnderFilter: '', isVisibleSiteChat: '', isVisibleSiteChatOnline: ''
            
    })

    useEffect(() => {
        dispatch(get_seller_by_frontEndURL(frontEndURL))
        //console.log(seller)
        //console.log(state)
    },[frontEndURL])
    
    useEffect(() => {
        setState({
            sellerImage: seller.sellerImage,
            logoImage: seller.logoImage,
            shopName: seller.shopName,
            ownerNames: seller.ownerNames,
            address1: seller.address1, 
            address2: seller.address2,
            city: seller.city, 
            sellerState: seller.sellerState, 
            zipCode: seller.zipCode, 
            phoneNumber: seller.phoneNumber,
            emailAdress: seller.emailAdress, 
            contactPerson: seller.contactPerson,
            stripeTestPublishableKey: seller.stripeTestPublishableKey,
            stripeLivePublishableKey: seller.stripeLivePublishableKey,
            frontEndPrimaryColor1: seller.frontEndPrimaryColor1,  
            frontEndPrimaryColor2: seller.frontEndPrimaryColor2,
            frontEndSecondaryColor1: seller.frontEndSecondaryColor1,
            frontEndSecondaryColor2: seller.frontEndSecondaryColor2,
            kosherSupervision: seller.kosherSupervision,
            marketingLine1: seller.marketingLine1, 
            beforeYouRegister1: seller.beforeYouRegister1, 
            taglineTop1: seller.taglineTop1, 
            taglineTop2: seller.taglineTop2,

            shoppingTerm: seller.shoppingTerm,
            mainIngredientTerm: seller.mainIngredientTerm,
            mainIngredientPluralTerm: seller.mainIngredientPluralTerm,
            productTerm: seller.productTerm,
            productPluralTerm: seller.productPluralTerm,
            isVisibleHomePageBanner: seller.isVisibleHomePageBanner, 
            isVisibleHomePageCategoriesTop: seller.isVisibleHomePageCategoriesTop, 
            isVisibleHomePageCategoriesBottom: seller.isVisibleHomePageCategoriesBottom, 
            isVisibleHomePageMainIngredientsTop: seller.isVisibleHomePageMainIngredientsTop,
            isVisibleHomePageMainIngredientsBottom: seller.isVisibleHomePageMainIngredientsBottom, 
            isVisibleHomePageFavoriteProducts: seller.isVisibleHomePageFavoriteProducts, 
            isVisibleHomePageThreeProductColumns: seller.isVisibleHomePageThreeProductColumns,

            isVisibleSitePayments: seller.isVisibleSitePayments, 
            isVisibleSiteSocialMedia: seller.isVisibleSiteSocialMedia, 
            isVisibleSiteWishlist: seller.isVisibleSiteWishlist, 
            isVisibleSiteRating: seller.isVisibleSiteRating,
            isVisibleSiteProductQuantities: seller.isVisibleSiteProductQuantities, 
            isVisibleSiteCookingMethods: seller.isVisibleSiteCookingMethods, 
            isVisibleSiteProductReviews: seller.isVisibleSiteProductReviews, 
            isVisibleSitePackages: seller.isVisibleSitePackages,
            isVisibleSiteSamplesMenus: seller.isVisibleSiteSamplesMenus, 
            isVisibleSiteProductsUnderFilter: seller.isVisibleSiteProductsUnderFilter, 
            isVisibleSiteChat: seller.isVisibleSiteChat, 
            isVisibleSiteChatOnline: seller.isVisibleSiteChatOnline
        
        })
    }, [seller])
    //import Config2 from '../../Config2';
    //Config2()
    return {
        STR_FRONTEND_URL: frontEndURL,
        STR_DASHBOARD_URL: dashBoardURL,
        STR_BACKEND_URL: backEndURL,
        STR_COMPANY_LOGO: seller.logoImage,  
        STR_SELLER_ID: seller._id,
        STR_SELLER_IMAGE: seller.sellerImage,
        STR_COMPANY_NAME: state.shopName, 
        STR_COMPANY_OWNER_NAMES: state.ownerNames, 
        STR_COMPANY_ADDRESS1: state.address1, 
        STR_COMPANY_ADDRESS2: state.address2,
        STR_COMPANY_CITY: state.city, 
        STR_COMPANY_STATE: state.sellerState, 
        STR_COMPANY_ZIPCODE: state.zipCode, 
        STR_COMPANY_PHONE_NUMBER: state.phoneNumber,
        STR_COMPANY_EMAIL_ADDRESS: state.emailAdress, 
        STR_COMPANY_CONTACT_PERSON: state.contactPerson,
        STR_COMPANY_KOSHER_SUPERVISION: state.kosherSupervision,
        STR_STRIPE_TEST_PUBLISHABLE_KEY: seller.stripeTestPublishableKey,
        STR_FRONTEND_PRIMARY_COLOR1: state.frontEndPrimaryColor1, //'#0c6bf2',  //#0c6bf2 blue  #059473 green #7a2757 #FF0000 red #0cf264 light green
        STR_FRONTEND_PRIMARY_COLOR2: state.frontEndPrimaryColor2, // '#475569',  //#475569 slate, 370839e medium slate, #0c6bf2, blue #ff0000 red, #0cf264 bright green
        STR_FRONTEND_SECONDARY_COLOR1: state.frontEndSecondaryColor1, //'#ede8f5', //# light pruple
        STR_FRONTEND_SECONDARY_COLOR2:  state.frontEndSecondaryColor2, 
        
        STR_MARKETING_LINE1: state.marketingLine1,
        STR_BEFORE_YOU_REGISTER1: state.beforeYouRegister1,
        STR_FRONTEND_TAGLINE_TOP1: state.taglineTop1,
        STR_FRONTEND_TAGLINE_TOP2: state.taglineTop2,

        STR_SHOPPING_TERM: state.shoppingTerm,
        STR_MAIN_INGREDIENT_TERM: state.mainIngredientTerm,
        STR_MAIN_INGREDIENT_PLURAL_TERM: state.mainIngredientPluralTerm,
        STR_PRODUCT_TERM: state.productTerm,
        STR_PRODUCT_PLURAL_TERM: state.productPluralTerm,

        //home page features convert from Show to true false
        BOOL_SHOW_HOMEPAGE_BANNER: state.isVisibleHomePageBanner === 'Show' ? true : false,
        BOOL_SHOW_HOMEPAGE_CATEGORIES_TOP: state.isVisibleHomePageCategoriesTop === 'Show' ? true : false,
        BOOL_SHOW_HOMEPAGE_CATEGORIES_BOTTOM: state.isVisibleHomePageCategoriesBottom === 'Show' ? true : false,
        BOOL_SHOW_HOMEPAGE_MAIN_INGREDIENTS_TOP: state.isVisibleHomePageMainIngredientsTop === 'Show' ? true : false,
        BOOL_SHOW_HOMEPAGE_MAIN_INGREDIENTS_BOTTOM: state.isVisibleHomePageMainIngredientsBottom === 'Show' ? true : false,
        BOOL_SHOW_HOMEPAGE_FAVORITE_PRODUCTS: state.isVisibleHomePageFavoriteProducts === 'Show' ? true : false,
        BOOL_SHOW_HOMEPAGE_THREE_PRODUCT_COLUMNS: state.isVisibleHomePageThreeProductColumns === 'Show' ? true : false,

        BOOL_SHOW_SITE_PAYMENTS: state.isVisibleSitePayments === 'Show' ? true : false,
        BOOL_SHOW_SITE_SOCIAL_MEDIA: state.isVisibleSiteSocialMedia === 'Show' ? true : false,
        BOOL_SHOW_SITE_WISHLIST: state.isVisibleSiteWishlist === 'Show' ? true : false,
        BOOL_SHOW_SITE_RATING: state.isVisibleSiteRating === 'Show' ? true : false,
        
        // isVisibleSiteRating
        // BOOL_SHOW_FRONTEND_RATING: true,
        
        
        //     isVisibleSiteProductQuantities,
        //  isVisibleSiteCookingMethods, 
        // isVisibleSiteProductReviews, 
        // isVisibleSitePackages,
        //     isVisibleSiteSamplesMenus, 
        // isVisibleSiteProductsUnderFilter, 
        // isVisibleSiteChat, 
        // isVisibleSiteChatOnline

        // BOOL_SHOW_FRONTEND_PRODUCT_QUANTITIES: true,
        // BOOL_SHOW_FRONTEND_COOKING_METHODS: true,
        // BOOL_SHOW_FRONTEND_DISCOUNT_PRODUCTS_UNDER_FILTER: true,

        // BOOL_SHOW_PRODUCT_REVIEWS: true, 
        // BOOL_SHOW_SELLER_PACKAGES: true,
        // BOOL_SHOW_SELLER_SAMPLE_MENUS: true,
        // BOOL_SHOW_CHAT: true, 

        //STR_FRONTEND_TAGLINE_MAIN: 'Kosher Caterer - Craft Your Very Own Menu',
        //marketingLine1, 
            // beforeYouRegister1, 
            // taglineTop1, 
            // taglineTop2

    }
        
};

export default Config2;
