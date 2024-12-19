import axiosClient from "../services/axiosClient";
import {
  API_CREATE_FISH_QUALIFICATION,
  API_CREATE_FISH_HEALTH,
  API_GET_ORDER_FISH,
} from "../constant"

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

    postFishQualification: async (form) => {
      setLoading(set, true);
      try {
        const { data } = await axiosClient.post( API_CREATE_FISH_QUALIFICATION, form );
        set({ response: data });
      }
      catch (error) {
        setError(set, error);
      }
      finally {
        setLoading(set, false);
      }
    },

    postFishHealth: async (form) => {
      setLoading(set, true);
      try {
        const { data } = await axiosClient.post( API_CREATE_FISH_HEALTH, form );
        set({ response: data });
      }
      catch (error) {
        setError(set, error)
      }
      finally {
        setLoading(set, false);
      }
    },

    postFishDetail: async (form) => {
      setLoading(set, true);
      try {
        const { data } = await axiosClient.post( API_GET_ORDER_FISH, form );
        set({ response: data });
      }
      catch (error) {
        setError(set, error)
      }
      finally {
        setLoading(set, false);
      }
    },

});
