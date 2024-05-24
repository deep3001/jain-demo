import { PaylioContext } from "@/context/context";
import dynamic from "next/dynamic";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Grid, Paper } from "@mui/material";
import TodaysOrdersBox from "./todays-order-box";
import TodaysCompletedOrdersBox from "./todays-completed-order-box";
import TodaysFailedOrdersBox from "./todays-failed-order-box";
import TodaysLoadedFunds from "./todays-loaded-funds";
import TotalOrdersBox from "./total-orders-box";
import TotalLoadedFunds from "./total-loaded-funds";
import AccountDetails from "./AccountDetails";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const DashboardMain = () => {
  const { activeLefMenu } = useContext(PaylioContext);
  const [dummy, setDummy] = useState({});
  const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

  const fetchDummyData = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        window.location.href = "/auth/login/modern"; // Redirect to login if token is not available
        return;
      }
      const headers = {
        Authorization: token,
      };

      const response = await axios.get(`${BASEURL}/admin/dashboardData`, { headers });
      setDummy(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDummyData();
  }, []);

  const options = {
    labels: ["Send", "Receive", "Payment", "Deposit", "Withdraw"],
    dataLabels: {
      enabled: false,
    },
  };
  const series = [44, 55, 13, 33, 22];

  return (
    <section className={`dashboard-section ${activeLefMenu && "body-collapse"}`}>
      <div className="overlay pt-120">
        <div className="container-fluid">
          <div className="row">
            {/* Account Details */}
            <div className="col-lg-6">
              <div className="section-content">
                <div className="acc-details">
                  <AccountDetails />
                </div>
              </div>
            </div>

            {/* Cards */}
            <div className="col-lg-6">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper elevation={1} className="p-3">
                    <div className="row">
                      <div className="col-lg-4">
                        <TodaysOrdersBox amount={dummy.todaysOrders || { todaysOrder: 0 }} />
                      </div>
                      <div className="col-lg-4">
                        <TodaysCompletedOrdersBox amount={dummy.todaysCompletedOrders || { todaysOrder: 0 }} />
                      </div>
                      <div className="col-lg-4">
                        <TodaysFailedOrdersBox amount={dummy.todaysFailedOrders || { todaysOrder: 0 }} />
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-lg-4">
                        <TodaysLoadedFunds amount={dummy.todaysLoadedFunds || { todaysOrder: 0 }} />
                      </div>
                      <div className="col-lg-4">
                        <TotalOrdersBox amount={dummy.totalOrders || { todaysOrder: 0 }} />
                      </div>
                      <div className="col-lg-4">
                        <TotalLoadedFunds amount={dummy.totalLoadedFunds || { todaysOrder: 0 }} />
                      </div>
                    </div>
                  </Paper>
                </Grid>
              </Grid>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <div className="section-content">
                <div className="transactions-area mt-40">
                  <Chart options={options} series={series} type="donut" width="100%" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardMain;
