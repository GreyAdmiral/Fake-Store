import { useEffect, useState } from 'react';

export const useSVGLoad = (path: string) => {
   const [svg, setSvg] = useState<string | null>(null);

   useEffect(() => {
      const ajax = new XMLHttpRequest();
      ajax.open('GET', path, true);
      ajax.send();
      ajax.onload = () => {
         if (ajax.status !== 200) {
            console.error(`Ошибка ${ajax.status}: ${ajax.statusText}`);
            return;
         }

         setSvg(ajax.response);
      };
   }, [path]);

   return svg;
};
