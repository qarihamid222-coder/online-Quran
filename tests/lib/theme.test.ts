import { describe, expect, it } from 'vitest';
import { isThemeMode, resolveIsDark } from '@/lib/theme';

describe('isThemeMode', () => {
  it('accepts the three valid theme modes', () => {
    expect(isThemeMode('light')).toBe(true);
    expect(isThemeMode('dark')).toBe(true);
    expect(isThemeMode('system')).toBe(true);
  });

  it('rejects anything else', () => {
    expect(isThemeMode('auto')).toBe(false);
    expect(isThemeMode(null)).toBe(false);
    expect(isThemeMode(undefined)).toBe(false);
    expect(isThemeMode(1)).toBe(false);
    expect(isThemeMode('')).toBe(false);
  });
});

describe('resolveIsDark', () => {
  it('resolves "dark" mode to true regardless of system preference', () => {
    expect(resolveIsDark('dark')).toBe(true);
  });

  it('resolves "light" mode to false regardless of system preference', () => {
    expect(resolveIsDark('light')).toBe(false);
  });

  it('resolves "system" mode by falling back to system preference (no window here, so false)', () => {
    expect(resolveIsDark('system')).toBe(false);
  });
});
