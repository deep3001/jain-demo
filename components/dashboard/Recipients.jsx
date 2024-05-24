import Image from "next/image";
import Link from "next/link";
import right_arrow from "/public/images/icon/right-arrow.png";
import recipients_1 from "/public/images/recipients-1.png";
import recipients_2 from "/public/images/recipients-2.png";
import recipients_3 from "/public/images/recipients-3.png";
import recipients_4 from "/public/images/recipients-4.png";

const Recipients = () => {
  return (
    <div className="single-item">
      <div className="section-text d-flex align-items-center justify-content-between">
        <h6>Recipients</h6>
        <div className="view-all d-flex align-items-center">
          <Link href="#">View All</Link>
          <Image src={right_arrow} alt="icon" />
        </div>
      </div>
      <ul className="recipients-item">
        <li>
          <p className="left d-flex align-items-center">
            <Image src={recipients_1} alt="icon" />
            <span className="info">
              <span>Phil King</span>
              <span>08:00 AM — 19 August</span>
            </span>
          </p>
          <p className="right">
            <span> +$345</span>
            <span>Payment</span>
          </p>
        </li>
        <li>
          <p className="left d-flex align-items-center">
            <Image src={recipients_2} alt="icon" />
            <span className="info">
              <span>Debra Wilson</span>
              <span>08:00 AM — 19 August</span>
            </span>
          </p>
          <p className="right">
            <span className="loss">-$850</span>
            <span>Refund</span>
          </p>
        </li>
        <li>
          <p className="left d-flex align-items-center">
            <Image src={recipients_3} alt="icon" />
            <span className="info">
              <span>Philip Henry</span>
              <span>08:00 AM — 19 August</span>
            </span>
          </p>
          <p className="right">
            <span>+$2.050</span>
            <span>Payment</span>
          </p>
        </li>
        <li>
          <p className="left d-flex align-items-center">
            <Image src={recipients_4} alt="icon" />
            <span className="info">
              <span>Erin Garcia</span>
              <span>08:00 AM — 19 August</span>
            </span>
          </p>
          <p className="right">
            <span> +$900</span>
            <span>Payment</span>
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Recipients;
