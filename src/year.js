const YEAR_UNKNOWN = null;

const re = /(?:^|[\s([.])(\d{4})(?:[\s)\].]|$)/i;

const match = (filenamePart) => filenamePart.match(re);

const year = (filename) => {
  const m = match(filename);

  if (m) {
    const y = Number(m[1]);
    if (y > 1900) {
      return y;
    }
  }

  return YEAR_UNKNOWN;
};

export {
  YEAR_UNKNOWN,
  match,
};

export default year;
