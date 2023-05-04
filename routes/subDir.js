const express = require("express");
const router = express();
const path = require("path");

router.get("^/$|/sub(.html)?", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "views", "subDir", "sub.html"));
});

router.get("/test.html", (req,res) => {
    res.sendFile(path.join(__dirname, "..", "views", "subDir", "test.html"));
});

module.exports = router