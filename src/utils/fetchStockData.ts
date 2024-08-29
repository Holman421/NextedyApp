import { Stock } from '../types/types';
import { generateUUID } from '../utils/generateUUID';
import { validateStockSymbol } from './validateStockSymbols';

export const fetchStockData = async (
  symbols: string[],
): Promise<{ fetchedData: Stock[]; errors: string[] }> => {
  const fetchedData: Stock[] = [];
  const errors: string[] = [];
  const now = new Date();

  for (const symbol of symbols) {
    const isValid = await validateStockSymbol(symbol);

    if (!isValid) {
      errors.push(symbol);
      continue;
    }

    const localStorageKey = `stockData_${symbol}`;
    const cachedData = JSON.parse(
      localStorage.getItem(localStorageKey) || 'null',
    );

    if (
      cachedData &&
      now.getTime() - new Date(cachedData.lastUpdated).getTime() <
        10 * 60 * 1000
    ) {
      fetchedData.push(cachedData);
    } else {
      try {
        const response = await fetch(
          `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${import.meta.env.VITE_FINNHUB_API_KEY}`,
        );

        if (!response.ok) {
          throw new Error(`Error fetching data for ${symbol}`);
        }

        const data = await response.json();

        if (data.c) {
          const newData = {
            id: generateUUID(),
            symbol,
            price: data.c.toFixed(2),
            lastUpdated: now.toISOString(),
          };
          fetchedData.push(newData);
          localStorage.setItem(localStorageKey, JSON.stringify(newData));
        }
      } catch (error) {
        console.error(`Failed to fetch stock data for ${symbol}:`, error);
      }
    }
  }

  return { fetchedData, errors };
};
