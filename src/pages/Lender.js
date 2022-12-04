import React from "react";
import "../styles/lender.scss";
import { ethers } from "ethers";
import trufi from "../Trufi.json";

function Lender() {
  const [data, setData] = React.useState([]);
  const getApplications = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const applications = new ethers.Contract(
      "0x33ecA28D4f22496F124EA51a046b699d03119f28",
      trufi,
      signer
    );
    const getapplications = await applications.getAppId();
    console.log(getapplications);
    const getapplicationdata = await applications.getUsers(getapplications);
    console.log(getapplicationdata);
    setData(getapplicationdata);
  };

  const approve = async (appId) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const applications = new ethers.Contract(
      "0x33ecA28D4f22496F124EA51a046b699d03119f28",
      trufi,
      signer
    );
    const approveuser = await applications.approveUser(appId);
  };
  React.useEffect(() => {
    getApplications();
  }, []);

  return (
    <div className="lender-main">
      <h1 className="lender-header">Lending Requests</h1>
      <div className="lender-inner">
        {data
          ? data.map((item) => {
              if (!item.status) {
                return (
                  <div className="lender-card">
                    <div className="lender-certificate">
                      <img
                        className="lender-certificate-image"
                        src={item.certificateUrl}
                        alt="certificates"
                      />
                    </div>
                    <div className="lender-address">{item.userAddress}</div>
                    <div className="lender-requests">
                      <div className="lender-confirm">
                        <button
                          className="confirm"
                          onClick={() => approve(parseInt(item.appId))}
                        >
                          Confirm{" "}
                        </button>
                      </div>
                      <div className="lender-deny">
                        <button className="deny">Deny</button>
                      </div>
                    </div>
                  </div>
                );
              }
            })
          : null}

        {/* <div className="lender-card">
          <div className="lender-certificate">
            <img
              className="lender-certificate-image"
              src="certificate.png"
              alt="certificates"
            />
          </div>
          <div className="lender-address">
            0x084c145f98C975a71a2fD5d3E5eAB84c0FC52fDf
          </div>
          <div className="lender-requests">
            <div className="lender-confirm">
              <button className="confirm">Confirm</button>
            </div>
            <div className="lender-deny">
              <button className="deny">Deny</button>
            </div>
          </div>
        </div>
        <div className="lender-card">
          <div className="lender-certificate">
            <img
              className="lender-certificate-image"
              src="certificate.png"
              alt="certificates"
            />
          </div>
          <div className="lender-address">
            0x084c145f98C975a71a2fD5d3E5eAB84c0FC52fDf
          </div>
          <div className="lender-requests">
            <div className="lender-confirm">
              <button className="confirm">Confirm</button>
            </div>
            <div className="lender-deny">
              <button className="deny">Deny</button>
            </div>
          </div>
        </div>
        <div className="lender-card">
          <div className="lender-certificate">
            <img
              className="lender-certificate-image"
              src="certificate.png"
              alt="certificates"
            />
          </div>
          <div className="lender-address">
            0x084c145f98C975a71a2fD5d3E5eAB84c0FC52fDf
          </div>
          <div className="lender-requests">
            <div className="lender-confirm">
              <button className="confirm">Confirm</button>
            </div>
            <div className="lender-deny">
              <button className="deny">Deny</button>
            </div>
          </div>
        </div>
        <div className="lender-card">
          <div className="lender-certificate">
            <img
              className="lender-certificate-image"
              src="certificate.png"
              alt="certificates"
            />
          </div>
          <div className="lender-address">
            0x084c145f98C975a71a2fD5d3E5eAB84c0FC52fDf
          </div>
          <div className="lender-requests">
            <div className="lender-confirm">
              <button className="confirm">Confirm</button>
            </div>
            <div className="lender-deny">
              <button className="deny">Deny</button>
            </div>
          </div>
        </div>
        <div className="lender-card">
          <div className="lender-certificate">
            <img
              className="lender-certificate-image"
              src="certificate.png"
              alt="certificates"
            />
          </div>
          <div className="lender-address">
            0x084c145f98C975a71a2fD5d3E5eAB84c0FC52fDf
          </div>
          <div className="lender-requests">
            <div className="lender-confirm">
              <button className="confirm">Confirm</button>
            </div>
            <div className="lender-deny">
              <button className="deny">Deny</button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Lender;
