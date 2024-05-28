import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { Delete, Description, Edit, Visibility,
    VisibilityOff, } from "@mui/icons-material";

export default function ManageAdmins() {
    useCheckIfStaff();
    const initialData = {
        email: "",
        password: "",
    };
    const [currentData, setCurrentData] = useState(initialData);
    const [dataList, setDataList] = useState([]);
    const [refreshDataList, setRefreshDataList] = useState(false);

    const [search, setSearch] = useState("");
    const [filterSearch, setFilterSearch] = useState("");

    const [modalState, setModalState] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const [stored_user_id, setStored_user_id] = useState(
        localStorage.getItem("isAdmin")
    );

    useEffect(() => {
        fetchData();
    }, [refreshDataList]);

    const fetchData = async () => {
        await getAdminList();
    };
    async function getAdminList() {
        axios
            .get(`http://localhost:1337/viewadmins`)
            .then((response) => {
                setDataList(response.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    const handleAddData = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:1337/addadmin",
                currentData
            );

            const result = await response.data;

            if (result.success) {
                setRefreshDataList(!refreshDataList);
                setModalState(false);
            }
            alert(result.message);
        } catch (error) {
            console.error("Error adding data:", error);
            alert("An error occured. Please try again.");
        }
    };

    const handleUpdateData = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:1337/updateadmin",
                currentData
            );

            const result = response.data;

            if (result.success) {
                alert(result.message);
                setRefreshDataList(!refreshDataList);
                setModalState(false);
            } else {
                alert("Failed to update data. Please try again!.");
            }
        } catch (error) {
            console.error("Error updating data:", error);
            alert("An error occured. Please try again.");
        }
    };

    const handleDeleteData = async (data) => {    
        const confirmDelete = window.confirm("Are you sure you want to delete this admin?");
    
        if (!confirmDelete) {
            return;
        }
    
        try {
            console.log(data);
            const response = await axios.delete(
                "http://localhost:1337/deleteadmin",
                { data: data }
            );
    
            const result = response.data;
            if (result.success) {
                alert(result.message);
                setRefreshDataList(!refreshDataList);
                setModalState(false);
            } else {
                alert("Failed to delete data. Please try again!.");
            }
        } catch (error) {
            console.error("Error updating data:", error);
            alert("An error occured. Please try again.");
        }
    };

    const handleChange = (e) => {
        setCurrentData({
            ...currentData,
            [e.target.name || e.target.id]: e.target.value,
        });
    };

    const openModal = (dataTile, isEdit = false) => {
        setCurrentData(dataTile);
        setIsEditMode(isEdit);
        setModalState(true);
    };

    const closeModal = () => {
        setShowPassword(false);
        setModalState(false);
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    //MARK: FRONT
    return (
        <div className="page">
            <Sidebar />
            <div className="page-content">
                <h1>Manage Admins</h1>

                <div className="column-gap">
                    <div className="search-filter">
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
                        ADD ADMIN
                    </Button>
                </div>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Email</TableCell>
                                <TableCell>Edit</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {dataList
                                .filter((data) => {
                                    if (!search) return true;
                                    return (
                                        data.email &&
                                        String(data.email)
                                            .toLowerCase()
                                            .includes(search.toLowerCase())
                                    );
                                })
                                .map((data) => (
                                    <TableRow key={data.email}>
                                        <TableCell>{data.email}</TableCell>
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
                                    id="email"
                                    required
                                    label="Email"
                                    value={currentData.email}
                                    onChange={handleChange}
                                    disabled={isEditMode}
                                />

<TextField
                                    variant="outlined"
                                    id="password"
                                    required
                                    label="Password"
                                    type={showPassword ? "text" : "password"}
                                    value={currentData.password}
                                    onChange={handleChange}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={
                                                        handleTogglePasswordVisibility
                                                    }
                                                >
                                                    {showPassword ? (
                                                        <Visibility />
                                                    ) : (
                                                        <VisibilityOff />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
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
