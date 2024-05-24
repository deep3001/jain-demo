import React from "react";
import { Drawer, Paper, Divider, Chip } from "@mui/material";
import { Transition } from "react-transition-group";

const PayoutDrawer = ({ rowData, transactionData, onClose }) => {
  const transitionStyles = {
    entering: { width: "40%" },
    entered: { width: "40%" },
    exiting: { width: 0 },
    exited: { width: 0 },
  };

  // Format date to human-readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Adjust format as needed
  };

  // Determine badge color based on status
  const getStatusBadgeColor = (status) => {
    return status === 1 ? "success" : "error";
  };

  return (
    <Transition in={!!rowData} timeout={300}>
      {(state) => (
        <Drawer
          anchor="right"
          open={!!rowData}
          onClose={onClose}
          PaperProps={{
            component: Paper,
            style: {
              ...transitionStyles[state], // Apply transition styles
              overflowX: "hidden", // Hide horizontal overflow
              padding: "20px", // Add padding
            },
          }}
        >
          {/* Content wrapped inside Paper */}
          <Paper elevation={3} style={{ padding: "20px" }}>
            <div>
              {/* Transaction Details Heading */}
              <h2 style={{ textAlign: "center" }}>Transaction Details</h2>
              <Divider style={{ margin: "10px 0" }} />

              {/* Render transaction details */}
              {rowData && transactionData && (
                <div>
                  <p
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <strong>Order ID:</strong>
                    <span>{rowData.id}</span>
                  </p>
                  <p
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <strong>Transaction ID:</strong>
                    <span>{rowData.transaction_id}</span>
                  </p>
                  <p
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <strong>Name:</strong>
                    <span>{transactionData.name}</span>
                  </p>
                  <p
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <strong>Account No:</strong>
                    <span>{transactionData.account_number}</span>
                  </p>
                  <p
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <strong>IFSC:</strong>
                    <span>{transactionData.ifsc_code}</span>
                  </p>
                  <p
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <strong>Amount:</strong>
                    <span>{rowData.amount}</span>
                  </p>
                  {/* <p style={{ display: "flex", justifyContent: "space-between" }}>
                                        <strong>Charges:</strong>
                                        <span>{rowData.charges}</span>
                                    </p> */}
                  <p
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <strong>UTR:</strong>
                    <span>{rowData.vendor_txn_id}</span>
                  </p>
                  <p
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <strong>Source:</strong>
                    <span>{rowData.source}</span>
                  </p>
                  <p
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <strong>Mode:</strong>
                    <span>{rowData.mode}</span>
                  </p>
                  <p
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <strong>Status:</strong>

                    <Chip
                      label={
                        rowData.status === 1
                          ? "Success"
                          : rowData.status === 3
                          ? "Failed"
                          : "Pending"
                      }
                      sx={{
                        "& .MuiChip-label": {
                          color: "white",
                        },
                      }}
                      color={getStatusBadgeColor(rowData.status)}
                    />
                  </p>
                  <p
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <strong>Date:</strong>
                    <span>{formatDate(rowData.createdAt)}</span>
                  </p>
                  {/* Additional text block */}
                  <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <p style={{ fontWeight: "bold", fontSize: "smaller" }}>
                      If you have any issue related to this order or to dispute
                      the transaction, please contact on below email:
                    </p>
                    <p>versai@support</p>
                  </div>{" "}
                </div>
              )}
            </div>
          </Paper>
        </Drawer>
      )}
    </Transition>
  );
};

export default PayoutDrawer;
