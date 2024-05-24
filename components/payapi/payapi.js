import React, { useEffect, useState } from "react";
import { Box, Button, Card, TextField, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Grid, CardHeader, CircularProgress, Snackbar, IconButton } from "@mui/material";
import {
    getPayApiDetails,
} from "@/components/Apis/Api";

import { useRouter } from "next/router";
import axios from "axios";
import MuiAlert from "@mui/material/Alert";

import Modal from "react-modal";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Payapi = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [apiRes, setApiRes] = useState([]);
    const [formData, setFormData] = useState({
        label: "",
        callbackUrl: "",
        webhookUrl: "",
        ipAddress: "",
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const handleSnackbarClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setSnackbarOpen(false);
    };

    const handleSnackbar = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const getApiData = async () => {
        try {
            setLoading(true);
            const response = await getPayApiDetails();

            setApiRes(response.data.data.rows);
        } catch (error) {
            console.log("error", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {


        getApiData();
    }, []);

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
            router.push("/login");
        }
    }, [router]);

    const statusOfTrasaction = (code) => {
        if (code === 1) {
            return (
                <>
                    <p className="completed">Success</p>
                </>
            );
        } else if (code === 2) {
            return (
                <>
                    <p className="inprogress">Pending</p>
                </>
            );
        } else if (code === 3) {
            return (
                <>
                    <p className="cancelled">Failed</p>
                </>
            );
        }
    };

    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalIsOpenOut, setIsOpenOut] = useState(false);
  
    const [rowDataModal, setRowDataModal] = useState({});
    const [apikeyData, setApikeyData] = useState("");
    const [errOpenTras, setErrOpenTras] = useState(false);
    const [errSuccessMessageTras, setErrSuccessMessageTras] = useState("");
    const [loadingTras, setLoadingTras] = useState(true);
    const [apiResTras, setApiResTras] = useState({});
  
    console.log(apiResTras, "apiResTras");
  
    ///https://merchant.sharkpe.in/payapi   post
    ///merchant/api/    get

    // const [apiResTras, setApiResTras] = useState({});

    async function openModal(data) {
        setIsOpen(true);
        try {
            const token = localStorage.getItem("accessToken");
            console.log(token, "token");
            const headers = { Authorization: token };
            const response = await axios.get(
                `${BASE_URL}/merchant/api/${data.id}`,
                {
                    headers: headers,
                }
            );
            console.log(response.data.data.api_key, "responsehhhhhh");
            setRowDataModal(response.data.data.api_key);
            setApikeyData(response.data.data.api_key);
      
            setResSuccessMessage(response.data.message);

        } catch (error) {
            // toast.error("your key is not disabled ...");
            console.log(error);
        } finally {
            setOpenAlert(false);
        }
    }

    function closeModal() {
        setIsOpen(false);
        setIsOpenOut(false);
      }
      console.log(apikeyData, "apikeyData");
      const customStyles = {
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
        },
      };
      function convertToLocalFormat(dateTimeString) {
        // Assuming the input string is in the format "YYYYMMDDHHmmss"
        const year = dateTimeString?.slice(0, 4);
        const month = dateTimeString?.slice(4, 6) - 1; // Months are 0-based in JavaScript (0 = January)
        const day = dateTimeString?.slice(6, 8);
        const hours = dateTimeString?.slice(8, 10);
        const minutes = dateTimeString?.slice(10, 12);
        const seconds = dateTimeString?.slice(12, 14);
    
        const localDate = new Date(year, month, day, hours, minutes, seconds);
    
        // Format the local date and time
        const options = {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        };
        const localFormat = localDate.toLocaleDateString(undefined, options);
    
        return localFormat || "00";
      }
      const [openAlert, setOpenAlert] = useState(false);
      const [resSuccessMessage, setResSuccessMessage] = useState("");
      console.log(apiResTras?.message)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            !formData.label ||
            !formData.callbackUrl ||
            !formData.webhookUrl ||
            !formData.ipAddress
        ) {
            handleSnackbar("All fields are required", "error");
            return;
        }

        console.log("Label:", formData.label);
        console.log("Callback URL:", formData.callbackUrl);
        console.log("Webhook URL:", formData.webhookUrl);
        console.log("IP Address:", formData.ipAddress);
        try {
            const token = localStorage.getItem("accessToken");
            const headers = { Authorization: token };
            const response = await axios.post(
                `${BASE_URL}/merchant/api/`,
                {
                    callback_url: formData.callbackUrl,
                    ip_address: formData.ipAddress,
                    label: formData.label,
                    webhook_url: formData.webhookUrl,
                },
                {
                    headers: headers,
                }
            );
            handleSnackbar(response.data.message, "success");


            window.location.reload();

        } catch (error) {
            handleSnackbar("An error occurred", "error");
            console.log(error);
        } finally {
        setOpenAlert(false);
      } 
    };

    const update = async (row) => {
        try {
            const token = localStorage.getItem("accessToken");
            const headers = { Authorization: token };
            const response = await axios.post(
                `${BASE_URL}/merchant/api/update`,
                {
                    id: row?.id,
                    status: 0,
                },
                {
                    headers: headers,
                }
            );
            console.log(response, "ffffff")
            //  window.location.href = "";
            getApiData()
        } catch (error) {
            alert("your key is not disabled ...");
            console.log(error);
        }
    };

    return (
        <>
        <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Transaction Status"
        >
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <Box display={"flex"} justifyContent={"right"}>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={closeModal}
                      ></button>
                    </Box>
                    <Box display={"flex"} justifyContent={"center"}>
                      {" "}
                    </Box>
                    <div className="main-content">
                      <div className="row">
                        <Box>
                          <form>
                            <div className="row justify-content-center">
                              <div className="">
                                <div className="single-input">
                                  <label htmlFor="fName1">
                                    API Key : {apikeyData}
                                  </label>
                                </div>
                              </div>
                              <Box mt={1}></Box>
                            </div>
                          </form>
                        </Box>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>

        <section className="dashboard-section body-collapse transactions">
            <div className="overlay pt-120">
            <div className="head-area d-flex align-items-center justify-content-between">
            <h4>Payment API</h4>
            </div>

                <Box mb={2}>
                    {apiRes.length === 0 ? (
                        <Card>
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={2} sx={{ p: 2 }}>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            label="Label"
                                            variant="outlined"
                                            fullWidth
                                            required
                                            id="fName1"
                                            name="label"
                                            value={formData.label}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    label: e.target.value,
                                                })
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            label="Callback URL"
                                            variant="outlined"
                                            fullWidth
                                            required
                                            id="lName1"
                                            name="callbackUrl"
                                            value={formData.callbackUrl}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    callbackUrl: e.target.value,
                                                })
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            label="Webhook URL"
                                            variant="outlined"
                                            fullWidth
                                            required
                                            id="email1"
                                            name="webhookUrl"
                                            value={formData.webhookUrl}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    webhookUrl: e.target.value,
                                                })
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            label="IP Address"
                                            variant="outlined"
                                            fullWidth
                                            required
                                            id="phone1"
                                            name="ipAddress"
                                            value={formData.ipAddress}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    ipAddress: e.target.value,
                                                })
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box
                                            display="flex"
                                            justifyContent="center"
                                            height={70}
                                            alignItems="center"
                                        >
                                            <Button variant="contained" className="cmn-btn" type="submit">
                                                Submit
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </form>
                        </Card>
                    ) : null}
                </Box>

                <div className="row">
                    <div className="col-xl-12">
                        <div className="transactions-main">
                            <Card>
                                <TableContainer style={{ padding: 2 }}>
                                    {loading ? (
                                        <Box
                                            display="flex"
                                            justifyContent="center"
                                            alignItems="center"
                                            height={550}
                                        >
                                            <CircularProgress />
                                        </Box>
                                    ) : (
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>ID</TableCell>
                                                    <TableCell>User ID</TableCell>
                                                    <TableCell>Label</TableCell>
                                                    <TableCell>IP Address</TableCell>
                                                    <TableCell>Callback URL</TableCell>
                                                    <TableCell>Webhook URL</TableCell>
                                                    <TableCell>Status</TableCell>
                                                    <TableCell>Created At</TableCell>
                                                    <TableCell>Updated At</TableCell>
                                                    <TableCell>Action</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {apiRes?.map((val, ind) => (
                                                    <TableRow key={ind} onClick={() => openModal(val)}>
                                                        <TableCell>{val?.id}</TableCell>
                                                        <TableCell>{val?.user_id}</TableCell>
                                                        <TableCell>{val?.label}</TableCell>
                                                        <TableCell>{val?.ip_address}</TableCell>
                                                        <TableCell>{val?.callback_url || '-'}</TableCell>
                                                        <TableCell>{val?.webhook_url || '-'}</TableCell>
                                                        <TableCell>
                                                            {statusOfTrasaction(val?.status)}
                                                        </TableCell>
                                                        <TableCell>{val?.createdAt}</TableCell>
                                                        <TableCell>{val?.updatedAt}</TableCell>
                                                        <TableCell onClick={() => update(val)}>
                                                            <Button variant="contained">Disable</Button>
                                                        </TableCell>
                                                    </TableRow>

                                                ))}
                                            </TableBody>
                                        </Table>
                                    )}
                                </TableContainer>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
            <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              onClose={handleSnackbarClose}
              severity={snackbarSeverity}
            >
              {snackbarMessage}
            </MuiAlert>
          </Snackbar>
        </section>
        </>
    );
};

export default Payapi;