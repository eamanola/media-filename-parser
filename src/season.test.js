import fs from 'fs';
import season from './season';

describe('season', () => {
  let testnames = null;

  beforeAll(() => {
    testnames = JSON.parse(fs.readFileSync('./test-names.json', 'utf8'));
  });

  it('should determine season', () => {
    testnames.forEach(({ filename, season: s }) => {
      // try {
      expect(season(filename)).toBe(s);
      // } catch (err) {
      //   console.log(filename, season(filename))
      // }
    });
  });
});
