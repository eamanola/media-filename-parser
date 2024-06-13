import fs from 'fs';
import title from './title';

describe('title', () => {
  let testnames = null;

  beforeAll(() => {
    testnames = JSON.parse(fs.readFileSync('./test-names.json', 'utf8'));
  });

  it('should determine name', () => {
    testnames.forEach(({ filename, title: expectedTitle }) => {
      // try {
      expect(title(filename)).toBe(expectedTitle);
      // } catch (err) {
      //   console.log(filename, name(filename));
      // }
    });
  });
});
