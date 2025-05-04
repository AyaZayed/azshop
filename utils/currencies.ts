import currencyCodes from "currency-codes";
import getSymbolFromCurrency from "currency-symbol-map";

export const supportedCurrencies = currencyCodes.data
  .filter((c) => getSymbolFromCurrency(c.code)) // only ones with a symbol
  .map((c) => ({
    code: c.code,
    name: c.currency,
    symbol: getSymbolFromCurrency(c.code),
  }));
