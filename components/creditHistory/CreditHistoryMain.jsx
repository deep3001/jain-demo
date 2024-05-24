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
} from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import IconButton from "@mui/material/IconButton";

const CreditHistoryMain = () => {
  const router = useRouter();
  const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
  const [creditHistoryMain, setCreditHistoryMain] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [count, setCount] = useState(20);
  const [search, setSearch] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");

  const fetchData = async () => {
    try {
      const { p } = router.query;
      const currentPage = p ? parseInt(p) : 1;
      setPage(currentPage);

      const accessToken = localStorage.getItem("accessToken");
      console.log(accessToken);
      const headers = { authorization: accessToken };

      setLoading(true);
      const response = await axios.get(
        `${BASEURL}/merchant/creditHistory/${currentPage}/${count}`,
        { headers: headers }
      );

      console.log(response.data);
      setCreditHistoryMain(response.data.history);
      setTotalPages(Math.ceil(response.data.rows / count));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const accessToken = window.localStorage.getItem("accessToken");
      const headers = { authorization: accessToken };
      const data = { keyword: search.toString(), category: "credit_history" };
      const response = await axios.post(`${BASEURL}/admin/search_all`, data, {
        headers: headers,
      });

      setCreditHistoryMain(response.data.data);
      setTotalPages(Math.ceil(response.data.rows / count));
      setLoading(false);
    } catch (error) {
      setSnackbarMessage("No Data Found");
      setSnackbarType("error");
      setSnackbarOpen(true);
      console.error("Error searching data: ", error);
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSnackbarOpen = (message, type) => {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setSnackbarOpen(true);
  };

  return (
    <section className="dashboard-section body-collapse transactions">
      <div className="overlay pt-120">
        <div className="container-fruid">
          <div className="head-area">
            <div className="row">
              <div className="col-lg-5 col-md-4">
                <h4>Credit History</h4>
              </div>
              <div className="col-lg-7 col-md-8">
                <div
                  className="transactions-right d-flex align-items-center"
                  style={{ justifyContent: "flex-end" }}
                >
                  <div className="form-group d-flex align-items-center">
                    <TextField
                      type="text"
                      label="Type to search..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSearch}
                      sx={{ ml: 1, height: "54px" }}
                    >
                      Search
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <TabContext value="1">
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList aria-label="lab API tabs example">
                <Tab label="History" value="1" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <div className="row">
                <div className="col-xl-12">
                  <div className="transactions-main">
                    <div className="top-items">
                      <h6>Credit History</h6>
                      <div className="export-area">
                        <Box
                          alignSelf={"flex-end"}
                          style={{ cursor: "pointer" }}
                        >
                          <Box onClick={() => fetchData()}>
                            <ReplayIcon />
                          </Box>
                        </Box>
                      </div>
                    </div>

                    <div className="table-responsive">
                      {loading ? (
                        <div>Loading...</div>
                      ) : (
                        <table className="table">
                          <thead>
                            <tr>
                              <th>Transaction ID</th>
                              <th>User ID</th>
                              <th>Amount</th>
                              <th>Charges</th>
                              <th>Mode</th>
                              <th>Status</th>
                              <th>Source</th>
                              <th>Partner Trans ID</th>
                              <th>Vendor Trans ID</th>
                              {/* Add more columns as per your data */}
                            </tr>
                          </thead>
                          <tbody>
                            {creditHistoryMain?.map((historyItem) => (
                              <tr key={historyItem.id}>
                                <td>{historyItem.id}</td>
                                <td>{historyItem.user_id}</td>
                                <td>{historyItem.amount}</td>
                                <td>{historyItem.charges}</td>
                                <td>{historyItem.mode}</td>
                                <td>{historyItem.status}</td>
                                <td>{historyItem.source}</td>
                                <td>{historyItem.partner_txn_id}</td>
                                <td>{historyItem.vendor_txn_id}</td>
                                {/* Render more columns as needed */}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>

                    <Pagination
                      currentPage={page}
                      totalPages={totalPages}
                      pageName="credit_history"
                    />
                  </div>
                </div>
              </div>
            </TabPanel>
          </TabContext>
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

export default CreditHistoryMain;
