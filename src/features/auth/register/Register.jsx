import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosClient from "../../../services/axiosClient";
import {
  API_REGISTER,
} from "../../../constant";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import useStore from "../../../app/store";

export default function Register() {
  const navigate = useNavigate();
  const postRegister = useStore((state) => state.postRegister);
  const isLoading = useStore((state) => state.isLoading);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Toggle visibility for password inputs
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  // Validation schema with Yup
  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required!"),
    lastName: Yup.string().required("Last Name is required!"),
    email: Yup.string()
      .email("Invalid Email Address!")
      .required("Email is required!")
      .matches(
        /^[a-zA-Z0-9._%+-]+@(gmail\.com|fpt\.edu\.vn)$/,
        "Email must be from gmail.com or fpt.edu.vn."
      ),
    password: Yup.string()
      .required("Password is required!")
      .min(6, "Password must be at least 6 characters long."),
    confirmPassword: Yup.string()
      .required("Confirm Password is required!")
      .oneOf([Yup.ref("password"), null], "Passwords must match."),
    phoneNumber: Yup.string()
      .required("Phone Number is required!")
      .matches(/^\d{10,11}$/, "Phone Number must be 10 or 11 digits."),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      role: 0,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // await postRegister(values);
        const { data } = await axiosClient.post(API_REGISTER, values);
        toast.success("Account created successfully! Please check your email.");
        setTimeout(() => navigate("/validate-email", { state: { userId: data.result } }), 2000);
      } catch (error) {
        console.log(error);
        if (error.response?.status === 400) {
          toast.error("Username or Email already exists!");
        } else if (error.response?.status === 500) {
          toast.error("Server error! Please try again later.");
        } else {
          toast.error("An unexpected error occurred.");
        }
      }
    },
  });

  return (
    <>
      <ToastContainer />
      <Box
        sx={{
          display: "box",
          justifyContent: "center",
          alignItems: "center",
          height: "100%", //thay đổi theo chiều dài của cái form
          maxWidth: 500,
          margin: "auto",
          marginTop: "80px",
          p: 4,
          boxShadow: 2,
          borderRadius: 2,
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Register Account
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            {/* First Name */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={formik.touched.firstName && !!formik.errors.firstName}>
                <InputLabel>First Name</InputLabel>
                <OutlinedInput
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="First Name"
                />
                <FormHelperText>{formik.touched.firstName && formik.errors.firstName}</FormHelperText>
              </FormControl>
            </Grid>

            {/* Last Name */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={formik.touched.lastName && !!formik.errors.lastName}>
                <InputLabel>Last Name</InputLabel>
                <OutlinedInput
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="Last Name"
                />
                <FormHelperText>{formik.touched.lastName && formik.errors.lastName}</FormHelperText>
              </FormControl>
            </Grid>

            {/* Email */}
            <Grid item xs={12}>
              <FormControl fullWidth error={formik.touched.email && !!formik.errors.email}>
                <InputLabel>Email</InputLabel>
                <OutlinedInput
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="Email"
                />
                <FormHelperText>{formik.touched.email && formik.errors.email}</FormHelperText>
              </FormControl>
            </Grid>

            {/* Password */}
            <Grid item xs={12}>
              <FormControl fullWidth error={formik.touched.password && !!formik.errors.password}>
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="Password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText>{formik.touched.password && formik.errors.password}</FormHelperText>
              </FormControl>
            </Grid>

            {/* Confirm Password */}
            <Grid item xs={12}>
              <FormControl
                fullWidth
                error={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
              >
                <InputLabel>Confirm Password</InputLabel>
                <OutlinedInput
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="Confirm Password"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={toggleConfirmPasswordVisibility} edge="end">
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText>
                  {formik.touched.confirmPassword && formik.errors.confirmPassword}
                </FormHelperText>
              </FormControl>
            </Grid>

            {/* Phone Number */}
            <Grid item xs={12}>
              <FormControl fullWidth error={formik.touched.phoneNumber && !!formik.errors.phoneNumber}>
                <InputLabel>Phone Number</InputLabel>
                <OutlinedInput
                  name="phoneNumber"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  label="Phone Number"
                />
                <FormHelperText>{formik.touched.phoneNumber && formik.errors.phoneNumber}</FormHelperText>
              </FormControl>
            </Grid>

            {/* Nút Back */}
            <Grid container spacing={2} sx={{ mt: 1, marginLeft: 1, marginRight: 1 }}>
              {/* Nút Back */}
              <Grid item xs={6}  >
                <Button
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  onClick={() => navigate("/home")}
                >
                  Back to Home
                </Button>
              </Grid>

              {/* Nút Submit */}
              <Grid item xs={6}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isLoading}
                >
                  {isLoading ? <CircularProgress size={24} /> : "Confirm Register"}
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" align="center" sx={{ mt: 2, fontSize: 17 }}>
                  You already have an account?{" "}
                  <span
                    style={{
                      color: "blue",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={() => navigate("/login")}
                  >
                    Login here.
                  </span>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
}