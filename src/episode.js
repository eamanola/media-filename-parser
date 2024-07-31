import path from 'node:path';

import clean, { replacePart } from './clean.js';
import { MIN_YEAR } from './year.js';

const EPISODE_UNKNOWN = null;

const matchReg = (filenamePart, re) => filenamePart.match(re);

const explicitNaming = (filenamePart) => {
  const re = /(?:^|[^a-zA-Z])(?<type>e|ep|episode|ncop|nced|extra|oad)(?:\.|\s*)(?<episode>\d+)(?:\s*v\s*(?<version>\d+))?/iu;

  return matchReg(filenamePart, re);
};

const implicitNaming = (filenamePart) => {
  const re = /(?:^|\s)(?<episode>\d{1,4})(?:\s*v\s*(?<version>\d+))?(?:[^\dA-Za-z]|$)/iu;

  return matchReg(replacePart(filenamePart, ''), re);
};

const explicit = (filenamePart) => {
  const matched = explicitNaming(filenamePart);

  if (matched) {
    const value = Number(matched.groups.episode);
    const version = Number(matched.groups.version) || null;
    const isWildGuess = false;
    const extra = /ncop|nced|extra|oad/ui.test(matched.groups.type)
      ? matched.groups.type.toLowerCase()
      : null;

    return {
      episodeInfo: {
        episode: value,
        extra,
        isWildGuess,
        version,
      },
      matched,
    };
  }

  return EPISODE_UNKNOWN;
};

const wildGuess = (filenamePart) => {
  const matched = implicitNaming(filenamePart);

  if (matched && Number(matched.groups.episode) < MIN_YEAR) {
    const value = Number(matched.groups.episode);
    const version = Number(matched.groups.version) || null;
    const isWildGuess = true;
    const extra = null;

    return {
      episodeInfo: {
        episode: value,
        extra,
        isWildGuess,
        version,
      },
      matched,
    };
  }

  return EPISODE_UNKNOWN;
};

const match = (filenamePart) => {
  const explicitMatch = explicit(filenamePart);
  if (explicitMatch !== EPISODE_UNKNOWN) {
    const { matched, episodeInfo } = explicitMatch;
    return { episodeInfo, match: matched };
  }

  // Questionable
  const wildGuessMatch = wildGuess(filenamePart);
  if (wildGuessMatch !== EPISODE_UNKNOWN) {
    const { matched, episodeInfo } = wildGuessMatch;
    return { episodeInfo, match: matched };
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
