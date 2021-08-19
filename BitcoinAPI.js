const fetch = require("node-fetch");

const endpoint = "https://blockchain.info/";

const satoshiToCurrencyValue = async (satoshis) => {
  const coinPrice = await getCurrentBitcoinPrice();
  return (coinPrice / 100000000) * satoshis;
};

const getCurrentBitcoinPrice = async () => {
  const resp = await fetch(`${endpoint}q/24hrprice`);
  return parseFloat(await resp.text());
};

const getTransactions = async (bitcoinAddress) => {
  const resp = await fetch(`${endpoint}rawaddr/${bitcoinAddress}`);
  const { txs } = await resp.json();
  const filteredTransactions = txs.filter(({ result }) => result > 0);
  const transactions = await Promise.all(
    filteredTransactions.map(async ({ hash, result, time }) => {
      const amount = await satoshiToCurrencyValue(result);
      return {
        hash,
        amount,
        time,
      };
    })
  );
  return transactions;
};

module.exports = { getTransactions };
