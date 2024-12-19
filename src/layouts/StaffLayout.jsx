import { useNavigate, Outlet } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import DashBar from "../features/staff/dashbar/DashBar";
import useStore from "../app/store";

export default function StaffLayout() {
  const navigate = useNavigate();
  const [showConsignmentButton, setShowConsignmentButton] = useState(false);
  const logout = useStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/");
  }
  
  return (
    <>
      <Grid container sx={{ height: "100vh" }}>
        <Grid
          item
          lg={2}
          sm={12}
          sx={{
            backgroundColor: "#f4f4f4",
            display: "flex",
            flexDirection: "column",
            padding: 2,
            height: "100vh",
            boxShadow: 3,
            borderRight: "1px solid #ddd",
          }}
        >
          <Typography
            variant="h5"
            sx={{ marginBottom: 3, textAlign: "center", color: "#333" }}
          >
            Welcome to Staff Page
          </Typography>
          <Button
            variant="outlined"
            onClick={() => navigate("/staff")}
            sx={{
              marginBottom: 2,
              color: "#333",
              "&:hover": {
                backgroundColor: "black",
                color: "white",
                borderColor: "#333",
              },
              width: "100%",
              borderRadius: "4px",
              padding: "10px",
              textTransform: "none",
            }}
          >
            Pending Order
          </Button>

          <Button
            variant="outlined"
            onClick={() => navigate("/staff/pendingpickuporder")}
            sx={{
              marginBottom: 2,
              color: "#333",
              borderColor: "#333",
              "&:hover": {
                backgroundColor: "black",
                color: "white",
                borderColor: "#333",
              },
              width: "100%",
              borderRadius: "4px",
              padding: "10px",
              textTransform: "none",
            }}
          >
            Pending Pick Up Order
          </Button>

          <Button
            variant="outlined"
            onClick={() => navigate("/staff/route")}
            sx={{
              marginBottom: 2,
              color: "#333",
              borderColor: "#333",
              "&:hover": {
                backgroundColor: "black",
                color: "white",
                borderColor: "#333",
              },
              width: "100%",
              borderRadius: "4px",
              padding: "10px",
              textTransform: "none",
            }}
          >
            Route Management
          </Button>

              <Button onClick={handleLogout} sx={{ marginTop: "auto" }}>
                Logout
              </Button>
        </Grid>
        <Grid item lg={10} sm={12} sx={{ padding: 2 }}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
}
