import type { FC, PropsWithChildren } from 'react';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';

import { useClickOutside } from '@hooks/useClickOutside';
import { useLockScroll } from '@hooks/useLockScroll';

import styles from './Modal.module.scss';
import type { ModalProps } from './types';

const modalCloseKeysCodes = ['Escape'];
const lockKeysCodes = ['Home', 'End'];
const lockPageKeysCodes = ['PageUp', 'PageDown'];
const focusableElementsSelector =
   ':scope button:not(:disabled), :scope [href], :scope input:not(:disabled), :scope select:not(:disabled), :scope textarea:not(:disabled), :scope [tabindex]:not([tabindex="-1"])';

export const Modal: FC<PropsWithChildren & ModalProps> = ({ isOpenModal, onClose, children, ...props }) => {
   const modalRef = useRef(null);
   const modalRoot = useMemo(() => {
      const element = document.createElement('div');

      element.classList.add(styles.modal);
      return element;
   }, []);

   const keydownHandler = useCallback(
      (e: KeyboardEvent) => {
         e.stopPropagation();

         if (modalCloseKeysCodes.includes(e.code)) {
            onClose();
         }

         if (lockPageKeysCodes.includes(e.code)) {
            const modal = modalRef.current as HTMLElement | null;

            if (modal) {
               e.preventDefault();

               switch (e.key) {
                  case 'PageUp':
                     modal.scrollBy({ top: -modal.clientHeight, behavior: 'smooth' });
                     break;

                  case 'PageDown':
                     modal.scrollBy({ top: modal.clientHeight, behavior: 'smooth' });
                     break;

                  default:
                     break;
               }
            }
         }

         if (lockKeysCodes.includes(e.code)) {
            const modal = modalRef.current as HTMLElement | null;
            const target = e.target as HTMLElement;
            const isTextField =
               target.matches('input[type="text"]') ||
               target.matches('input[type="email"]') ||
               target.matches('input[type="password"]') ||
               target.matches('input[type="search"]') ||
               target.matches('input[type="tel"]') ||
               target.matches('input[type="url"]') ||
               target.matches('textarea');

            if (modal && !isTextField) {
               e.preventDefault();

               switch (e.key) {
                  case 'Home':
                     modal.scrollTo({ top: 0, behavior: 'smooth' });
                     break;

                  case 'End':
                     modal.scrollTo({ top: modal.scrollHeight, behavior: 'smooth' });
                     break;

                  default:
                     break;
               }
            }
         }

         if (e.key === 'Tab') {
            const modal = modalRef.current as HTMLElement | null;

            if (modal) {
               const { shiftKey } = e;
               const focusableElements = modal.querySelectorAll(focusableElementsSelector);
               const firstElement = focusableElements[0] as HTMLElement;
               const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
               const isFocusInModal = document.activeElement?.closest(`div.${styles.modalBody}`);

               if (!isFocusInModal) {
                  e.preventDefault();
                  firstElement?.focus();
               } else if (shiftKey && document.activeElement === firstElement) {
                  e.preventDefault();
                  lastElement?.focus();
               } else if (!shiftKey && document.activeElement === lastElement) {
                  e.preventDefault();
                  firstElement?.focus();
               }
            }
         }
      },
      [onClose]
   );

   useClickOutside(modalRef, onClose);
   useLockScroll(isOpenModal, modalRef);

   useEffect(() => {
      if (isOpenModal) {
         document.body.append(modalRoot);
         document.body.addEventListener('keydown', keydownHandler);

         return () => {
            modalRoot.remove();
            document.body.removeEventListener('keydown', keydownHandler);
         };
      }
   }, [isOpenModal, keydownHandler, modalRoot]);

   if (!isOpenModal) return null;

   return createPortal(
      <div className={styles.modalBody} ref={modalRef} role="dialog" aria-modal={isOpenModal} {...props}>
         {children}
      </div>,
      modalRoot
   );
};
