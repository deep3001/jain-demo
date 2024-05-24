import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Card,
  CircularProgress,
  TextField,
  Button,
  Chip,
} from "@mui/material";
import {
  BASE_URL,
  getPayOUTData,
  getTrasactionStatus,
} from "@/components/Apis/Api";
import { useRouter } from "next/router";
import PaginationOut from "@/components/pagination/PaginationOut";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import Modal from "react-modal";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";
import transaction_details_icon from "/public/images/icon/transaction-details-icon.png";
import ErrorIcon from "@mui/icons-material/Error";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import ReplayIcon from "@mui/icons-material/Replay";
import PayoutDrawer from "@/components/drawer/PayoutDrawer";
import TransactionsFilters from "@/components/transactionFilters/TransactionsFilters";
import axios from "axios";

const Payout = () => {
  const router = useRouter();
  const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
  const [loadingout, setLoadingout] = useState(true);
  const [apiResout, setApiResout] = useState([]);
  const [payOutRowData, setPayOutRowData] = useState("");
  const [currentPageOUT, setCurrentPageOUT] = useState(1);

  const [loading, setLoading] = useState(true);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const handlePageChangeOut = (newPage) => {
    setCurrentPageOUT(newPage);
  };

  const [modalIsOpenOut, setIsOpenOut] = useState(false);
  const [apiResTras, setApiResTras] = useState({});
  const [loadingTras, setLoadingTras] = useState(true);

  const [search, setSearch] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");

  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const [errOpen, setErrOpen] = useState(false);
  const [errSuccessMessage, setErrSuccessMessage] = useState("");
  const [apiRes, setApiRes] = useState([]);
  const [rowData, setRowData] = useState(" ");
  const [transactionId, setTransactionId] = useState("");
  const [source, setSource] = useState("");
  const [vendorId, setVendorId] = useState("");

  const handleSnackbarOpen = (message, type) => {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setSnackbarOpen(true);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleFilterChange = (status) => {
    console.log(status);
    setFilter(status);
  };

  const getApiData = async (currentPage, filter) => {
    try {
      console.log("calling api");
      console.log("filter", filter);
      setLoadingout(true);
      const response = await getPayOUTData(currentPageOUT, filter);
      if (response.status === 200) {
        console.log("TRANSACTIONS FETCHED", response.data.data);
        setApiResout(response?.data?.data);
        setRowData(response?.data?.rows);
        setTimeout(() => {
          setErrOpen(false);
        }, 5000);
      } else {
        setErrOpen(true);
        setErrSuccessMessage(
          response.data.message || "Error: Something went wrong"
        );
      }
    } catch (error) {
      setErrOpen(true);
      setErrSuccessMessage(error?.response?.data?.message);
      setTimeout(() => {
        setErrOpen(false);
      }, 5000);
    } finally {
      setLoadingout(false);
    }
  };

  useEffect(() => {
    getApiData(currentPageOUT, filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPageOUT, filter]);

  const handleSearch = async (transactionId, source, vendorId,status) => {
    try {
      setLoading(true);
  
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        authorization: accessToken,
      };
  
      const data = {
        transaction_id: transactionId,
        user_id: null, // Provide appropriate user_id if available
        status: status, // Provide appropriate status if available
        source: source,
        vendor_id: vendorId,
        start_date: null, // Provide appropriate start_date if available
        end_date: null, // Provide appropriate end_date if available
      };
  
      console.log("calling api after search ");
      // return;
  
      const response = await axios.post(`${BASEURL}/merchant/filter`, data, {
        headers: headers,
      });
      const formattedTransactions = response.data.message.map((transaction) => ({
        ...transaction,
        createdAt: new Date(transaction.createdAt).toLocaleString(),
        updatedAt: new Date(transaction.updatedAt).toLocaleString(),
      }));
      setApiResout(formattedTransactions);
      setLoading(false);
    } catch (error) {
      // Handle errors
      handleSnackbarOpen("No Data Found", "error");
      console.error("Error searching data: ", error);
      setLoading(false);
    }
  };
  

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
    } else if (code === 0) {
      return (
        <>
          <p className="pending">Pending</p>
        </>
      );
    }
  };
  const [modalIsOpen, setIsOpen] = useState(false);

  const [rowDataModal, setRowDataModal] = useState({});
  const [errOpenTras, setErrOpenTras] = useState(false);
  const [errSuccessMessageTras, setErrSuccessMessageTras] = useState("");

  const [succesParsedRes, setsuccesParsedRes] = useState({});
  const [failedParsedRes, setFailedParsedRes] = useState({});

  const getTransactionDataAPI = async (data) => {
    try {
      setLoadingTras(true);
      const token = localStorage.getItem("accessToken");
      if (!token) {
        window.location.href = "/auth/login/modern"; // Redirect to login if token is not available
        return;
      }

      const headers = {
        Authorization: token,
      };

      const response = await axios.get(
        `${BASEURL}/merchant/bankdeatils/${data.id}`,
        {
          headers: headers,
        }
      );

      const resJson = response.data.data;
      console.log(resJson);

      if (data.status === 1) {
        console.log(resJson);
        setsuccesParsedRes(resJson);
      } else if (data.status === 3) {
      }
    } catch (error) {
      console.log(error, "Error Main");
    } finally {
      setLoadingTras(false);
    }
  };
  useEffect(() => {
    getTransactionDataAPI(); // This will be called when the component mounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRowClick = async (rowData) => {
    setSelectedRowData(rowData);
    await getTransactionDataAPI(rowData);
  };

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
    const year = dateTimeString?.slice(0, 4);
    const month = dateTimeString?.slice(4, 6) - 1; // Months are 0-based in JavaScript (0 = January)
    const day = dateTimeString?.slice(6, 8);
    const hours = dateTimeString?.slice(8, 10);
    const minutes = dateTimeString?.slice(10, 12);
    const seconds = dateTimeString?.slice(12, 14);

    const localDate = new Date(year, month, day, hours, minutes, seconds);
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
  function convertToIndianTime(utcDateString) {
    const utcDate = new Date(utcDateString);

    const offsetMinutes = 330;

    utcDate.setMinutes(utcDate.getMinutes() + offsetMinutes);

    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Kolkata",
    };

    return utcDate.toLocaleString("en-IN", options);
  }
  return (
    <>
      <Box>
        <section className="dashboard-section body-collapse transactions">
          <div className="overlay pt-120">
            <div className="container-fruid">
            <div className="container-fruid ml-3">
              {/*<div className="head-area">
              <div className="row">
              <div className="col-lg-3 col-md-4">
                <h4>Transactions</h4>
              </div>
              <div className="col-lg-4 col-md-4">
                <div className="filter-options">
                  <Chip
                    style={{ cursor: "pointer", marginRight: "10px" }}
                    label="All"
                    onClick={() => handleFilerChange(currentPage, "all")}
                  />
                  <Chip
                    style={{ cursor: "pointer", marginRight: "10px" }}
                    label="Pending"
                    onClick={() => handleFilerChange(currentPage, "pending")}
                  />
                  <Chip
                    style={{ cursor: "pointer", marginRight: "10px" }}
                    label="Success"
                    onClick={() => handleFilerChange(currentPage, "success")}
                  />
                  <Chip
                    style={{ cursor: "pointer", marginRight: "10px" }}
                    label="Failed"
                    onClick={() => handleFilerChange(currentPage, "failed")}
                  />
                </div>
              </div>
              <div className="col-lg-5 col-md-4">
                <div className="search-container">
                  <TextField
                    type="text"
                    label="Transaction ID"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    className="search-input"
                  />
                  <TextField
                    type="text"
                    label="Source"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    className="search-input"
                  />
                  <TextField
                    type="text"
                    label="Vendor ID"
                    value={vendorId}
                    onChange={(e) => setVendorId(e.target.value)}
                    className="search-input"
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSearch}
                    className="search-button"
                  >
                    Search
                  </Button>
                </div>
              </div>
            </div>
            
  </div>*/}
              <TransactionsFilters
                handleFilterChange={handleFilterChange}
                handleSearch={handleSearch}
              />
              </div>

              <TabContext value="1">
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}></Box>
                <TabPanel value="1">
                  <Box>
                    <Box>
                      <Box m={1}>
                        <Card>
                          <Box
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            m={1}
                            width={"100%"}
                          >
                            <div className="head-area" style={{ width: "90%" }}>
                              <Box mt={3} display={"flex"}>
                                <Box
                                  display={"flex"}
                                  justifyContent={"center"}
                                  width={"100%"}
                                >
                                  <h4>Pay Out</h4>
                                </Box>
                                <Box
                                  alignSelf={"flex-end"}
                                  style={{ cursor: "pointer" }}
                                >
                                  <Box
                                    onClick={() =>
                                      getApiData(currentPage, filter)
                                    }
                                  >
                                    <ReplayIcon />
                                  </Box>
                                </Box>
                              </Box>
                            </div>
                          </Box>
                        </Card>
                      </Box>
                    </Box>
                    <div className="row">
                      <div className="col-xl-12">
                        <div className="transactions-main">
                          <div className="table-responsive">
                            <Box m={1}>
                              <Card>
                                <div className="table-responsive">
                                  {loadingout ? (
                                    <>
                                      <Box
                                        display={"flex"}
                                        justifyContent={"center"}
                                        alignItems={"center"}
                                        height={550}
                                      >
                                        <Box>
                                          <CircularProgress />
                                        </Box>
                                      </Box>
                                    </>
                                  ) : (
                                    <table className="table">
                                      <thead>
                                        <tr>
                                          <th scope="col"> ID</th>
                                          <th scope="col">User ID</th>
                                          <th scope="col">Amount</th>
                                          <th scope="col">Charges</th>
                                          <th scope="col">Mode</th>
                                          <th scope="col">Status</th>
                                          <th scope="col">Source</th>
                                          <th scope="col">UTR</th>{" "}
                                          <th scope="col">Transaction Id</th>
                                          <th scope="col">Partner txn id</th>
                                          <th scope="col">Ip</th>{" "}
                                          <th scope="col">Callback URL</th>
                                          <th scope="col">Webhook URL</th>
                                          <th scope="col">Created At</th>
                                          <th scope="col">Updated At</th>
                                          <th scope="col">Method Vendor</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {apiResout?.map((val, ind) => {
                                          return (
                                            <>
                                              <tr key={ind}>
                                                <td scope="row">
                                                  <p className="mdr">
                                                    {val?.id}
                                                  </p>
                                                </td>
                                                <td>
                                                  <p className="mdr">
                                                    {val?.user_id}
                                                  </p>
                                                </td>
                                                <td>
                                                  <p className="mdr">
                                                    {val?.amount}
                                                  </p>
                                                </td>
                                                <td>
                                                  <p className="mdr">
                                                    {val?.charges}
                                                  </p>
                                                </td>
                                                <td>
                                                  <p className="mdr">
                                                    {val?.mode}
                                                  </p>
                                                </td>
                                                <td
                                                  onClick={() =>
                                                    handleRowClick(val)
                                                  }
                                                  style={{ cursor: "pointer" }}
                                                >
                                                  <p className="mdr">
                                                    {statusOfTrasaction(
                                                      val?.status
                                                    )}
                                                  </p>
                                                </td>
                                                <td>
                                                  <p className="mdr">
                                                    {val?.source}
                                                  </p>
                                                </td>
                                                <td>
                                                  <p className="mdr">
                                                    {val?.vendor_txn_id}
                                                  </p>
                                                </td>
                                                <td>
                                                  <p className="mdr">
                                                    {val?.transaction_id}
                                                  </p>
                                                </td>
                                                <td>
                                                  <p className="mdr">
                                                    {val?.partner_txn_id}
                                                  </p>
                                                </td>
                                                <td>
                                                  <p className="mdr">
                                                    {val?.ip}
                                                  </p>
                                                </td>
                                                <td>
                                                  <p className="mdr">
                                                    {val?.callback_url}
                                                  </p>
                                                </td>
                                                <td>
                                                  <p className="mdr">
                                                    {val?.webhook_url}
                                                  </p>
                                                </td>
                                                <td>
                                                  <p className="mdr">
                                                    {val?.createdAt}
                                                  </p>
                                                </td>
                                                <td>
                                                  <p className="mdr">
                                                    {val?.updatedAt}
                                                  </p>
                                                </td>{" "}
                                                {/**  <td>
                                        <p className="mdr">
                                          {val?.method.vendor}
                                        </p>
                                      </td> */}
                                              </tr>
                                            </>
                                          );
                                        })}
                                      </tbody>
                                      <PayoutDrawer
                                        rowData={selectedRowData}
                                        transactionData={succesParsedRes}
                                        onClose={() => setSelectedRowData(null)}
                                      />
                                    </table>
                                  )}
                                </div>
                              </Card>
                            </Box>
                          </div>
                        </div>
                      </div>
                    </div>
                    <PaginationOut
                      rowData={payOutRowData}
                      currentPage={currentPageOUT}
                      onPageChange={handlePageChangeOut}
                    />
                  </Box>
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
                backgroundColor:
                  snackbarType === "success" ? "#4CAF50" : "#f44336",
              }}
            />
          </Snackbar>
        </section>
      </Box>
    </>
  );
};

export default Payout;
