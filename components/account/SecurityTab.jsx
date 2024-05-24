import Image from "next/image";
import Link from "next/link";
import imac from "/public/images/icon/imac.png";
import ipad from "/public/images/icon/ipad.png";
import iphone from "/public/images/icon/iphone.png";

const SecurityTab = () => {
  return (
    <div
      className="tab-pane fade"
      id="security"
      role="tabpanel"
      aria-labelledby="security-tab"
    >
      <div className="single-content authentication d-flex align-items-center justify-content-between">
        <div className="left">
          <h5>Two Factor Authentication</h5>
          <p>
            Two-Factor Authentication (2FA) can be used to help protect your
            account
          </p>
        </div>
        <div className="right">
          <button>Enable</button>
        </div>
      </div>
      <div className="change-pass mb-40">
        <div className="row">
          <div className="col-sm-6">
            <h5>Change Password</h5>
            <p>
              You can always change your password for security reasons or reset
              your password in case you forgot it.
            </p>
            <Link href="#">Forgot password?</Link>
          </div>
          <div className="col-sm-6">
            <form action="#">
              <div className="row justify-content-center">
                <div className="col-md-12">
                  <div className="single-input">
                    <label htmlFor="current-password">Current password</label>
                    <input
                      type="text"
                      id="current-password"
                      placeholder="Current password"
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="single-input">
                    <label htmlFor="new-password">New password</label>
                    <input
                      type="text"
                      id="new-password"
                      placeholder="New password"
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="single-input">
                    <label htmlFor="confirm-password">
                      Confirm New password
                    </label>
                    <input
                      type="text"
                      id="confirm-password"
                      placeholder="Confirm New password"
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="btn-border w-100">
                    <button className="cmn-btn w-100">Update password</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="single-content additional-security">
        <h5>Additional security</h5>
        <div className="single-setting">
          <div className="left">
            <h6>SMS recovery</h6>
            <p>Number ending with 1234</p>
          </div>
          <div className="right">
            <button className="active">Disable SMS</button>
          </div>
        </div>
        <div className="single-setting">
          <div className="left">
            <h6>Autheticator App</h6>
            <p>Google Authenticator</p>
          </div>
          <div className="right">
            <button>Configure</button>
          </div>
        </div>
        <div className="single-setting">
          <div className="left">
            <h6>SSL Certificate</h6>
            <p>Secure Sockets Layer</p>
          </div>
          <div className="right">
            <button>Configure</button>
          </div>
        </div>
      </div>
      <div className="single-content your-devices">
        <div className="head-item d-flex align-items-center justify-content-between">
          <h5>Your devices</h5>
          <Link href="#">Log out on all devices</Link>
        </div>
        <div className="single-setting">
          <div className="left">
            <div className="icon-area">
              <Image src={iphone} alt="icon" />
            </div>
            <div className="text-area">
              <h6>Iphone 13 Pro Max</h6>
              <p>New York City · June 20 at 14:00</p>
            </div>
          </div>
          <div className="right">
            <button>Log out</button>
          </div>
        </div>
        <div className="single-setting">
          <div className="left">
            <div className="icon-area">
              <Image src={ipad} alt="icon" />
            </div>
            <div className="text-area">
              <h6>iPad Pro</h6>
              <p>New York City · June 20 at 14:00</p>
            </div>
          </div>
          <div className="right">
            <button>Log out</button>
          </div>
        </div>
        <div className="single-setting">
          <div className="left">
            <div className="icon-area">
              <Image src={imac} alt="icon" />
            </div>
            <div className="text-area">
              <h6>iMac OSX</h6>
              <p>New York City · June 20 at 14:00</p>
            </div>
          </div>
          <div className="right">
            <button>Log out</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityTab;
