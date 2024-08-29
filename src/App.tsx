import { useState } from "react";
import "./App.css";
import TextInput from "./components/TextInput/TextInput";
import StocksTable from "./components/StocksTable/StocksTable";
import useHandleStockPrices from "./hooks/useHandleStockPrices";
import Hint from "./components/Hint/Hint";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadingMessage from "./components/LoadingMessage/LoadingMessage";

function App() {
  const [text, setText] = useState("");

  const { stockData, isLoading, invalidSymbols } = useHandleStockPrices(text);

  return (
    <div className="main-container">
      <TextInput text={text} setText={setText} />
      <ErrorMessage invalidSymbols={invalidSymbols} />
      <Hint />
      <StocksTable stocks={stockData} />
      <LoadingMessage loading={isLoading} />
    </div>
  );
}

export default App;
