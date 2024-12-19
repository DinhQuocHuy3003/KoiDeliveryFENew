import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import { createKoiSlice } from "./KoiSlice";
import { createUserSlice } from "./UserSlice";
import { createKoiSizeSlice } from "./KoiSizeSlice";
import { createOrderSlice } from "./OrderSlice";
import { createTransportSlice} from "./TransportSlice";
import { createPaymentSlice } from "./PaymentSlice";
const useStore = create(
  devtools(
    persist(
      immer((set) => ({
        ...createKoiSlice(set),
        ...createUserSlice(set),
        ...createKoiSizeSlice(set),
        ...createTransportSlice(set),
        ...createOrderSlice(set),
        ...createPaymentSlice(set),
        
        reset: () =>
          set((state) => {
            if (state.auth !== false || state.userInfo !== null) {
            state.auth = false;
            state.userInfo = null;
            state.isLoading = false;
            state.response = null;
            state.error = null;
            state.userProfile = null;
            state.isDriverLogin = false;
            state.accountList = null;
            }
          }),

        toggleMode: () =>
          set((state) => ({
            colorMode: state.colorMode === "light" ? "dark" : "light",
          })),
      })),
    )
  )
);

export default useStore;
