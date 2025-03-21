import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api"; 

export const add_to_cart = createAsyncThunk(
    'cart/add_to_cart',
    async(info, { rejectWithValue,fulfillWithValue }) => {
        try {
            const {data} = await api.post('/home/product/add-to-cart', info) 
            // console.log('info ', info)
            // console.log('data ', data) 
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
// End Method 

export const get_cart_products = createAsyncThunk(
    'cart/get_cart_products',
    async(userId, { rejectWithValue, fulfillWithValue }) => {
        try {
            const {data} = await api.get(`/home/product/get-cart-products/${userId}`) 
            //console.log(data)
            //console.log(userId)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
// End Method 

export const delete_cart_product = createAsyncThunk(
    'cart/delete_cart_product',
    async(cart_id, { rejectWithValue,fulfillWithValue }) => {
        try {
            const {data} = await api.delete(`/home/product/delete-cart-product/${cart_id}`) 
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
// End Method 

export const cart_product_quantity_increment = createAsyncThunk(
    'cart/cart_product_quantity_increment',
    async(cart_id, { rejectWithValue,fulfillWithValue }) => {
        try {
            console.log(cart_id)
            const {data} = await api.put(`/home/product/cart-product-quantity-increment/${cart_id}`) 
            console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
// End Method 

export const cart_product_quantity_decrement = createAsyncThunk(
    'cart/cart_product_quantity_decrement',
    async(card_id, { rejectWithValue,fulfillWithValue }) => {
        try {
            const {data} = await api.put(`/home/product/cart-product-quantity-decrement/${card_id}`) 
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
// End Method 

export const cart_product_portion_size_change = createAsyncThunk(
    'cart/cart_product_portion_size_change',
    async(info, { rejectWithValue,fulfillWithValue }) => {
        //console.log(cart_id)
        //console.log(newPortionSize)
        
        try {
            const {data} = await api.put('/home/product/cart-product-portion-size-change', info) 
           //console.log(info)
            //console.log(cart_id)
            //console.log(newPortionSize)
            //const {data} = await api.post('/home/product/add-to-cart', info) 
            
            //const {data} = await api.put(`/home/product/quantity-inc/${cart_id}`) 
            //const {data} = await api.put(`/home/product/cart-product-quantity-increment/${cart_id}`) 
            
            //cart-product-quantity-increment
            //console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
// End Method 

export const add_to_wishlist = createAsyncThunk(
    'wishlist/add_to_wishlist',
    async(info, { rejectWithValue,fulfillWithValue }) => {
        //console.log(info)
        try {
            const {data} = await api.post('/home/product/add-to-wishlist',info) 
            //console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
// End Method 

export const get_wishlist_products = createAsyncThunk(
    'wishlist/get_wishlist_products',
    async(userId, { rejectWithValue,fulfillWithValue }) => {
        try {
            const {data} = await api.get(`/home/product/get-wishlist-products/${userId}`) 
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
// End Method

export const remove_from_wishlist = createAsyncThunk(
    'wishlist/remove_from_wishlist',
    async(wishlistId, { rejectWithValue,fulfillWithValue }) => {
        try {
            const {data} = await api.delete(`/home/product/remove-wishlist-product/${wishlistId}`) 
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
// End Method 

export const move_from_wishlist_to_cart = createAsyncThunk(
    'wishlist/move_from_wishlist_to_cart',
    async(wishlistId, { rejectWithValue,fulfillWithValue }) => {
        try {
            //const {data} = await api.post('/home/product/add-to-wishlist',info) 
            //move-from-wishlist-to-cart
            const {data} = await api.post(`/home/product/move-from-wishlist-to-cart/${wishlistId}`) 
            //router.post('/home/product/move-from-wishlist-to-cart/:wishlistId', cartController.move_from_wishlist_to_cart) 

            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)
// End Method 

export const cartReducer = createSlice({
    name: 'cart',
    initialState:{
        cart_products : [], 
        cart_product_count: 0,
        wishlist_count : 0,
        wishlist: [],
        price: 0, 
        errorMessage : '',
        successMessage: '', 
        shipping_fee: 0,
        outofstock_products : [],
        buy_product_item : 0,
        portionSize:''
    },
    reducers : {
        messageClear : (state,_) => {
            state.errorMessage = ""
            state.successMessage = ""
        },
        reset_count: (state,_) => {
            state.cart_product_count = 0
            state.wishlist_count = 0
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(add_to_cart.rejected, (state, { payload }) => {
            state.errorMessage = payload.error; 
        })
        .addCase(add_to_cart.fulfilled, (state, { payload }) => { 
            state.successMessage = payload.message; 
            state.cart_product_count = state.cart_product_count + 1
            //console.log(state.cart_product_count)
        })

        .addCase(get_cart_products.fulfilled, (state, { payload }) => { 
            state.cart_products = payload.cart_products; 
            state.price = payload.price
            state.cart_product_count = payload.cart_product_count
            state.shipping_fee = payload.shipping_fee
            state.outofstock_products = payload.outOfStockProduct
            state.buy_product_item = payload.buy_product_item 
            state.portionSize = payload.portionSize
        })
        .addCase(delete_cart_product.fulfilled, (state, { payload }) => { 
            state.successMessage = payload.message;  
        })
        .addCase(cart_product_quantity_increment.fulfilled, (state, { payload }) => { 
            state.successMessage = payload.message;  
        })
        .addCase(cart_product_quantity_decrement.fulfilled, (state, { payload }) => { 
            state.successMessage = payload.message;  
        })
        .addCase(cart_product_portion_size_change.fulfilled, (state, { payload }) => { 
            state.successMessage = payload.message;  
        })
        .addCase(add_to_wishlist.rejected, (state, { payload }) => {
            state.errorMessage = payload.error; 
        })
        .addCase(add_to_wishlist.fulfilled, (state, { payload }) => { 
            state.successMessage = payload.message; 
            state.wishlist_count = state.wishlist_count > 0 ? state.wishlist_count + 1 : 1   
            //console.log('state.wishlist_count ', state.wishlist_count)
            //console.log('wishlist_count ', payload.wishlist_count)
        })
        .addCase(get_wishlist_products.fulfilled, (state, { payload }) => { 
            state.wishlist = payload.wishlists; 
            state.wishlist_count = payload.wishlistCount 
        })
        .addCase(remove_from_wishlist.fulfilled, (state, { payload }) => { 
            state.successMessage = payload.message; 
            state.wishlist = state.wishlist.filter(p => p._id !== payload.wishlistId); 
            state.wishlist_count = state.wishlist_count - 1
        })
        .addCase(move_from_wishlist_to_cart.fulfilled, (state, { payload }) => { 
            state.successMessage = payload.message; 
            state.wishlist = state.wishlist.filter(p => p._id !== payload.wishlistId); 
            state.wishlist_count = state.wishlist_count - 1
            state.cart_product_count = state.cart_product_count + 1
          
            // state.cart_products = payload.cart_products; 
        })
    }
})

export const {messageClear, reset_count} = cartReducer.actions
export default cartReducer.reducer



