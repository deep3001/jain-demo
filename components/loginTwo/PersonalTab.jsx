import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import fb from "/public/img/fb.png";
import google from "/public/img/google.png";
import show_hide from "/public/img/show-hide.png";
import { useAuth } from "@/context/AuthContext";
import Alert from "@mui/material/Alert";

const PersonalTab = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resSuccessMesaage, setResSuccessMesaage] = useState("");
  const [errSuccessMesaage, setErrSuccessMesaage] = useState("");
  const [open, setOpen] = useState(false);
  const [errOpen, setErrOpen] = useState(false);
  const router = useRouter();

  const [userHasAccessToken, setUserHasAccessToken] = useState(false);

  // Check for the access token and update userHasAccessToken state
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken"); // Assuming you store the access token in localStorage
    if (accessToken) {
      setUserHasAccessToken(true);
    } else {
      setUserHasAccessToken(false);
    }
  }, []);

  const { login } = useAuth();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const SenDLoginReq = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await login(data);

      if (response.status === 200) {
        setOpen(true);
        setResSuccessMesaage(response?.data.message);
        // Redirect to a success page or perform other actions
      } else {
        setErrOpen(true);
        if (response.data && response.data.message) {
          setErrSuccessMesaage(response.data.message);
        } else {
          setErrSuccessMesaage("Something Went Wrong. Please try again.");
        }
      }
    } catch (error) {
      setErrOpen(true);
      setErrSuccessMesaage("Something went Wrong. Please try Again !");
      console.error(error);
    } finally {
      setEmail(""); // Reset the form fields
      setPassword("");
    }
  };

  return (
    <div
      className="tab-pane fade show active"
      id="personal"
      role="tabpanel"
      aria-labelledby="personal-tab"
    >
      {errOpen && <Alert severity="error">{errSuccessMesaage}</Alert>}
      {open && <Alert severity="success">{resSuccessMesaage}</Alert>}

      <form onSubmit={SenDLoginReq}>
        <div className="row">
          <div className="col-12">
            <div className="single-input d-flex align-items-center">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>
          </div>
          <div className="col-12">
            <div className="single-input d-flex align-items-center">
              <input
                type={!showPassword ? "password" : "text"}
                className="passInput"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <Image
                className="showPass"
                src={show_hide}
                alt="image"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          </div>
        </div>
        <div className="btn-area">
          <button type="submit" className="cmn-btn">
            Log in
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalTab;
