import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { sepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "RainbowKit demo",
  projectId: "be24f2656bb777baf7f605219e8abc74",
  chains: [sepolia],
  ssr: true,
});
