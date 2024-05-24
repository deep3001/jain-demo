import Image from "next/image";
import Link from "next/link";
import support_icon from "/public/images/icon/support-icon.png";

const StepThree = () => {
  return (
    <section className="dashboard-section body-collapse pay step step-3 crypto deposit-money">
      <div className="overlay pt-120">
        <div className="container-fruid">
          <div className="main-content">
            <div className="head-area d-flex align-items-center justify-content-between">
              <h4>Deposit Money</h4>
              <div className="icon-area">
                <Image src={support_icon} alt="icon" />
              </div>
            </div>
            <div className="row justify-content-between pb-120">
              <div className="col-xl-3 col-lg-4">
                <div className="left-area">
                  <ul>
                    <li>
                      <Link
                        href="/deposit-money/step-1"
                        className="single-link active"
                      >
                        Choose Payment Method
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/deposit-money/step-2"
                        className="single-link active"
                      >
                        Enter amount
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/deposit-money/step-3"
                        className="single-link active last"
                      >
                        Confirm Order
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-8 col-lg-8">
                <form action="#">
                  <div className="payment-details">
                    <div className="top-area">
                      <h6>Confirm account & amount</h6>
                      <div className="right">
                        <Link href="#">
                          <i className="icon-h-edit"></i>
                          Edit
                        </Link>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xxl-8 col-xl-9 col-lg-12">
                        <ul className="details-list">
                          <li>
                            <span>Payment System</span>
                            <b>Paypal</b>
                          </li>
                          <li>
                            <span>Paypal Payment Card</span>
                            <b>**** **** **** 1182</b>
                          </li>
                          <li>
                            <span>You will receive</span>
                            <b>400.00 USD</b>
                          </li>
                          <li>
                            <span>Fee</span>
                            <b>1 USD</b>
                          </li>
                          <li>
                            <span>E-mail</span>
                            <b>felicia.reid@example.com</b>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="checkbox-area mt-40 d-flex align-items-center justify-content-center">
                    <input type="checkbox" id="accept" name="accept" />
                    <label htmlFor="accept">
                      I accept <Link href="#">terms of use</Link>
                    </label>
                  </div>
                  <div className="footer-area mt-40">
                    <Link href="/deposit-money/step-2">Previous Step</Link>
                    <Link
                      href="#"
                      className="active"
                      data-bs-toggle="modal"
                      data-bs-target="#congratulationsMod"
                    >
                      Next
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepThree;
