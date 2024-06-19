import path from 'path';
import clean, { replacePart } from './clean.js';

const EPISODE_UNKNOWN = null;

const matchReg = (filenamePart, re) => filenamePart.match(re);

const explicitNaming = (filenamePart) => {
  const re = /(?:^|[^a-zA-Z])(e|ep|episode|ncop|nced|extra|oad)(?:\.|\s*)(\d+)(?:\s*v\s*(\d+))?/i;

  return matchReg(filenamePart, re);
};

const implicitNaming = (filenamePart) => {
  const re = /(?:^|\s)(\d{1,4})(?:\s*v\s*(\d+))?(?:[^\dA-Za-z]|$)/i;

  return matchReg(replacePart(filenamePart, ''), re);
};

const explicit = (filenamePart) => {
  const m = explicitNaming(filenamePart);

  if (m) {
    const value = Number(m[2]);
    const version = Number(m[3]) || null;
    const isWildGuess = false;
    const extra = /ncop|nced|extra|oad/i.test(m[1]) ? m[1].toLowerCase() : null;

    return {
      m,
      episodeInfo: {
        episode: value,
        version,
        isWildGuess,
        extra,
      },
    };
  }

  return EPISODE_UNKNOWN;
};

const wildGuess = (filenamePart) => {
  const m = implicitNaming(filenamePart);

  if (m && Number(m[1]) < 1900) {
    const value = Number(m[1]);
    const version = Number(m[2]) || null;
    const isWildGuess = true;
    const extra = null;

    return {
      m,
      episodeInfo: {
        episode: value,
        version,
        isWildGuess,
        extra,
      },
    };
  }

  return EPISODE_UNKNOWN;
};

const match = (filenamePart) => {
  const explicitMatch = explicit(filenamePart);
  if (explicitMatch !== EPISODE_UNKNOWN) {
    const { m, episodeInfo } = explicitMatch;
    return { match: m, episodeInfo };
  }

  // Questionable
  const wildGuessMatch = wildGuess(filenamePart);
  if (wildGuessMatch !== EPISODE_UNKNOWN) {
    const { m, episodeInfo } = wildGuessMatch;
    return { match: m, episodeInfo };
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

  return EPISODE_UNKNOWN;
};

export {
  match,
  EPISODE_UNKNOWN,
};

export default episode;
