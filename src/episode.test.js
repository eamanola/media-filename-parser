import fs from 'fs';
import episode, { EPISODE_UNKNOWN } from './episode';

let testnames = null;

describe('episode', () => {
  beforeAll(() => {
    testnames = JSON.parse(fs.readFileSync('./test-names.json', 'utf8'));
  });
  it('should determine episode', () => {
    testnames.forEach(({ filename, episodeInfo }) => {
      // try {
      expect(episode(filename)).toEqual(episodeInfo);
      // } catch (err) {
      //   console.error(filename, episode(filename), episodeInfo);
      //   throw err;
      // }
    });
  });

  it('should parse explicit names', () => {
    expect(episode('s1e01')).toEqual({ episode: 1 });
    expect(episode('S1E01')).toEqual({ episode: 1 });
    expect(episode('s1e1')).toEqual({ episode: 1 });
    expect(episode('s1e100')).toEqual({ episode: 100 });
    expect(episode('s1e0001')).toEqual({ episode: 1 });
    expect(episode('foo 12 s 1 e 100 bar 25')).toEqual({ episode: 100 });
    expect(episode('episode 100')).toEqual({ episode: 100 });
    expect(episode('ep100')).toEqual({ episode: 100 });
    expect(episode('s1ep100')).toEqual({ episode: 100 });
  });

  it('should fallback to numbers below 1900', () => {
    expect(episode('My show 1')).toEqual({ episode: 1 });
    expect(episode('My show 10')).toEqual({ episode: 10 });
    expect(episode('My show 100')).toEqual({ episode: 100 });
    expect(episode('My show 1800')).toEqual({ episode: 1800 });
    expect(episode('My show 01')).toEqual({ episode: 1 });
    expect(episode('My show 1950')).toEqual({ episode: EPISODE_UNKNOWN });
  });
});

/*
import fs from 'fs';
let testnames = JSON.parse(fs.readFileSync('./testnames.json', 'utf8'));

const withEpisode = testnames.map(({ filename, season }) => ({
  filename, season, episode: episode(filename)
}));

fs.writeFileSync('./test-names.json', JSON.stringify(withEpisode))

*/
