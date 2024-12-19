import { NavLink, useNavigate } from "react-router-dom";
import useStore from "../../../app/store";
import { useState } from "react";

import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

import Cookies from "js-cookie";
import './Login.css';

export default function Login() {
  const postLogin = useStore((state) => state.postLogin);
  const getProfile = useStore((state) => state.getProfile);
  const setUserId = useStore((state) => state.setUserId);
  const isDriverLogin = useStore((state) => state.isDriverLogin);
  const setIsDriverLogin = useStore((state) => state.setIsDriverLogin);

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberme: false,
  });

  const [message, setMessage] = useState(""); 
  
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password, rememberme } = formData;

    if (!email || !password) {
      toast.error("Please enter your email and password");
      return;
    }

    await postLogin({ userEmail: email, password }, isDriverLogin, navigate);
    
    const userInfo = useStore.getState().userInfo;

    if (!userInfo || !userInfo.result) {
        toast.error("Login failed: Token not found!!!");
        return;
    }
    
    const auth = useStore.getState().auth;

    if (auth) {
      const token = userInfo.result;
      console.log(token);
      const decoded = jwtDecode(token);
      setUserId(decoded.UserId);
      const role = decoded.Role;
      console.log("Role Login: ", role);

      const expireDate = new Date(decoded.exp * 1000);
      console.log("expireDate", expireDate.toUTCString());

      if (rememberme) {
        Cookies.set("token", userInfo.result, {
          expires: expireDate,
        });
      } else {
        Cookies.set("token", userInfo.result);
      }

      if (decoded.Role === "Customer") {
        navigate("/", { replace: true });
      } else if (decoded.Role === "Manager") {
        navigate("/manager", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  };

  return (
    <div className="login-container">
      <h2>{isDriverLogin ? 'Login for Driver' : 'Login Page'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="login">Login</button>
        <button
          type="button"
          className="switch-role-button"
          onClick={() => setIsDriverLogin(!isDriverLogin)}
        >
          {isDriverLogin ? 'Switch to Customer Login' : 'Switch to Driver Login'}
        </button>
      </form>
      {message && <div className="message-box">{message}</div>}
      {!isDriverLogin && (
        <p>
          Don’t have an account?{' '}
          <a href="/register" className="register-link-text">
            Register here
          </a>
        </p>
      )}
      <button 
      type="button" 
      className="back-button" 
      onClick={() => navigate("/")}
    >
      Back
    </button>
    </div>
  );
}
