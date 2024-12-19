import { Outlet } from "react-router-dom";
import { Grid2 } from "@mui/material";
import Header from "../features/common/Header/Header";

export default function EmptyLayout() {
  return (
    <Grid2 container>
      <Outlet />
    </Grid2>
  );
}
