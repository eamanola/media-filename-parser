import path from 'node:path';
import clean, { trimSpecialChars } from './clean.js';
import { match as matchSeason } from './season.js';
import { match as matchEpisode } from './episode.js';
import { match as matchYear } from './year.js';

const TITLE_UNKNOWN = null;
const replacement = '---';

const removeSeason = (filename) => {
  const seasonToRemove = matchSeason(filename);

  const seasonRemoved = seasonToRemove
    ? filename.replace(seasonToRemove[0], replacement)
    : filename;

  return seasonRemoved;
};

const removeEpisode = (filename) => {
  const { match: episodeToRemove, episodeInfo } = matchEpisode(filename);

  const episodeRemoved = episodeToRemove && !episodeInfo.isWildGuess
    ? filename.replace(episodeToRemove[0], replacement)
    : filename;

  return episodeRemoved;
};

const removeYear = (filename) => {
  const yearToRemove = matchYear(filename);

  const yearRemoved = yearToRemove
    ? filename.replace(yearToRemove[0], replacement)
    : filename;

  return yearRemoved;
};

const replaceDots = (filename) => filename.replace(/\./gu, ' ');

const name = (filename) => {
  const cleaned = clean(filename.split(path.sep)[0], { replacement });

  const seasonRemoved = removeSeason(cleaned);
  const episodeRemoved = removeEpisode(seasonRemoved);
  const yearRemoved = removeYear(episodeRemoved);

  const dotsReplaced = replaceDots(yearRemoved);
  const trimmed = trimSpecialChars(dotsReplaced, '');

  return trimmed.split(`${replacement}`)[0].trim() || TITLE_UNKNOWN;
};

export {
  TITLE_UNKNOWN,
};

export default name;
