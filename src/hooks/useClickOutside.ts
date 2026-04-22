import { type RefObject, useCallback, useEffect } from 'react';

export const useClickOutside = (ref: RefObject<HTMLElement | null>, callback: () => void) => {
   const handleClick = useCallback(
      (e: MouseEvent) => {
         const target = e.target as Node;

         if (ref.current && !ref.current.contains(target)) {
            callback();
         }
      },
      [ref, callback]
   );

   useEffect(() => {
      document.addEventListener('click', handleClick);

      return () => {
         document.removeEventListener('click', handleClick);
      };
   }, [handleClick]);
};
