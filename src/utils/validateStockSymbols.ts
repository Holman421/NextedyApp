export const validateStockSymbol = async (symbol: string): Promise<boolean> => {
  const storageKey = `validatedSymbol_${symbol.toUpperCase()}`;
  const cachedResult = localStorage.getItem(storageKey);

  if (cachedResult !== null) {
    return JSON.parse(cachedResult);
  }

  const response = await fetch(
    `https://finnhub.io/api/v1/search?q=${symbol}&token=${import.meta.env.VITE_FINNHUB_API_KEY}`,
  );

  if (!response.ok) {
    throw new Error(`Error validating symbol: ${symbol}`);
  }

  const data = await response.json();
  const isValid = data.result.some(
    (item: { symbol: string }) =>
      item.symbol.toUpperCase() === symbol.toUpperCase(),
  );

  localStorage.setItem(storageKey, JSON.stringify(isValid));
  return isValid;
};