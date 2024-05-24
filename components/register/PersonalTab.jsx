import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import fb from "/public/img/fb.png";
import google from "/public/img/google.png";
import show_hide from "/public/img/show-hide.png";
import { useAuth } from "@/context/AuthContext";
import Alert from '@mui/material/Alert';

const PersonalTab = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [source, setSource] = useState("");
  const [mobile, setMobile] = useState("");

  const [resSuccessMesaage, setResSuccessMesaage] = useState("");
  const [errSuccessMesaage, setErrSuccessMesaage] = useState("");
  const [open, setOpen] = useState(false);
  const [errOpen, setErrOpen] = useState(false);
  const router = useRouter();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleSourceChange = (e) => {
    setSource(e.target.value);
  };

  const handleMobileChange = (e) => {
    setMobile(e.target.value);
  };

  const { register } = useAuth();

  const SenDLoginReq = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
      first_name,
      last_name,
      source,
      mobile,
    };

    try {
      const response = await register(data);
      console.log(response);
      if (response.status === 200) {
        setOpen(true);
        setResSuccessMesaage(response?.data.message);
        setTimeout(() => {
          router.push('/login');
        }, 3000);
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
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setSource("");
      setMobile("");
    }
  };

  return (
    <div className="tab-pane fade show active" id="personal" role="tabpanel" aria-labelledby="personal-tab">
      {errOpen && <Alert severity="error">{errSuccessMesaage}</Alert>}
      {open && <Alert severity="success">{resSuccessMesaage}</Alert>}

      <form onSubmit={SenDLoginReq}>
        <div className="row">
          <div className="col-12">
            <div className="single-input d-flex align-items-center">
              <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} required />
            </div>
          </div>
          <div className="col-12">
            <div className="single-input d-flex align-items-center">
              <input type={!showPassword ? "password" : "text"} className="passInput" placeholder="Password" value={password} onChange={handlePasswordChange} required />
              <Image className="showPass" src={show_hide} alt="image" onClick={() => setShowPassword(!showPassword)} />
            </div>
          </div>
          <div className="col-12">
            <div className="single-input d-flex align-items-center">
              <input type="text" placeholder="First Name" value={first_name} onChange={handleFirstNameChange} required />
            </div>
          </div>
          <div className="col-12">
            <div className="single-input d-flex align-items-center">
              <input type="text" placeholder="Last Name" value={last_name} onChange={handleLastNameChange} required />
            </div>
          </div>
          <div className="col-12">
            <div className="single-input d-flex align-items-center">
              <input type="text" placeholder="Source" value={source} onChange={handleSourceChange} required />
            </div>
          </div>
          <div className="col-12">
            <div className="single-input d-flex align-items-center">
              <input type="tel" placeholder="Mobile" value={mobile} onChange={handleMobileChange} required />
            </div>
          </div>
        </div>
        <div className="btn-area">
          <button type="submit" className="cmn-btn">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalTab;
