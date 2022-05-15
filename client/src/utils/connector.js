import { InjectedConnector } from "@web3-react/injected-connector";
import { Web3Provider } from "@ethersproject/providers";

export const injected = new InjectedConnector({
  supportedChainIds: [1, 1337],
});

export const getLibrary = (provider) => {
  return new Web3Provider(provider);
};
