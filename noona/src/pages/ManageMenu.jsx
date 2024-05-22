import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ManageMenu.css";
import Sidebar from "../components/Sidebar";
import useCheckIfStaff from "../hooks/useCheckIfStaff";
import {
    Box,
    Button,
    Divider,
    FormControl,
    FormControlLabel,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from "@mui/material";
import { Delete, Description, Edit } from "@mui/icons-material";

export default function ManageMenu() {
    const initialData = {
        name: "",
        description: "",
        image: "",
        price: "",
        disabled: false,
    };
    const [currentData, setCurrentData] = useState(initialData);
    const [dataList, setDataList] = useState([]);
    const [refreshDataList, setRefreshDataList] = useState(false);

    const [search, setSearch] = useState("");
    const [filterSearch, setFilterSearch] = useState("");

    const [modalState, setModalState] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const [stored_user_id, setStored_user_id] = useState(
        localStorage.getItem("user_id")
    );
    // useCheckIfStaff();

    useEffect(() => {
        fetchData();
    }, [refreshDataList]);

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

    const handleAddData = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(currentData).forEach((key) => {
            formData.append(key, currentData[key]);
        });

        try {
            const response = await axios.post(
                "http://localhost:1337/addmenu",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            const result = await response.data;

            if (result.success) {
                setRefreshDataList(!refreshDataList);
                setModalState(false);
            }
            alert(result.message);
        } catch (error) {
            console.error("Error adding menu:", error);
            alert("An error occured. Please try again.");
        }
    };

    const handleUpdateData = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(currentData).forEach((key) => {
            formData.append(key, currentData[key]);
        });

        try {
            const response = await axios.post(
                "http://localhost:1337/updatemenu",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            const result = response.data;

            if (result.success) {
                alert(result.message);
                setRefreshDataList(!refreshDataList);
                setModalState(false);
            } else {
                alert("Failed to update menu. Please try again!.");
            }
        } catch (error) {
            console.error("Error updating menu:", error);
            alert("An error occured. Please try again.");
        }
    };

    const handleDeleteData = async (data) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this menu item?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            const response = await axios.delete(
                `http://localhost:1337/deletemenu`,
                { data: data }
            );

            const result = response.data;
            if (result.success) {
                alert(result.message);
                setRefreshDataList(!refreshDataList);
            } else {
                alert("Failed to delete menu. Please try again!.");
            }
        } catch (error) {
            console.error("Error deleting menu:", error);
            alert("An error occured. Please try again.");
        }
    };

    const openModal = (dataTile, isEdit = false) => {
        setCurrentData(dataTile);
        setIsEditMode(isEdit);
        setModalState(true);
    };

    const closeModal = () => {
        setModalState(false);
    };

    const handleChange = (e) => {
        setCurrentData({
            ...currentData,
            [e.target.name || e.target.id]: e.target.value,
        });
    };

    const handleSwitch = (e) => {
        setCurrentData({
            ...currentData,
            [e.target.name]: e.target.checked,
        });
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setCurrentData({
                ...currentData,
                image: e.target.files[0],
            });
        }
    };

    const handleFilterSearchChange = (event) => {
        setFilterSearch(event.target.value);
    };

    //MARK: FRONT
    return (
        <div className="page">
            <Sidebar />
            <div className="page-content">
                <h1>Manage Menu</h1>

                <div className="column-gap">
                    <div className="search-filter">
                        <FormControl sx={{ minWidth: 160 }}>
                            <InputLabel>Filter</InputLabel>
                            <Select
                                value={filterSearch}
                                label="Filter"
                                onChange={handleFilterSearchChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={"Name"}>Name</MenuItem>
                                <MenuItem value={"Description"}>
                                    Description
                                </MenuItem>
                                <MenuItem value={"Price"}>Price</MenuItem>
                                <MenuItem value={"Disabled"}>Disabled</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            variant="outlined"
                            id="id"
                            label="Search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            sx={{ flexGrow: 1 }}
                        />
                    </div>

                    <Button
                        className="tablebutton"
                        variant="contained"
                        onClick={() => openModal(initialData, false)}
                        style={{ backgroundColor: '#c76c39' }}
                    >
                        ADD MENU ITEM
                    </Button>
                </div>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Image</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Disabled</TableCell>
                                <TableCell>Edit</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {dataList
                                .filter((data) => {
                                    if (!search) return true;
                                    if (!filterSearch) {
                                        return (
                                            (data.name &&
                                                String(data.name)
                                                    .toLowerCase()
                                                    .includes(
                                                        search.toLowerCase()
                                                    )) ||
                                            (data.description &&
                                                data.description
                                                    .toLowerCase()
                                                    .includes(
                                                        search.toLowerCase()
                                                    )) ||
                                            (data.price &&
                                                String(data.price)
                                                    .toLowerCase()
                                                    .includes(
                                                        search.toLowerCase()
                                                    )) ||
                                            (data.disabled &&
                                                String(data.disabled)
                                                    .toLowerCase()
                                                    .includes(
                                                        search.toLowerCase()
                                                    ))
                                        );
                                    }
                                    if (filterSearch === "Name")
                                        return (
                                            data.name &&
                                            String(data.name)
                                                .toLowerCase()
                                                .includes(search.toLowerCase())
                                        );
                                    if (filterSearch === "Description")
                                        return (
                                            data.description &&
                                            data.description
                                                .toLowerCase()
                                                .includes(search.toLowerCase())
                                        );
                                    if (filterSearch === "Price")
                                        return (
                                            data.price &&
                                            String(data.price)
                                                .toLowerCase()
                                                .includes(search.toLowerCase())
                                        );
                                    if (filterSearch === "Disabled")
                                        return (
                                            data.disabled !== undefined &&
                                            (data.disabled
                                                ? "yes"
                                                : "no"
                                            ).includes(search.toLowerCase())
                                        );
                                    return false;
                                })
                                .map((data) => (
                                    <TableRow key={data.name}>
                                        <TableCell>{data.name}</TableCell>
                                        <TableCell>
                                            {data.description}
                                        </TableCell>
                                        <TableCell>{data.image}</TableCell>
                                        <TableCell>{data.price}</TableCell>
                                        <TableCell>
                                            {data.disabled ? "Yes" : "No"}
                                        </TableCell>
                                        <TableCell>
                                            <div className="buttongroup">
                                                <IconButton
                                                    onClick={() =>
                                                        openModal(data, true)
                                                    }
                                                >
                                                    <Edit className="actionicon" />
                                                </IconButton>
                                                <IconButton
                                                    onClick={() =>
                                                        handleDeleteData(data)
                                                    }
                                                >
                                                    <Delete className="actionicon" />
                                                </IconButton>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* //MARK: MODAL */}
                <Modal open={modalState} onClose={closeModal}>
                    <Box className="modal">
                        {currentData && (
                            <form
                                className="modalform"
                                onSubmit={
                                    isEditMode
                                        ? handleUpdateData
                                        : handleAddData
                                }
                            >
                                <TextField
                                    variant="outlined"
                                    id="name"
                                    required
                                    label="Name"
                                    value={currentData.name}
                                    onChange={handleChange}
                                    disabled={isEditMode}
                                />

                                <TextField
                                    variant="outlined"
                                    id="description"
                                    required
                                    label="Description"
                                    value={currentData.description}
                                    onChange={handleChange}
                                />

                                {isEditMode ? (
                                    <div>
                                        {typeof currentData.image ===
                                            "string" && (
                                            <img
                                                src={currentData.image}
                                                alt="Current"
                                                className="modal-image"
                                            />
                                        )}
                                        <TextField
                                            variant="outlined"
                                            id="image"
                                            label="Change Image"
                                            type="file"
                                            onChange={handleImageChange}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <TextField
                                        variant="outlined"
                                        id="image"
                                        required
                                        type="file"
                                        label="Image"
                                        onChange={handleImageChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                )}

                                <TextField
                                    variant="outlined"
                                    id="price"
                                    required
                                    type="number"
                                    label="Price"
                                    value={currentData.price}
                                    onChange={handleChange}
                                    inputProps={{ className: "hide-arrows" }}
                                />

                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={currentData.disabled}
                                            onChange={handleSwitch}
                                            name="disabled"
                                            inputProps={{
                                                "aria-label": "Disabled toggle",
                                            }}
                                        />
                                    }
                                    label="Disabled"
                                />

                                <Button
                                    className="tablebutton"
                                    variant="contained"
                                    type="submit"
                                >
                                    {isEditMode ? "UPDATE" : "ADD"}
                                </Button>
                            </form>
                        )}
                    </Box>
                </Modal>
            </div>
        </div>
    );
}
