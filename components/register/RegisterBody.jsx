import Image from "next/image";
import Link from "next/link";
import BusinessTab from "./BusinessTab";
import PersonalTab from "./PersonalTab";
import left_icon from "/public/img/left-icon.png";
import logo from "/public/images/logo.png";

const RegisterBody = () => {
  return (
    <section className="log-reg">
      <div className="overlay pb-120">
        <div className="container">
          <div className="top-head-area">
            <div className="row d-flex align-items-center">
              <div className="col-sm-5 col">
                <Link className="back-home" href="/" style={{ color: "white" }}>
                  <Image src={left_icon} alt="image" />
                  Back To Jain Wallet
                </Link>
              </div>
              <div className="col-sm-5 col">
                <Link href="/">
                  <Image src={logo} alt="image" />
                </Link>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-6 text-center">
              <div className="form-box">
                <h4>Register to Jain Wallet</h4>
                <p className="dont-acc">
                  Already have an account?{" "}
                  <Link href="/login">Login</Link>
                </p>
                <div className="tab-content mt-30" id="myTabContent">
                  <PersonalTab />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterBody;
