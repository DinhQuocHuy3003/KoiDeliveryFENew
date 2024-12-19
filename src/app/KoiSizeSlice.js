import axiosClient from "../services/axiosClient";
import { API_GET_ALL_KOI_SIZE } from "../constant";

const initialState = {
  isLoading: false,
  error: null,
  response: null,
  koiSizeList: null,
};

const setLoading = (set, isLoading) => set({ isLoading });
const setError = (set, error) =>
  set({ error: { message: error.message, code: error.code } });

export const createKoiSizeSlice = (set) => ({
  ...initialState,

  getAllKoiSize: async () => {
    setLoading(set, true);
    try {
        const { data } = await axiosClient.get(
            API_GET_ALL_KOI_SIZE
        );
        console.log("Data", data.result);
        set((state) => ({
            koiSizeList: data.result || [],
            error: null,
        }))
    }
    catch (error) {
        setError(set, error);
    }
    finally {
        setLoading(set, false);
    }
  },

});
