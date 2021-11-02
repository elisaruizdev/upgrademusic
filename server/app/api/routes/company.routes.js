const express = require("express");
const router = express.Router();

const {
  createCompany,
  getAllCompanies,
} = require("../controllers/company.controller");

router.post("/create", createCompany);
router.get("/", getAllCompanies);

module.exports = router;
