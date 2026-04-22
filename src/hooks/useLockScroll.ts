import { type RefObject, useCallback, useEffect } from 'react';

const KEYBOARD_LOCKED_CODES = new Set(['ArrowUp', 'ArrowDown']);

export const useLockScroll = (isUseLock: boolean, allowTouchScrollRef?: RefObject<HTMLElement | null>) => {
   const scrollLockHandler = useCallback(
      (e: Event) => {
         e.stopPropagation();

         if ((e.type === 'wheel' || e.type === 'touchmove') && allowTouchScrollRef?.current) {
            const { current: allowTouchScroll } = allowTouchScrollRef;
            const isScroll = allowTouchScroll.scrollHeight > allowTouchScroll.offsetHeight;
            let target = e.target as HTMLElement | null;

            while (target && target !== document.body) {
               if (target === allowTouchScroll) {
                  if (!isScroll) e.preventDefault();
                  return;
               }

               target = target.parentElement;
            }
         }

         e.preventDefault();
      },
      [allowTouchScrollRef]
   );

   const scrollKeyLockHandler = useCallback((e: KeyboardEvent) => {
      e.stopPropagation();

      if (KEYBOARD_LOCKED_CODES.has(e.code)) {
         e.preventDefault();
      }
   }, []);

   useEffect(() => {
      if (!isUseLock) return;
      const options = { passive: false };
      const body = document.body;

      body.addEventListener('wheel', scrollLockHandler, options);
      body.addEventListener('touchmove', scrollLockHandler, options);
      body.addEventListener('keydown', scrollKeyLockHandler);

      return () => {
         body.removeEventListener('wheel', scrollLockHandler);
         body.removeEventListener('touchmove', scrollLockHandler);
         body.removeEventListener('keydown', scrollKeyLockHandler);
      };
   }, [scrollLockHandler, scrollKeyLockHandler, isUseLock]);
};
