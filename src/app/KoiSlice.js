import axiosClient from "../services/axiosClient";


const initialState = {
  isLoading: false,
  error: null,
  response: null,
};

const setLoading = (set, isLoading) => set({ isLoading });
const setError = (set, error) =>
  set({ error: { message: error.message, code: error.code } });

export const createKoiSlice = (set) => ({
  ...initialState,

  
});
