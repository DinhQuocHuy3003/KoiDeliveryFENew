// Auth APIs
export const API_LOGIN = "/Auth/login";
export const API_PROFILE = "/User/Profile";
export const API_REGISTER = "/Auth/register";
export const API_GETUSERS = "/User/GetUsers";
export const API_VERIFICATION = "Auth/Verification";
export const API_LOGIN_DRIVER = "Auth/loginDriver";

//Box Type APIs
export const API_ADD_BOX_TYPE = "BoxType/AddBoxTypeRequestAsync";
export const API_GET_ALL_BOX_TYPE = "BoxType/GetAlBoxTypeAsync";
export const API_DELETE_BOX_TYPE_BY_ID = "BoxType/DeleteBoxTypeBy";
export const API_GET_BOX_TYPE_BY_ID_BY_ID = "BoxType/GetBoxTypeByIdBy";
export const API_UPDATE_BOX_TYPE = "BoxType/UpdateBoxType";

//Cash Payment APIs
export const API_CASH_PAYMENT = "CashPayment";
export const API_UPDATE_STATUS_CASH_PAYMENT_ORDER_TO_PAID = "CashPayment/UpdateStatusCashPaymentOrderToPaid";

//Driver APIs
export const API_CREATE_DRIVER = "Driver/CreateNewDriver";
export const API_GET_ALL_DRIVER = "Driver/GetAllDrivers";
export const API_GET_DRIVER_BY_ID = "Driver/GetDriverBy/";
export const API_DELETE_DRIVER_BY_ID = "Driver/DeleteDriverById";

//Fish Detail APIs
export const API_CREATE_FISH_DETAIL = "FishDetail/GetCreateFishDetail";
export const API_GET_ALL_FISH_DETAIL = "FishDetail/GetAllFishDetail";
export const API_DELETE_FISH_DETAIL = "FishDetail/DeleteFishDetailBy";
export const API_GET_FISH_DETAIL_BY_ID = "FishDetail/GetFishDetailByIdBy";
export const API_UPDATE_FISH_DETAIL = "FishDetail/UpdateFishDetail";
export const API_GET_ALL_FISH_DETAIL_BY_ORDER_ID = "FishDetail/GetAllFishDetailByOrderIdAsync";

//Fish Health APIs
export const API_CREATE_FISH_HEALTH = "FishHealth/CreateFishHealth";
export const API_GET_ALL_FISH_HEALTH = "FishHealth/GetAllFishHealth";
export const API_DELETE_FISH_HEALTH = "FishHealth/GetAllFishHealth";
export const API_GET_FISH_HEALTH_BY_ID = "FishHealth/GetFishHealthByIdBy";
export const API_UPDATE_FISH_HEALTH = "FishHealth/UpdateFishHealth";

//Fish Qualification APIs
export const API_CREATE_FISH_QUALIFICATION = "FishQualification/create-fishQualification";
export const API_GET_FISH_QUALIFICATION = "FishQualification/get-fish";
export const API_DELETE_FISH_QUALIFICATION = "FishQualification/";
export const API_GET_FISH_QUALIFICATION_ID = "FishQualification/";
export const API_UPDATE_FISH_QUALIFICATION = "FishQualification/Update-fishQualification";

//Koi Size APIs
export const API_GET_ALL_KOI_SIZE = "KoiSize/GetAllKoiSizeAsync";
export const API_CREATE_KOI_SIZE = "KoiSize/AddKoiSize";
export const API_DELETE_KOI_SIZE = "KoiSize/DeleteKoiSizeBy";
export const API_GET_KOI_SIZE_BY_ID = "KoiSize/GetKoiSizeByIdBy";
export const API_UPDATE_KOI_SIZE = "KoiSize/UpdateKoiSize";

//Location APIs
export const API_LOCATION = "Location/";

//Map APIs
export const API_MAP_DISTANCE = "Map/distance";

//Order APIs 
export const API_CREATE_ORDER = "Order/create-order";
export const API_ORDER = "Order";
export const API_GET_ORDER_BY_ID = "Order/GetOrderByIdAsyncAsync/{id}";
export const API_ORDER_CUSTOMER = "Order/Customer";
export const API_UPDATE_ORDER_STATUS_DELIVERING = "Order/Update-Order-Status-Delivering";
export const API_GET_ALL_PROCESSING_ORDER = "Order/GetAllProccessingOrder";
export const API_GET_ALL_PENDING_PICK_UP_ORDER = "Order/GetAllPendingPickUpOrderAsync";
export const API_GET_ALL_DELIVERING_ORDER = "Order/GetAllDeliveringOrderAsync";
export const API_GET_ALL_COMPLETE_ORDER = "Order/GetAllCompletedOrderAsync";
export const API_GET_ALL_CANCEL_ORDER = "Order/GetAllCanceledOrderAsync";
export const API_UPDATE_STATUS_PAYMENT_TO_VN_PAY = "Order/UpdateStatusPaymentToVnPayByOrderIdAsync";
export const API_UPDATE_STATUS_PAYMENT_TO_CASH = "Order/UpdateStatusPaymentToCashByOrderIdAsync";

//Order Item APIs
export const API_GET_ORDER_FISH = "OrderItem/GetCreateOrderFish";

//Payment APIs
export const API_PAYMENT = "Payment";
export const API_PAYMENT_CALL_BACK = "Payment/callback";

//Transport APIs
export const API_GET_DOMESTIC = "TransportService/Domestic";
export const API_GET_LOCAL = "TransportService/Local";
export const API_GET_INTERNATIONAL = "TransportService/International"

//User Account APIs
export const API_GET_ALL_ACCOUNT = "UserAccount/GetAllAccountAsync";
export const API_GET_PROFILE = "UserAccount/GetUserProfile";
export const API_UPDATE = "UserAccount/UpdateUserProfile";







