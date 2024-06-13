import path from 'path';
import clean from './clean';

const EPISODE_UNKNOWN = -1;

const matchReg = (filenamePart, re) => filenamePart.match(re);

const extras = (filenamePart, label) => {
  const re = new RegExp(`(?:^|\\s+)${label}\\s*(\\d+)(?:\\s*v\\s*(\\d+))?`, 'i');

  return matchReg(filenamePart, re);
};

const explicitNaming = (filenamePart) => {
  const re = /(?:^|[^a-zA-Z])(?:e|ep|episode)(?:\.|\s*)(\d+)(?:\s*v\s*(\d+))?/i;

  return matchReg(filenamePart, re);
};

const ncop = (filenamePart) => extras(filenamePart, 'ncop');

const nced = (filenamePart) => extras(filenamePart, 'nced');

const extra = (filenamePart) => extras(filenamePart, 'extra');

const oad = (filenamePart) => extras(filenamePart, 'oad');

const implicitNaming = (filenamePart) => {
  const re = /(?:^|\s)(\d{1,4})(?:\s*v\s*(\d+))?(?:[^\d]|$)/;

  return matchReg(filenamePart, re);
};

const match = (filenamePart) => {
  let m;
  let key = null;

  // eslint-disable-next-line no-cond-assign
  if (m = explicitNaming(filenamePart)) {
    key = 'episode';
  // eslint-disable-next-line no-cond-assign
  } else if (m = ncop(filenamePart)) {
    key = 'ncop';
  // eslint-disable-next-line no-cond-assign
  } else if (m = nced(filenamePart)) {
    key = 'nced';
  // eslint-disable-next-line no-cond-assign
  } else if (m = extra(filenamePart)) {
    key = 'extra';
  // eslint-disable-next-line no-cond-assign
  } else if (m = oad(filenamePart)) {
    key = 'oad';
  // eslint-disable-next-line no-cond-assign
  } else if ((m = implicitNaming(filenamePart))) { // Questionable
    if (Number(m[1]) < 1900) {
      key = 'wildGuess';
    }
  }

  if (m && key) {
    const [, value, version] = m;
    let episodeInfo = { [key]: Number(value) };

    if (key !== 'episode') {
      episodeInfo = { ...episodeInfo, episode: EPISODE_UNKNOWN };
    }

    if (version) {
      episodeInfo = { ...episodeInfo, version: Number(version) };
    }

    return { episodeInfo, match: m };
  }

  return { episodeInfo: null, match: null };
};

const episode = (filename) => {
  const parts = clean(filename).split(path.sep).reverse();

  for (let i = 0, il = parts.length; i < il; i += 1) {
    const { episodeInfo } = match(parts[i]);
    if (episodeInfo) {
      return episodeInfo;
    }
  }

  return { episode: EPISODE_UNKNOWN };
};

export {
  match,
  EPISODE_UNKNOWN,
};

export default episode;
