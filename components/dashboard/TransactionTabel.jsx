import Image from "next/image";
import Link from "next/link";
import right_arrow from "/public/images/icon/right-arrow.png";

const TransactionTabel = () => {
  return (
    <>
      <div className="section-text">
        <h5>Transactions </h5>
        <p>Updated every several minutes</p>
      </div>
      <div className="top-area d-flex align-items-center justify-content-between">
        <ul className="nav nav-tabs" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="latest-tab"
              data-bs-toggle="tab"
              data-bs-target="#latest"
              type="button"
              role="tab"
              aria-controls="latest"
              aria-selected="true"
            >
              Latest
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="upcoming-tab"
              data-bs-toggle="tab"
              data-bs-target="#upcoming"
              type="button"
              role="tab"
              aria-controls="upcoming"
              aria-selected="false"
            >
              Upcoming
            </button>
          </li>
        </ul>
        <div className="view-all d-flex align-items-center">
          <Link href="#">View All</Link>
          <Image src={right_arrow} alt="icon" />
        </div>
      </div>
      <div className="tab-content mt-40">
        <div
          className="tab-pane fade show active"
          id="latest"
          role="tabpanel"
          aria-labelledby="latest-tab"
        >
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name/ Business</th>
                  <th scope="col">Date</th>
                  <th scope="col">Status</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr data-bs-toggle="modal" data-bs-target="#transactionsMod">
                  <th scope="row">
                    <p>Bangkok Bank</p>
                    <p className="mdr">Withdraw to bank account</p>
                  </th>
                  <td>
                    <p>03:00 PM</p>
                    <p className="mdr">10 Mar 2022</p>
                  </td>
                  <td>
                    <p className="inprogress">In Progress</p>
                  </td>
                  <td>
                    <p>-$520</p>
                    <p className="mdr">$3.0</p>
                  </td>
                </tr>
                <tr data-bs-toggle="modal" data-bs-target="#transactionsMod">
                  <th scope="row">
                    <p>Envato Pty Ltd</p>
                    <p className="mdr">Marketplace Payment Received</p>
                  </th>
                  <td>
                    <p>04:30 PM</p>
                    <p className="mdr">01 Mar 2022</p>
                  </td>
                  <td>
                    <p className="completed">Completed</p>
                  </td>
                  <td>
                    <p>+$450</p>
                    <p className="mdr">No Fees</p>
                  </td>
                </tr>
                <tr data-bs-toggle="modal" data-bs-target="#transactionsMod">
                  <th scope="row">
                    <p>Mailchimp</p>
                    <p className="mdr">Subscription Service Payment</p>
                  </th>
                  <td>
                    <p>01:15 PM</p>
                    <p className="mdr">25 Mar 2022</p>
                  </td>
                  <td>
                    <p className="completed">Completed</p>
                  </td>
                  <td>
                    <p>-$100</p>
                    <p className="mdr">No Fees</p>
                  </td>
                </tr>
                <tr data-bs-toggle="modal" data-bs-target="#transactionsMod">
                  <th scope="row">
                    <p>Facebook Ads</p>
                    <p className="mdr">Ads Service</p>
                  </th>
                  <td>
                    <p>07:05 PM</p>
                    <p className="mdr">15 Mar 2022</p>
                  </td>
                  <td>
                    <p className="pending">Pending</p>
                  </td>
                  <td>
                    <p>$200</p>
                    <p className="mdr">No Fees</p>
                  </td>
                </tr>
                <tr data-bs-toggle="modal" data-bs-target="#transactionsMod">
                  <th scope="row">
                    <p>Upwork Escow Inc</p>
                    <p className="mdr">Payment payment</p>
                  </th>
                  <td>
                    <p>04:02 PM</p>
                    <p className="mdr">10 Mar 2022</p>
                  </td>
                  <td>
                    <p className="completed">Completed</p>
                  </td>
                  <td>
                    <p>$450</p>
                    <p className="mdr">$.5</p>
                  </td>
                </tr>
                <tr data-bs-toggle="modal" data-bs-target="#transactionsMod">
                  <th scope="row">
                    <p>Ron Stewart</p>
                    <p className="mdr">Payment Refund</p>
                  </th>
                  <td>
                    <p>11:00 PM</p>
                    <p className="mdr">21 Mar 2022</p>
                  </td>
                  <td>
                    <p className="cancelled">Cancelled</p>
                  </td>
                  <td>
                    <p>+$450</p>
                    <p className="mdr">No Fees</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div
          className="tab-pane fade"
          id="upcoming"
          role="tabpanel"
          aria-labelledby="upcoming-tab"
        >
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name/ Business</th>
                  <th scope="col">Date</th>
                  <th scope="col">Status</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr data-bs-toggle="modal" data-bs-target="#transactionsMod">
                  <th scope="row">
                    <p>Bangkok Bank</p>
                    <p className="mdr">Withdraw to bank account</p>
                  </th>
                  <td>
                    <p>03:00 PM</p>
                    <p className="mdr">10 Mar 2022</p>
                  </td>
                  <td>
                    <p className="inprogress">In Progress</p>
                  </td>
                  <td>
                    <p>-$520</p>
                    <p className="mdr">$3.0</p>
                  </td>
                </tr>
                <tr data-bs-toggle="modal" data-bs-target="#transactionsMod">
                  <th scope="row">
                    <p>Envato Pty Ltd</p>
                    <p className="mdr">Marketplace Payment Received</p>
                  </th>
                  <td>
                    <p>04:30 PM</p>
                    <p className="mdr">01 Mar 2022</p>
                  </td>
                  <td>
                    <p className="completed">Completed</p>
                  </td>
                  <td>
                    <p>+$450</p>
                    <p className="mdr">No Fees</p>
                  </td>
                </tr>
                <tr data-bs-toggle="modal" data-bs-target="#transactionsMod">
                  <th scope="row">
                    <p>Mailchimp</p>
                    <p className="mdr">Subscription Service Payment</p>
                  </th>
                  <td>
                    <p>01:15 PM</p>
                    <p className="mdr">25 Mar 2022</p>
                  </td>
                  <td>
                    <p className="completed">Completed</p>
                  </td>
                  <td>
                    <p>-$100</p>
                    <p className="mdr">No Fees</p>
                  </td>
                </tr>
                <tr data-bs-toggle="modal" data-bs-target="#transactionsMod">
                  <th scope="row">
                    <p>Facebook Ads</p>
                    <p className="mdr">Ads Service</p>
                  </th>
                  <td>
                    <p>07:05 PM</p>
                    <p className="mdr">15 Mar 2022</p>
                  </td>
                  <td>
                    <p className="pending">Pending</p>
                  </td>
                  <td>
                    <p>$200</p>
                    <p className="mdr">No Fees</p>
                  </td>
                </tr>
                <tr data-bs-toggle="modal" data-bs-target="#transactionsMod">
                  <th scope="row">
                    <p>Upwork Escow Inc</p>
                    <p className="mdr">Payment payment</p>
                  </th>
                  <td>
                    <p>04:02 PM</p>
                    <p className="mdr">10 Mar 2022</p>
                  </td>
                  <td>
                    <p className="completed">Completed</p>
                  </td>
                  <td>
                    <p>$450</p>
                    <p className="mdr">$.5</p>
                  </td>
                </tr>
                <tr data-bs-toggle="modal" data-bs-target="#transactionsMod">
                  <th scope="row">
                    <p>Ron Stewart</p>
                    <p className="mdr">Payment Refund</p>
                  </th>
                  <td>
                    <p>11:00 PM</p>
                    <p className="mdr">21 Mar 2022</p>
                  </td>
                  <td>
                    <p className="cancelled">Cancelled</p>
                  </td>
                  <td>
                    <p>+$450</p>
                    <p className="mdr">No Fees</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionTabel;
