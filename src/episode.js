import path from 'path';
import clean from './clean';

const EPISODE_UNKNOWN = -1;

const matchReg = (filenamePart, re) => filenamePart.match(re);

const extras = (filenamePart, label) => {
  const re = new RegExp(`(?:^|\\s+)${label}\\s*(\\d+)`, 'i');

  return matchReg(filenamePart, re);
};

const explicitNaming = (filenamePart) => {
  const re = /(?:^|[^a-zA-Z])(?:e|ep|episode)(?:\.|\s*)(\d+)/i;

  return matchReg(filenamePart, re);
};

const ncop = (filenamePart) => extras(filenamePart, 'ncop');

const nced = (filenamePart) => extras(filenamePart, 'nced');

const extra = (filenamePart) => extras(filenamePart, 'extra');

const oad = (filenamePart) => extras(filenamePart, 'oad');

const implicitNaming = (filenamePart) => {
  const re = /(?:^|\s)(\d{1,4})(?:[^\d]|$)/;

  return matchReg(filenamePart, re);
};

const match = (filenamePart) => {
  let m = explicitNaming(filenamePart);
  if (m) {
    return { episode: Number(m[1]), match: m };
  }

  m = ncop(filenamePart);
  if (m) {
    return { episode: EPISODE_UNKNOWN, ncop: Number(m[1]), match: m };
  }

  m = nced(filenamePart);
  if (m) {
    return { episode: EPISODE_UNKNOWN, nced: Number(m[1]), match: m };
  }

  m = extra(filenamePart);
  if (m) {
    return { episode: EPISODE_UNKNOWN, extra: Number(m[1]), match: m };
  }

  m = oad(filenamePart);
  if (m) {
    return { episode: EPISODE_UNKNOWN, oad: Number(m[1]), match: m };
  }

  // Questionable
  m = implicitNaming(filenamePart);
  if (m) {
    if (Number(m[1]) < 1900) {
      return { episode: EPISODE_UNKNOWN, wildGuess: Number(m[1]), match: m };
    }
  }

  return { match: null };
};

const episode = (filename) => {
  const parts = clean(filename).split(path.sep).reverse();

  for (let i = 0, il = parts.length; i < il; i += 1) {
    const { match: m, ...rest } = match(parts[i]);
    if (m) {
      return { ...rest };
    }
  }

  return { episode: EPISODE_UNKNOWN };
};

export {
  match,
  EPISODE_UNKNOWN,
};

export default episode;
