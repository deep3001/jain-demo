

import {
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  InputLabel,
  MenuItem,
  Snackbar,
  Select,
} from "@mui/material";
import { useState } from "react";
import * as XLSX from "xlsx";

import MuiAlert from "@mui/material/Alert";

import axios from "axios";

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

const Export = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [transactions, setTransactions] = useState([]);
  const [status, setStatus] = useState("all");
  const [transactionType, setTransactionType] = useState("payin");

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

  const handleDateInputChange = (e) => {
    // You can add custom logic to validate the date input if needed
    console.log("Date Input Changed: ", e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      "Selected Date Range: ",
      startDate.toDateString(),
      " - ",
      endDate.toDateString()
    );
    // Add any additional logic or actions here based on the selected date range
  };

  const exportToExcel = async (startDate, endDate) => {
    try {
      const formattedStartDate = startDate.toISOString().split("T")[0];
      const formattedEndDate = endDate.toISOString().split("T")[0];
      console.log(formattedStartDate, formattedEndDate);

      const accessToken = localStorage.getItem("accessToken");

      const headers = {
        authorization: accessToken,
      };

      const values = {
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        status: status,
        mode: transactionType,
      };

      console.log(values);

      const response = await axios.post(
        `${BASEURL}/merchant/transaction-export`,
        values,
        { headers: headers }
      );

      console.log(response.data.transactions);
      // console.log("in array",[response.data.transactions]);

      // Ensure response.data.transactions is an array
      if (!Array.isArray(response.data.transactions)) {
        console.error("Data is not in the correct format");
        return;
      }

      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(response.data.transactions);
      XLSX.utils.book_append_sheet(wb, ws, "Transactions");
      XLSX.writeFile(wb, "transactions.xlsx");
      handleSnackbar("Transactions exported to Excel successfully", "success");
    } catch (error) {
      handleSnackbar("Error exporting to Excel", "error");
      console.error("Error exporting to Excel:", error);
    }
  };

  return (
    <section className="dashboard-section body-collapse pay">
      <div className="overlay pt-120">
        <div className="container-fruid">
          <div className="main-content">
            <div className="head-area d-flex align-items-center justify-content-between">
              <h4>Export </h4>
            </div>
            <div className="row pb-120">
              <form onSubmit={handleSubmit}>
                <label htmlFor="startDate">Start Date:</label>
                <input
                  type="date"
                  id="startDate"
                  value={startDate.toISOString().split("T")[0]} // Format date as "YYYY-MM-DD"
                  onChange={(e) => setStartDate(new Date(e.target.value))}
                  onFocus={handleDateInputChange}
                />

                <label htmlFor="endDate">End Date:</label>
                <input
                  type="date"
                  id="endDate"
                  value={endDate.toISOString().split("T")[0]} // Format date as "YYYY-MM-DD"
                  onChange={(e) => setEndDate(new Date(e.target.value))}
                  onFocus={handleDateInputChange}
                />

                {/* Select field for transaction type */}
                <label htmlFor="transaction-type">Transaction Types:</label>
                <FormControl fullWidth>
                  {/* <InputLabel id="transaction-type-label">Transaction Type</InputLabel> */}
                  <Select
                    // labelId="transaction-type-label"
                    id="transaction-type"
                    value={transactionType}
                    // label="Transaction Type"
                    onChange={(e) => setTransactionType(e.target.value)}
                  >
                    <MenuItem value="payout">Pay Out</MenuItem>
                  </Select>
                </FormControl>

                {/* Radio buttons for status */}
                <RadioGroup
                  aria-label="status"
                  name="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {[
                    { label: "All", value: "all" },
                    { label: "Pending", value: "0" },
                    { label: "Success", value: "1" },
                    // { label: 'Rejected', value: '2' },
                    { label: "Failed", value: "3" },
                  ].map((s, i) => (
                    <FormControlLabel
                      key={i}
                      value={s.value}
                      control={<Radio />}
                      label={s.label.charAt(0).toUpperCase() + s.label.slice(1)}
                    />
                  ))}
                </RadioGroup>

                {/* Submit button */}
                <Box display={"flex"} flexWrap={"wrap"}>
                  <Box mr={2}>
                    <div style={{ marginTop: "10px" }} className="btn-border">
                      <button
                        className="cmn-btn"
                        onClick={() => exportToExcel(startDate, endDate)}
                      >
                        Download
                      </button>
                    </div>
                  </Box>
                  {/* <Box>
                    <div style={{ marginTop: "10px" }} className="btn-border">
                      <button className="cmn-btn">Pay Out</button>
                    </div>
                  </Box> */}
                </Box>
              </form>
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
  );
};

export default Export;
