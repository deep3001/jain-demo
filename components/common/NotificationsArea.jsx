import { PaylioContext } from "@/context/context";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { FaCaretRight } from "react-icons/fa";
import bell from "/public/images/icon/bell.png";
import master_card from "/public/images/master-card.png";
import user_1 from "/public/images/user-1.png";
import user_2 from "/public/images/user-2.png";
import user_3 from "/public/images/user-3.png";

const NotificationsArea = () => {
  const { notificationActiveHandler, notificationActive } =
    useContext(PaylioContext);

  return (
    <div className="single-item notifications-area">
      <div className="notifications-btn">
        <Image
          src={bell}
          className="bell-icon"
          alt="icon"
          onClick={notificationActiveHandler}
        />
      </div>
      <div
        className={`main-area notifications-content ${
          notificationActive && "active"
        }`}
      >
        <div className="head-area d-flex justify-content-between">
          <h5>Notifications</h5>
          <span className="mdr">4</span>
        </div>
        <ul>
          <li>
            <Link href="#" className="d-flex">
              <div className="img-area">
                <Image src={user_1} className="max-un" alt="image" />
              </div>
              <div className="text-area">
                <p className="mdr">
                  You received a payment of <b>$134.00</b> from{" "}
                  <b>Anna Green</b>
                </p>
                <p className="mdr time-area">09.39AM</p>
              </div>
            </Link>
            <FaCaretRight />
          </li>
          <li>
            <Link href="#" className="d-flex">
              <div className="img-area">
                <Image src={user_2} className="max-un" alt="image" />
              </div>
              <div className="text-area">
                <p className="mdr">
                  <b>James Deed</b> requested a payment of
                  <b>£890.00</b>
                </p>
                <p className="mdr time-area">08.09AM</p>
              </div>
            </Link>
            <FaCaretRight />
          </li>
          <li>
            <Link href="#" className="d-flex">
              <div className="img-area">
                <Image src={master_card} className="max-un" alt="image" />
              </div>
              <div className="text-area">
                <p className="mdr">
                  Your new payment method has beed added successfully
                </p>
                <p className="mdr time-area">09.39AM</p>
              </div>
            </Link>
            <FaCaretRight />
          </li>
          <li>
            <Link href="#" className="d-flex">
              <div className="img-area">
                <Image src={user_3} className="max-un" alt="image" />
              </div>
              <div className="text-area">
                <p className="mdr">
                  You received a payment of <b>$250.00</b> from Goerge Michael
                </p>
                <p className="mdr time-area">Yesterday</p>
              </div>
            </Link>
            <FaCaretRight />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NotificationsArea;
