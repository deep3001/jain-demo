import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Select from "../select/Select";
import option from "/public/images/icon/option.png";
import { useEffect, useState } from "react";
import { getMerchentWallet, postDashboardAnaltycs } from "../Apis/Api";
import Alert from "@mui/material/Alert";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
const currency = [
  { id: 1, name: "US Dollar" },
  { id: 2, name: "US Dollar" },
  { id: 3, name: "US Dollar" },
];

const AccountDetails = () => {
  const [resSuccessMessage, setResSuccessMessage] = useState("");
  const [errSuccessMessage, setErrSuccessMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [errOpen, setErrOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [apiRes, setApiRes] = useState({});
  const router = useRouter();

  useEffect(() => {
    getApiData();
    getApiDataLast();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getApiData = async () => {
    try {
      setLoading(true);
      const response = await getMerchentWallet();

      if (response.status === 200) {
        setOpen(true);
        setApiRes(response?.data?.data);
        setResSuccessMessage(response.data.message);
        console.log(response);
        setTimeout(() => {
          setOpen(false);
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

  const [currentDateTime, setCurrentDateTime] = useState(null);
  const [sevenDaysAgoDateTime, setSevenDaysAgoDateTime] = useState(null);

  useEffect(() => {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);

    const formatDateTime = (date) => {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const seconds = date.getSeconds().toString().padStart(2, "0");
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    setCurrentDateTime(formatDateTime(today));
    setSevenDaysAgoDateTime(formatDateTime(sevenDaysAgo));
  }, []);

  const [resSuccessMessageAna, setResSuccessMessageAna] = useState("");
  const [errSuccessMessageAna, setErrSuccessMessageAna] = useState("");
  const [openAna, setOpenAna] = useState(false);
  const [errOpenAna, setErrOpenAna] = useState(false);
  const [loadingAna, setLoadingAna] = useState(true);
  const [apiResAna, setApiResAna] = useState({});
  const getApiDataLast = async () => {
    try {
      setLoadingAna(true);
      const response = await postDashboardAnaltycs(
        currentDateTime,
        sevenDaysAgoDateTime
      );
      console.log(response?.response?.data?.message);
      if (
        response?.response?.data?.message == "invalid token" ||
        response?.response?.data?.message == '"authorization" is required' ||
        response?.response?.data?.message == "invalid signature"
      ) {
        console.log('working');
        router.push("/login");
      }

      if (response.status === 200) {
        setOpenAna(true);
        setApiResAna(response?.data);
        console.log(
          response?.data,
          "response?.data?.data +++++++++++++++++++++"
        );
        setResSuccessMessageAna(response.data.message);

        setTimeout(() => {
          setOpenAna(false);
        }, 5000);
      } else {
        setErrOpenAna(true);
        setErrSuccessMessageAna(
          response.data.message || "Error: Something went wrong"
        );
      }
    } catch (error) {
      setErrOpenAna(true);
      setErrSuccessMessageAna(error?.response?.data?.message);
      setTimeout(() => {
        setErrOpenAna(false);
      }, 5000);
      console.log(error.message, "errr.mes");
    } finally {
      setLoadingAna(false);
    }
  };
  console.log(apiResAna, "apiResAna");

  return (
  <>
  <div className="top-area ">

  <div className="left-side" style={{ marginBottom: "10px" }}>
  <h5>Dashboard</h5>
  <h3 style={{ color: "white", marginBottom: "25px" }}>₹ {apiRes?.amount?.toFixed(2)}</h3>
  <div className="d-flex flex-column align-items-start">
    <h5 className="receive" style={{marginBottom: "10px"}}>
      Pending Settlement :{" "}
      <span>{apiRes?.hold_amount?.toFixed(2) || 0}</span>
    </h5>
    <h5 className="receive">
      Successful Settlement :{" "}
      <span>{apiResAna?.settelment?.success || 0}</span>
    </h5>
  </div>
</div>
    
    <div className="right-side">
      <div className="right-top">
        {/* Select */}
        <Select
          data={currency}
          btn="bg-transparent"
          btnText="fw-semibold text-white"
        />
        <div className="dropdown-area" style={{marginBottom: "35px"}}>
          <button
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <Image src={option} alt="icon" />
          </button>
          <ul
            className="dropdown-menu"
            aria-labelledby="dropdownMenuButton1"
          >
            <li>
              <Link className="dropdown-item" href="#">
                Fiat Currency
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" href="#">
                crypto Currency
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="right-bottom" >
        <Box m={1}>
          <h5>Payin : {apiResAna.payin || 0}</h5>
        </Box>
        <Box m={1}>
          <h5>Payouts : {apiResAna.payout || 0}</h5>
        </Box>
      </div>
    </div>

  </div>

  
  <div className="bottom-area">
  <div className="row">
    <div className="col-lg-12">
      <div className="left-side d-flex align-items-center justify-content-between">
        <Link href="/pay" className="cmn-btn" style={{ height: 'auto' }}>
          Transfer Money
        </Link>
        <Link href="/deposit-money/step-1" className="cmn-btn">
          Add Money
        </Link>
        <Link href="/withdraw-money/step-1" className="cmn-btn">
          Withdraw Money
        </Link>
      </div>
    </div>
  </div>
</div>


</>
  )

};

export default AccountDetails;
