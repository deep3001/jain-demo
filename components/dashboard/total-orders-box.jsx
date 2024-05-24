import PropTypes from "prop-types";
// import ArrowRightIcon from "@untitled-ui/icons-react/build/esm/ArrowRight";
import {
  Box,
  Button,
  Card,
  Chip,
  CardActions,
  Divider,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import Link from "next/link";
// import { paths } from "../../../paths";
// import SetDummyData from "./set-dummy-data";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";

export const TotalOrdersBox = (props) => {
  const { amount} = props;
  console.log(amount);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [openDataForm, setOpenDataForm] = useState(false);

  const handleClick = () => {
    setOpenDataForm(true);
  };

  const handleDataSubmit = async (data) => {
    try {
      console.log("Entered Data --> ", data);

      const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
      const token = localStorage.getItem("accessToken");
      const headers = {
        Authorization: token,
      };

      const response = await axios.post(
        `${BASEURL}/api/Dummy/createDummyData`,
        data,
        { headers }
      );
      console.log(response.data);

      if (response.status === 200) {
        enqueueSnackbar("Data Set Successful", { variant: "success" });
        // Trigger hard refresh after displaying the snackbar
        await fetchDummyData();
      } else {
        enqueueSnackbar(response, { variant: "error" });
      }
    } catch (error) {
      // console.error("Error placing order:", error);
    }
  };

  return (
    <Card>
      <Stack
        alignItems="center"
        direction={{
          xs: "column",
          sm: "row",
        }}
        spacing={3}
        sx={{
          px: 2,
          py: 3,
          height:"100%"
        }}
      >
        <Box sx={{ flexGrow: 2 }}>
        <Typography color="text.secondary" variant="body2">
        Total Orders
        </Typography> 
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography color="text.primary" variant="h4">
            {amount.totalOrder}
          </Typography>
          <div
          style={{
            marginLeft: "8px",
            height: "3px",
            width: "40px",
            backgroundColor: "#4caf50", // Change color as needed
          }}
        />
          </div>
        </Box>
      </Stack>
      <Divider />
    </Card>
  );
};

TotalOrdersBox.propTypes = {
  // amount: PropTypes.array.isRequired,
  // fetchDummyData: PropTypes.func.isRequired,
};

export default TotalOrdersBox;