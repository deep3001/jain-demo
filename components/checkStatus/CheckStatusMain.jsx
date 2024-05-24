import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Pagination from "@/components/pagination/Pagination";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import ReplayIcon from "@mui/icons-material/Replay";
import {
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Card,
  CircularProgress,
  Paper,
  Divider,
  Select,
  MenuItem,
  InputLabel,
  Grid,
  Typography
} from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import IconButton from "@mui/material/IconButton";
import ReactButton from "../button/3dButton";

const CheckStatusMain = () => {
  const router = useRouter();
  const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
  const [partnerId, setPartnerId] = useState("");
  const [utr, setUtr] = useState("");
  const [payMode, setPayMode] = useState("payout");
  const [systemId, setSystemId]=useState("")
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");
  const [successMessage, setSuccessMessage] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false); // Initialize with false

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    // Initial check for small screen
    setIsSmallScreen(window.innerWidth < 768);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleCheckStatus = async () => {
    try {
        setLoading(true);
        const accessToken = localStorage.getItem("accessToken");
        const headers = { 
            authorization: accessToken 
        };
        const data = { 
            partner_id:partnerId,
            mode:payMode,
            utr:utr,
            system_id:systemId,
         };
        const response = await axios.post(`${BASEURL}/merchant/orderStatus`, data, {
          headers: headers,
        });
        
        console.log(response.data.responseData.data);
        setResponseData(response.data.responseData.data);
        setSuccessMessage("Success");
        setLoading(false);
      } catch (error) {
        setSnackbarMessage("No Data Found");
        setSnackbarType("error");
        setSnackbarOpen(true);
        console.error("Error searching data: ", error);
        setLoading(false);
      }
  };

  return (
    <section className="dashboard-section body-collapse transactions">
      <div className="overlay pt-120">
      <div className="container-fluid">
          <Paper elevation={2} style={{ padding: "20px", marginBottom: successMessage ? "100px" : "20px",minHeight: successMessage ? "200px" : "auto" }}>
            <h4 style={{ textAlign: "left", marginBottom: "15px" }}>
              Check Status
            </h4>
            <Divider style={{ marginTop: "-5px", marginBottom:"40px", height: "2px", backgroundColor: "#000" }}/>
          {/*  <div style={{ marginTop: "20px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <TextField
                  label="Partner ID"
                  variant="outlined"
                  value={partnerId}
                  onChange={(e) => setPartnerId(e.target.value)}
                  style={{ flex: 1, marginRight: "10px" }}
                  InputLabelProps={{
                    style: { marginTop: "-6px" }, // Adjust the marginTop as needed
                  }}
                />
                <Select
                label="Payment Mode"
                variant="outlined"
                value={payMode}
                onChange={(e) => setPayMode(e.target.value)}
                style={{ flex: 1, marginRight: "10px" }}
                MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
                inputProps={{ id: 'payment-mode' }}
              >
              {payMode === "payout" ? (
                <MenuItem disabled value="payout">
                  Pay Out
                </MenuItem>
              ) : (
                <MenuItem value="payout">Pay Out</MenuItem>
              )}
              <MenuItem value="payin">Pay In</MenuItem>
              </Select>
              <ReactButton
              handleCheckStatus={handleCheckStatus}
              label="Check Status"
              />
              </div>
            </div>*/}
            <div style={{ marginTop: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", flexDirection: isSmallScreen ? 'column' : 'row' }}>
              <TextField
                label="Partner ID"
                variant="outlined"
                value={partnerId}
                onChange={(e) => setPartnerId(e.target.value)}
                style={{ flex: 1,width: isSmallScreen ? "100%" : "10px" , marginRight: isSmallScreen ? "0" : "10px", marginBottom: isSmallScreen ? "10px" : "0" }}
                InputLabelProps={{
                  style: { marginTop: isSmallScreen ? "0" : "-6px" },
                }}
              />
              <TextField
                label="UTR"
                variant="outlined"
                value={utr}
                onChange={(e) => setUtr(e.target.value)}
                style={{ flex: 1,width: isSmallScreen ? "100%" : "10px" , marginRight: isSmallScreen ? "0" : "10px", marginBottom: isSmallScreen ? "10px" : "0" }}
                InputLabelProps={{
                  style: { marginTop: isSmallScreen ? "0" : "-6px" },
                }}
              />
              <TextField
                label="System ID"
                variant="outlined"
                value={systemId}
                onChange={(e) => setSystemId(e.target.value)}
                style={{ flex: 1,width: isSmallScreen ? "100%" : "10px" , marginRight: isSmallScreen ? "0" : "10px", marginBottom: isSmallScreen ? "10px" : "0" }}
                InputLabelProps={{
                  style: { marginTop: isSmallScreen ? "0" : "-6px" },
                }}
              />
              <Select
                label="Payment Mode"
                variant="outlined"
                value={payMode}
                onChange={(e) => setPayMode(e.target.value)}
                style={{ flex: 1,width: isSmallScreen ? "100%" : "10px" , marginRight: isSmallScreen ? "0" : "10px", marginBottom: isSmallScreen ? "20px" : "0" }}
                MenuProps={{ PaperProps: { style: { maxHeight: 300 } } }}
                inputProps={{ id: 'payment-mode' }}
              >
                {payMode === "payout" ? (
                  <MenuItem disabled value="payout">
                    Pay Out
                  </MenuItem>
                ) : (
                  <MenuItem value="payout">Pay Out</MenuItem>
                )}
                <MenuItem value="payin">Pay In</MenuItem>
              </Select>
              <ReactButton
                handleCheckStatus={handleCheckStatus}
                label="Check Status"
              />
            </div>
          </div>
          {/*  {successMessage && (
              <div className="container-fluid" style={{height:"50vh",transition: "height 5s ease-in-out"}}>
              <h4 style={{ textAlign: "left", marginTop: "20px" }}>
                Details 
              </h4>
              </div>
            )}*/}

            {successMessage && responseData && (
              <div style={{ marginTop: "20px" }}>
                <Typography variant="h5" style={{ marginBottom: "30px", fontWeight:"bold" }}>Details</Typography>
                <Grid container spacing={3}>
                  {Object.entries(responseData).map(([key, value]) => (
                    <React.Fragment key={key}>
                      <Grid item xs={6}>
                        <Typography variant="body1" style={{ fontWeight: "bold" }}>{key.charAt(0).toUpperCase() + key.slice(1)}</Typography>
                      </Grid>
                      <Grid item xs={6}>
            {key === 'creationDateTime' ? (
              <Typography variant="body1">{value ? new Date(value).toLocaleString() : 'N/A'}</Typography>
            ) : (
              <Typography variant="body1">{value}</Typography>
            )}
          </Grid>
                    </React.Fragment>
                  ))}
                </Grid>
              </div>
            )}
          </Paper>
        </div>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <SnackbarContent
          message={snackbarMessage}
          style={{
            backgroundColor: snackbarType === "success" ? "#4CAF50" : "#f44336",
          }}
        />
      </Snackbar>
    </section>
  );
};

export default CheckStatusMain;