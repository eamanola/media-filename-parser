import fs from 'node:fs';
import title from './title';

describe('title', () => {
  let testnames = null;

  beforeAll(() => {
    testnames = JSON.parse(fs.readFileSync('./src/test-names.json', 'utf8'));
  });

  it('should determine name', () => {
    testnames.forEach(({ filename, title: expectedTitle }) => {
      // try {
      expect(title(filename)).toBe(expectedTitle);
      // } catch (err) {
      //   console.log(filename, title(filename));
      // }
    });
  });
});
