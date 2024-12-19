import { Grid } from "@mui/material"
import Header from "../features/common/Header/Header"
import { Outlet } from "react-router-dom"
export default function CustomerLayout() {

    return (
        <>
        <Grid>
        <Header />
        </Grid>
        <Grid>
            <Outlet />
        </Grid>
        </>
    );
}