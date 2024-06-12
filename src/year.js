const YEAR_UNKNOWN = -1;

const re = /(?:^|[\s([.])(\d{4})(?:[\s)\].]|$)/i;

const match = (filenamePart) => filenamePart.match(re);

const year = (filename) => {
  const m = match(filename);

  if (m) {
    return Number(m[1]);
  }

  return YEAR_UNKNOWN;
};

export {
  YEAR_UNKNOWN,
  match,
};

export default year;
