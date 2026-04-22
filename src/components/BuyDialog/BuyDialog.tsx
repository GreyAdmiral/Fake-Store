import { type MouseEventHandler, useState } from 'react';

import { BuyDialogContent } from '@components/BuyDialog/BuyDialogContent';
import { Modal } from '@components/Modal/Modal';

import styles from './BuyDialog.module.scss';

export function BuyDialog() {
   const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

   const closeModal = () => {
      setIsOpenModal(false);
   };

   const openModalHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
      e.stopPropagation();
      setIsOpenModal(true);
   };

   return (
      <>
         <button type="button" className={styles.buyBtn} onClick={openModalHandler}>
            Buy
         </button>

         <Modal isOpenModal={isOpenModal} onClose={closeModal}>
            <BuyDialogContent onClose={closeModal} />
         </Modal>
      </>
   );
}
