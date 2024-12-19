import { Grid } from "@mui/material";
import Header from "../features/common/Header/Header";
import Footer from "../features/common/Footer/Footer";
import { Outlet } from "react-router-dom";

export default function HomeLayout() {
    return (
        <Grid container>
            <Grid item xs={12}>
                <Header />
            </Grid>
            <Grid item xs={12}>
                <Outlet />
            </Grid>
            <Grid item xs={12}>
                <Footer />
            </Grid>
        </Grid>
    );
}