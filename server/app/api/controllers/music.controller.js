const Music = require("../models/Music.model");
const HTTPSTATUSCODE = require("../../../utils/httpStatusCode");
const fs = require("fs");

const imageToUri = require("image-to-uri");

const createMusic = async (req, res, next) => {
  try {
    musicCover = req.file.path ? req.file.path : null; //En esta linea le estamos diciendo que si existe nos devuelva el archivo por su nombre y que si no devuelva un null.
    const newMusic = new Music();
    newMusic.name = req.body.name;
    newMusic.artist = req.body.artist;
    newMusic.cover = imageToUri(musicCover); //Y lo seteamos en cover.
    newMusic.year = req.body.year;
    const MusicDb = await newMusic.save();
    await fs.unlinkSync(musicCover);
    return res.json({
      status: 201,
      message: HTTPSTATUSCODE[201],
      data: { music: MusicDb.name },
    });
  } catch (error) {
    return next(error);
  }
};

const getAllMusic = async (req, res, next) => {
  try {
    // Si no pasais paginación por query params quitar el if
    if (req.query.page) {
      const page = parseInt(req.query.page);
      const skip = (page - 1) * 20;
      const music = await Music.find().skip(skip).limit(20);
      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: { music: music },
      });
    } else {
      const music = await Music.find();
      return res.json({
        status: 200,
        message: HTTPSTATUSCODE[200],
        data: { music: music },
      });
    }
  } catch (error) {
    return next(error);
  }
};

const getMusicById = async (req, res, next) => {
  try {
    const { musicId } = req.params;
    const musicById = await Music.findById(musicId);
    return res.json({
      status: 200,
      message: HTTPSTATUSCODE[200],
      data: { music: musicById },
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { createMusic, getAllMusic, getMusicById };
