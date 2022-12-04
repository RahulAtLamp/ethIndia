import React from "react";
import "../styles/lender.scss";
import { ethers } from "ethers";
import trufi from "../Trufi.json";
import * as PushAPI from "@pushprotocol/restapi";

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

  const approve = async (appId, userAddress) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const applications = new ethers.Contract(
      "0x33ecA28D4f22496F124EA51a046b699d03119f28",
      trufi,
      signer
    );
    const approveuser = await applications.approveUser(appId);
    sendNotification(userAddress);
  };

  const PK = "1de3f536b6915f6abddb12d948c86cd1fb2d01cf532213b4c9bf4531f5229a24"; // channel private key
  const Pkey = `0x${PK}`;
  const signer = new ethers.Wallet(Pkey);

  const sendNotification = async (userAddress) => {
    try {
      const apiResponse = await PushAPI.payloads.sendNotification({
        signer,
        type: 3, // target
        identityType: 2, // direct payload
        notification: {
          title: `Approval of your loan Application`,
          body: `Congratulation your loan has been approved`,
        },
        payload: {
          title: `Approval of your loan Application`,
          body: `Congratulation your loan has been approved`,
          cta: "",
          img: "",
        },
        recipients: "eip155:5:" + userAddress, // recipient address
        channel: "eip155:5:0x737175340d1D1CaB2792bcf83Cff6bE7583694c7", // your channel address
        env: "staging",
      });

      // apiResponse?.status === 204, if sent successfully!
      console.log("API repsonse: ", apiResponse);
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  sendNotification();

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
                          onClick={() =>
                            approve(parseInt(item.appId), item.userAddress)
                          }
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
