import GetInternational from "../features/shipping/getInternational/GetInternational";
import axiosClient from "../services/axiosClient";
import {
    API_GET_DOMESTIC,
    API_GET_LOCAL,
    API_GET_INTERNATIONAL,
} from "./../constant";

const initialState = {
    isLoading: false,
    error: null,
    domestic: null,
    local: null,
    international: null,
};

const setLoading = (set, isLoading) => set({ isLoading });
const setError = (set, error) => 
    set({ error: { message: error.message, code: error.code } });
export const createTransportSlice = (set) => ({
    ...initialState,

    getDomestic: async () => {
        setLoading(set, true);
        try {
            const { data } = await axiosClient.get(
                API_GET_DOMESTIC
            );
            set({ domestic: data })
        }
        catch (error) {
            setError(set, error);
        }
        finally {
            setLoading(set, false);
        }
    },

    getLocal: async () => {
        setLoading(set, true);
        try {
            const { data } = await axiosClient.get(
                API_GET_LOCAL
            );
            set({ local: data })
        }
        catch (error) {
            setError(set, error);
        }
        finally {
            setLoading(set, false);
        }
    },

    getInternational: async () => {
        setLoading(set, true);
        try {
            const { data } = await axiosClient.get(
                API_GET_INTERNATIONAL
            );
            set({ international: data })
        }
        catch (error) {
            setError(set, error);
        }
        finally {
            setLoading(set, false);
        }

    }
})