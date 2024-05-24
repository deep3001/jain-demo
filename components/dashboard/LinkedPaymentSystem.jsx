import Image from "next/image";
import Link from "next/link";
import add_new from "/public/images/add-new.png";
import blockchain_card from "/public/images/blockchain-card.png";
import option from "/public/images/icon/option.png";
import paylio_card from "/public/images/paylio-card.png";
import paypal_card from "/public/images/paypal-card.png";
import visa_card from "/public/images/visa-card.png";

const LinkedPaymentSystem = () => {
  return (
    <>
      <div className="section-text d-flex align-items-center justify-content-between">
        <h6>Linked Payment system</h6>
        <div className="right-side">
          <div className="dropdown-area">
            <button
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <Image src={option} alt="icon" />
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <Link className="dropdown-item" href="/account">
                  Update
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" href="#">
                  Virtual card
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <div className="single-card">
            <button
              type="button"
              className="reg w-100"
              data-bs-toggle="modal"
              data-bs-target="#cardMod"
            >
              <Image src={visa_card} alt="image" className="w-100" />
            </button>
          </div>
        </div>
        <div className="col-6">
          <div className="single-card">
            <button
              type="button"
              className="reg w-100"
              data-bs-toggle="modal"
              data-bs-target="#cardMod"
            >
              <Image src={paylio_card} alt="image" className="w-100" />
            </button>
          </div>
        </div>
        <div className="col-6">
          <div className="single-card">
            <button
              type="button"
              className="reg w-100"
              data-bs-toggle="modal"
              data-bs-target="#cardMod"
            >
              <Image src={paypal_card} alt="image" className="w-100" />
            </button>
          </div>
        </div>
        <div className="col-6">
          <div className="single-card">
            <button
              type="button"
              className="reg w-100"
              data-bs-toggle="modal"
              data-bs-target="#cardMod"
            >
              <Image src={blockchain_card} alt="image" className="w-100" />
            </button>
          </div>
        </div>
        <div className="col-6">
          <div className="single-card">
            <button
              type="button"
              className="reg w-100"
              data-bs-toggle="modal"
              data-bs-target="#addcardMod"
            >
              <Image src={add_new} alt="image" className="w-100" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LinkedPaymentSystem;
