import {animations, resolveDirection} from './animation';

describe('animations (server compatibility)', () => {
  it('defaults to ltr when DOM APIs are not available', () => {
    expect(resolveDirection({} as any)).toBe('ltr');
  });

  it('returns rtl when computed styles indicate rtl', () => {
    const stubElement = document.createElement('div');
    const direction = resolveDirection({
      window: {
        getComputedStyle: () => ({direction: 'rtl'}) as unknown as CSSStyleDeclaration,
      } as any,
      document: {
        documentElement: stubElement,
        body: null,
      } as any,
    });

    expect(direction).toBe('rtl');
  });

  it('reads dir attribute when styles are unavailable', () => {
    const stubElement = document.createElement('div');
    stubElement.setAttribute('dir', 'rtl');

    const direction = resolveDirection({
      window: {} as any,
      document: {
        documentElement: stubElement,
        body: null,
      } as any,
    });

    expect(direction).toBe('rtl');
  });

  it('does not throw when generating animations without DOM access', () => {
    expect(() => animations({} as any)).not.toThrow();
  });
});
