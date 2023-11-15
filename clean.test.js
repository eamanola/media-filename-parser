import fs from 'fs';
import clean from './clean';

const sizeInfo = /(?:1080|720)p/i;
const sourceInfo = /(?:(?:hd|web|bd)rip|web-dl)/i;
const fileSizeInfo = /\d+mb/i;
const codecsInfo = new RegExp(
  [
    'x264',
    'x265',
    'hevc',
    'xvid',
    'aac5.1',
    'aac',
    'ac3.evo',
    'ac3',
    'flac',
    'bluray',
  ].join('|'),
  'i',
);

describe('clean', () => {
  let filenames = null;

  beforeAll(() => {
    filenames = fs.readFileSync('./randomnames', 'utf8').split(/\n/);
  });

  /*
  afterAll(() => {
    filenames
      .map((filename) => clean(filename))
      .forEach((filename) => {
        console.log(filename);
      });
  });
  */

  it('should remove size info', () => {
    const before = filenames
      .some((filename) => sizeInfo.test(filename));
    expect(before).toBe(true);

    const after = filenames
      .map((filename) => clean(filename))
      .some((filename) => sizeInfo.test(filename));
    expect(after).toBe(false);
  });

  it('should remove source info', () => {
    const before = filenames
      .some((filename) => sourceInfo.test(filename));
    expect(before).toBe(true);

    const after = filenames
      .map((filename) => clean(filename))
      .some((filename) => sourceInfo.test(filename));
    expect(after).toBe(false);
  });

  it('should remove file size info', () => {
    const before = filenames
      .some((filename) => fileSizeInfo.test(filename));
    expect(before).toBe(true);

    const after = filenames
      .map((filename) => clean(filename))
      .some((filename) => fileSizeInfo.test(filename));
    expect(after).toBe(false);
  });

  it('should remove codec info', () => {
    const before = filenames
      .some((filename) => codecsInfo.test(filename));
    expect(before).toBe(true);

    const after = filenames
      .map((filename) => clean(filename))
      .some((filename) => codecsInfo.test(filename));
    expect(after).toBe(false);
  });
});
