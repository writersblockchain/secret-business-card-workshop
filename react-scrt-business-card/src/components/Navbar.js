import { Disclosure } from "@headlessui/react";
import { WalletIcon } from "@heroicons/react/24/outline";
import SecretNetworkLogo from "../SecretNetworkLogo.svg";
import { SecretNetworkClient } from "secretjs";
import { Link } from "react-router-dom";

function Navbar({ secretJs, setSecretJs, myAddress, setMyAddress }) {
  const CHAIN_ID = "pulsar-2";
  const grpcWebUrl = "https://api.pulsar.scrttestnet.com";

  let connectWallet = async () => {
    if (!window.keplr) {
      alert("Please install keplr extension");
    } else {
      await window.keplr.enable(CHAIN_ID);
      const keplrOfflineSigner =
        window.keplr.getOfflineSignerOnlyAmino(CHAIN_ID);
      const [{ address: myAddress }] = await keplrOfflineSigner.getAccounts();

      setSecretJs(
        await new SecretNetworkClient({
          url: grpcWebUrl,
          chainId: CHAIN_ID,
          wallet: keplrOfflineSigner,
          walletAddress: myAddress,
        })
      );
      setMyAddress(myAddress);
      console.log(myAddress);
    }
  };

  return (
    <>
      <div className="min-h-full">
        <div className="bg-gray-800">
          <Disclosure as="nav" className="bg-black">
            {({ open }) => (
              <>
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                  <div className="border-b border-black">
                    <div className="flex h-16 items-center justify-between px-4 sm:px-0">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <img
                            className="h-8 w-8"
                            src={SecretNetworkLogo}
                            alt="Secret Network Logo"
                          />
                        </div>
                        <div className="hidden md:block">
                          <div className="ml-10 flex items-baseline space-x-4">
                            <Link to="/">
                              <div className=" text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800">
                                <div>Home</div>
                              </div>
                            </Link>

                            <Link to="/my-cards">
                              <div className=" text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800">
                                <div>My Cards</div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                          <button
                            type="button"
                            className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            onClick={connectWallet}
                          >
                            <span className="sr-only">View notifications</span>
                            <WalletIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Disclosure>
          <header className="py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Business Card Demo
              </h1>
            </div>
          </header>
        </div>
      </div>
    </>
  );
}

export default Navbar;
