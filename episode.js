import path from 'path';

const EPISODE_UNKNOWN = -1;

const explicitNaming = (filename) => {
  const re = /(?:^|[^a-zA-Z])(?:e|ep|episode)\s*(\d+)/i;

  const m = filename.match(re);
  if (m) {
    return Number(m[1]);
  }

  return EPISODE_UNKNOWN;
};

const implicitNaming = (filename) => {
  const re = /(?:^|[^\d])(\d{1,4})(?:[^\d]|$)/;

  const m = filename.match(re);
  if (m) {
    return Number(m[1]);
  }

  return EPISODE_UNKNOWN;
};

const episode = (filename) => {
  const parts = filename.split(path.sep).reverse();
  let ep = EPISODE_UNKNOWN;

  for (let i = 0, il = parts.length; i < il; i += 1) {
    ep = explicitNaming(parts[i]);
    if (ep !== EPISODE_UNKNOWN) {
      return ep;
    }

    ep = implicitNaming(parts[i]);
    if (ep !== EPISODE_UNKNOWN) {
      if (ep < 1900) {
        return ep;
      }
    }
  }

  return EPISODE_UNKNOWN;
};

export {
  EPISODE_UNKNOWN,
};

export default episode;
