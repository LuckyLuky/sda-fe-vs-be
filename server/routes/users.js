var express = require("express");
var router = express.Router();

const users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Lukas Havlicek" },
];

router.post("/", function (req, res, next) {
  users.push(req.body);
  res.json({ success: true });
});

/* GET */

router.get("/", function (req, res, next) {
  res.json(users);
});

router.get("/:id", function (req, res, next) {
  console.log(req.params.id);
  res.json(
    users.find((user) => {
      if (user.id === parseInt(req.params.id)) {
        return true;
      } else {
        return false;
      }
    })
  );
});

module.exports = router;
