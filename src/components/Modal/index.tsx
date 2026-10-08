import type { FC, PropsWithChildren } from 'react';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';

import { useClickOutside } from '@hooks/useClickOutside';
import { useLockScroll } from '@hooks/useLockScroll';

import styles from './styles.module.scss';

interface ModalProps {
   isOpenModal: boolean;
   onClose: () => void;
}

const MODAL_CLOSE_KEYS_CODES = ['Escape'];
const LOCK_KEYS_CODES = ['Home', 'End'];
const LOCK_PAGE_KEYS_CODES = ['PageUp', 'PageDown'];

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

         if (MODAL_CLOSE_KEYS_CODES.includes(e.code)) {
            onClose();
         }

         if (LOCK_PAGE_KEYS_CODES.includes(e.code)) {
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

         if (LOCK_KEYS_CODES.includes(e.code)) {
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
               const focusableElements = modal.querySelectorAll(
                  ':scope button:not(:disabled), :scope [href], :scope input:not(:disabled), :scope select:not(:disabled), :scope textarea:not(:disabled), :scope [tabindex]:not([tabindex="-1"])'
               );

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
