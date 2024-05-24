import React, { useCallback, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Card, CircularProgress, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";
// import { getPayInData, getPayOUTData, getTrasactionStatus } from "../Apis/Api";
import {
  getPayInData,
  getPayOUTData,
  getSettelementDetails,
  getTrasactionStatus,
  makeSettlement,
} from "@/components/Apis/Api";
import Pagination from "@/components/pagination/Pagination";
import PaginationOut from "@/components/pagination/PaginationOut";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
// import TransactionModal from "../modal/TransactionModal";
import Modal from "react-modal";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";
import transaction_details_icon from "/public/images/icon/transaction-details-icon.png";
import ErrorIcon from "@mui/icons-material/Error";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";




import { useRouter } from "next/router";
const Payin = () => {
  const router = useRouter();
  const [errOpen, setErrOpen] = useState(false);
  const [errSuccessMessage, setErrSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [apiRes, setApiRes] = useState([]);
  const [rowData, setRowData] = useState(" ");
  const [value, setValue] = React.useState("1");

  const [currentPage, setCurrentPage] = useState(1);

  const [search, setSearch] = useState("");


  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const handleSnackbarOpen = (message, type) => {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setSnackbarOpen(true);
  };


  const handleSearch = async () => {
    try {
      setLoading(true);

      const accessToken = window.localStorage.getItem("token");
      const headers = {
        authorization: accessToken,
      };
      const data = {
        keyword: search.toString(), // Assuming 'search' is your keyword variable
        category: 'gateway',
      };

      const response = await axios.post(
        `${BASEURL}/admin/search_all`,
        data,
        { headers: headers }
      );
      // const formattedTransactions = response.data.data.map((transaction) => ({
      //   ...transaction,
      //   createdAt: new Date(transaction.createdAt).toLocaleString(),
      //   updatedAt: new Date(transaction.updatedAt).toLocaleString(),
      //   expire_on: new Date(
      //     parseInt(transaction.expire_on, 10) * 1000
      //   ).toLocaleString(),
      // }));
      // console.log(response)
      setGateways(response.data.data);
      // setTotalpages(response.data.rows / count);
      setLoading(false);
    } catch (error) {
      // Handle errors
      handleSnackbarOpen("No Gateway Found", "error");
      console.error("Error searching data: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const getApiData = async () => {
      try {
        setLoading(true);
        const response = await getSettelementDetails(currentPage);

        if (response.status === 200) {
          setApiRes(response?.data?.data);
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
        setLoading(false);
      }
    };

    getApiData();
  }, [currentPage]);

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

  const [errOpenTras, setErrOpenTras] = useState(false);
  const [errSuccessMessageTras, setErrSuccessMessageTras] = useState("");
  const [loadingTras, setLoadingTras] = useState(true);
  const [apiResTras, setApiResTras] = useState({});

  console.log(apiResTras, "apiResTras");
  const [settlementVal, setsettlementVal] = useState("");

  const makeSettlementHandler = useCallback(async () => {
    console.log(settlementVal);
    try {
      const response = await makeSettlement(settlementVal);
      console.log("response", response);
    } catch (error) {
      console.log(error);
    } finally {
      // Add any cleanup logic here
    }
  }, [settlementVal]);

  function openModal(data) {
    setIsOpen(true);
    // setRowDataModal(data);
  }

  function closeModal() {
    setIsOpen(false);
    setIsOpenOut(false);
  }

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

  console.log(apiResTras?.message);

  return (
    <div>
      <Box>
        <Box>
          <Box>
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
                            <div className="modal-header  ">
                              <Box>
                                <h5>Make Payment Settlement </h5>
                              </Box>
                            </div>
                          </Box>
                          <div className="main-content">
                            <div className="row">
                              <Box>
                                <Box>
                                  <div className="row justify-content-center">
                                    <div className="">
                                      <div className="single-input">
                                        <label htmlFor="fName1">Amount :</label>
                                        <input
                                          required
                                          value={settlementVal}
                                          onChange={(e) =>
                                            setsettlementVal(e.target.value)
                                          }
                                          type="number"
                                          id="fName1"
                                          placeholder="0"
                                        />
                                      </div>
                                    </div>
                                    <Box mt={1}>
                                      <div
                                        style={{ marginTop: "15px" }}
                                        className="btn-border"
                                      >
                                        <button
                                          onClick={() =>
                                            makeSettlementHandler()
                                          }
                                          className="cmn-btn"
                                        >
                                          Make Settlement
                                        </button>
                                      </div>
                                    </Box>
                                  </div>
                                </Box>
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

            <Box>
              <section className="dashboard-section body-collapse transactions">
                <div className="overlay pt-120">
                  <div className="container-fruid">
                    <div className="head-area">
                      <div className="row">
                        <div className="col-lg-5 col-md-4">
                          <h4>Settlement</h4>
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

                    <TabContext value={value}>
                      <Box
                        sx={{ borderBottom: 1, borderColor: "divider" }}
                      ></Box>
                      <TabPanel value="1">
                        <Box>
                          {" "}
                          <Box>
                            <Box m={1}>
                              <Card>
                                <Box
                                  display={"flex"}
                                  justifyContent={"space-between"}
                                >
                                  <Box
                                    display={"flex"}
                                    justifyContent={"left"}
                                    alignItems={"center"}
                                    m={1}
                                  >
                                    <div className="head-area">
                                      <Box mt={3}>
                                        <h4>Payment Settlement</h4>
                                      </Box>
                                    </div>
                                  </Box>
                                  <Box
                                    display={"flex"}
                                    justifyContent={"center"}
                                    flexDirection={"column"}
                                    alignItems={"center"}
                                    mr={2}
                                  >
                                    <Box mb={1}>
                                      <div
                                        style={{ marginTop: "10px" }}
                                        className="btn-border"
                                      >
                                        <button
                                          onClick={() => openModal()}
                                          className="cmn-btn"
                                        >
                                          Make Settlement
                                        </button>
                                      </div>
                                    </Box>
                                    <Box>
                                      <div
                                        style={{
                                          marginTop: "5px",
                                          marginBottom: "5px",
                                        }}
                                        className="btn-border"
                                      >
                                        <button
                                          onClick={() => router.push("/export")}
                                          className="cmn-btn"
                                        >
                                          Export
                                        </button>
                                      </div>
                                    </Box>
                                  </Box>
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
                                        {loading ? (
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
                                                <th scope="col">Api Key</th>
                                                <th scope="col">Amount</th>
                                                <th scope="col">Charges</th>
                                                <th scope="col">Mode</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Source</th>
                                                <th scope="col">
                                                  Expires on
                                                </th>{" "}
                                                <th scope="col">
                                                  Transaction Id
                                                </th>
                                                <th scope="col">
                                                  Partner txn id
                                                </th>
                                                <th scope="col">Ip</th>{" "}
                                                <th scope="col">
                                                  Callback URL
                                                </th>
                                                <th scope="col">Webhook URL</th>
                                                <th scope="col">Created At</th>
                                                <th scope="col">Updated At</th>
                                                <th scope="col">
                                                  Method Vendor
                                                </th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              {apiRes?.map((val, ind) => {
                                                return (
                                                  <>
                                                    <tr

                                                    // data-bs-toggle="modal"
                                                    // data-bs-target="#transactionsMod"
                                                    >
                                                      <th scope="row">
                                                        <p className="mdr">
                                                          {val?.id}
                                                        </p>
                                                      </th>
                                                      <td>
                                                        <p className="mdr">
                                                          {val?.user_id}
                                                        </p>
                                                      </td>
                                                      <td>
                                                        <p className="mdr">
                                                          {val?.api_key}
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
                                                      <td>
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
                                                          {convertToLocalFormat(
                                                            val?.expire_on
                                                          )}
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
                                                          {val?.callback_url ||
                                                            "-"}
                                                        </p>
                                                      </td>
                                                      <td>
                                                        <p className="mdr">
                                                          {val?.webhook_url ||
                                                            "-"}
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
                                                      <td>
                                                        <p className="mdr">
                                                          {val?.method?.vendor}
                                                        </p>
                                                      </td>
                                                    </tr>
                                                  </>
                                                );
                                              })}
                                            </tbody>
                                          </table>
                                        )}
                                      </div>
                                    </Card>
                                  </Box>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Pagination */}
                          <Pagination
                            rowData={rowData}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
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
                    backgroundColor: snackbarType === "success" ? "#4CAF50" : "#f44336",
                  }}
                />
              </Snackbar>
              </section>
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Payin;
