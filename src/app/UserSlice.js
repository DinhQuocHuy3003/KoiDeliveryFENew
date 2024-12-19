import { jwtDecode } from "jwt-decode";
import axiosClient from "../services/axiosClient";
import {
  API_LOGIN,
  API_REGISTER,
  API_PROFILE,
  API_LOGIN_DRIVER,
  API_GET_ALL_ACCOUNT,
} from "./../constant";
import Cookies from "js-cookie";

const initialState = {
  isLoading: false,
  error: null,
  userProfile: null,
  userInfo: null,
  auth: false,
  response: null,
  isDriverLogin: false,
  userId: null,
  userList: null,
  otherProfile: null,
};

const setLoading = (set, isLoading) => set({ isLoading });
const setError = (set, error) =>
  set({ error: { message: error.message, code: error.code } });

export const createUserSlice = (set) => ({
  ...initialState,

  setAuth: (auth) => set({ auth }),

  setUserId: (id) => set({ userId: id }),

  setIsDriverLogin: (value) => set( { isDriverLogin: value }),

  logout: () => {
    localStorage.clear();
    sessionStorage.clear();
    Cookies.remove("token");
    set({
      auth: false,
      error: null,
      userProfile: null,
      userInfo: null,
      userId: null,
      otherProfile: null,
      isDriverLogin: false,
      accountList: null,
    });
  },

  postLogin: async (form, isDriverLogin = false, navigate) => {
    setLoading(set, true);
    try {
      console.log("Calling API with form data:", form);
      const endpoint =  isDriverLogin 
      ? API_LOGIN_DRIVER : API_LOGIN;

      const requestBody = {
        userEmail: form.userEmail,
        password: form.password,
      };

      const { data } = await axiosClient.post(endpoint, requestBody);

      const { statusCode, isSuccess, result, errorMessage } = data;
      if (isSuccess && result) {
        if(isDriverLogin) {
          const decoded = jwtDecode(result);
          Cookies.set("token", result);
          Cookies.set("driverId", decoded.DriverId);
          set({ isDriverLogin: true }); 
          setTimeout(() => navigate("/driver"), 1000);
        }
        else {
          Cookies.set("token", result);
          set({ isDriverLogin: false });
          setTimeout(() => navigate("/"), 1000);
        }

        console.log("API response:", data);
        set({ userInfo: data });
        set({ auth: true });
        return { success: true, message: "Login successful! Redirecting..." };
        
      } else {
        return { success: false, message: errorMessage || "Login failed. Please try again..." };
      }

    } catch (error) {
      console.error("API error:", error);
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },

  postRegister: async (form) => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.post(API_REGISTER, form);
      set({ response: data });
    } catch (error) {
      setError(set, error);
    } finally {
      setLoading(set, false);
    }
  },

  getAllAccounts: async () => {
    setLoading(set, true);
    try {
      const { data } = await axiosClient.get(
        API_GET_ALL_ACCOUNT
      );

      set((state) => ({
        accountList: data,
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
