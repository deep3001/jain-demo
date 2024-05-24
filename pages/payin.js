import React, { useEffect, useState } from "react";
import { Box, Button, Card, CircularProgress, Chip, TextField } from "@mui/material";
import axios from "axios";
import ReplayIcon from '@mui/icons-material/Replay';
import {
  getPayInData,
  getPayOUTData,
  getTrasactionStatus,
} from "@/components/Apis/Api";
import Pagination from "@/components/pagination/Pagination";

import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import Modal from "react-modal";
import Image from "next/image";
import transaction_details_icon from "/public/images/icon/transaction-details-icon.png";
import ErrorIcon from "@mui/icons-material/Error";
import { useRouter } from "next/router";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";



const Payin = () => {
  const router = useRouter();
  const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
  const [errOpen, setErrOpen] = useState(false);
  const [errSuccessMessage, setErrSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [apiRes, setApiRes] = useState([]);
  const [rowData, setRowData] = useState(" ");
  const [value, setValue] = React.useState("1");
  const [filter, setFilter] = useState("all");


  const [search, setSearch] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");


  const [currentPage, setCurrentPage] = useState(1);


  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };


  const handleFilerChange = (currentPage, status) => {
    setFilter(status);
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
      console.log('Searching data...');
      setLoading(true);

      const accessToken = window.localStorage.getItem("accessToken");
      const headers = {
        authorization: accessToken,
      };
      const data = {
        keyword: search.toString(),
        category: 'payin',
      };

      const response = await axios.post(
        `${BASEURL}/merchant/search`,
        data,
        { headers: headers }
      );
      const formattedTransactions = response.data.data.map((transaction) => ({
        ...transaction,
        createdAt: new Date(transaction.createdAt).toLocaleString(),
        updatedAt: new Date(transaction.updatedAt).toLocaleString(),
        expire_on: new Date(transaction.expire_on
        ).toLocaleString(),
      }));
      setApiRes(formattedTransactions);
      setLoading(false);
    } catch (error) {
      // Handle errors
      handleSnackbarOpen("No Data Found", "error");
      console.error("Error searching data: ", error);
      setLoading(false);
    }
  };

  const getApiData = async (currentPage, filter) => {
    try {
      console.log("calling api");
      console.log("filter", filter);
      setLoading(true);
      const response = await getPayInData(currentPage, filter);

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


  useEffect(() => {
    getApiData(currentPage, filter);
  }, [currentPage, filter]);



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

  const [errOpenTras, setErrOpenTras] = useState(false);
  const [errSuccessMessageTras, setErrSuccessMessageTras] = useState("");
  const [loadingTras, setLoadingTras] = useState(true);
  const [apiResTras, setApiResTras] = useState({});

  const getTrasactionDataAPI = async (data) => {
    try {
      setLoadingTras(true);
      const response = await getTrasactionStatus(data);

      if (response.status === 200) {
        const resOfApi = response?.data?.data.response;

        const jsonParseRes = JSON.parse(resOfApi);

        const dataForOUt = jsonParseRes?.result;

        setApiResTras(jsonParseRes);

        setTimeout(() => {
          setErrOpenTras(false);
        }, 5000);
      } else {
        setErrOpenTras(true);
        setErrSuccessMessageTras(
          response.data.message || "Error: Something went wrong"
        );
      }
    } catch (error) {
      setErrOpenTras(true);
      setErrSuccessMessageTras(error?.response?.data?.message);
    } finally {
      setLoadingTras(false);
    }
  };

  function openModal(data) {
    getTrasactionDataAPI(data);

    setIsOpen(true);
  }



  function closeModal() {
    setIsOpen(false);
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


  return (
    <div>
      <style>
        {`
              th {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
              .mdr {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            `}
      </style>
      <Box >
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
                                <Box display={"flex"} justifyContent={"center"}>
                                  <div className="col-sm-5 text-center">
                                    <div className="icon-area">
                                      <Image
                                        src={transaction_details_icon}
                                        alt="icon"
                                      />
                                    </div>
                                  </div>
                                </Box>
                                <h5>Transaction Details</h5>
                              </Box>
                            </div>
                          </Box>
                          <div className="main-content">
                            <div className="row">
                              <Box>
                                <div className="col-sm-12">
                                  {loadingTras ? (
                                    <Box
                                      m={5}
                                      display={"flex"}
                                      justifyContent={"center"}
                                    >
                                      <Box>
                                        <CircularProgress />
                                      </Box>
                                    </Box>
                                  ) : (
                                    <Box>
                                      {apiResTras?.message === "failed !" ? (
                                        <Box mt={5} mb={3}>
                                          <Box
                                            display={"flex"}
                                            justifyContent={"center"}
                                            alignItems={"center"}
                                          >
                                            <ErrorIcon
                                              color="error"
                                              sx={{ fontSize: 40 }}
                                            />
                                          </Box>
                                          <Box
                                            display={"flex"}
                                            justifyContent={"center"}
                                            alignItems={"center"}
                                          >
                                            <Box>
                                              <Box
                                                style={{ color: "red" }}
                                                className="cancelled"
                                                fontSize={30}
                                              >
                                                Transaction failed
                                              </Box>
                                            </Box>
                                          </Box>
                                        </Box>
                                      ) : (
                                        <div className="right-area">
                                          <Box display={"flex"}>
                                            <Box>
                                              <span className="com">
                                                Status : {apiResTras?.message}
                                              </span>
                                            </Box>
                                          </Box>
                                          <Box display={"flex"}>
                                            <Box>
                                              <span>
                                                Trasaction Type :{" "}
                                                {apiResTras?.ttype}
                                              </span>
                                            </Box>
                                          </Box>
                                          <Box display={"flex"}>
                                            <Box>
                                              <span>
                                                Amount : {apiResTras?.amount}
                                              </span>
                                            </Box>
                                          </Box>
                                          <Box display={"flex"}>
                                            <Box>
                                              <span>
                                                Account No : {apiResTras?.ackno}
                                              </span>
                                            </Box>
                                          </Box>
                                          <Box display={"flex"}>
                                            <Box>
                                              <span>
                                                Account Name :{" "}
                                                {
                                                  apiResTras?.customer_account_name
                                                }
                                              </span>
                                            </Box>
                                          </Box>{" "}
                                          <Box display={"flex"}>
                                            <Box>
                                              <span>
                                                Mobile No :{" "}
                                                {
                                                  apiResTras?.customer_mobile_number
                                                }
                                              </span>
                                            </Box>
                                          </Box>
                                          <Box display={"flex"}>
                                            <Box>
                                              <span>
                                                {" "}
                                                Vertual Address :{" "}
                                                {
                                                  apiResTras?.customer_virtual_address
                                                }
                                              </span>
                                            </Box>
                                          </Box>
                                          <Box display={"flex"}>
                                            <Box>
                                              <span>
                                                Reffrance Id :{" "}
                                                {apiResTras?.refid}
                                              </span>
                                            </Box>
                                          </Box>
                                          <Box display={"flex"}>
                                            <Box>
                                              <span>
                                                UPI txn ID :{" "}
                                                {apiResTras?.upi_txn_id}
                                              </span>
                                            </Box>
                                          </Box>
                                          <Box display={"flex"}>
                                            <Box>
                                              <span>
                                                Txn Complition Date :{" "}
                                                {convertToLocalFormat(
                                                  apiResTras?.txn_completion_date
                                                )}
                                              </span>
                                            </Box>
                                          </Box>
                                          <ul className="payment-info"></ul>
                                        </div>
                                      )}
                                    </Box>
                                  )}
                                </div>
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
                        <div className="col-lg-3 col-md-4">
                          <h4>Transactions</h4>
                        </div>
                        <Box className="col-lg-6 col-md-4" display={"flex"}>
                          <Chip style={{ cursor: "pointer", marginRight: '10px' }} label="All" onClick={() => handleFilerChange(currentPage, "all")} />
                          <Chip style={{ cursor: "pointer", marginRight: '10px' }} label="Pending" onClick={() => handleFilerChange(currentPage, "pending")} />
                          <Chip style={{ cursor: "pointer", marginRight: '10px' }} label="Success" onClick={() => handleFilerChange(currentPage, "success")} />
                          <Chip style={{ cursor: "pointer", marginRight: '10px' }} label="Failed" onClick={() => handleFilerChange(currentPage, "failed")} />
                        </Box>
                        <div className="col-lg-3 col-md-8">
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
                      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>

                      </Box>
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
                                      <Box display={"flex"} justifyContent={"center"} width={"100%"}>
                                        <h4>Pay In</h4>
                                      </Box>
                                      <Box alignSelf={"flex-end"} style={{ cursor: "pointer" }}>
                                        <Box onClick={() => getApiData(currentPage, filter)}>
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
                                                <th scope="col">Amount</th>
                                                <th scope="col">Charges</th>

                                                <th scope="col">Status</th>
                                                {/* <th scope="col">
                                                  Expires on
                                                </th>{" "} */}
                                                <th scope="col">
                                                  Transaction Id
                                                </th>
                                                <th scope="col">
                                                  Partner txn id
                                                </th>

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
                                                      onClick={() =>
                                                        openModal(val)
                                                      }
                                                    // data-bs-toggle="modal"
                                                    // data-bs-target="#transactionsMod"
                                                    >
                                                      <td scope="row">
                                                        <p className="mdr">
                                                          {val?.id}
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
                                                          {statusOfTrasaction(
                                                            val?.status
                                                          )}
                                                        </p>
                                                      </td>
                                                      {/* <td>
                                                        <p className="mdr">
                                                          {convertToLocalFormat(
                                                            val?.expire_on
                                                          )}
                                                        </p>
                                                      </td> */}
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
