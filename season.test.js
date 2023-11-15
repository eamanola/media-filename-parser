import fs from 'fs';
import season from './season';

describe('season', () => {
  let testnames = null;

  beforeAll(() => {
    testnames = JSON.parse(fs.readFileSync('./testnames.json', 'utf8'));
  });

  it('should determine season', () => {
    testnames.forEach(({ filename, season: s }) => {
      expect(season(filename)).toBe(s);
    });
  });
});
