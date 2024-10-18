import { PiWalletFill } from "react-icons/pi";

import { Button } from "@/components/ui/button";

import { useSDK } from "@metamask/sdk-react";
import { formatAddress } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

export const ConnectWalletButton = () => {
  const { sdk, connected, connecting, account } = useSDK();

  const connect = async () => {
    try {
      await sdk?.connect();
    } catch (err) {
      console.warn(`No accounts found`, err);
    }
  };

  const disconnect = () => {
    console.log("Disconnecting...");
    if (sdk) {
      sdk.terminate();
    }
  };

  console.log("connected", connected);
  console.log("account", account);
  return (
    <div className="relative">
      {connected ? (
        <Popover>
          <PopoverTrigger>
            <Button>{formatAddress(account)}</Button>
          </PopoverTrigger>
          <PopoverContent className="mt-2 w-44 bg-gray-100 border rounded-md shadow-lg right-0 z-10 top-10">
            <button
              onClick={disconnect}
              className="block w-full pl-2 pr-4 py-2 text-left text-[#F05252] hover:bg-gray-200"
            >
              Disconnect
            </button>
          </PopoverContent>
        </Popover>
      ) : (
        <Button disabled={connecting} onClick={connect}>
          <PiWalletFill className="mr-2 h-4 w-4" /> Connect Wallet
        </Button>
      )}
    </div>
  );
};
