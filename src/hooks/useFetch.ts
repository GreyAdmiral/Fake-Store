import { useEffect, useState } from 'react';

export function useFetch<T>(url: string | URL | Request, init?: Omit<RequestInit, 'signal'>) {
   const [data, setData] = useState<T | null>(null);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [error, setError] = useState<Error | null>(null);

   useEffect(() => {
      const controller = new AbortController();
      const fetchInit = { ...init, signal: controller.signal };

      setIsLoading(true);
      setError(null);
      setData(null);

      fetch(url, fetchInit)
         .then(async (res: Response) => {
            const contentTypeKey = 'Content-Type';
            const jsonTypeMark = 'application/json';
            const isJson = res.headers.get(contentTypeKey)?.includes(jsonTypeMark);

            if (!res.ok) {
               let message = `HTTP ${res.status}: Fetch error!`;

               if (isJson) {
                  try {
                     const errorData = await res.json();

                     if (errorData.message) {
                        message = `HTTP ${res.status}: ${errorData.message}.`;
                     } else if (res.statusText) {
                        message = `HTTP ${res.status}: ${res.statusText}.`;
                     }
                  } catch (_err) {
                     if (res.statusText) message = `HTTP ${res.status}: ${res.statusText}.`;
                  }
               }

               throw new Error(message);
            }

            if (!isJson) {
               const errMessage = 'HTTP 400: Invalid content type. Expected JSON.';
               throw new Error(errMessage);
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
               console.error(err.message);
               setError(err);
            }
         })
         .finally(() => {
            if (!controller.signal.aborted) {
               setIsLoading(false);
            }
         });

      return () => controller.abort();
   }, [init, url]);

   return [data, isLoading, error] as const;
}
