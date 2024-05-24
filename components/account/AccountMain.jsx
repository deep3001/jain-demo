// import AccountTab from "./AccountTab";
// import NotificationTab from "./NotificationTab";
// import OwnerDetails from "./OwnerDetails";
// import PaymentMethodTab from "./PaymentMethodTab";
// import SecurityTab from "./SecurityTab";

// import { useState, useEffect } from "react";
// import axios from "axios";

// const AccountMain = () => {
//   const [file, setFile] = useState(null);

//   const onDrop = (acceptedFiles) => {
//     setFile(acceptedFiles[0]);
//   };

//   // const [avatar, setAvatar] = useState(owner_profile_2);
//   const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
//   const [formData, setFormData] = useState({
//     fname: "",
//     lname: "",
//     email: "",
//     phone_number: "",
//     address: "",
//   });

//   useEffect(() => {
//     // Fetch profile data from the API
//     const fetchProfile = async () => {
//       try {
//         const accessToken = window.localStorage.getItem("accessToken");
//         const headers = {
//           authorization: accessToken,
//         };

//         const formDataWithFile = new FormData();

//         formDataWithFile.append("file", file);

//         Object.keys(formData).forEach((key) => {
//           formDataWithFile.append(key, formData[key]);
//         });
//         // setLoading(true);

//         const response = await axios.get(
//           `${BASEURL}/merchant/profile`,
//           formDataWithFile,
//           {
//             headers: headers,
//           }
//         );
//         console.log(response);

//         setFormData({
//           fname: response.data.data.fname || "",
//           lname: response.data.data.lname || "",
//           email: response.data.data.email || "",
//           phone_number: response.data.data.phone_number || "",
//           address: response.data.data.address || "",
//         });
//       } catch (error) {
//         console.error("Error fetching profile data:", error);
//       }
//     };

//     // Call the fetchProfile function when the component mounts
//     fetchProfile();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     // console.log(`Input changed - Name: ${name}, Value: ${value}`);
//     console.log(formData);
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const accessToken = window.localStorage.getItem("accessToken");
//       const headers = {
//         authorization: accessToken,
//       };

//       const response = await axios.post(
//         `${BASEURL}/merchant/updateprofile`,
//         formData,
//         { headers: headers }
//       );

//       console.log("Profile updated successfully:", response.data);
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     }
//   };

//   return (
//     <section className="dashboard-section body-collapse account">
//       <div className="overlay pt-120">
//         <div className="container-fruid">
//           <div className="main-content">
//             <div className="row">
//               <div className="col-xxl-3 col-xl-4 col-md-6">
//                 {/* Owner Details */}
//                 <OwnerDetails formData={formData} />
//               </div>
//               <div className="col-xxl-9 col-xl-8">
//                 <div className="tab-main">
//                   <ul className="nav nav-tabs" role="tablist">
//                     <li className="nav-item" role="presentation">
//                       <button
//                         className="nav-link active"
//                         id="account-tab"
//                         data-bs-toggle="tab"
//                         data-bs-target="#account"
//                         type="button"
//                         role="tab"
//                         aria-controls="account"
//                         aria-selected="true"
//                       >
//                         Account
//                       </button>
//                     </li>
//                     <li className="nav-item" role="presentation">
//                       <button
//                         className="nav-link"
//                         id="security-tab"
//                         data-bs-toggle="tab"
//                         data-bs-target="#security"
//                         type="button"
//                         role="tab"
//                         aria-controls="security"
//                         aria-selected="false"
//                       >
//                         Security
//                       </button>
//                     </li>
//                     <li className="nav-item" role="presentation">
//                       <button
//                         className="nav-link"
//                         id="payment-tab"
//                         data-bs-toggle="tab"
//                         data-bs-target="#payment"
//                         type="button"
//                         role="tab"
//                         aria-controls="payment"
//                         aria-selected="false"
//                       >
//                         Payment Methods
//                       </button>
//                     </li>
//                     <li className="nav-item" role="presentation">
//                       <button
//                         className="nav-link"
//                         id="notification-tab"
//                         data-bs-toggle="tab"
//                         data-bs-target="#notification"
//                         type="button"
//                         role="tab"
//                         aria-controls="notification"
//                         aria-selected="false"
//                       >
//                         Notification
//                       </button>
//                     </li>
//                   </ul>
//                   <div className="tab-content mt-40">
//                     {/* Account Tab */}
//                     <AccountTab
//                       formData={formData}
//                       handleInputChange={handleInputChange}
//                       handleFormSubmit={handleFormSubmit}
//                     />

//                     {/* Security Tab */}
//                     <SecurityTab />

//                     {/* PaymentMethod Tab */}
//                     <PaymentMethodTab />

//                     {/* Notification Tab */}
//                     <NotificationTab />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AccountMain;


import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';

import AccountTab from "./AccountTab";
import NotificationTab from "./NotificationTab";
// import OwnerDetails from "./OwnerDetails";
import PaymentMethodTab from "./PaymentMethodTab";
import SecurityTab from "./SecurityTab";
// import Step1Tab from './Step1Tab';
// import Step2Tab from './Step2Tab';
// import Step3Tab from './Step3Tab';
// import Step4Tab from './Step4Tab';
// import Step5Tab from './Step5Tab';
// import Step6Tab from './Step6Tab';
// import Step7Tab from './Step7Tab';
// import Step8Tab from './Step8Tab';

import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";

import { useContext } from "react";
import { PaylioContext } from "@/context/context";

const AccountMain = () => {
  const { activeLefMenu } = useContext(PaylioContext);
  const BASEURL = "http://localhost:8080";



  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("success");

  const [activeStep, setActiveStep] = useState("account");
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone_number: "",
    address: "",
    profile_url: "",
    company_name: "",
    registration_number: "",
    registration_date: "",
    company_type: "",
    industry_license_number: "",
    tin_number: "",
    gst_number: "",
    business_address: "",
    registered_address: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    proofFiles:{
      registration_certificate_proof: null,
      industry_license_proof: null,
      tin_proof: null,
      gst_proof: null,
      utility_bill_proof: null,
      panPDF:null,
      panPhoto:null,
      panPDF2:null,
      aadharPDFJPG:null,
      bankStatement:null,
      cancelCheque:null,
      passbookFrontPage:null,
    },
    //step-2
    ownerName: "",
    position: "",
    contactPhone: "",
    contactEmail: "",
    nationality: "",
    ownershipPercentage: "",
    //step-3
    companyNamePAN: "",
    panID: "",
    //step-4
    ownerNamePAN: "",
    ownerpanID: "",
    //step-5
    ownerNameAadhar: "",
    aadharNumber: "",
    aadharAddress: "",
    //step-6
    companyWebsiteAddress: "",
    ipAddress: "",
    privacyPolicyURL: "",
    termsConditionURL: "",
    //step-7
    companyWork: "",
    annualTurnover: "",
    approxAnnualTurnover: "",
    capitalStatement: "",
    //step-8
    bankName: "",
    branchName: "",
    branchCode: "",
    bankAddress: "",
    accountHolderName: "",
    accountType: "",
    accountNumber: "",
    ifscCode: "",
  });

  const fetchProfile = async () => {
    try {
      const accessToken = window.localStorage.getItem("accessToken");
      const headers = {
        authorization: accessToken,
      };

      const response = await axios.get(`${BASEURL}/merchant/profile`, {
        headers: headers,
      });
      console.log(response.data.data)

      setFormData({
        fname: response.data.data.user.fname || "",
        lname: response.data.data.user.lname || "",
        email: response.data.data.user.email || "",
        phone_number: response.data.data.profile.phone_number || "",
        address: response.data.data.profile.address || "",
        profile_url: response.data.data.profile.profile_url || ""
      });
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    if (!formData?.profile_url) {
      fetchProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleProofFileUpload = (name, file) => {
    setFiles((prevFiles) => ({
      ...prevFiles,
      [name]: file,
  }));
  };


  const renderInputWithInfo = (label, id, type, placeholder, name, value, onChange) => (
    <div className="single-input">
      <div className="d-flex align-items-center">
        <label htmlFor={id}>{label}</label>
        <Tooltip title={`Enter the ${label}`} placement="right">
          <button type="button" className="info-button">i</button>
        </Tooltip>
      </div>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );

  const renderSelectWithInfo = (label, id, options, name, value, onChange) => (
    <div className="single-input">
      <div className="d-flex align-items-center">
        <label htmlFor={id}>{label}</label>
        <Tooltip title={`Select the ${label.toLowerCase()}`} placement="right">
          <button type="button" className="info-button">i</button>
        </Tooltip>
      </div>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="form-select"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

  const handleNextStep = () => {
  setActiveStep((prevStep) => prevStep + 1);
};

  const renderFileInputWithInfo = (label, id, accept, onChange) => (
    <div className="single-input file">
      <div className="d-flex align-items-center">
        <label>{label}</label>
        <Tooltip title={`Upload ${label}`} placement="right">
          <button type="button" className="info-button">i</button>
        </Tooltip>
      </div>
      <input
        type="file"
        id={id}
        accept={accept}
        onChange={onChange}
      />
    </div>
  );

  const renderFields = (fields, isFile) => (
    fields.map((field) => (
      <div className="col-md-6" key={field.id}>
        {isFile
          ? renderFileInputWithInfo(field.label, field.id, field.accept, field.onChange)
          : field.type === 'select'
            ? renderSelectWithInfo(field.label, field.id, field.options, field.name, field.value, field.onChange)
            : renderInputWithInfo(field.label, field.id, field.type, field.placeholder, field.name, field.value, field.onChange)}
      </div>
    ))
  );

  const handleSnackbarOpen = (message, type) => {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setSnackbarOpen(true);
  };

  const handleFormSubmit = async (e, file) => {
    // e.preventDefault();
    console.log({ ...formData, files });

    try {
      const accessToken = window.localStorage.getItem("accessToken");
      const headers = {
        authorization: accessToken,
      };


      const response = await axios.post(
        `${BASEURL}/merchant/createCompany`,
        formData,
        { headers: headers }
      );
      handleSnackbarOpen("Profile Updated Successfully", "success")
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1000);
      console.log("Profile updated successfully:", response.data);
    } catch (error) {
      handleSnackbarOpen("Please Fill All the Fields", "error");
      console.error("Error updating profile:", error);
    }
  };

  const switchStep = (tabName) => {
    setActiveStep(tabName);
  };

  const renderTabContent = () => {
    switch (activeStep) {
      // case 1:
      //   return (
      //     <Step1Tab
      //       formData={formData}
      //       handleInputChange={handleInputChange}
      //       handleProofFileUpload={handleProofFileUpload}
      //       handleFormSubmit={handleFormSubmit}
      //       handleSnackbarOpen={handleSnackbarOpen}
      //       fetchProfile={fetchProfile}
      //       renderFields={renderFields}
      //       handleNextStep={handleNextStep}
      //     />
      //   );
      // case 2:
      //   return <Step2Tab
      //     formData={formData}
      //     handleInputChange={handleInputChange}
      //     handleProofFileUpload={handleProofFileUpload}
      //     handleFormSubmit={handleFormSubmit}
      //     handleSnackbarOpen={handleSnackbarOpen}
      //     fetchProfile={fetchProfile}
      //     renderFields={renderFields}
      //     handleNextStep={handleNextStep}
      //   />;
      // case 3:
      //   return <Step3Tab
      //     formData={formData}
      //     handleInputChange={handleInputChange}
      //     handleProofFileUpload={handleProofFileUpload}
      //     handleFormSubmit={handleFormSubmit}
      //     handleSnackbarOpen={handleSnackbarOpen}
      //     fetchProfile={fetchProfile}
      //     renderFields={renderFields}
      //     handleNextStep={handleNextStep}
      //   />;
      // case 4:
      //   return <Step4Tab
      //     formData={formData}
      //     handleInputChange={handleInputChange}
      //     handleProofFileUpload={handleProofFileUpload}
      //     handleFormSubmit={handleFormSubmit}
      //     handleSnackbarOpen={handleSnackbarOpen}
      //     fetchProfile={fetchProfile}
      //     renderFields={renderFields}
      //     handleNextStep={handleNextStep}
      //   />;
      // case 5:
      //   return <Step5Tab
      //     formData={formData}
      //     handleInputChange={handleInputChange}
      //     handleProofFileUpload={handleProofFileUpload}
      //     handleFormSubmit={handleFormSubmit}
      //     handleSnackbarOpen={handleSnackbarOpen}
      //     fetchProfile={fetchProfile}
      //     renderFields={renderFields}
      //     handleNextStep={handleNextStep}
      //   />;
      // case 6:
      //   return <Step6Tab
      //     formData={formData}
      //     handleInputChange={handleInputChange}
      //     handleProofFileUpload={handleProofFileUpload}
      //     handleFormSubmit={handleFormSubmit}
      //     handleSnackbarOpen={handleSnackbarOpen}
      //     fetchProfile={fetchProfile}
      //     renderFields={renderFields}
      //     handleNextStep={handleNextStep}
      //   />;
      // case 7:
      //   return <Step7Tab
      //     formData={formData}
      //     handleInputChange={handleInputChange}
      //     handleProofFileUpload={handleProofFileUpload}
      //     handleFormSubmit={handleFormSubmit}
      //     handleSnackbarOpen={handleSnackbarOpen}
      //     fetchProfile={fetchProfile}
      //     renderFields={renderFields}
      //     handleNextStep={handleNextStep}
      //   />;
      // case 8:
      //   return <Step8Tab
      //     formData={formData}
      //     handleInputChange={handleInputChange}
      //     handleProofFileUpload={handleProofFileUpload}
      //     handleFormSubmit={handleFormSubmit}
      //     handleSnackbarOpen={handleSnackbarOpen}
      //     fetchProfile={fetchProfile}
      //     renderFields={renderFields}
      //     handleNextStep={handleNextStep}
      //   />;
      case "account":
        return (
          <AccountTab 
            formData={formData}
            handleInputChange={handleInputChange}
            handleProofFileUpload={handleProofFileUpload}
            handleFormSubmit={handleFormSubmit}
            handleSnackbarOpen={handleSnackbarOpen}
            fetchProfile={fetchProfile}
            />
            );
      case "security":
        return <SecurityTab />;
      case "payment":
        return <PaymentMethodTab />;
      case "notification":
        return <NotificationTab />;
      default:
        return null;
    }
  };

  return (
    <section className={`dashboard-section ${activeLefMenu && "body-collapse"} account`}>
      <div className="overlay pt-120">
        <div className="container-fruid">
          <div className="main-content">
            <div className="row">
              {/*  <div className="col-xxl-3 col-xl-4 col-md-6">
              <OwnerDetails formData={formData} />  
              </div> */}
              <div className="col-xxl-12 col-xl-12">
                <div className="tab-main">
                  <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        className={`nav-link ${activeStep === 'account' ? "active" : ""}`}
                        onClick={() => switchStep("account")}
                      >
                      Account
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className={`nav-link ${activeStep === "security" ? "active" : ""}`}
                        onClick={() => switchStep("security")}
                      >
                      Security
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className={`nav-link ${activeStep === "payment" ? "active" : ""}`}
                        onClick={() => switchStep("payment")}
                      >
                      Payment
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className={`nav-link ${activeStep === "notification" ? "active" : ""}`}
                        onClick={() => switchStep("notification")}
                      >
                      Notification
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content mt-40">{renderTabContent()}</div>
                </div>
              </div>
            </div>
          </div>
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
    // <section className={`dashboard-section ${activeLefMenu && "body-collapse"} account`}>
    //   <div className="overlay pt-120">
    //     <div className="container-fruid">
    //       <div className="main-content">
    //         <div className="row">
    //           {/*  <div className="col-xxl-3 col-xl-4 col-md-6">
    //           <OwnerDetails formData={formData} />  
    //           </div> */}
    //           <div className="col-xxl-12 col-xl-12">
    //             <div className="tab-main">
    //               <ul className="nav nav-tabs" role="tablist">
    //                 <li className="nav-item" role="presentation">
    //                   <button
    //                     className={`nav-link ${activeStep === 1 ? "active" : ""}`}
    //                     onClick={() => switchStep(1)}
    //                   >
    //                   Company registration Certificate 
    //                   </button>
    //                 </li>
    //                 <li className="nav-item" role="presentation">
    //                   <button
    //                     className={`nav-link ${activeStep === 2 ? "active" : ""}`}
    //                     onClick={() => switchStep(2)}
    //                   >
    //                   Owner Detail
    //                   </button>
    //                 </li>
    //                 <li className="nav-item" role="presentation">
    //                   <button
    //                     className={`nav-link ${activeStep === 3 ? "active" : ""}`}
    //                     onClick={() => switchStep(3)}
    //                   >
    //                   Company PAN
    //                   </button>
    //                 </li>
    //                 <li className="nav-item" role="presentation">
    //                   <button
    //                     className={`nav-link ${activeStep === 4 ? "active" : ""}`}
    //                     onClick={() => switchStep(4)}
    //                   >
    //                   Owner PAN
    //                   </button>
    //                 </li>
    //                 <li className="nav-item" role="presentation">
    //                   <button
    //                     className={`nav-link ${activeStep === 5 ? "active" : ""}`}
    //                     onClick={() => switchStep(5)}
    //                   >
    //                   Owner aadhar
    //                   </button>
    //                 </li>
    //                 <li className="nav-item" role="presentation">
    //                   <button
    //                     className={`nav-link ${activeStep === 6 ? "active" : ""}`}
    //                     onClick={() => switchStep(6)}
    //                   >
    //                   Website
    //                   </button>
    //                 </li>
    //                 <li className="nav-item" role="presentation">
    //                   <button
    //                     className={`nav-link ${activeStep === 7 ? "active" : ""}`}
    //                     onClick={() => switchStep(7)}
    //                   >
    //                   Nature of business
    //                   </button>
    //                 </li>
    //                 <li className="nav-item" role="presentation">
    //                   <button
    //                     className={`nav-link ${activeStep === 8 ? "active" : ""}`}
    //                     onClick={() => switchStep(8)}
    //                   >
    //                   Bank details
    //                   </button>
    //                 </li>
    //               </ul>
    //               <div className="tab-content mt-40">{renderTabContent()}</div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <Snackbar
    //     open={snackbarOpen}
    //     autoHideDuration={6000}
    //     onClose={() => setSnackbarOpen(false)}
    //   >
    //     <SnackbarContent
    //       message={snackbarMessage}
    //       style={{
    //         backgroundColor: snackbarType === "success" ? "#4CAF50" : "#f44336",
    //       }}
    //     />
    //   </Snackbar>
    // </section>
  );
};

export default AccountMain;