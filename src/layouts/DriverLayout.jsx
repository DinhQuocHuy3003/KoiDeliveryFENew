import { Grid } from "@mui/material";
import HeadDriver from "../features/driver/headDriver/HeadDriver";
import { Outlet } from "react-router-dom";

export default function DriverLayout() {
    return (
        <>
            <HeadDriver />    
            <Grid>
                <Grid item lg={10} sm={12} sx={{ padding: 2 }}>
                    <Outlet />
                </Grid>
            </Grid>
        </>
    )
}