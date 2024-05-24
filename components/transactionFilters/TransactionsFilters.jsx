
// import React, { useState } from "react";
// import {
//   Box,
//   Chip,
//   TextField,
//   Button,
//   Paper,
//   Grid,
//   Typography,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Badge,
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import DoneIcon from '@mui/icons-material/Done';

// const TransactionsFilters = ({ handleFilterChange, handleSearch }) => {
//   const [transactionId, setTransactionId] = useState("");
//   const [source, setSource] = useState("");
//   const [vendorId, setVendorId] = useState("");
//   const [status, setStatus] = useState(""); // State to hold the selected status
//   const [expanded, setExpanded] = useState(false);

//   const handleAccordionChange = () => {
//     setExpanded(!expanded);
//   };

//   const handleStatusChange = (selectedStatus) => {
//     setStatus(selectedStatus === status ? "" : selectedStatus); // Toggle status
//   };

//   return (
//     <>
//       <div className="row">
//         <div className="col-lg-4 col-md-4 mb-3">
//           <h4>Transactions</h4>
//         </div>
//       </div>
//       <Accordion expanded={expanded} onChange={handleAccordionChange} sx={{ width: "40vw", maxWidth: "40vw",transition: "0.6s" }}>
//         <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//           <Typography variant="subtitle2">Filters</Typography>
//         </AccordionSummary>
//         <AccordionDetails>
//           <Paper variant="outlined" elevation={1} style={{ padding: "10px", width: "100%" }}>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={4}>
//                 <TextField
//                   type="text"
//                   label="Transaction ID"
//                   value={transactionId}
//                   onChange={(e) => setTransactionId(e.target.value)}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <TextField
//                   type="text"
//                   label="Source"
//                   value={source}
//                   onChange={(e) => setSource(e.target.value)}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <TextField
//                   type="text"
//                   label="Vendor ID"
//                   value={vendorId}
//                   onChange={(e) => setVendorId(e.target.value)}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12} spacing={3}>
//                 <div
//                   className="filter-options"
//                   style={{
//                     display: "flex",
//                     justifyContent: "flex-start",
//                     alignItems: "center",
//                     color: "white",
//                   }}
//                 >
//                   <Badge
//                     color="success"
//                     badgeContent={<DoneIcon  sx={{ fontSize: 14 }} />}
//                     invisible={status !== ""}
//                   >
//                     <Chip
//                       sx={{
//                         "& .MuiChip-label": {
//                           color: "white",
//                         },
//                       }}
//                       style={{
//                         cursor: "pointer",
//                         marginRight: "15px",
//                         backgroundColor: "#2196f3",
//                       }}
//                       label="All"
//                       onClick={() => handleStatusChange("")}
//                     />
//                   </Badge>
                //   <Badge
                //     color="success"
                //     badgeContent={<DoneIcon  sx={{ fontSize: 14 }} />}
                //     invisible={status !== "0"}
                //   >
                //     <Chip
                //       sx={{
                //         "& .MuiChip-label": {
                //           color: "black",
                //         },
                //       }}
                //       style={{
                //         cursor: "pointer",
                //         marginRight: "15px",
                //         backgroundColor: "#ffeb3b",
                //         color: "#fff",
                //       }}
                //       label="Pending"
                //       onClick={() => handleStatusChange("0")}
                //     />
                //   </Badge>
                //   <Badge
                //     color="success"
                //     badgeContent={<DoneIcon  sx={{ fontSize: 14 }} />}
                //     invisible={status !== "1"}
                //   >
                //     <Chip
                //       sx={{
                //         "& .MuiChip-label": {
                //           color: "white",
                //         },
                //       }}
                //       style={{
                //         cursor: "pointer",
                //         marginRight: "15px",
                //         backgroundColor: "#4caf50",
                //         color: "#fff",
                //       }}
                //       label="Success"
                //       onClick={() => handleStatusChange("1")}
                //     />
                //   </Badge>
                //   <Badge
                //     color="success"
                //     badgeContent={<DoneIcon  sx={{ fontSize: 14 }} />}
                //     invisible={status !== "3"}
                //   >
                //     <Chip
                //       sx={{
                //         "& .MuiChip-label": {
                //           color: "white",
                //         },
                //       }}
                //       style={{
                //         cursor: "pointer",
                //         marginRight: "15px",
                //         backgroundColor: "#f44336",
                //         color: "#fff",
                //       }}
                //       label="Failed"
                //       onClick={() => handleStatusChange("3")}
                //     />
                //   </Badge>
                //   <Badge
                //     color="success"
                //     invisible={status !== "2"}
                //     badgeContent={<DoneIcon  sx={{ fontSize: 14 }} />}
                //   >
                //     <Chip
                //       sx={{
                //         "& .MuiChip-label": {
                //           color: "white",
                //         },
                //       }}
                //       style={{
                //         cursor: "pointer",
                //         marginRight: "15px",
                //         backgroundColor: "#f44336",
                //         color: "#fff",
                //       }}
                //       label="Rejected"
                //       onClick={() => handleStatusChange("2")}
                //     />
                //   </Badge>
//                 </div>
//               </Grid>
//               <Grid
//                 item
//                 xs={12}
//                 style={{ display: "flex", justifyContent: "flex-end" }}
//               >
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={() => handleSearch(transactionId, source, vendorId, status)}
//                 >
//                   Search
//                 </Button>
//               </Grid>
//             </Grid>
//           </Paper>
//         </AccordionDetails>
//       </Accordion>
//     </>
//   );
// };

// export default TransactionsFilters;




import React, { useState } from "react";
import {
  Chip,
  TextField,
  Button,
  Paper,
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Badge,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DoneIcon from '@mui/icons-material/Done';

const TransactionsFilters = ({ handleFilterChange, handleSearch }) => {
  const [transactionId, setTransactionId] = useState("");
  const [source, setSource] = useState("");
  const [vendorId, setVendorId] = useState("");
  const [status, setStatus] = useState(""); // State to hold the selected status
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = () => {
    setExpanded(!expanded);
  };

  const handleStatusChange = (selectedStatus) => {
    setStatus(selectedStatus === status ? "" : selectedStatus); // Toggle status
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-4 col-md-4 mb-3">
          <h4>Transactions</h4>
        </div>
      </div>
      <Accordion expanded={expanded} onChange={handleAccordionChange} sx={{ width: "100%", transition: "0.6s" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle2">Filters</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Paper variant="outlined" elevation={1} style={{ padding: "10px", width: "100%" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  type="text"
                  label="Transaction ID"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  type="text"
                  label="Source"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  type="text"
                  label="Vendor ID"
                  value={vendorId}
                  onChange={(e) => setVendorId(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <div
                  className="filter-options"
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    flexWrap: "wrap", // Ensure chips wrap when needed
                    gap: "10px", // Add spacing between chips
                  }}
                >
                  <Badge
                    color="success"
                    badgeContent={<DoneIcon  sx={{ fontSize: 14 }} />}
                    invisible={status !== ""}
                  >
                    <Chip
                      sx={{
                        "& .MuiChip-label": {
                          color: "white",
                        },
                      }}
                      style={{
                        cursor: "pointer",
                        backgroundColor: "#2196f3",
                      }}
                      label="All"
                      onClick={() => handleStatusChange("")}
                    />
                  </Badge>
                  <Badge
                    color="success"
                    badgeContent={<DoneIcon  sx={{ fontSize: 14 }} />}
                    invisible={status !== "0"}
                  >
                    <Chip
                      sx={{
                        "& .MuiChip-label": {
                          color: "black",
                        },
                      }}
                      style={{
                        cursor: "pointer",
                        backgroundColor: "#ffeb3b",
                        color: "#fff",
                      }}
                      label="Pending"
                      onClick={() => handleStatusChange("0")}
                    />
                  </Badge>
                
                <Badge
                  color="success"
                  badgeContent={<DoneIcon  sx={{ fontSize: 14 }} />}
                  invisible={status !== "1"}
                >
                  <Chip
                    sx={{
                      "& .MuiChip-label": {
                        color: "white",
                      },
                    }}
                    style={{
                      cursor: "pointer",
                      backgroundColor: "#4caf50",
                      color: "#fff",
                    }}
                    label="Success"
                    onClick={() => handleStatusChange("1")}
                  />
                </Badge>
                <Badge
                  color="success"
                  badgeContent={<DoneIcon  sx={{ fontSize: 14 }} />}
                  invisible={status !== "3"}
                >
                  <Chip
                    sx={{
                      "& .MuiChip-label": {
                        color: "white",
                      },
                    }}
                    style={{
                      cursor: "pointer",
                      backgroundColor: "#f44336",
                      color: "#fff",
                    }}
                    label="Failed"
                    onClick={() => handleStatusChange("3")}
                  />
                </Badge>
                <Badge
                  color="success"
                  invisible={status !== "2"}
                  badgeContent={<DoneIcon  sx={{ fontSize: 14 }} />}
                >
                  <Chip
                    sx={{
                      "& .MuiChip-label": {
                        color: "white",
                      },
                    }}
                    style={{
                      cursor: "pointer",
                      backgroundColor: "#f44336",
                      color: "#fff",
                    }}
                    label="Rejected"
                    onClick={() => handleStatusChange("2")}
                  />
                </Badge>
                </div>
              </Grid>
              <Grid
                item
                xs={12}
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSearch(transactionId, source, vendorId, status)}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default TransactionsFilters;
