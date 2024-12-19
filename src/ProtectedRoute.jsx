import { Navigate } from "react-router-dom";
import useStore from "./app/store";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ roles, element }) => {
  const auth = useStore((state) => state.auth);

  const token = Cookies.get("token");
  if (!token) {
    console.error("Token not found. Redirecting to login...");
    return <Navigate to="/login" />;
  }

  let decoded;
  try {
    decoded = jwtDecode(token);
  } catch (error) {
    console.error("Invalid token:", error.message);
    return <Navigate to="/login" />;
  }
  
  const role = decoded.Role;
  console.log("User Role Protected:", role);

  if (!auth) {
    return <Navigate to="/login" />;
  }

  if (!roles.includes(role)) {
    return <Navigate to="/access-denied" />;
  }

  return element;
};

export default ProtectedRoute;

ProtectedRoute.prototype = {
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  element: PropTypes.node.isRequired,
};
