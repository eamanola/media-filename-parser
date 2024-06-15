import path from 'path';
import clean, { replacePart } from './clean.js';

const EPISODE_UNKNOWN = -1;

const matchReg = (filenamePart, re) => filenamePart.match(re);

const explicitNaming = (filenamePart) => {
  const re = /(?:^|[^a-zA-Z])(e|ep|episode|ncop|nced|extra|oad)(?:\.|\s*)(\d+)(?:\s*v\s*(\d+))?/i;

  return matchReg(filenamePart, re);
};

const implicitNaming = (filenamePart) => {
  const re = /(?:^|\s)(\d{1,4})(?:\s*v\s*(\d+))?(?:[^\dA-Za-z]|$)/i;

  return matchReg(replacePart(filenamePart, ''), re);
};

const match = (filenamePart) => {
  let m;
  let key;
  let value;
  let version;

  const explicit = explicitNaming(filenamePart);
  if (explicit) {
    m = explicit;

    key = ((/^(?:e|ep|episode)$/i).test(explicit[1]) ? 'episode' : explicit[1].toLowerCase());
    value = Number(explicit[2]);
    version = Number(explicit[3]);
  } else {
    // Questionable
    const implicit = implicitNaming(filenamePart);
    if (implicit && Number(implicit[1]) < 1900) {
      m = implicit;

      key = 'wildGuess';
      value = Number(implicit[1]);
      version = Number(implicit[2]);
    }
  }

  if (m) {
    let episodeInfo = { [key]: value };

    if (version) {
      episodeInfo = { ...episodeInfo, version };
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
