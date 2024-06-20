const YEAR_UNKNOWN = null;

const MIN_YEAR = 1900; // line between wild guesses and years

const re = /(?:^|[\s([.])(?<year>\d{4})(?:[\s)\].]|$)/iu;

const match = (filenamePart) => filenamePart.match(re);

const year = (filename) => {
  const matched = match(filename);

  if (matched) {
    const value = Number(matched.groups.year);
    if (value > MIN_YEAR) {
      return value;
    }
  }

  return YEAR_UNKNOWN;
};

export {
  YEAR_UNKNOWN,
  MIN_YEAR,
  match,
};

export default year;
