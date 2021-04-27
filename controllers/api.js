exports.getHello = (req, res, next) => {
  res.json({ greeting: 'hello from fcc-url-shortener' });
};

exports.getNew = (req, res, next) => {
  const response = { message: 'getNew' };

  res.json(response);
};

exports.postShortURL = (req, res, next) => {
  const response = { message: 'postShortURL' };

  res.json(response);
};
