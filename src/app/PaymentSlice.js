import axiosClient from "../services/axiosClient"
import {
 API_PAYMENT
} from "../constant";

const initialState = {
    isLoading: false,
    error: null,
};
const setLoading = (set, isLoading) => set({ isLoading });
const setError = (set, error) => set({ error: {message: error.message, code: error.code } });
export const createPaymentSlice = (set) => ({

    postPayment: async (id) => {
        setLoading(set, true);
        try {
            const response = await axiosClient.post(
                API_PAYMENT, { orderId: id }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            if (response && response.data.result) {
                return response.data.result;
            } else {
                console.error("Payment URL not found in response");
                alert('Payment URL not found');
                return null;
            }
        }
        catch (error) {
            setError(set, error);
        }
        finally {
            setLoading(set, false);
        }
    }
})