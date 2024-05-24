// import React, { useState } from "react";
// import { useDropzone } from "react-dropzone";
// import Image from "next/image";
// import confirm from "/public/images/icon/confirm.png";
// import not_confirm from "/public/images/icon/not-confirm.png";
// import pending from "/public/images/icon/pending.png";
// import owner_profile_2 from "/public/images/owner-profile-2.png";

// const AccountTab = ({ formData, handleFormSubmit, handleInputChange }) => {
//   const [file, setFile] = useState(null);

//   const onDrop = (acceptedFiles) => {
//     setFile(acceptedFiles[0]);
//   };

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//   return (
//     <div className="tab-pane fade show active" id="account" role="tabpanel" aria-labelledby="account-tab">
//       <div className="upload-avatar">
//         <div className="avatar-left d-flex align-items-center">
//           <div className="profile-img">
//             <Image src={owner_profile_2} alt="image" />
//           </div>
//           <div className="instraction">
//             <h6>{formData.fname}</h6>
//             <p>Profile picture size: 400px x 400px</p>
//           </div>
//         </div>
//         <div className="avatar-right">
//           <div className="file-upload" {...getRootProps()}>
//             <input {...getInputProps()} />
//             {isDragActive ? (
//               <p>Drop the file here ...</p>
//             ) : (
//               <>
//                 <label className="file">
//                   <input type="file" {...getInputProps()} />
//                   <span className="file-custom"></span>
//                 </label>
//                 {file && <img src={URL.createObjectURL(file)} alt="Avatar" />}
//                 {!file && <p>Click to select or drag & drop a file</p>}
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//       <form action="#" onSubmit={handleFormSubmit}>
//         <div className="row justify-content-center">
//           <div className="col-md-6">
//             <div className="single-input">
//               <label htmlFor="fname1">First Name</label>
//               <input type="text" id="fname1" placeholder="Alfred" name="fname" value={formData.fname} onChange={handleInputChange}/>
//             </div>
//           </div>
//           <div className="col-md-6">
//             <div className="single-input">
//               <label htmlFor="lname1">Last Name</label>
//               <input type="text" id="lname1" placeholder="Davis" name="lname" value={formData.lname} onChange={handleInputChange}/>
//             </div>
//           </div>
//           <div className="col-md-12">
//             <div className="single-input">
//               <label htmlFor="email1">Email</label>
//               <div className="row input-status d-flex align-items-center">
//                 <div className="col-6">
//                   <input
//                     type="text"
//                     id="email1"
//                     name="email"
//                     placeholder="alfred6598@gmail.com"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                   />
//                 </div>
//                 <div className="col-6">
//                   <span className="pending">
//                     <Image src={pending} alt="icon" />
//                     E-mail confirmation in pending
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-12">
//             <div className="single-input">
//               <label htmlFor="phone1">Phone</label>
//               <div className="row input-status d-flex align-items-center">
//                 <div className="col-6">
//                   <input type="text" id="phone1" placeholder="(316) 555-0116" name="phone_number" value={formData.phone_number} onChange={handleInputChange}/>
//                 </div>
//                 <div className="col-6">
//                   <span className="confirm">
//                     <Image src={confirm} alt="icon" />
//                     Phone number confirm
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-12">
//             <div className="single-input file">
//               <label>ID Confirmation documents</label>
//               <div className="row input-status d-flex align-items-center">
//                 <div className="col-6">
//                   <div className="file-upload">
//                     <div className="right-area">
//                       <label className="file">
//                         <input type="file" />
//                         <span className="file-custom"></span>
//                       </label>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-6">
//                   <span className="notconfirm">
//                     <Image src={not_confirm} alt="icon" />
//                     Person not confirmed
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="col-md-12">
//             <div className="single-input">
//               <label htmlFor="address">Address</label>
//               <input
//                 type="text"
//                 id="address"
//                 name="address"
//                 placeholder="2972 Westheimer Rd. Santa Ana, Illinois 85486"
//                 value={formData.address}
//                 onChange={handleInputChange}
//               />
//             </div>
//           </div>
//           <div className="col-md-12">
//             <div className="btn-border">
//               <button className="cmn-btn">Account</button>
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AccountTab;

/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import confirm from "/public/images/icon/confirm.png";
import not_confirm from "/public/images/icon/not-confirm.png";
import pending from "/public/images/icon/pending.png";
import owner_profile_2 from "/public/images/avatar-2.png";
import axios from "axios";

const AccountTab = ({ formData, handleFormSubmit, handleInputChange, handleSnackbarOpen, fetchProfile }) => {
  const [file, setFile] = useState(null);
  const BASEURL = "http://localhost:8080";

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const handleSubmit = async (e) => {
    try {
      const accessToken = window.localStorage.getItem("accessToken");
      const headers = {
        authorization: accessToken,
      };
      console.log(file)
      const formData = new FormData();
      formData.append("profile_picture", file);
      console.log(formData);
      const response = await axios.post(
        `${BASEURL}/merchant/updateprofilepicture`,
        formData,
        { headers: headers }
      );
      handleSnackbarOpen("Profile Updated Successfully", "success")

      setTimeout(() => {
        fetchProfile();
      }, 1000);
      console.log("Profile Picture updated successfully:", response.data);
    } catch (error) {
      handleSnackbarOpen("Please Fill All the Fields", "error");
      console.error("Error updating profile:", error);
    }
  };

  const handleSelectClick = (e) => {
    e.preventDefault();
    // Handle your select logic here (if needed)
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="tab-pane fade show active" id="account" role="tabpanel" aria-labelledby="account-tab">
      <div className="upload-avatar">
        <div className="avatar-left d-flex align-items-center">
          <div className="profile-img">
            {formData ? (
              <img src={formData?.profile_url} alt="Uploaded Avatar" width={100} height={100} style={{ borderRadius: '5px' }} />
            ) : (
              <Image src={owner_profile_2} alt="Default Avatar" />
            )}
          </div>
          <div className="instraction">
            <h6>{formData.fname}</h6>
            <p>Profile picture size: 400px x 400px</p>
          </div>
        </div>
        <div className="avatar-right">
          <form onSubmit={handleSubmit}>
            <div className="file-upload d-flex align-items-center" >
              {isDragActive ? (
                <p>Drop the file here ...</p>
              ) : (
                <>
                  <div {...getRootProps()}>
                    <label className="file">
                      <input type="file" name="profile_picture" onChange={(e) => setFile(e.target.files[0])}  {...getInputProps()} />
                    </label>
                    <button className="cmn-btn" onClick={handleSelectClick} style={{ marginRight: '10px' }}>
                      Select
                    </button>
                  </div>
                  <button className="cmn-btn" type="button" onClick={handleSubmit}>
                    Update
                  </button>
                </>
              )}
            </div>

          </form>
        </div>
      </div>
      <form>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="single-input">
              <label htmlFor="fname1">First Name</label>
              <input type="text" id="fname1" placeholder="Alfred" name="fname" value={formData.fname} onChange={handleInputChange} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="single-input">
              <label htmlFor="lname1">Last Name</label>
              <input type="text" id="lname1" placeholder="Davis" name="lname" value={formData.lname} onChange={handleInputChange} />
            </div>
          </div>
          <div className="col-md-12">
            <div className="single-input">
              <label htmlFor="email1">Email</label>
              <div className="row input-status d-flex align-items-center">
                <div className="col-6">
                  <input
                    type="text"
                    id="email1"
                    name="email"
                    placeholder="alfred6598@gmail.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-6">
                  <span className="pending">
                    <Image src={pending} alt="icon" />
                    E-mail confirmation in pending
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="single-input">
              <label htmlFor="phone1">Phone</label>
              <div className="row input-status d-flex align-items-center">
                <div className="col-6">
                  <input type="text" id="phone1" placeholder="(316) 555-0116" name="phone_number" value={formData.phone_number} onChange={handleInputChange} />
                </div>
                <div className="col-6">
                  <span className="confirm">
                    <Image src={confirm} alt="icon" />
                    Phone number confirm
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="single-input file">
              <label>ID Confirmation documents</label>
              <div className="row input-status d-flex align-items-center">
                <div className="col-6">
                  <div className="file-upload">
                    <div className="right-area">
                      <label className="file">
                        <input type="file" />
                        <span className="file-custom"></span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <span className="notconfirm">
                    <Image src={not_confirm} alt="icon" />
                    Person not confirmed
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="single-input">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="2972 Westheimer Rd. Santa Ana, Illinois 85486"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-md-12">
            <div className="btn-border">
              <button className="cmn-btn">Account</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AccountTab;