import React from "react";
import "../styles/contributors.scss";

function Contributors() {

  const [userId, setUserId] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [showFields, setShowFields] = React.useState(false);
  const [showPoints, setShowPoints] = React.useState(false);
  const [showLenders, setShowLenders] = React.useState(false);
  const popupRef = React.useRef();

  const getScore = () => {
    setShowPoints(true);
    setShowLenders(true);
  }

  const addFields = (id, name) => {
    setShowFields(true);
  }

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

  return (
    <>
      <div className="c-main">
        <div className="c-dashboard">
          <div className="c-dashboard-main">
            <div className="c-dashboard-inner">
              <div className="c-dashboard-card">
                <span className="c-card-header">
                  Transactions
                </span>
                <div className="c-card-t-counter">
                  <div className="c-card-count">30</div>
                </div>
              </div>
              <div className="c-dashboard-card">
                <span className="c-card-header">
                  NFTs Holding
                </span>
                <div className="c-card-t-counter">
                  <div className="c-card-count">20</div>
                </div>
              </div>
              <div className="c-dashboard-card">
                <span className="c-card-header">
                  Contribution Count
                </span>
                <div className="c-card-t-counter">
                  <div className="c-card-count">10</div>
                </div>
              </div>
              <div className="c-dashboard-card">
                <span className="c-card-header">
                  Gas Fee Spent
                </span>
                <div className="c-card-t-counter">
                  <div className="c-card-count">250$</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="c-score-btn-holder">
          <button className="c-score-btn" onClick={() => { getScore(); }}>
            Get Score
          </button>
        </div>
        {
          showPoints
            ?
            <div className="c-certificate-main">
              <div className="c-certificate-inner">
                <div className="c-certificate-header">
                  <div className="c-certificate-address">0x084c145f98C975a71a2fD5d3E5eAB84c0FC52fDf</div>
                  <div className="c-certificate-logo">logo</div>
                </div>
                <div className="c-certificate-score">300 <span>Points</span></div>
              </div>
            </div>
            :
            null
        }
        {
          showLenders
            ?
            <>
              <h1 className="c-lender-header">Lenders Available</h1>
              <div className="c-lender-list-main">
                <div className="c-lender-list-inner">
                  {/* Lender Card 1 */}
                  <div className="c-lender-card" onClick={() => { addFields(userId, userName) }}>
                    <div className="c-lender-name">
                      Rahul Rajan
                    </div>
                    <div className="c-lender-description">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa minus provident aliquid officiis itaque corrupti sapiente obcaecati harum. Earum beatae, unde illum provident repellat officia voluptates repellendus similique veritatis sunt inventore consectetur ab illo? Minima placeat necessitatibus temporibus voluptatum praesentium dignissimos ipsa totam, commodi fugit possimus. Nisi explicabo iure saepe!
                    </div>
                    <div className="c-lender-amount">12000$ Max</div>
                    <div className="c-lender-interest">12% Interest</div>
                  </div>
                  {/* Lender Card 2 */}
                  <div className="c-lender-card" onClick={() => { addFields(userId, userName) }}>
                    <div className="c-lender-name">
                      Rahul Rajan
                    </div>
                    <div className="c-lender-description">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa minus provident aliquid officiis itaque corrupti sapiente obcaecati harum. Earum beatae, unde illum provident repellat officia voluptates repellendus similique veritatis sunt inventore consectetur ab illo? Minima placeat necessitatibus temporibus voluptatum praesentium dignissimos ipsa totam, commodi fugit possimus. Nisi explicabo iure saepe!
                    </div>
                    <div className="c-lender-amount">12000$ Max</div>
                    <div className="c-lender-interest">12% Interest</div>
                  </div>
                  {/* Lender Card 3 */}
                  <div className="c-lender-card" onClick={() => { addFields(userId, userName) }}>
                    <div className="c-lender-name">
                      Rahul Rajan
                    </div>
                    <div className="c-lender-description">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa minus provident aliquid officiis itaque corrupti sapiente obcaecati harum. Earum beatae, unde illum provident repellat officia voluptates repellendus similique veritatis sunt inventore consectetur ab illo? Minima placeat necessitatibus temporibus voluptatum praesentium dignissimos ipsa totam, commodi fugit possimus. Nisi explicabo iure saepe!
                    </div>
                    <div className="c-lender-amount">12000$ Max</div>
                    <div className="c-lender-interest">12% Interest</div>
                  </div>
                  {/* Lender Card 4 */}
                  <div className="c-lender-card" onClick={() => { addFields(userId, userName) }}>
                    <div className="c-lender-name">
                      Rahul Rajan
                    </div>
                    <div className="c-lender-description">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa minus provident aliquid officiis itaque corrupti sapiente obcaecati harum. Earum beatae, unde illum provident repellat officia voluptates repellendus similique veritatis sunt inventore consectetur ab illo? Minima placeat necessitatibus temporibus voluptatum praesentium dignissimos ipsa totam, commodi fugit possimus. Nisi explicabo iure saepe!
                    </div>
                    <div className="c-lender-amount">12000$ Max</div>
                    <div className="c-lender-interest">12% Interest</div>
                  </div>
                  {/* Lender Card 5 */}
                  <div className="c-lender-card" onClick={() => { addFields(userId, userName) }}>
                    <div className="c-lender-name">
                      Rahul Rajan
                    </div>
                    <div className="c-lender-description">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa minus provident aliquid officiis itaque corrupti sapiente obcaecati harum. Earum beatae, unde illum provident repellat officia voluptates repellendus similique veritatis sunt inventore consectetur ab illo? Minima placeat necessitatibus temporibus voluptatum praesentium dignissimos ipsa totam, commodi fugit possimus. Nisi explicabo iure saepe!
                    </div>
                    <div className="c-lender-amount">12000$ Max</div>
                    <div className="c-lender-interest">12% Interest</div>
                  </div>
                  {/* Lender Card 6 */}
                  <div className="c-lender-card" onClick={() => { addFields(userId, userName) }}>
                    <div className="c-lender-name">
                      Rahul Rajan
                    </div>
                    <div className="c-lender-description">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa minus provident aliquid officiis itaque corrupti sapiente obcaecati harum. Earum beatae, unde illum provident repellat officia voluptates repellendus similique veritatis sunt inventore consectetur ab illo? Minima placeat necessitatibus temporibus voluptatum praesentium dignissimos ipsa totam, commodi fugit possimus. Nisi explicabo iure saepe!
                    </div>
                    <div className="c-lender-amount">12000$ Max</div>
                    <div className="c-lender-interest">12% Interest</div>
                  </div>
                </div>
              </div>
            </>
            :
            null
        }
      </div>
      {
        showFields
          ?
          <div className="c-lender-request-main">
            <div className="c-lender-request-box" ref={popupRef}>
              <div>
                <input className="c-lender-amount" type="number" placeholder="Please enter the amount in Dollar" />
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
          :
          null
      }
    </>
  );
}

export default Contributors;
