import fs from 'fs';
import year from './year';

describe('year', () => {
  let testnames = null;

  beforeAll(() => {
    testnames = JSON.parse(fs.readFileSync('./src/test-names.json', 'utf8'));
  });

  it('should determine year', () => {
    testnames.forEach(({ filename, year: y }) => {
      // try {
      expect(year(filename)).toBe(y);
      // } catch (err) {
      //   console.log(filename, year(filename), y)
      // }
    });
  });
});
