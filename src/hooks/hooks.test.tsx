import { render, renderHook, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import { useClickOutside } from './useClickOutside';
import { useFetch } from './useFetch';
import { useLockScroll } from './useLockScroll';

import '@testing-library/jest-dom';

type FetchResult = {
   message: string;
};

function TestComponent({ url }: { url: string }) {
   const [data, isLoading, error] = useFetch<FetchResult>(url);
   if (isLoading) return <div>Loading...</div>;
   if (data) return <div>Data: {(data as FetchResult).message}</div>;
   if (error) return <div>Error: {(error as Error).message}</div>;
   return <div>Запрос отклонен!</div>;
}

describe('Тесты кастомных хуков', () => {
   test('Тест хука useLockScroll', () => {
      vi.spyOn(document.body, 'addEventListener');
      expect(document.body.addEventListener).toHaveBeenCalledTimes(0);

      const lockScroll = renderHook(() => useLockScroll(true));

      expect(document.body.addEventListener).toHaveBeenCalledTimes(3);
      vi.spyOn(document.body, 'removeEventListener');
      expect(document.body.removeEventListener).toHaveBeenCalledTimes(0);

      lockScroll.unmount();

      expect(document.body.removeEventListener).toHaveBeenCalledTimes(3);
   });

   test('Тест хука useClickOutside', async () => {
      const target = document.createElement('aside') as HTMLTemplateElement;
      const outside = document.createElement('div');
      const ref = {
         current: target,
      };
      const callback = vi.fn();
      const hook = renderHook(() => useClickOutside(ref, callback));

      document.body.appendChild(target);
      document.body.appendChild(outside);

      expect(callback).toHaveBeenCalledTimes(0);

      await userEvent.click(outside);
      expect(callback).toHaveBeenCalledTimes(1);

      vi.spyOn(document, 'removeEventListener');
      hook.unmount();
      expect(document.removeEventListener).toHaveBeenCalledTimes(1);

      await userEvent.click(outside);
      expect(callback).toHaveBeenCalledTimes(1);
   });

   test('Тест возврата состояния загрузки хуком useFetch', async () => {
      const url = 'https://example.com/api';

      global.fetch = vi.fn().mockImplementation(() =>
         Promise.resolve({
            ok: true,
            status: 200,
            headers: new Headers({
               'Content-Type': 'application/json',
            }),
            json: () => Promise.resolve({ message: 'Success' }),
         })
      );

      const { getByText } = render(<TestComponent url={url} />);

      expect(getByText('Loading...')).toBeInTheDocument();

      await waitFor(() => {
         expect(global.fetch).toHaveBeenCalledWith(
            url,
            expect.objectContaining({
               signal: expect.any(AbortSignal),
            })
         );
      });

      await waitFor(() => {
         expect(global.fetch).toHaveBeenCalledWith(url, expect.any(Object));
      });

      await waitFor(() => {
         expect(getByText('Data: Success')).toBeInTheDocument();
      });
   });

   test('Тест возврата ошибки хуком useFetch', async () => {
      const url = 'https://example.com/api';
      global.fetch = vi.fn(() => Promise.reject(new Error('Fetch error')));
      const { getByText } = render(<TestComponent url={url} />);

      await waitFor(() => {
         expect(getByText('Error: Fetch error')).toBeInTheDocument();
      });
   });
});
