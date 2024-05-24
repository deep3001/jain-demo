import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Grid,
  Paper,
  Card,
  CircularProgress,
  Chip,
} from "@mui/material";
import { useFormik } from "formik";
import ReplayIcon from "@mui/icons-material/Replay";
import * as Yup from "yup";
import Axios from "axios";
import Pagination from "@/components/pagination/Pagination";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Image from "next/image";

const initialValues = {
  utr: "",
  amount: "",
  screenshot: null,
};

const validationSchema = Yup.object({
  utr: Yup.string().max(255).required("UTR is required"),
  amount: Yup.number().positive().required("Amount is required"),
  screenshot: Yup.mixed()
    .required("Screenshot is required")
    .test("fileSize", "File size is too large", (value) =>
      value ? value.size <= 2000000 : true
    ),
});

const AddFundForm = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rowData, setRowData] = useState(" ");
  const [currentPage, setCurrentPage] = useState(3);
  const [value, setValue] = useState("1");
  const [apiRes, setApiRes] = useState([]);
  const [fundsHistory, setFundsHistory] = useState([]);
  const [page, setPage] = useState();
  const [totalPages, setTotalpages] = useState(1);
  const [count, setCount] = useState(20);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        setSubmitting(true);

        const formData = new FormData();
        formData.append("utr", values.utr);
        formData.append("amount", values.amount);
        formData.append("screenshot", values.screenshot);

        const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
        const accessToken = localStorage.getItem("accessToken");
        const headers = {
          "Content-Type": "multipart/form-data",
          authorization: accessToken,
        };

        const response = await Axios.post(
          `${BASEURL}/admin/reqVerification`,
          formData,
          {
            headers: headers,
          }
        );

        console.log(response.data);
        enqueueSnackbar("Form submitted successfully!", { variant: "success" });
      } catch (error) {
        console.error("Error submitting form:", error);
        enqueueSnackbar("Form submission unsuccessful", { variant: "error" });
      } finally {
        setSubmitting(false);
      }
    },
  });

  // const handleFileChange = (event) => {
  //   formik.setFieldValue("screenshot", event.currentTarget.files[0]);
  // };

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue("screenshot", file);
    // Read the selected file and display preview
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const fetchHistoryData = async () => {
    try {
      const { p } = router.query;

      let currentPage = 1; // Default to the first page if p is not defined or not a number
      if (p && !isNaN(p)) {
        currentPage = parseInt(p);
      }
      setPage(currentPage);

      const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
      const accessToken = localStorage.getItem("accessToken");
      const headers = {
        authorization: accessToken,
      };

      setLoading(true);

      const response = await axios.get(
        `${BASEURL}/admin/userVerification/${currentPage}/${count}`,
        { headers: headers }
      );

      console.log(response.data.data);

      const requestedHistory = response.data.data;

      console.log(requestedHistory);

      setFundsHistory(requestedHistory);
      const totalRows = response.data.rows;
      const totalPages = Math.ceil(totalRows / count); // Calculate total pages based on total rows and count per page
      setTotalpages(totalPages);
      setLoading(false);
    } catch (error) {
      if (
        error?.response?.status === 401 ||
        error?.response?.data?.message == '"authorization" is required' ||
        error?.response?.data?.message === "invalid signature"
      ) {
        router.push("/login");
      }
      console.log("Error fetching data: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistoryData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="dashboard-section body-collapse pay">
      <div className="overlay pt-120">
        <div className="container-fruid">
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Add Fund" value="1" />
                <Tab label="History" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <div>
                <Box sx={{ p: 1 }}>
                  <Paper elevation={3} sx={{ p: 2 }}>
                    <Typography variant="h5" align="center" gutterBottom>
                      Add Funds
                    </Typography>

                    <form onSubmit={formik.handleSubmit}>
                      <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="UTR"
                            name="utr"
                            value={formik.values.utr}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.utr && Boolean(formik.errors.utr)
                            }
                            helperText={formik.touched.utr && formik.errors.utr}
                            required
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Amount"
                            name="amount"
                            value={formik.values.amount}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.amount &&
                              Boolean(formik.errors.amount)
                            }
                            helperText={
                              formik.touched.amount && formik.errors.amount
                            }
                            type="number"
                            required
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <input
                            accept="image/*"
                            id="screenshot-upload"
                            type="file"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                          />
                          <label htmlFor="screenshot-upload">
                            <Button variant="contained" component="span">
                              {formik.values.screenshot
                                ? "Change Screenshot"
                                : "Upload Screenshot"}
                            </Button>
                          </label>
                          {imagePreview && (
                            <Image
                              src={imagePreview}
                              alt="Screenshot Preview"
                              style={{
                                maxWidth: "100%",
                                maxHeight: "200px",
                                marginTop: "10px",
                                marginLeft: "5px",
                                borderRadius: "5px",
                                boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
                              }}
                            />
                          )}
                          {formik.touched.screenshot &&
                            formik.errors.screenshot && (
                              <Typography color="error" variant="body2">
                                {formik.errors.screenshot}
                              </Typography>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                          <Box mt={2} textAlign="center">
                            <Button
                              type="submit"
                              variant="contained"
                              color="primary"
                            >
                              {submitting ? "Submitting..." : "Submit"}
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </form>
                  </Paper>
                </Box>
              </div>
            </TabPanel>

            <TabPanel value="2">
              <Box mt={2} mb={4}>
                <Paper elevation={3}>
                  <Box p={3}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      style={{ fontWeight: "bold" }}
                    >
                      History of All Requested Funds
                    </Typography>
                    <Box display="flex" justifyContent="flex-end">
                      <Button
                        onClick={fetchHistoryData}
                        startIcon={<ReplayIcon />}
                      >
                        Refresh
                      </Button>
                    </Box>
                  </Box>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell style={{ fontWeight: "bold" }}>
                            UTR
                          </TableCell>
                          <TableCell style={{ fontWeight: "bold" }}>
                            Amount
                          </TableCell>
                          <TableCell style={{ fontWeight: "bold" }}>
                            Status
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {loading ? (
                          <TableRow>
                            <TableCell colSpan={2} align="center">
                              <CircularProgress />
                            </TableCell>
                          </TableRow>
                        ) : fundsHistory.length > 0 ? (
                          fundsHistory.map((request) => (
                            <TableRow key={request.id}>
                              <TableCell>{request.utr}</TableCell>
                              <TableCell>{request.amount}</TableCell>
                              <TableCell>
                                {request.isReceived === "1" ? (
                                  <Chip
                                    label="Approved"
                                    color="primary"
                                    sx={{
                                      color: "white",
                                      "& .MuiChip-label": { color: "white" },
                                    }}
                                  />
                                ) : (
                                  <Chip
                                    label="Not Approved"
                                    color="error"
                                    sx={{
                                      color: "white",
                                      "& .MuiChip-label": { color: "white" },
                                    }}
                                  />
                                )}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={2} align="center">
                              No requested funds found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
              </Box>
            </TabPanel>
          </TabContext>
        </div>
      </div>
    </section>
  );
};

export default AddFundForm;
