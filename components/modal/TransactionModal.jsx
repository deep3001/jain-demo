import Image from "next/image";
import { FaTimes } from "react-icons/fa";
import transaction_details_icon from "/public/images/icon/transaction-details-icon.png";
import React from 'react';
import { Modal, Box, Card, Button } from '@mui/material';

const TransactionModal = ({ isOpen, handleClose, transactionDetails })=> {
  return (
    <Modal open={isOpen} onClose={handleClose}>
    <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
    <div className="transactions-popup">
      <div className="container-fruid">
        <div className="row">
          <div className="col-lg-6">
            <div className="modal fade" id="transactionsMod" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header justify-content-between">
                    <h5>Transaction Details</h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      {/* <i className="fa-solid fa-xmark"></i> */}

                      <FaTimes className="fs-4" />
                    </button>
                  </div>
                  <div className="main-content">
                    <div className="row">
                      <div className="col-sm-5 text-center">
                        <div className="icon-area">
                          <Image src={transaction_details_icon} alt="icon" />
                        </div>
                        <div className="text-area">
                          <h6>Envato Pty Ltd</h6>
                          <p>16 Jan 2022</p>
                          <h3>717.14 USD</h3>
                          <p className="com">Completed</p>
                        </div>
                      </div>
                      <div className="col-sm-7">
                        <div className="right-area">
                          <h6>Transaction Details</h6>
                          <ul className="payment-details">
                            <li>
                              <span>Payment Amount</span>
                              <span>718.64 USD</span>
                            </li>
                            <li>
                              <span>Fee</span>
                              <span>1.50 USD</span>
                            </li>
                            <li>
                              <span>Total Amount</span>
                              <span>717.14 USD</span>
                            </li>
                          </ul>
                          <ul className="payment-info">
                            <li>
                              <p>Payment From</p>
                              <span className="mdr">Envato Pty Ltd</span>
                            </li>
                            <li>
                              <p>Payment Description</p>
                              <span className="mdr">
                                Envato Feb 2022 Member Payment
                              </span>
                            </li>
                            <li>
                              <p>Transaction ID:</p>
                              <span className="mdr">
                                6559595979565959895559595
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Box>
    </Modal>
  );
};

export default TransactionModal;
