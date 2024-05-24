// import PropTypes from "prop-types";
// import { useState } from "react";
// import { useRouter } from "next/router";
// import { useSnackbar } from "notistack";
// import axios from "axios";
// import { Card, Divider, Stack, Typography } from "@mui/material";

// export const TodaysOrdersBox = ({ amount }) => {
//   const router = useRouter();
//   const { enqueueSnackbar } = useSnackbar();
//   const [openDataForm, setOpenDataForm] = useState(false);

//   const handleClick = () => {
//     setOpenDataForm(true);
//   };

//   const handleDataSubmit = async (data) => {
//     try {
//       console.log("Entered Data --> ", data);

//       const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;
//       const token = localStorage.getItem("accessToken");
//       const headers = {
//         Authorization: token,
//       };

//       const response = await axios.post(
//         `${BASEURL}/api/Dummy/createDummyData`,
//         data,
//         { headers }
//       );

//       console.log(response.data);

//       if (response.status === 200) {
//         enqueueSnackbar("Data Set Successful", { variant: "success" });
//         // Trigger hard refresh after displaying the snackbar
//         await fetchDummyData();
//       } else {
//         enqueueSnackbar(response, { variant: "error" });
//       }
//     } catch (error) {
//       console.error("Error placing order:", error);
//       enqueueSnackbar("Error placing order", { variant: "error" });
//     }
//   };

//   return (
//     <Card>
//       <Stack
//         alignItems="center"
//         direction={{
//           xs: "column",
//           sm: "row",
//         }}
//         spacing={3}
//         sx={{
//           px: 2,
//           py: 3,
//         }}
//       >
//         <div style={{ flexGrow: 2 }}>
//           <Typography color="text.secondary" variant="body2">
//             Todays Orders
//           </Typography>
//           <div style={{ display: "flex", alignItems: "center" }}>
//             <Typography color="text.primary" variant="h4">
//               {amount?.todaysOrder || 0}
//             </Typography>
//             <div
//               style={{
//                 marginLeft: "8px",
//                 height: "2px",
//                 width: "40px",
//                 backgroundColor: "#4caf50", // Change color as needed
//               }}
//             />
//           </div>
//         </div>
//       </Stack>
//       <Divider />
//     </Card>
//   );
// };

// TodaysOrdersBox.propTypes = {
//   amount: PropTypes.shape({
//     todaysOrder: PropTypes.number.isRequired,
//     // Add other required properties if any
//   }).isRequired,
// };

// export default TodaysOrdersBox;





import PropTypes from "prop-types";
import { Card, Divider, Stack, Typography } from "@mui/material";

export const TodaysOrdersBox = ({ amount }) => {
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
        }}
      >
        <div style={{ flexGrow: 2 }}>
          <Typography color="text.secondary" variant="body2">
            Todays Orders
          </Typography>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography color="text.primary" variant="h4">
              {amount.todaysOrder}
            </Typography>
            <div
              style={{
                marginLeft: "8px",
                height: "2px",
                width: "40px",
                backgroundColor: "#4caf50",
              }}
            />
          </div>
        </div>
      </Stack>
      <Divider />
    </Card>
  );
};

TodaysOrdersBox.propTypes = {
  amount: PropTypes.shape({
    todaysOrder: PropTypes.number.isRequired,
  }).isRequired,
};

export default TodaysOrdersBox;

