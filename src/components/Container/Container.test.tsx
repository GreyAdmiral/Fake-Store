import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { Container } from './Container';

vi.mock('./Container.module.scss', () => ({
   default: {
      container: 'container',
   },
}));

describe('Тесты ограничивающего контейнера', () => {
   afterEach(cleanup);

   test('Рендер без класса', () => {
      render(<Container>Lorem ipsum</Container>);
      const container = screen.getByText(/Lorem ipsum/i);

      expect(container).toBeInTheDocument();
      expect(container).toHaveClass('container');
      expect(container?.classList.length).toBe(1);
   });

   test('Рендер с классом', () => {
      const className = 'test';

      render(<Container className={className}>Lorem ipsum</Container>);
      const container = screen.getByText(/Lorem ipsum/i);

      expect(container).toBeInTheDocument();
      expect(container).toHaveClass(className);
      expect(container?.classList.length).toBe(2);
   });
});
