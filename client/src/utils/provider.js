import { StaticJsonRpcProvider } from "@ethersproject/providers";

const RPC_URL = "http://127.0.0.1:7545";

export const simpleRpcProvider = new StaticJsonRpcProvider(RPC_URL);
