import { Grid } from "@mui/material";
import NavBar from "../features/common/NavBar";
import SearchAppBar from "../features/common/SearchAppBar";
import StickyFooter from "../features/common/Footer";
import { Outlet } from "react-router-dom";

export default function ConsignmentLayout() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <NavBar />
        <SearchAppBar />
      </Grid>
      <Grid item xs={12}>
        <Outlet />
      </Grid>
      <Grid item xs={12}>
        <StickyFooter />
      </Grid>
    </Grid>
  );
}
