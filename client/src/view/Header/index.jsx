import { useEffect } from "react";
import { Container } from "react-bootstrap";
import Button from "../../component/Button";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../utils/connector";
import { toast } from "react-toastify";

function Header() {
  const { active, account, activate, deactivate } = useWeb3React();

  useEffect(() => {
    connect();
  }, []);

  async function connect() {
    try {
      await activate(injected);
    } catch (ex) {
      toast.error(JSON.stringify(ex), {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  }

  async function disconnect() {
    try {
      deactivate();
    } catch (ex) {
      toast.error(JSON.stringify(ex), {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  }

  return (
    <Container className="p-4">
      {active ? (
        <div className="d-flex justify-content-end align-items-center gap-1">
          <span>{account}</span>
          <Button onClick={disconnect}>Logout</Button>
        </div>
      ) : (
        <Button onClick={connect}>Connect to MetaMask</Button>
      )}
    </Container>
  );
}

export default Header;
