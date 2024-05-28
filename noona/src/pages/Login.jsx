import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";
import {
    Card,
    CardContent,
    IconButton,
    InputAdornment,
    TextField,
    Button,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login() {
    //MARK: INIT
    const initialData = {
        email: "",
        password: "",
    };
    const [currentData, setCurrentData] = useState(initialData);

    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setCurrentData({
            ...currentData,
            [e.target.name || e.target.id]: e.target.value,
        });
    };

    useEffect(() => {
        const isAdmin = localStorage.getItem("isAdmin");

        if (isAdmin) {
            navigate("/managemenu");
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:1337/login",
                currentData
            );
            const result = response.data;
            if (result.success) {
                localStorage.setItem("isAdmin", true);
                navigate("/managemenu");
            }
            alert(result.message);
        } catch (error) {
            console.error("Error logging in:", error);
            alert("An error occured. Please try again.");
        }
    };

    const handleGoBack = async (e) => {
        navigate("/");
    };

    return (
        <div className="auth-page">
            <Card className="auth-card">
                <CardContent className="auth-card-content">
                    <h1>Login</h1>

                    <form onSubmit={handleLogin}>
                        <TextField
                            id="email"
                            label="Email"
                            value={currentData.email}
                            onChange={handleChange}
                            variant="outlined"
                        />

                        <TextField
                            id="password"
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            value={currentData.password}
                            onChange={handleChange}
                            variant="outlined"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        >
                                            {showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Button variant="contained" type="submit" style={{ backgroundColor: '#eddec3' }}>
                            SIGN IN
                        </Button>

                        <Button variant="contained" onClick={handleGoBack} style={{ backgroundColor: '#c76c39' }}>
                            GO BACK
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
