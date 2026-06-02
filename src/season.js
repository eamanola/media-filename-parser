import path from 'path-browserify';

const SEASON_UNKNOWN = null;

const re = /(?:season|s)\s*(?<season>\d+)/iu;

const match = (filenamePart) => filenamePart.match(re);

const season = (filename) => {
  const parts = filename.split(path.sep).reverse();

  for (let i = 0, il = parts.length; i < il; i += 1) {
    const matched = match(parts[i]);
    if (matched) {
      return Number(matched.groups.season);
    }
  }

  return SEASON_UNKNOWN;
};

export {
  SEASON_UNKNOWN,
  match,
};

export default season;
