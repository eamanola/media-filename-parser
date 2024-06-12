import fs from 'fs';
import name from './name';

describe('name', () => {
  let testnames = null;

  beforeAll(() => {
    testnames = JSON.parse(fs.readFileSync('./test-names.json', 'utf8'));
  });

  it('should determine name', () => {
    testnames.forEach(({ filename, name: n }) => {
      // try {
      expect(name(filename)).toBe(n);
      // } catch (err) {
      //   console.log(filename, name(filename));
      // }
    });
  });
});
