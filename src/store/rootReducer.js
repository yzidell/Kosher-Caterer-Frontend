import authReducer from "./reducers/authReducer";
import homeReducer from "./reducers/homeReducer";
import cartReducer from "./reducers/cartReducer";
import orderReducer from "./reducers/orderReducer";
import customerDashboardReducer from "./reducers/customerDashboardReducer";
import chatReducer from "./reducers/chatReducer";
import sellerReducer from "./reducers/sellerReducer";
import eventDetailsReducer from "./reducers/eventDetailsReducer";
import sellerPackageReducer from "./reducers/sellerPackageReducer";
import sampleMenuReducer from "./reducers/sampleMenuReducer";

const rootReducer = {
    home: homeReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    customerDashboard: customerDashboardReducer,
    chat: chatReducer,
    seller: sellerReducer,
    eventDetails: eventDetailsReducer,
    sellerPackage: sellerPackageReducer,
    sampleMenu: sampleMenuReducer
}

export default rootReducer;
