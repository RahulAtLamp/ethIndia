import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";
import "../styles/navbar.scss";
import { ethers } from "ethers";
import trufi from "../Trufi.json";

function Navbar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { address, isConnected } = useAccount();
  const [user, setuser] = useState("contributer");
  // const [address, setAddress] = useState("");
  const navigate = useNavigate();
  function handleClick() {
    setIsExpanded(!isExpanded);
  }

  const checkUser = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const userInstance = new ethers.Contract(
      "0x33ecA28D4f22496F124EA51a046b699d03119f28",
      trufi,
      signer
    );

    const checkUser = await userInstance.getOrganization();
    console.log(checkUser);
    for (let i = 0; i < checkUser.length; i++) {
      if (checkUser[i] === address) setuser("lender");
    }
  };

  React.useEffect(() => {
    checkUser();
  }, []);

  React.useEffect(() => {
    if (!isConnected) {
      navigate("/");
    }
  }, [isConnected]);
  return (
    <>
      <header className="header">
        <nav className="navbar">
          <span className="logo">
            <Link to="/">
              {/* <Image src={logo} alt="logo" /> */}
              <h1 className="logo-h1">
                <img src="./logo.png" alt="logo" style={{ height:"50px", marginTop:"10px" }} />
                {/* UpToData */}
              </h1>
            </Link>
          </span>
          <ul className={isExpanded === false ? "navmenu" : "navmenu active"}>
            <li className="navitem">
              <span>
                <Link
                  //   target="_blank"
                  //   rel="noopener noreferrer"
                  to="/"
                  className="navlink"
                >
                  Home
                </Link>
              </span>
            </li>
            {isConnected ? (
              user === "contributer" ? (
                <>
                  <li className="navitem">
                    <span>
                      <Link
                        //   target="_blank"
                        //   rel="noopener noreferrer"
                        to="/contributors"
                        className="navlink"
                      >
                        Credit Score
                      </Link>
                    </span>
                  </li>
                  <li className="navitem">
                    <span>
                      <Link
                        //   target="_blank"
                        //   rel="noopener noreferrer"
                        to="/applied-loans"
                        className="navlink"
                      >
                        Applied Loans
                      </Link>
                    </span>
                  </li>
                </>
              ) : (
                <li className="navitem">
                  <span>
                    <Link
                      //   target="_blank"
                      //   rel="noopener noreferrer"
                      to="/applications"
                      className="navlink"
                    >
                      Applications
                    </Link>
                  </span>
                </li>
              )
            ) : null}
          </ul>
          <ConnectButton
            accountStatus={{
              smallScreen: "avatar",
              largeScreen: "full",
            }}
          />
          <button
            onClick={handleClick}
            className={isExpanded === false ? "hamburger" : "hamburger active"}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </nav>
      </header>

      {/* {children} */}
      {/* footer */}
      {/* <div className="container">
                <footer className="footer">
                    <span>Hacked</span>
                    <span>@</span>
                    ETHGlobal&apos;s
                    <a
                        target="_blank"
                        href="https://fevm.ethglobal.com/"
                        rel="noopener noreferrer"
                    >
                        Hack FEVM
                    </a>
                    <span className="miro-link">
                        <a
                            target="_blank"
                            href="https://miro.com/app/board/uXjVPBvZqS4=/?share_link_id=108563393303"
                            rel="noopener noreferrer"
                        >
                            Miro Board
                        </a>
                    </span>
                </footer>
            </div> */}
    </>
  );
}

export default Navbar;
