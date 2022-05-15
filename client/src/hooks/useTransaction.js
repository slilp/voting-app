import { toast } from "react-toastify";

const useTransaction = () => {
  const sendTransaction = async (contract, method, args, overrides = null) => {
    try {
      const tx = await contract[method](...args, { ...overrides });
      if (tx.hash) {
        toast.success(`Success : ${tx.hash}`, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      }

      return tx;
    } catch (error) {
      toast.error(`Fail : ${error.message}`, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };

  return { sendTransaction };
};

export default useTransaction;
