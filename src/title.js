import path from 'path';
import clean from './clean';
import { match as matchSeason } from './season';
import { match as matchEpisode } from './episode';
import { match as matchYear } from './year';

const TITLE_UNKNOWN = null;
const replacement = ' ';

const removeSeason = (filename) => {
  const seasonToRemove = matchSeason(filename);

  const seasonRemoved = seasonToRemove
    ? filename.replace(seasonToRemove[0], replacement)
    : filename;

  return seasonRemoved;
};

const removeEpisode = (filename) => {
  const { match: episodeToRemove, wildGuess } = matchEpisode(filename);

  const episodeRemoved = episodeToRemove && !wildGuess
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

const replaceDots = (filename) => filename.replace(/\./g, replacement);

const trimSpecialChars = (filename) => filename
  .trim()
  .replace(/^[^a-zA-Z0-9]/, replacement)
  .replace(/[^a-zA-Z0-9]$/, replacement)
  .trim();

const name = (filename) => {
  const [cleaned] = clean(filename, { replacement }).split(path.sep);

  const seasonRemoved = removeSeason(cleaned);
  const episodeRemoved = removeEpisode(seasonRemoved);
  const yearRemoved = removeYear(episodeRemoved);

  const dotsReplaced = replaceDots(yearRemoved);

  const trimmed = trimSpecialChars(dotsReplaced);

  return trimmed.split(`${replacement}${replacement}`)[0] || TITLE_UNKNOWN;
};

export {
  TITLE_UNKNOWN,
};

export default name;
