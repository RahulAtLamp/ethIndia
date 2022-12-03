import React, { useRef } from "react";
import "../styles/contributors.scss";
import { useAccount } from "wagmi";
import axios from "axios";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import trufi from "../Trufi.json";

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
  const dataFetchedRef = useRef(false);

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
        // console.log(response.data.total);
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
          // console.log(cursor);
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
    console.log(getOrganizations);
    const getOrganizationDetails = await organizations.getOrganizationDetails(
      getOrganizations
    );
    console.log(getOrganizationDetails);
    setallOrganizationDetails(getOrganizationDetails);
    setShowPoints(true);
    setShowLenders(true);
  };

  const addFields = (id, name) => {
    setShowFields(true);
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
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
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
                    {nftCount ? nftCount : null}
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
                    {gasSpent ? gasSpent.toFixed(2) + " Matic" : null}
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
          <div className="c-certificate-main">
            <div className="c-certificate-inner">
              <div className="c-certificate-header">
                <div className="c-certificate-address">{address}</div>
                <div className="c-certificate-logo">logo</div>
              </div>
              <div className="c-certificate-score">
                300 <span>Points</span>
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
                  <div>
                    <div className="c-lender-name">{item[0][0]}</div>
                    <div className="c-lender-description">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Culpa minus provident aliquid officiis itaque corrupti
                      sapiente obcaecati harum. Earum beatae, unde illum
                      provident repellat officia voluptates repellendus
                      similique veritatis sunt inventore consectetur ab illo?
                      Minima placeat necessitatibus temporibus voluptatum
                      praesentium dignissimos ipsa totam, commodi fugit
                      possimus. Nisi explicabo iure saepe!
                    </div>
                    <div className="c-lender-amount">12000$ Max</div>
                    <div className="c-lender-interest">12% Interest</div>
                  </div>;
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
              />
            </div>
            <div>
              <input type="checkbox" value="grant" /> Grant
            </div>
            <div>
              <input type="checkbox" value="Lending" /> Lending
            </div>
            <div>
              <select defaultValue={""}>
                <option value="">--Select Chain--</option>
              </select>
            </div>
            <button className="apply-btn">Apply</button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Contributors;
