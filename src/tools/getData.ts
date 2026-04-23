export async function getData(url: string | URL | Request) {
   const contentTypeKey = 'Content-Type';
   const jsonTypeMark = 'application/json';

   try {
      const res = await fetch(url);
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

      return await res.json();
   } catch (error: unknown) {
      console.error((error as Error).message);
      throw new Error((error as Error).message);
   }
}
