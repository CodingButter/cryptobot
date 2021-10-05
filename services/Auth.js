const router = require("express").Router();
const db = require("../services/Database");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const key = process.env.JWT_TOKEN_SECRET;
router.post("/login", async ({ body: { username, password } }, res) => {
  const response = await db.getUserByUserNamePassword(username, password);
  if (response.error) res.json({ type: "login", error: response.error });
  else {
    try {
      const token = jwt.sign({ id: response.id }, key, {
        expiresIn: "1d",
      });
      res.json({ token });
    } catch (error) {
      res.json({ type: "Session Error", error: "Invalid token Relogin" });
    }
  }
});

router.post("/", async (req, res) => {
  res.json({ success: "success" });
});

const bypass = [
  "/confirm",
  "/script.js",
  "/auth/login",
  "/crucd/create/wants/:company",
  "/crud/read/wants/:company",
  "/ct/",
  "/st/:ticket",
];

const middleware = async (req, res, next) => {
  next();
  return;
  const path = req.originalUrl.split("?")[0];
  console.log({ path });
  var proceed = bypass.includes(path);
  bypass.forEach((target) => {
    const splitTarget = target.split(":");
    if (splitTarget.length > 1) {
      splitTarget.pop();
      if (path.includes(splitTarget.join("/"))) proceed = true;
    }
  });
  if (proceed) {
    next();
  } else {
    if (!req.headers.authentication) {
      res.json({ type: "Session Error", error: "No auth Token Provided" });
      return;
    } else {
      token = req.headers.authentication.replace("JWT ", "");
      try {
        jwt.verify(token, key);
        next();
      } catch (error) {
        res.json({ type: "Session Error", error: "Login Again" });
      }
    }
  }
};

module.exports = {
  AuthRouter: router,
  AuthMiddleware: middleware,
};
