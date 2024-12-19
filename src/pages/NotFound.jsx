import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();
    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <Grid>
            <Typography variant="h1" color={"error"}>
                Page not found
            </Typography>
            <Button onClick={handleGoBack}>Go back</Button>
        </Grid>
    );
}