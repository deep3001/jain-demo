import { PaylioContext } from "@/context/context";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { FaCog, FaSignOutAlt, FaSortDown } from "react-icons/fa";
import avatar_2 from "/public/images/avatar-2.png";
import avatar from "/public/images/avatar-2.png";
import { useRouter } from "next/router";
import axios from "axios";

const UserArea = () => {
  const { userActiveHandler, userActive } = useContext(PaylioContext);
  const router = useRouter();
  const logout = () => {
    // Perform your logout logic here, and remove the access token from local storage
    localStorage.removeItem("accessToken");
    window.location.reload();
    // Redirect to the login page after logout
    router.push("/login"); // Replace with your actual login route
  };

  const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone_number: "",
    address: "",
    profile_url: ""
  });

  const fetchProfile = async () => {
    try {
      const accessToken = window.localStorage.getItem("accessToken");
      const headers = {
        authorization: accessToken,
      };

      const response = await axios.get(
        `${BASEURL}/merchant/profile`,
        {
          headers: headers,
        }
      );
      console.log(response.data.data);

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
    //   const intervalId = setInterval(() => {
    //     fetchProfile();
    // }, 10000);

    // return () => clearInterval(intervalId);
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="single-item user-area">
      <div className="profile-area d-flex align-items-center">
        <span className="user-profile">
        {formData && formData.profile_url ? (
            <Image src={formData?.profile_url} alt="User" width={60} height={40} onClick={userActiveHandler} style={{ borderRadius: '5px' }} />
          ) : (
            <Image src={avatar_2} alt="Default Avatar" onClick={userActiveHandler} />
          )}
        </span>
        <i className="ms-0">
          <FaSortDown />
        </i>
      </div>
      <div className={`main-area user-content ${userActive && "active"}`}>
        <div className="head-area d-flex align-items-center">
          <div className="profile-img">
          {formData && formData.profile_url ? (
              <Image src={formData?.profile_url} width={80} height={100} alt="User" style={{ borderRadius: '5px' }} />
            ) : (
              <Image src={avatar_2} alt="Default Avatar" />
            )}
          </div>
          <div className="profile-head">
            <Link href="#">
              <h5>Kevin Martin</h5>
            </Link>
            <p className="wallet-id">Wallet ID: 6264849965</p>
          </div>
        </div>
        <ul>
          <li className="border-area">
            <Link href="/account" className="d-flex align-items-center gap-2">
              <FaCog />
              Settings
            </Link>
          </li>
          <li>
            <Link onClick={logout} href="#" className="d-flex align-items-center gap-2">
              <FaSignOutAlt />
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserArea;
