const { cars } = require("../data/supercars");
const { ignores } = require("../data/ignores");
const router = require("express").Router();
const db = require("../services/Database");
//CREATE
router.post("/create/users", async (req, res) => {
  res.json(await db.addUser(req.body));
});
router.post("/create/ledgers", async (req, res) => {
  res.json(await db.addLegers(req.body));
});
router.post("/create/raffle", async (req, res) => {
  res.json(await db.createRaffle(req.body));
});
router.post("/create/winnings", async (req, res) => {
  res.json(await db.addWinnings(req.body));
});
router.post("/create/plant", async (req, res) => {
  console.log(req.body);
  res.json(await db.addPlant(req.body));
});
router.get("/create/want/:company", async (req, res) => {
  /**
   * @TODO autocorrect Words
   */
  const { company } = req.params;
  const { message, username } = req.query;
  const words = message.toLowerCase().split(" ");
  const carName = words
    .filter(
      (word) =>
        word.length > 2 && cars.includes(word) && !ignores.includes(word)
    )
    .join(" ");
  /**
   * @TODO check word agains list of vehicles
   */
  if (carName.length > 0) {
    res.json(await db.addUserWant({ company, username, item: carName }));
  } else {
    res.json({ error: "No Vehicle Found" });
  }
});

//READ
router.post("/read/users", async (req, res) => {
  res.json(await db.getUsers(req.body.id));
});
router.get("/read/plants", async (req, res) => {
  res.json(await db.getPlants());
});
router.post("/read/ledger", async (req, res) => {
  res.json(await db.getLedger());
});
router.post("/read/raffles", async (req, res) => {
  res.json(await db.getRaffles(req.body.raffle));
});
router.post("/read/winnings", async (req, res) => {
  res.json(await db.getWinnings());
});
router.post("/read/winnings/:user", async (req, res) => {
  res.json(await db.getWinnings(req.body.user));
});
router.get("/read/wants/:company", async (req, res) => {
  const { company } = req.params;
  const groupBy = (xs, key) => {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  const getVotes = (wants) => {
    /**
     * wants structure
     * {
     *  id,username,item
     * }
     */

    const totalVotesArray = groupBy(wants, "item");
    const pollObj = [];
    const uniqueVotes = {};
    Object.keys(totalVotesArray).map((prize) => {
      var uniqueUserVotes = groupBy(totalVotesArray[prize], "username");

      pollObj.push({
        item: prize,
        uniqueVotes: Object.keys(uniqueUserVotes).length,
        totalVotes: totalVotesArray[prize].length,
      });
    });

    return pollObj.filter((item) => item.uniqueVotes >= 2);
  };

  const totalVotes = getVotes(await db.getUsersWants(company));

  res.json(totalVotes);
});

//UPDATE
router.get("/update/plant/:id", async (req, res) => {
  res.json(await db.usePlant(req.params.id));
});
6;
//DELETE
router.get("/delete/plant/:id", async (req, res) => {
  res.json(await db.deletePlant(req.params.id));
});

module.exports = router;
