import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';

import { Loader } from './Loader';

vi.mock('./Loader.module.scss', () => ({
   default: {
      loader: 'loader',
      spinner: 'spinner',
   },
}));

describe('Тесты спинера', () => {
   afterEach(cleanup);

   test('Рендер', () => {
      const { container } = render(<Loader />);
      const loaderElement = container.querySelector('div');

      expect(loaderElement).toBeInTheDocument();
      expect(loaderElement).toHaveClass('loader');

      if (loaderElement) {
         const spinnerElement = loaderElement.querySelector('span');

         expect(spinnerElement).toBeInTheDocument();
         expect(spinnerElement).toHaveClass('spinner');
      }
   });
});
