import path from 'node:path';

const SEASON_UNKNOWN = null;

const re = /(?:season|s)\s*(?<season>\d+)/iu;
const weak = /(?<season>\d+)(?:[^a-zA-Z1-9])*(?:st|nd|rd|th)(?:[^1-9a-zA-Z])*season/iu;

const match = (filenamePart) => filenamePart.match(re) || filenamePart.match(weak);

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
