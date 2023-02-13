import { React } from "react";
import CreateCard from "../components/CreateCard";

export default function Home({
  card,
  setCard,
  viewingKey,
  setViewingKey,
  secretJs,
  myAddress,
}) {
  return (
    <main className="">
      <CreateCard
        card={card}
        setCard={setCard}
        viewingKey={viewingKey}
        setViewingKey={setViewingKey}
        secretJs={secretJs}
        myAddress={myAddress}
      />
    </main>
  );
}
