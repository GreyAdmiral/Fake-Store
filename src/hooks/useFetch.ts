import { useCallback, useEffect, useRef, useState } from 'react';

interface InitProp extends Omit<RequestInit, 'signal'> {
   clearingData?: boolean;
}

interface ErrorRequest extends Error {
   status?: number;
}

const CONTENT_TYPE_KEY = 'Content-Type';
const JSON_MIME = 'application/json';

export function useFetch<T>(url: string | URL | Request, init?: InitProp) {
   const [data, setData] = useState<T | null>(null);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [error, setError] = useState<ErrorRequest | null>(null);
   const [reloadKey, setReloadKey] = useState<number>(0);
   const initRef = useRef<InitProp>(init);
   const refetch = useCallback(() => {
      setReloadKey((key) => key + 1);
   }, []);

   initRef.current = init;

   useEffect(() => {
      const controller = new AbortController();
      const currentInit = initRef.current;
      const { clearingData = true, ...requestInit } = currentInit ?? {};

      setIsLoading(true);
      setError(null);
      if (clearingData) setData(null);

      fetch(url, { ...requestInit, signal: controller.signal })
         .then(async (res: Response) => {
            const isJson = res.headers.get(CONTENT_TYPE_KEY)?.includes(JSON_MIME);

            if (!res.ok) {
               const errorData = await res.json().catch(() => ({}));
               const error = new Error(errorData.message || res.statusText || `Fetch error! (${res.status})`);

               ((<unknown>error) as ErrorRequest).status = res.status;
               throw error;
            }

            if (!isJson) {
               throw new Error('Invalid content type. Expected JSON.');
            }

            return res.json();
         })
         .then((json: T) => {
            if (!controller.signal.aborted) {
               setData(json);
            }
         })
         .catch((err: Error) => {
            if (err.name !== 'AbortError') {
               setError(err);
            }
         })
         .finally(() => {
            if (!controller.signal.aborted) {
               setIsLoading(false);
            }
         });

      return () => controller.abort();
   }, [reloadKey, url]);

   return [data, isLoading, error, refetch] as const;
}
