import path from 'path';
import clean from './clean';

const EPISODE_UNKNOWN = -1;

const matchReg = (filenamePart, re) => {
  const m = filenamePart.match(re);
  if (m) {
    return Number(m[1]);
  }

  return EPISODE_UNKNOWN;
};

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

const episode = (filename) => {
  const parts = clean(filename).split(path.sep).reverse();
  let ep = EPISODE_UNKNOWN;

  for (let i = 0, il = parts.length; i < il; i += 1) {
    ep = explicitNaming(parts[i]);
    if (ep !== EPISODE_UNKNOWN) {
      return { episode: ep };
    }

    ep = ncop(parts[i]);
    if (ep !== EPISODE_UNKNOWN) {
      return { episode: EPISODE_UNKNOWN, ncop: ep };
    }

    ep = nced(parts[i]);
    if (ep !== EPISODE_UNKNOWN) {
      return { episode: EPISODE_UNKNOWN, nced: ep };
    }

    ep = extra(parts[i]);
    if (ep !== EPISODE_UNKNOWN) {
      return { episode: EPISODE_UNKNOWN, extra: ep };
    }

    ep = oad(parts[i]);
    if (ep !== EPISODE_UNKNOWN) {
      return { episode: EPISODE_UNKNOWN, oad: ep };
    }

    ep = implicitNaming(parts[i]);
    if (ep !== EPISODE_UNKNOWN) {
      if (ep < 1900) {
        return { episode: ep };
      }
    }
  }

  return { episode: EPISODE_UNKNOWN };
};

export {
  EPISODE_UNKNOWN,
};

export default episode;
