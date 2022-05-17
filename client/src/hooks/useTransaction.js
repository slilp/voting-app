import { toast } from "react-toastify";

const useTransaction = () => {
  const sendTransaction = async (
    contract,
    method,
    args,
    overrides = null,
    notDisplayError
  ) => {
    try {
      const raw = await contract[method](...args, { ...overrides });
      if (raw.hash) {
        const tx = await raw.wait();

        if (tx.transactionHash) {
          toast.success(
            `Success : ${tx.transactionHash.substring(
              0,
              12
            )}...${tx.transactionHash.substring(
              tx.transactionHash.length - 12,
              tx.transactionHash.length
            )}`,
            {
              position: toast.POSITION.BOTTOM_RIGHT,
            }
          );
        }

        return tx;
      } else {
        return raw;
      }
    } catch (error) {
      if (!notDisplayError)
        toast.error(`Fail : ${error.message}`, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
    }
  };

  return { sendTransaction };
};

export default useTransaction;
