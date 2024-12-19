
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import useStore from "../../../app/store";
import "./Login.css"; // Import CSS global

export default function Login() {
  const postLogin = useStore((state) => state.postLogin);
  const setUserId = useStore((state) => state.setUserId);
  const isDriverLogin = useStore((state) => state.isDriverLogin);
  const setIsDriverLogin = useStore((state) => state.setIsDriverLogin);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberme: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
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
      toast.error("Login failed: Token not found!");
      return;
    }

    const token = userInfo.result;
    const decoded = jwtDecode(token);
    setUserId(decoded.UserId);

    const expireDate = new Date(decoded.exp * 1000);
    if (rememberme) {
      Cookies.set("token", userInfo.result, { expires: expireDate });
    } else {
      Cookies.set("token", userInfo.result);
    }

    const role = decoded.Role;
    if (role === "Customer") navigate("/", { replace: true });
    else if (role === "Manager") navigate("/manager", { replace: true });
    else if (role === "SalesStaff") navigate("/staff", { replace: true });
    else navigate("/", { replace: true });
  };


  return (
    <div className="login-container">
      <h2 className="login-title">
        {isDriverLogin ? "Login for Driver" : "Login Page"}
      </h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="login-input"
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="login-input"
          required
        />
        <button type="submit" className="login-button-primary">
          Login
        </button>
        <button
          type="button"
          className="login-button-secondary"
          onClick={() => setIsDriverLogin(!isDriverLogin)}
        >
          {isDriverLogin ? "Switch To Customer Login" : "Switch To Driver Login"}
        </button>
      </form>
      {!isDriverLogin && (
        <p className="login-text">
          Don’t have an account?{" "}
          <a href="/register" className="login-link">
            Register here
          </a>
        </p>
      )}
      <button
        type="button"
        className="login-button-back"
        onClick={() => navigate("/")}
      >
        Back To Home Page
      </button>
    </div>
  );
}