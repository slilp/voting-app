import { StaticJsonRpcProvider } from "@ethersproject/providers";

const RPC_URL = "https://polygon-rpc.com";

export const simpleRpcProvider = new StaticJsonRpcProvider(RPC_URL);
