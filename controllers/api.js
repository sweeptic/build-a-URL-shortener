const shortid = require('shortid');
const URL = require('../models/url');
var validUrl = require('valid-url');

exports.getHello = (req, res, next) => {
  res.json({ greeting: 'hello from fcc-url-shortener' });
};

exports.postNew = async (req, res, next) => {
  const url = req.body.url;
  const urlCode = shortid.generate();

  if (!validUrl.isWebUri(url)) {
    res.status(401).json({ error: 'Invalid URL' });
  } else {
    try {
      let findOne = await URL.findOne({ original_url: url });

      if (findOne) {
        res.json({
          original_url: findOne.original_url,
          short_url: findOne.short_url,
        });
      } else {
        findOne = new URL({
          original_url: url,
          short_url: urlCode,
        });
        await findOne.save();
        res.json({
          original_url: findOne.original_url,
          short_url: findOne.short_url,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json('Server error');
    }
  }
};

exports.getShortURL = async (req, res, next) => {
  try {
    const urlParams = await URL.findOne({
      short_url: req.params.short_url,
    });

    if (urlParams) {
      return res.redirect(urlParams.original_url);
    } else {
      return res.status(404).json('No URL found');
    }
  } catch (error) {
    console.log(error);
    res.status(500).json('Server error');
  }
};
