const express = require("express");

const router = express.Router();

router.get("/test", (req, res, next) => {
  return res.json({ success: "성공했구나 이해울,," });
});

module.exports = router;
