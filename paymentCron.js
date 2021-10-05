const { getTransactions } = require("./BitcoinAPI");
const db = require("./services/Database");
require("dotenv").config();
setInterval(async () => {
  const payments = await db.getPayments();
  const hashes = payments.map(({ hash }) => hash);
  const transactions = await getTransactions(process.env.BITCOIN_ADDRESS);
  transactions.forEach(async ({ hash, amount, time }) => {
    if (!hashes.includes(hash)) {
      const id = await db.addPayment({ hash, amount, time });
    }
  });
}, 1000 * 60 * 20);

const paymentStatus = async () => {
  var totalPaid = 0;
  const payments = await db.getPayments();

  const weekmils = 1000 * 60 * 60 * 24;
  const currentTime = Date.now();
  const totalExpected = ~~(
    (2000 / 7) *
    ((currentTime - payments[0].time) / weekmils)
  );
  payments.forEach(({ amount }) => {
    totalPaid += ~~parseFloat(amount);
  });
  return { totalPaid, totalExpected };
};

module.exports = paymentStatus;
