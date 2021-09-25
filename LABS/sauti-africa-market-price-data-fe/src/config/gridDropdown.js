// Populate currency dropdown data

const currencyList = ['MWK', 'RWF', 'KES', 'UGX', 'TZS', 'CDF', 'BIF', 'USD']

export const currencyOptions = currencyList.map((currency, index) => ({
  key: `currency-${index}`,
  text: currency,
  value: currency
}))
