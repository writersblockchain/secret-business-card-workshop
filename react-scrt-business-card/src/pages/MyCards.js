import { React, useState } from "react";

export default function MyCards({ secretJs }) {
  let [myCards, setMyCards] = useState([]);
  let contractAddress = "secret1cr6qes7vfg4eceazqhdvxrjmudetfs6x5hzvuw";
  let contractCodeHash =
    "5c2bd9ea7affc1af2c05e773ccc9ac0120b412c2829dcddf452a71ab11be5b24";

  let formSubmitted = (e) => {
    e.preventDefault();

    queryCard(
      e.target.elements.walletAddress.value,
      e.target.elements.viewingKey.value,
      e.target.elements.cardNumber.value
    );
  };

  let queryCard = async (walletAddress, viewingKey, cardNumber) => {
    let business_card_query_tx = await secretJs.query.compute.queryContract({
      contract_address: contractAddress,
      query: {
        get_card: {
          wallet: walletAddress,
          viewing_key: viewingKey,
          index: parseInt(cardNumber),
        },
      },
      code_hash: contractCodeHash,
    });

    setMyCards((prevState) => [...prevState, business_card_query_tx.card]);
  };

  let renderCards = myCards.map((card, i) => (
    <div key={i}>
      <div className="divide-y mt-2 ml-2  max-w-xs divide-gray-200 overflow-hidden rounded-lg bg-black text-white shadow ">
        <div className="px-4 py-5 sm:px-6">
          <h3>Name: {card.name}</h3>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <p>Phone: {card.phone}</p>
          <p>Address: {card.address}</p>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      <div className="pt-4 ml-6 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Query a Secret Business Card
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Query a Secret Business Card with customizable privacy.
              </p>
            </div>
          </div>
          <div className="mt-5 mr-2 md:col-span-2 md:mt-0">
            <form onSubmit={formSubmitted}>
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="walletAddress"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Wallet Address
                      </label>
                      <input
                        type="text"
                        name="walletAddress"
                        id="walletAddress"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="viewingKey"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Viewing Key
                      </label>
                      <input
                        type="text"
                        name="viewingKey"
                        id="viewingKey"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="card-number"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        id="cardNumber"
                        autoComplete="card number"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <>{renderCards}</>
    </>
  );
}

//Bc1QHb84jYtF4URrooLBOuXkyk20mc5vmc73tRE44+Q=
