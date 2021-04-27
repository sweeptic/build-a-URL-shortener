exports.getHello = (req, res, next) => {
  res.json({ greeting: 'hello API' });
};

exports.getDate = (req, res, next) => {
  let date;

  console.log(date);

  if (req.params.date !== undefined) {
    const unixTimestamp = +req.params.date;

    date = isNaN(unixTimestamp)
      ? new Date(req.params.date)
      : new Date(unixTimestamp);
  } else {
    date = new Date(Date.now());
  }

  const response =
    date == 'Invalid Date'
      ? { error: 'Invalid Date' }
      : {
          unix: date.getTime(),
          utc: date.toUTCString(),
        };

  res.json(response);
};
