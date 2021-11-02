const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanySchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    musics: [{ type: Schema.Types.ObjectId, ref: "music", required: true }],
  },
  { timestamps: true }
);

const Company = mongoose.model("company", CompanySchema);

module.exports = Company;
