import { SiFampay } from "react-icons/si";
import { FaFirstOrder } from "react-icons/fa";
import { MdOutlineWifiProtectedSetup, MdOutlineMonitorHeart } from "react-icons/md"
import { CiExport } from "react-icons/ci";
import { IoCodeSlashSharp } from "react-icons/io5";
const iconStyle = {
  marginRight: '10px', // Adjust the value as needed
};
const leftSideMenuData = [
  {
    id: 1,
    icon: <i className="icon-dashboard"></i>,
    path: "/",
    name: "Dashboard",
    url: "/",
  },
  {
    id: 2,
    icon: <i className="icon-transaction"></i>,
    path: "transactions",
    name: "Transactions",
    url: "/transactions",
  },
  {
    id: 8,
    icon: <i className="icon-transaction"></i>,
    path: "addFund",
    name: "Add Fund",
    url: "/addFund",
  },
  {
    id: 22,
    icon: <i className="icon-account"></i>,
    path: "historyCredit",
    name: "Credit History",
    url: "/historyCredit",
  },
  {
    id: 3,
    icon: <FaFirstOrder style={iconStyle}/>,
    path: "payin",
    name: "Pay In",
    url: "/payin",
  },
  {
    id: 4,
    icon: <SiFampay style={iconStyle} />  ,
    path: "payout",
    name: "Pay Out",
    url: "/payout",
  },
  {
    id: 44,
    icon: <SiFampay style={iconStyle} />  ,
    path: "checkStatus",
    name: "Check Status",
    url: "/checkStatus",
  },
  {
    id: 54,
    icon: <MdOutlineWifiProtectedSetup style={iconStyle} />,
    path: "settlement",
    name: "Settlement",
    url: "/settlement",
  },
  // {
  //   id: 61,
  //   icon: <MdOutlineMonitorHeart style={iconStyle} />,
  //   path: "Confirmfirmaiton",
  //   name: "Confirmfirmaiton",
  //   url: "/confirmfirmaiton",
  // },
  {
    id: 55,
    icon: <CiExport style={iconStyle} />,
    path: "export",
    name: "Export",
    url: "/export",
  },
  {
    id: 56,
    icon: <IoCodeSlashSharp style={iconStyle} />,
    path: "payapi",
    name: "Payment API",
    url: "/payapi",
  },
  {
    id: 50,
    icon: <i className="icon-pay"></i>,
    path: "pay",
    name: "Pay",
    url: "/pay",
  },
  // {
  //   id: 6,
  //   icon: <i className="icon-receive"></i>,
  //   path: "receive",
  //   name: "Receive",
  //   url: "/receive/step-1",
  // },
  // {
  //   id: 7,
  //   icon: <i className="icon-exchange"></i>,
  //   path: "exchange",
  //   name: "Exchange",
  //   url: "/exchange/step-1",
  // },
  // {
  //   id: 8,
  //   icon: <i className="icon-recipients"></i>,
  //   path: "recipients",
  //   name: "Recipients",
  //   url: "/recipients",
  // },
  // {
  //   id: 9,
  //   icon: <i className="icon-crypto"></i>,
  //   path: "crypto",
  //   name: "Crypto",
  //   url: "/crypto",
  // },
  // {
  //   id: 10,
  //   icon: <i className="icon-deposit"></i>,
  //   path: "deposit-money",
  //   name: "Deposit Money",
  //   url: "/deposit-money/step-1",
  // },
  // {
  //   id: 11,
  //   icon: <i className="icon-withdraw"></i>,
  //   path: "withdraw-money",
  //   name: "Withdraw Money",
  //   url: "/withdraw-money/step-1",
  // },
];

export default leftSideMenuData;
