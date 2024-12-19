import { useNavigate, useParams } from "react-router-dom";
import useStore from "../app/store";
import { useEffect, useState } from "react";
import { borderRight, padding } from "@mui/system";
import { Button, Grid, Typography } from "@mui/material";

export default function ProfileLayout() {
  const navigate = useNavigate();
  const [isOwner, setIsOwner] = useState(true);
  const getProfile = useStore((state) => state.getProfile);
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      getProfile();
      setIsOwner(false);
    }
  }, []);

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
            sx={{
              marginBottom: 3,
              textAlign: "center",
              color: "#333",
              fontFamily: "fantasy",
            }}
          >
            PROFILE PANEL
          </Typography>

          <Button
            variant="outlined"
            onClick={() => {
              isOwner ? navigate("/profile") : navigate("/profile/");
            }}
            sx={{
              marginBottom: 3,
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
            Profile Information
          </Button>

          {isOwner && (
            <>
              <Button
                variant="outlined"
                onClick={() => navigate("/")}
                sx={{
                  marginBottom: 3,
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
                Your Request
              </Button>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
}
