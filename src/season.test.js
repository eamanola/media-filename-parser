import fs from 'node:fs';
import season from './season';

describe('season', () => {
  let testnames = null;

  beforeAll(() => {
    testnames = JSON.parse(fs.readFileSync('./src/test-names.json', 'utf8'));
  });

  it('should determine season', () => {
    testnames.forEach(({ filename, season: expectedSeason }) => {
      // try {
      expect(season(filename)).toBe(expectedSeason);
      // } catch (err) {
      //   console.log(filename, season(filename))
      // }
    });
  });
});
