import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { afterEach, expect, vi } from 'vitest';

expect.extend(matchers);

global.matchMedia =
   global.matchMedia ||
   (() => ({
      onchange: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
   }));

global.fetch = vi.fn();
global.URL.createObjectURL = vi.fn();
global.URL.revokeObjectURL = vi.fn();
window.URL.createObjectURL = vi.fn();
window.URL.revokeObjectURL = vi.fn();

Object.defineProperty(window, 'matchMedia', {
   writable: true,
   value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
   })),
});

afterEach(() => {
   cleanup();
});
