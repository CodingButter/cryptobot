const knex = require("knex");
const config = require("../knexfile");
const db = knex(config.development);

//CREATE
module.exports.createRaffle = async (raffle) => {
  try {
    const results = await db("raffles").insert(raffle);
    console.log(results);
    return results;
  } catch (error) {
    console.log(error);
  }
};
module.exports.addUserWant = async (want) => {
  try {
    const results = await db("users_want").insert(want);
    console.log(results);
    return results;
  } catch (error) {
    console.log(error);
  }
};
module.exports.addPlant = async (plantInfo) => {
  try {
    console.log(plantInfo);
    const results = await db("plants").insert(plantInfo);
    console.log(results);
    return results;
  } catch (error) {
    console.log(error);
  }
};
module.exports.addPayment = async (transaction) => {
  try {
    const results = await db("payments").insert(transaction);
    return results;
  } catch (error) {
    console.log(error);
  }
};
//READ
module.exports.getUsers = async (id) => {
  if (id) return await db("users").where({ id }).select();
  return await db("users").select();
};

module.exports.getLedger = async (id) => {
  if (id) return await db("ledger").where({ id }).select();
  return await db("ledger").select();
};
module.exports.getRaffles = async (id) => {
  if (id) return await db("raffles").where({ id }).select();
  return await db("raffles").select();
};
module.exports.getWinnings = async (user) => {
  if (user) return await db("winnings").where({ user }).select();
  return await db("winnings").select();
};
module.exports.getUsersWants = async (company) => {
  return await db("users_want")
    .select("item", "username")
    .where("company", company);
};
module.exports.getPlants = async (company) => {
  return await db("plants").select();
};
//UPDATE
module.exports.usePlant = async (id) => {
  return await db("plants").update({ status: 2 }).where({ id });
};
module.exports.getPayment = async (hash) => {
  return await db("payments").select("hash", hash);
};
module.exports.getPayments = async () => {
  return await db("payments").select();
};

//DELETE
module.exports.deletePlant = async (id) => {
  return await db("plants").delete().where({ id });
};
