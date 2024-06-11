import path from 'path';

const SEASON_UNKNOWN = -1;

const re = /(?:^|[.\s([])(?:season|s)[.\s]*(\d+)/i;

const season = (filename) => {
  const parts = filename.split(path.sep).reverse();
  let m = null;

  for (let i = 0, il = parts.length; i < il; i += 1) {
    m = parts[i].match(re);
    if (m) {
      return Number(m[1]);
    }
  }

  return SEASON_UNKNOWN;
};

export {
  SEASON_UNKNOWN,
};

export default season;
