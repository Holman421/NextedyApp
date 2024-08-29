import { useState, useEffect } from "react";
import { Stock } from "../types/types";
import { fetchStockData } from "../utils/fetchStockData";

function useStockPrices(inputString: string) {
  const [stockData, setStockData] = useState<Stock[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [invalidSymbols, setInvalidSymbols] = useState<string[]>([]);

  const symbols = inputString
    .split(" ")
    .map(symbol => symbol.trim())
    .filter(Boolean);

  useEffect(() => {
    const debounceFetch = setTimeout(() => {
      if (inputString.trim() !== "") {
        fetchStockPrices();
      }
    }, 1000);

    return () => clearTimeout(debounceFetch);
  }, [inputString]);

  useEffect(() => {
    setInvalidSymbols(prevInvalidSymbols =>
      prevInvalidSymbols.filter(symbol => symbols.includes(symbol)),
    );
  }, [inputString]);

  const fetchStockPrices = async () => {
    setIsLoading(true);

    const { fetchedData, errors } = await fetchStockData(symbols);

    setStockData(fetchedData);
    setInvalidSymbols(errors.filter(symbol => symbols.includes(symbol)));
    setIsLoading(false);
  };

  return { stockData, isLoading, invalidSymbols };
}

export default useStockPrices;
