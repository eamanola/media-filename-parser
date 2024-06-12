import path from 'path';
import clean from './clean';
import { match as matchSeason } from './season';
import { match as matchEpisode } from './episode';
import { match as matchYear } from './year';

const NAME_UNKNOWN = null;

const removeSeason = (filename) => {
  const seasonToRemove = matchSeason(filename);

  const seasonRemoved = seasonToRemove
    ? filename.replace(seasonToRemove[0], '')
    : filename;

  return seasonRemoved;
};

const removeEpisode = (filename) => {
  const { match: episodeToRemove, wildGuess } = matchEpisode(filename);

  const episodeRemoved = episodeToRemove && !wildGuess
    ? filename.replace(episodeToRemove[0], '')
    : filename;

  return episodeRemoved;
};

const removeYear = (filename) => {
  const yearToRemove = matchYear(filename);

  const yearRemoved = yearToRemove
    ? filename.replace(yearToRemove[0], '')
    : filename;

  return yearRemoved;
};

const replaceDots = (filename) => filename.replace(/\./g, ' ');

const replaceExtraSpaces = (filename) => filename.replace(/\s+/g, ' ');

const trimSpecialChars = (filename) => filename
  .trim()
  .replace(/^[^a-zA-Z0-9]/, '')
  .replace(/[^a-zA-Z0-9]$/, '')
  .trim();

const name = (filename) => {
  const [cleaned] = clean(filename).split(path.sep);

  const seasonRemoved = removeSeason(cleaned);
  const episodeRemoved = removeEpisode(seasonRemoved);
  const yearRemoved = removeYear(episodeRemoved);

  const dotsReplaced = replaceDots(yearRemoved);

  const trimmed = trimSpecialChars(dotsReplaced);

  return replaceExtraSpaces(trimmed) || NAME_UNKNOWN;
};

export {
  NAME_UNKNOWN,
};

export default name;
