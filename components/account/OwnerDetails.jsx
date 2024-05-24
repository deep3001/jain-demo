

import Image from "next/image";
import Link from "next/link";
import delete_2 from "/public/images/icon/delete-2.png";
import owner_profile from "/public/images/owner-profile.png";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const OwnerDetails = ({formData}) => {
  const router = useRouter();
  

  // Check for the access token and update userHasAccessToken state
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken ) {
      router.push("/login");
    }
  }, [router]);

  // Log out the user
  const logout = () => {
    // Perform your logout logic here, and remove the access token from local storage
    localStorage.removeItem("accessToken");
    window.location.reload();
    // Redirect to the login page after logout
    router.push("/login"); // Replace with your actual login route
  };

  return (
    <div className="owner-details">
      <div className="profile-area">
        <div className="profile-img">
          <Image src={owner_profile} alt="image" />
        </div>
        <div className="name-area">
          <h6>{formData.fname}</h6>
          <p className="active-status">Active</p>
        </div>
      </div>
      <div className="owner-info">
        <ul>
          <li>
            <p>Account ID:</p>
            <span className="mdr">Rex49484</span>
          </li>
          <li>
            <p>Joined:</p>
            <span className="mdr">Aug 25, 2021</span>
          </li>
          <li>
            <p>Confirm status:</p>
            <span className="mdr">80%</span>
          </li>
        </ul>
      </div>
      <div className="owner-action">
        <Link href="#">
          <Image src={delete_2} alt="image" />
          Delete Account
        </Link>
        <Box>
          <Button onClick={logout} variant="outlined">
            Logout
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default OwnerDetails;

