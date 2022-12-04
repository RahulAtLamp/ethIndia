import React from "react";
import "../styles/applied-loan.scss";
import { ethers } from "ethers";
import trufi from "../Trufi.json";

function AppliedLoans() {
  const getApplications = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
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

    const getAppIdforUser = await organizations.getAppIdforUser();
    console.log(getAppIdforUser);
    const getApplications = await organizations.getUsers(getAppIdforUser);
    console.log(getApplications);
  };

  React.useEffect(() => {
    getApplications();
  }, []);

  return (
    <div className="loan-main">
      <h1 className="loan-header">Loan Application Status</h1>
      <div className="loan-list">
        <div className="loan-list-inner">
          <div className="loan-box">
            <div className="loan-organisation">L-earn Fintech</div>
            <div className="loan-amount">
              <span className="amount-holder">Loan Amount</span>300$
            </div>
            <div className="loan-status">
              <span className="status-holder">Status</span>Approved
            </div>
          </div>

          <div className="loan-box">
            <div className="loan-organisation">L-earn Fintech</div>
            <div className="loan-amount">
              <span className="amount-holder">Loan Amount</span>300$
            </div>
            <div className="loan-status">
              <span className="status-holder">Status</span>Approved
            </div>
          </div>

          <div className="loan-box">
            <div className="loan-organisation">L-earn Fintech</div>
            <div className="loan-amount">
              <span className="amount-holder">Loan Amount</span>300$
            </div>
            <div className="loan-status">
              <span className="status-holder">Status</span>Approved
            </div>
          </div>

          <div className="loan-box">
            <div className="loan-organisation">L-earn Fintech</div>
            <div className="loan-amount">
              <span className="amount-holder">Loan Amount</span>300$
            </div>
            <div className="loan-status">
              <span className="status-holder">Status</span>Approved
            </div>
          </div>

          <div className="loan-box">
            <div className="loan-organisation">L-earn Fintech</div>
            <div className="loan-amount">
              <span className="amount-holder">Loan Amount</span>300$
            </div>
            <div className="loan-status">
              <span className="status-holder">Status</span>Approved
            </div>
          </div>

          <div className="loan-box">
            <div className="loan-organisation">L-earn Fintech</div>
            <div className="loan-amount">
              <span className="amount-holder">Loan Amount</span>300$
            </div>
            <div className="loan-status">
              <span className="status-holder">Status</span>Approved
            </div>
          </div>

          <div className="loan-box">
            <div className="loan-organisation">L-earn Fintech</div>
            <div className="loan-amount">
              <span className="amount-holder">Loan Amount</span>300$
            </div>
            <div className="loan-status">
              <span className="status-holder">Status</span>Approved
            </div>
          </div>

          <div className="loan-box">
            <div className="loan-organisation">L-earn Fintech</div>
            <div className="loan-amount">
              <span className="amount-holder">Loan Amount</span>300$
            </div>
            <div className="loan-status">
              <span className="status-holder">Status</span>Approved
            </div>
          </div>

          <div className="loan-box">
            <div className="loan-organisation">L-earn Fintech</div>
            <div className="loan-amount">
              <span className="amount-holder">Loan Amount</span>300$
            </div>
            <div className="loan-status">
              <span className="status-holder">Status</span>Approved
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppliedLoans;
