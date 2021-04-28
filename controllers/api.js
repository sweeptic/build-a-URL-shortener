const shortid = require('shortid');
const URL = require('../models/url');

exports.getHello = (req, res, next) => {
  res.json({ greeting: 'hello from fcc-url-shortener' });
};

exports.postNew = async (req, res, next) => {
  const url = req.body.url;
  const urlCode = shortid.generate();

  function urlIsValid(url) {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
      url
    );
  }

  if (!urlIsValid(url)) {
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
