import { useRouter } from "next/router";
import AddCardModal from "./modal/AddCardModal";
import AddRecipientsModal from "./modal/AddRecipientsModal";
import CardModal from "./modal/CardModal";
import CongratulationsModal from "./modal/CongratulationsModal";
import PurchasedModal from "./modal/PurchasedModal";
import RecipientsModal from "./modal/RecipientsModal";
import TransactionModal from "./modal/TransactionModal";
import TransferModal from "./modal/TransferModal";
import NavBar from "./navBar/NavBar";
import Preloader from "./preloader/Preloader";
import { useEffect } from "react";

export const Layout = ({ children }) => {
  const router = useRouter();

  // Check for the access token and update userHasAccessToken state
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const isRegisterPage = router.pathname === "/register";
    console.log(router.pathname)
    if (!accessToken && !isRegisterPage) {
      console.log("Access token");
      router.push("/login");
    }
  }, [router]);

  return (
    <>
      <Preloader />
      <RecipientsModal />
      <TransferModal />
      <PurchasedModal />
      <CongratulationsModal />
      <AddCardModal />
      <CardModal />
      <TransactionModal />
      <AddRecipientsModal />
      <NavBar />
      {children}
    </> 
  );
};

export default Layout;
