import { Outlet, useNavigate } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import useStore from "../app/store";
export default function ManagerLayout() {
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
            Panel
          </Typography>
          <Button
            variant="outlined"
            onClick={() => navigate("/manager/manager-staff")}
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
            Staff Management
          </Button>

          <Button
            variant="outlined"
            onClick={() => navigate("/manager/manager-customer")}
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
            Customer Management
          </Button>

          <Button
            variant="outlined"
            onClick={() =>
              setShowConsignmentButton(!showConsignmentButton)
            }
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
            Consignment Management
          </Button>

          {showConsignmentButton && (
            <>
              <Button
                variant="contained"
                onClick={() => {console.log("Pending Requests");
                  navigate("/manager/manage-pending-requests")
                }}
                sx={{
                  marginBottom: 1,
                  backgroundColor: "#ffc107",
                  color: "#333",
                  "&:hover": {
                    backgroundColor: "#ffca28",
                  },
                  width: "100%",
                  borderRadius: "4px",
                  padding: "10px",
                  textTransform: "none",
                }}
              >
                View Pending Requests
              </Button>
              <Button
                variant="contained"
                onClick={() => {console.log("Accepted Requests")
                  navigate("/manager/manage-accept-requests");
                }}
                sx={{
                  marginBottom: 1,
                  backgroundColor: "#4caf50",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#66bb6a",
                  },
                  width: "100%",
                  borderRadius: "4px",
                  padding: "10px",
                  textTransform: "none",
                }}
              >
                View Accepted Requests
              </Button>
              <Button
                variant="contained"
                onClick={() => {console.log("Rejected Requests");
                  navigate("/manager/manage-reject-requests")
                }}
                sx={{
                  marginBottom: 1,
                  backgroundColor: "#f44336",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#e57373",
                  },
                  width: "100%",
                  borderRadius: "4px",
                  padding: "10px",
                  textTransform: "none",
                }}
              >
                View Rejected Requests
              </Button>

              <Button onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Grid>
        <Grid item lg={10} sm={12} sx={{ padding: 2 }}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
}
