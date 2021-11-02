const Company = require("../models/Company.model");

const HTTPSTATUSCODE = require("../../../utils/httpStatusCode");

const createCompany = async (req, res, next) => {
  try {
    const newCompany = new Company();
    newCompany.name = req.body.name;
    newCompany.description = req.body.description;
    newCompany.musics = req.body.musics;
    const CompanyDb = await newCompany.save();
    return res.json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      data: { company: CompanyDb },
    });
  } catch (error) {
    return next(error);
  }
};

const getAllCompanies = async (req, res, next) => {
  try {
    const companies = await Company.find().populate("musics");
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: { companies: companies },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { createCompany, getAllCompanies };
