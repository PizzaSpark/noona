import React from "react";
import NavBar from "../components/NavBar";
import { Card, CardContent, Divider, Typography } from "@mui/material";
import { Email, Home, LocalCafe, Phone, StarRate } from "@mui/icons-material";

export default function About() {
    return (
        <div className="page-container">
            <NavBar />

            <div className="content">
                <h1>ABOUT US</h1>

                <div className="info">
                    <div className="info-tile">
                        <Typography variant="h3" component="h2">
                            Category
                        </Typography>
                        <Typography className="info-tile-sub">
                            <LocalCafe /> Coffee shop
                        </Typography>
                    </div>
                    <Divider />
                    <div className="info-tile">
                        <Typography variant="h3" component="h2">
                            Contact info
                        </Typography>
                        <Typography variant="h5" component="h2">
                            Address
                        </Typography>
                        <Typography className="info-tile-sub">
                            <Home /> Burgos St., Brgy. Quezon , Solano,
                            Philippines, 3709
                        </Typography>
                        <Typography variant="h5" component="h2">
                            Mobile
                        </Typography>
                        <Typography className="info-tile-sub">
                            <Phone /> 0926 200 1353
                        </Typography>
                        <Typography variant="h5" component="h2">
                            Email
                        </Typography>
                        <Typography className="info-tile-sub">
                            <Email /> ofcl.hinoonacafe@gmail.com
                        </Typography>
                    </div>
                    <Divider />
                    <div className="info-tile">
                        <Typography variant="h3">Basic info</Typography>
                        <Typography variant="h5" component="h2">
                            Rating
                        </Typography>
                        <Typography className="info-tile-sub">
                            <StarRate style={{ color: "yellow" }} /> 5.0 (14
                            Reviews)
                        </Typography>
                    </div>
                </div>
            </div>
        </div>
    );
}
