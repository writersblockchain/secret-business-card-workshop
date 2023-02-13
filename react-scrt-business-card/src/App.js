import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MyCards from "./pages/MyCards";
import { Routes, Route } from "react-router-dom";

import { useState } from "react";

function App() {
  const [secretJs, setSecretJs] = useState(null);
  const [myAddress, setMyAddress] = useState("");
  let [card, setCard] = useState([
    {
      name: "",
      address: "",
      number: "",
      index: "",
    },
  ]);

  let [viewingKey, setViewingKey] = useState(null);

  return (
    <>
      <Navbar
        secretJs={secretJs}
        setSecretJs={setSecretJs}
        myAddress={myAddress}
        setMyAddress={setMyAddress}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              card={card}
              setCard={setCard}
              viewingKey={viewingKey}
              setViewingKey={setViewingKey}
              secretJs={secretJs}
              myAddress={myAddress}
            />
          }
        />

        <Route
          path="my-cards"
          element={
            <MyCards
              secretJs={secretJs}
              // myCards={myCards}
              // setMyCards={setMyCards}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
