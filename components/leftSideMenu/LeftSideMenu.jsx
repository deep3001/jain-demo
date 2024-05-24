import { PaylioContext } from "@/context/context";
import leftSideMenuData from "@/data/leftSideMenuData";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { FaTimes } from "react-icons/fa";
import invite_now_illus from "/public/images/invite-now-illus.png";
// import logo from "/public/images/logo.png";
import logonew from "@/public/images/svg/NEWLOGO1.svg"

const LeftSideMenu = () => {
  const { activeLefMenu, setActiveLefMenu, getPath } =
    useContext(PaylioContext);

  return (
    <div className={`sidebar-wrapper ${!activeLefMenu && "active"}`}>
      <div
        className="close-btn"
        onClick={() => setActiveLefMenu(!activeLefMenu)}
      >
        <i>
          <FaTimes />
        </i>
      </div>
      <div className="sidebar-logo" style={{ display: 'flex', justifyContent: 'center', maxWidth: '50%', margin: '0 auto' }}>
      <Link href="/">
      <Image 
      src={logonew} 
      alt="logo" />
    </Link>
      </div>
      <ul>
        {leftSideMenuData.map((itm) => (
          <li key={itm.id} className={getPath === itm.path ? "active" : ""}>
            <Link href={itm.url}>
              {/* <Image src={itm.icon} alt={itm.name} /> */}
              {itm.icon}
              <span>{itm.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      <ul className="bottom-item">
        <li className={getPath === "account" ? "active" : ""}>
          <Link href="/account">
            <i className="icon-account"></i> <span>Account</span>
          </Link>
        </li>
        <li>
          <Link href="#">
            <i className="icon-support"></i> <span>Support</span>
          </Link>
        </li>
        <li>
          <Link href="#">
            <i className="icon-quit"></i> <span>Quit</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default LeftSideMenu;
