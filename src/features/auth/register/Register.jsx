import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import {
  OutlinedInput,
  Button,
  Grid,
  Box,
  Typography,
  InputAdornment,
  IconButton,
  FormControl,
  FormHelperText,
  CircularProgress,
  InputLabel,
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

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
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

  // Formik for form handling
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      role: 0, // Default role
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // Pass the request body directly
        const response = await postRegister(values);
        toast.success("Account created successfully! Please check your email.");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error) {
        // Handle API errors
        if (error.response) {
          if (error.response.status === 400) {
            toast.error("Username or Email already exists!");
          } else if (error.response.status === 500) {
            toast.error("Server error! Please try again later.");
          }
        } else {
          toast.error("An unexpected error occurred.");
        }
      }
    },
  });

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <>
      <ToastContainer />
      <Box className="register-container" sx={{ p: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Register User
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            {/* First Name */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor="firstName">First Name</InputLabel>
                <OutlinedInput
                  id="firstName"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                />
                <FormHelperText error>
                  {formik.touched.firstName && formik.errors.firstName}
                </FormHelperText>
              </FormControl>
            </Grid>

            {/* Last Name */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel htmlFor="lastName">Last Name</InputLabel>
                <OutlinedInput
                  id="lastName"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                />
                <FormHelperText error>
                  {formik.touched.lastName && formik.errors.lastName}
                </FormHelperText>
              </FormControl>
            </Grid>

            {/* Email */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="email">Email</InputLabel>
                <OutlinedInput
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                />
                <FormHelperText error>
                  {formik.touched.email && formik.errors.email}
                </FormHelperText>
              </FormControl>
            </Grid>

            {/* Password */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={togglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText error>
                  {formik.touched.password && formik.errors.password}
                </FormHelperText>
              </FormControl>
            </Grid>

            {/* Confirm Password */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="confirmPassword">
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.confirmPassword &&
                    Boolean(formik.errors.confirmPassword)
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={toggleConfirmPasswordVisibility}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText error>
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword}
                </FormHelperText>
              </FormControl>
            </Grid>

            {/* Phone Number */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="phoneNumber">Phone Number</InputLabel>
                <OutlinedInput
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.phoneNumber &&
                    Boolean(formik.errors.phoneNumber)
                  }
                />
                <FormHelperText error>
                  {formik.touched.phoneNumber && formik.errors.phoneNumber}
                </FormHelperText>
              </FormControl>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isLoading}
              >
                {isLoading ? <CircularProgress size={24} /> : "Register"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
}
