import fs from 'node:fs';
import episode from './episode';

let testnames = null;

describe('episode', () => {
  beforeAll(() => {
    testnames = JSON.parse(fs.readFileSync('./src/test-names.json', 'utf8'));
  });
  it('should determine episode', () => {
    testnames.forEach(({ filename, episodeInfo }) => {
      // try {
      expect(episode(filename)).toEqual(episodeInfo);
      // } catch (err) {
      //  console.error(filename, episode(filename), episodeInfo);
      // }
    });
  });
});
