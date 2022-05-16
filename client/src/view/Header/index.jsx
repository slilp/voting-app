import { useEffect } from "react";
import { Container } from "react-bootstrap";
import Button from "../../component/Button";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../utils/connector";
import { toast } from "react-toastify";
import { FaWallet } from "react-icons/fa";

function Header() {
  const { active, account, activate, deactivate } = useWeb3React();

  useEffect(() => {
    if (localStorage.getItem("connected") === "true") connect();
  }, []);

  async function connect() {
    try {
      await activate(injected);
      localStorage.setItem("connected", "true");
    } catch (ex) {
      toast.error(JSON.stringify(ex), {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  }

  async function disconnect() {
    try {
      deactivate();
      localStorage.setItem("connected", "false");
    } catch (ex) {
      toast.error(JSON.stringify(ex), {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  }

  const transformAddress = (adr) =>
    adr.substring(0, 4) + "..." + adr.substring(adr.length - 4, adr.length);

  return (
    <div className="p-3">
      <Container>
        <div className="d-flex align-items-center gap-1 justify-content-between">
          <div>
            <span>
              <img
                alt="voting_logo"
                src="./voting_logo.png"
                style={{ height: "75px" }}
              ></img>
            </span>
            <h2 className="fw-bold m-0"> ME </h2>
            <h2 className="fw-bold m-0"> UP </h2>
          </div>
          <div className="mb-0">
            {active ? (
              <Button
                onClick={disconnect}
                style={{ minWidth: "175px" }}
                className="pb-2 d-flex justify-content-center align-items-center gap-2 text-white fw-bold"
              >
                <span>
                  <FaWallet></FaWallet>
                </span>
                <span>{transformAddress(account)}</span>
              </Button>
            ) : (
              <Button
                onClick={connect}
                style={{ minWidth: "175px" }}
                className="pb-2 d-flex justify-content-center align-items-center gap-2 text-white fw-bold"
              >
                <span>
                  <FaWallet></FaWallet>
                </span>
                <span> Connect Wallet</span>
              </Button>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Header;
