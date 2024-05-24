import React, { useEffect, useState } from "react";
import { getPayInData } from "../Apis/Api";
import { useRouter } from "next/router";

const PayInTable = () => {
  const router = useRouter();
  const [resSuccessMessage, setResSuccessMessage] = useState("");
  const [errSuccessMessage, setErrSuccessMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [errOpen, setErrOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [apiRes, setApiRes] = useState({});

  const getApiData = async () => {
    try {
      setLoading(true);
      const response = await getPayInData();
     

      if (response.status === 200) {
        setOpen(true);
        setApiRes(response?.data?.data);
        setResSuccessMessage(response.data.message);
        
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
      console.log(error, "7777777777");

      setErrOpen(true);
      setErrSuccessMessage(error?.response?.data?.message);
      setTimeout(() => {
        setErrOpen(false);
      }, 5000);
      console.log(error.message, "errr.mes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);
  return (
    <div>
      PayInTable PayInTablePayInTable PayInTablePayInTable PayInTablePayInTable
      PayInTable
    </div>
  );
};

export default PayInTable;
