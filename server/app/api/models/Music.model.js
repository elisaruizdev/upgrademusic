const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MusicSchema = new Schema(
    {
        name: { type: String, require: true },
        artist: { type: String, require: true },
        cover: { type: String, require: true },
        year: { type: Number, require: true }
    },
    { timestamps: true }
);

const Music = mongoose.model("music", MusicSchema);
module.exports = Music;