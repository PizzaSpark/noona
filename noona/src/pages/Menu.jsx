import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import "../styles/Menu.css";
import {
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Divider,
    Typography,
} from "@mui/material";

export default function Menu() {
    const initialData = {
        name: "",
        description: "",
        image: "",
        price: "",
        disabled: false,
    };
    const [currentData, setCurrentData] = useState(initialData);
    const [dataList, setDataList] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        await getMenuList();
    };

    async function getMenuList() {
        axios
            .get(`http://localhost:1337/viewmenu`)
            .then((response) => {
                setDataList(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    return (
        <div className="page-container">
            <NavBar />

            <div className="content">
                <h1>MENU</h1>
                <div className="menu-list">
                    {dataList
                        .filter((menu) => !menu.disabled)
                        .map((menu, index) => (
                            <ProductCard key={index} menu={menu} />
                        ))}
                </div>
            </div>
        </div>
    );
}

function ProductCard({ menu }) {

    const imageUrl = `http://localhost:1337/uploads/${menu.image}`;

    return (
        <Card className="product-card">
            <CardHeader
                title={<div style={{ whiteSpace: 'nowrap' }}>{menu.name}</div>}
                subheader={`₱${menu.price}`}
            ></CardHeader>
            <CardMedia
                component="img"
                height="194"
                image={imageUrl}
                alt={menu.name}
            />
            <CardContent>
                <Typography
                    variant="body2"
                    component="div"
                    color="text.secondary"
                >
                    {menu.description}
                </Typography>
            </CardContent>
        </Card>
    );
}
