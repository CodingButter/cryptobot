const db = require("./services/Database");
const extentionRequest = ({ socket, headers }, res, next) => {
  db.addExtentionRequest(
    socket.remoteAddress.split(":").pop() ||
      headers["x-forwarded-for"].split(":").pop()
  );
  next();
};
module.exports = extentionRequest;
