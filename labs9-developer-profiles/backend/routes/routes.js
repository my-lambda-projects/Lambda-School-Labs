const express = require("express");
const cors = require("cors");
const router = express.Router();

const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const listRoutes = require("./listRoutes");
const apiRoutes = require("./apiRoutes");

router.use(express.json());
router.use(cors());

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/list", listRoutes);
router.use("/api", apiRoutes);

module.exports = router;
