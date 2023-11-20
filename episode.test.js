import episode, { EPISODE_UNKNOWN } from './episode';

describe('episode', () => {
  it('should parse explicit names', () => {
    expect(episode('s1e01')).toBe(1);
    expect(episode('S1E01')).toBe(1);
    expect(episode('s1e1')).toBe(1);
    expect(episode('s1e100')).toBe(100);
    expect(episode('s1e0001')).toBe(1);
    expect(episode('foo 12 s 1 e 100 bar 25')).toBe(100);
    expect(episode('episode 100')).toBe(100);
    expect(episode('ep100')).toBe(100);
    expect(episode('s1ep100')).toBe(100);
  });

  it('should fallback to numbers below 1900', () => {
    expect(episode('My show 1')).toBe(1);
    expect(episode('My show 10')).toBe(10);
    expect(episode('My show 100')).toBe(100);
    expect(episode('My show 1800')).toBe(1800);
    expect(episode('My show 01')).toBe(1);
    expect(episode('My show 1950')).toBe(EPISODE_UNKNOWN);
  });
});
