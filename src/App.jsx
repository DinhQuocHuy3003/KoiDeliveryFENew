import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material";
import useStore from "./app/store";
import Cookies from "js-cookie";

import EmptyLayout from "./layouts/EmptyLayout";
import HomeLayout from "./layouts/HomeLayout";
import GetEstimate from "./features/order/bookingOrder/getEstimate/getEstimate";
import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound";
import Login from "./features/auth/Login/Login";
import Register from "./features/auth/register/Register";
import Service from "./features/common/Header/service/Service";
import ManagerLayout from "./layouts/ManagerLayout";
import BookingOrder from "./features/order/bookingOrder/BookingOrder";
import AccountManagement from "./features/manager/account/AccountManagement";
import ProtectedRoute from "./ProtectedRoute";
import AccessDenied from "./pages/AccessDenied";
import CustomerLayout from "./layouts/CustomerLayout";
import AddressDetail from "./features/order/bookingOrder/addressdetail/AddressDetail";
import Payment from "./features/payment/Payment";

import { jwtDecode } from "jwt-decode";
import ShippingOptions from "./features/shipping/ShippingOptions";

export default function App() {
  const colorMode = useStore((state) => state.colorMode);
  const setUserId = useStore((state) => state.setUserId);
  const userInfo = useStore((state) => state.userInfo);
  const logout = useStore((state) => state.logout);

  const navigate = useNavigate();
  const darkTheme = createTheme({
    palette: {
      mode: colorMode,
    },
  });

  useEffect(() => {
    const token = Cookies.get("token");
    // console.log("token", token);

    if (!token) {
      logout();
      return;
    }

    const decoded = jwtDecode(token);
    const role = decoded.Role;
    console.log("Role App:", role);
    if (role == "Manager" && window.location.pathname == "/") {
      navigate("/manager");
    } else if (role == "Customer" && window.location.pathname == "/") {
      navigate("/");
    }

    setUserId(role);
  }, [navigate]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<EmptyLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="service" element={<Service />} />
          <Route path="getestimate" element={<GetEstimate />} />
        </Route>

        <Route
          path="/"
          element={
            <ProtectedRoute element={<CustomerLayout />} roles={["Customer"]} />
          }
        >
          <Route index element={<BookingOrder />} />
          <Route path="shippingoptions" element={<ShippingOptions />} />
          <Route path="addressdetail" element={<AddressDetail />} />
          <Route path="payment/:id" element={<Payment />} />
        </Route>

        <Route
          path="/manager"
          element={
            <ProtectedRoute element={<ManagerLayout />} roles={["Manager"]} />
          }
        >
          <Route index element={<AccountManagement />} />
          <Route path="manager" element={<AccountManagement />} />
          <Route path="manager-staff" element={<AccountManagement />} />
          <Route path="manager-customer" element={<AccountManagement />} />
          <Route
            path="manage-pending-requests"
            element={<AccountManagement />}
          />
          <Route
            path="manage-accept-requests"
            element={<AccountManagement />}
          />
          <Route
            path="manage-reject-requests"
            element={<AccountManagement />}
          />
        </Route>
        <Route
          path="/staff"
          element={
            <ProtectedRoute element={<ManagerLayout />} roles={["Staff"]} />
          }
        >
          <Route index element={<AccountManagement />} />
          <Route path="manager" element={<AccountManagement />} />
          <Route path="manager-staff" element={<AccountManagement />} />
          <Route path="manager-customer" element={<AccountManagement />} />
          <Route
            path="manage-pending-requests"
            element={<AccountManagement />}
          />
          <Route
            path="manage-accept-requests"
            element={<AccountManagement />}
          />
          <Route
            path="manage-reject-requests"
            element={<AccountManagement />}
          />
        </Route>
        <Route path="/access-denied" element={<AccessDenied />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
}
