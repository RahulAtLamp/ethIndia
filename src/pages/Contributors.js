import React, { useRef, useState } from "react";
import "../styles/contributors.scss";
import { useAccount } from "wagmi";
import axios from "axios";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import trufi from "../Trufi.json";
import * as htmlToImage from "html-to-image";

function Contributors() {
  const [userId, setUserId] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [showFields, setShowFields] = React.useState(false);
  const [showPoints, setShowPoints] = React.useState(false);
  const [showLenders, setShowLenders] = React.useState(false);
  const [transactionCount, setTransactionCount] = React.useState();
  const [gasSpent, setGasSpent] = React.useState();
  const [nftCount, setNftCount] = React.useState();
  const [contract, setContractCount] = React.useState();
  const [allorganizationDetails, setallOrganizationDetails] = React.useState();
  const [data, setData] = React.useState({ price: "", type: "" });
  const domEl = useRef(null);
  let imageUri = "";
  const [org_address, setOrg_address] = React.useState("");

  const popupRef = React.useRef();

  const { address, isConnected } = useAccount();
  console.log(address);
  const navigate = useNavigate();
  const getTransactions = async () => {
    const resp = await axios
      .get(
        `https://api.covalenthq.com/v1/80001/address/${address}/transactions_v2/?quote-currency=USD&format=JSON&block-signed-at-asc=false&no-logs=false&page-size=1000&key`,
        { auth: { username: "ckey_f09b8656acce40139909164b62e" } }
      )
      .then((res) => {
        // console.log(res.data.data.items.length);
        setTransactionCount(res.data.data.items.length);
      });
  };

  const getGasSpent = async () => {
    const resp = await axios
      .get(
        `https://api.covalenthq.com/v1/80001/address/${address}/transactions_v2/?quote-currency=USD&format=JSON&block-signed-at-asc=false&no-logs=false&page-size=1000&key`,
        { auth: { username: "ckey_f09b8656acce40139909164b62e" } }
      )
      .then((res) => {
        // console.log(res.data.data.items);
        const transactions = res.data.data.items;
        var gas_Spent = 0;
        for (let i = 0; i < transactions.length; i++) {
          // console.log(transactions[i].fees_paid);
          gas_Spent += parseInt(transactions[i].fees_paid) / Math.pow(10, 18);
          // console.log(gas_Spent);
        }
        // console.log(gas_Spent);
        setGasSpent(gas_Spent);
        setTransactionCount(res.data.data.items.length);
      });
  };

  const getNftCount = async () => {
    const walletnft = {
      method: "GET",
      url: `https://deep-index.moralis.io/api/v2/${address}/nft`,
      params: {
        chain: "mumbai",
        format: "decimal",
      },
      headers: {
        accept: "application/json",
        "X-API-Key":
          "zx1cuyNtlU6YfCw1ARlaDUSJQLXC5uXlfM9ebpJhJSTbbglLJs6sqvHEF9avPztV",
      },
    };

    await axios
      .request(walletnft)
      .then(function (response) {
        // walletNftData.push(response.data);
        console.log(response.data.total);
        setNftCount(response.data.total);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const getDeployedContractCount = async () => {
    var contractCount = 0;
    var TransationDetails = [];
    let cursor = "";

    do {
      const options = {
        method: "GET",
        url: `https://deep-index.moralis.io/api/v2/${address}`,
        params: {
          chain: "mumbai",
          cursor: cursor,
        },
        headers: {
          accept: "application/json",
          "X-API-Key":
            "zx1cuyNtlU6YfCw1ARlaDUSJQLXC5uXlfM9ebpJhJSTbbglLJs6sqvHEF9avPztV",
        },
      };

      await axios
        .request(options)
        .then(function (response) {
          // console.log(response.data);
          TransationDetails.push(response.data);
          cursor = response.data.cursor;
          console.log(cursor);
        })
        .catch(function (error) {
          console.error(error);
        });

      // console.log(TransationDetails);
    } while (cursor !== null);

    for (let i = 0; i < TransationDetails.length; i++) {
      // console.log(TransationDetails[i].result[0]);
      for (let j = 0; j < TransationDetails[i].result.length; j++) {
        // console.log(TransationDetails[i].result[j].receipt_contract_address);
        if (TransationDetails[i].result[j].receipt_contract_address !== null) {
          contractCount = contractCount + 1;
        }
      }
    }
    setContractCount(contractCount);
    // console.log(contractCount);
  };

  const getScore = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const organizations = new ethers.Contract(
      "0x33ecA28D4f22496F124EA51a046b699d03119f28",
      trufi,
      signer
    );
    const getOrganizations = await organizations.getOrganization();
    const getOrganizationDetails = await organizations.getOrganizationDetails(
      getOrganizations
    );
    console.log(getOrganizationDetails);
    setallOrganizationDetails(getOrganizationDetails);
    setShowPoints(true);
    setShowLenders(true);
  };

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  const addFields = async (orgAddress) => {
    setOrg_address(orgAddress);
    console.log(org_address);
    setShowFields(true);
  };

  const applyLoan = async () => {
    const dataUrl = await htmlToImage.toPng(domEl.current);
    var file = dataURLtoFile(dataUrl, "certificate.png");
    const form = new FormData();
    form.append("file", file);
    const options = {
      method: "POST",
      url: "https://api.nftport.xyz/v0/files",
      headers: {
        "Content-Type":
          "multipart/form-data; boundary=---011000010111000001101001",
        Authorization: "3a00a5ae-f74a-4369-820d-8da1cc435690",
      },
      data: form,
    };
    console.log(options);
    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        console.log(response.data.ipfs_url);
        imageUri = response.data.ipfs_url;
      })
      .catch(function (error) {
        console.error(error);
      });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const applyForLoan = new ethers.Contract(
      "0x33ecA28D4f22496F124EA51a046b699d03119f28",
      trufi,
      signer
    );
    console.log(imageUri);
    console.log(org_address);
    console.log(data.price);
    const applyforloan = await applyForLoan.userApplyDetails(
      org_address,
      imageUri,
      data.price,
      "grant"
    );
  };

  React.useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowFields(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef]);

  React.useEffect(() => {
    if (isConnected) {
      getTransactions();
      getNftCount();
      getDeployedContractCount();
      getGasSpent();
    }
  }, []);

  React.useEffect(() => {
    if (!isConnected) {
      navigate("/");
    }
  }, [isConnected]);

  return (
    <>
      <div className="c-main">
        <div className="c-dashboard">
          <div className="c-dashboard-main">
            <div className="c-dashboard-inner">
              <div className="c-dashboard-card">
                <span className="c-card-header">Transactions</span>
                <div className="c-card-t-counter">
                  <div className="c-card-count">
                    {transactionCount ? transactionCount : null}
                  </div>
                </div>
              </div>
              <div className="c-dashboard-card">
                <span className="c-card-header">NFTs Holding</span>
                <div className="c-card-t-counter">
                  <div className="c-card-count">
                    34
                    {/* {nftCount ? nftCount : null} */}
                  </div>
                </div>
              </div>
              <div className="c-dashboard-card">
                <span className="c-card-header">Contracts Deployed</span>
                <div className="c-card-t-counter">
                  <div className="c-card-count">
                    {contract ? contract : null}
                  </div>
                </div>
              </div>
              <div className="c-dashboard-card">
                <span className="c-card-header">Gas Fee Spent</span>
                <div className="c-card-t-counter">
                  <div className="c-card-count">
                    {gasSpent ? (
                      <div>
                        {gasSpent.toFixed(2)}
                        <span className="currency">Matic</span>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="c-score-btn-holder">
          <button
            className="c-score-btn"
            onClick={() => {
              getScore();
            }}
          >
            Get Score
          </button>
        </div>
        {showPoints ? (
          <div id="domEl" ref={domEl}>
            <div className="c-certificate-main">
              <div className="c-certificate-inner">
                <div className="c-certificate-header">
                  <div className="c-certificate-address">{address}</div>
                  <div className="c-certificate-logo">
                    <img src="TruFi_logo.png" height="30px" width="30px"></img>
                  </div>
                </div>
                <div className="c-certificate-score">
                  300 <span>Points</span>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {showLenders ? (
          <>
            <h1 className="c-lender-header">Lenders Available</h1>

            <div className="c-lender-list-main">
              <div className="c-lender-list-inner">
                {/* Lender Card 1 */}
                {console.log(allorganizationDetails)}
                {allorganizationDetails.map((item) => {
                  return (
                    <div
                      onClick={() => {
                        addFields(item[0]);
                      }}
                      className="c-lender-card"
                    >
                      <div className="c-lender-name">{item[1]}</div>
                      <div className="c-lender-description">{item[2]}</div>
                      <div className="c-lender-amount">
                        {item[3] + " $ Max"}
                      </div>
                      <div className="c-lender-interest">
                        {"Interest : " + item[4] + " %"}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : null}
      </div>
      {showFields ? (
        <div className="c-lender-request-main">
          <div className="c-lender-request-box" ref={popupRef}>
            <div>
              <input
                className="c-lender-amount"
                type="number"
                placeholder="Please enter the amount in Dollar"
                onChange={(e) => setData({ ...data, price: e.target.value })}
              />
            </div>
            <div>
              <input type="checkbox" value="grant" /> Grant
            </div>
            <div>
              <input type="checkbox" value="Lending" /> Lending
            </div>
            <div></div>
            <button className="apply-btn" onClick={() => applyLoan()}>
              Apply
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Contributors;
