import axiosClient from "../services/axiosClient";
import { 
    API_GET_ORDER_FISH,
    API_CREATE_ORDER,
    API_GET_ORDER_BY_ID,
    API_UPDATE_STATUS_PAYMENT_TO_CASH,
    API_UPDATE_STATUS_PAYMENT_TO_VN_PAY,
 } from "../constant";
const initialState = {
    isLoading: false,
    error: null,
    setOrderId: null,
    orderDetail: null,
    response: null,
};

const setLoading = (set, isLoading) => set({ isLoading });
const setError = (set, error) => set({ error: {message: error.message, code: error.code } });

export const createOrderSlice = (set) => ({

    getCreateOrderFish: async (requestBody) => {
        setLoading(set, true);
        try {
            const { data } = await axiosClient.post( API_GET_ORDER_FISH, requestBody );
            set({ response: data });
        }
        catch (error) {
            setError(set, error);
        }
        finally {
            setLoading(set, false);
        }
    },

    postCreateOrder: async (requestBody) => {
        setLoading(set, true);
        try {
            const { data } = await axiosClient.post( API_CREATE_ORDER, requestBody );
            console.log("data", data);
            
            if (data?.result) {
                set({ setOrderId: data.result });
                console.log("orderId", data.result);
            }
            else {
                throw new Error("Order creation failed: Invalid response structure");
            }

            return data;
        }
        catch (error) {
            setError(set, error);
        }
        finally {
            setLoading(set, false);
        }
    },

    getOrderById: async (id) => {
        setLoading(set, true);
        try {
            const { data } = await axiosClient.get(
                API_GET_ORDER_BY_ID.replace("{id}", id)
            );
            console.log("get order by id:", data.result);
            set({ orderDetail: data.result });
        }
        catch (error) {
            setError(set, error);
        }
        finally {
            setLoading(set, false);
        }
    },

    updatePaymentToCash: async (id) => {
        setLoading(set, true);
        try{
        const { data } = await axiosClient.put(
            `${API_UPDATE_STATUS_PAYMENT_TO_CASH}?OrderId=${id}`
        );
        set({ response: data.result });
        console.log(data.result);
        }
        catch (error) {
            setError(set, error);
        }
        finally{
            setLoading(set, false);
        }
    },

    updateCashToPayment: async (id) => {
        setLoading(set, true);
        try{
        const { data } = await axiosClient.put(
            `${API_UPDATE_STATUS_PAYMENT_TO_VN_PAY}?OrderId=${id}`
        );
        set({ response: data.result });
        console.log(data.result);
        }
        catch (error) {
            setError(set, error);
        }
        finally{
            setLoading(set, false);
        }
    },
})