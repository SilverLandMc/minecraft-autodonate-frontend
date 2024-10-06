import { AppContext } from 'app/providers/AppContextProvider';
import React, { FunctionComponent, MouseEvent, useContext, useRef } from 'react';
import { useClickAway } from 'react-use';
import ModalBackground from 'shared/ui/ModalBackground/ModalBackground';
import Portal from 'shared/ui/Portal/Portal';
import EmptyShoppingList from 'widgets/ShoppingList/components/EmptyShoppingList/EmptyShoppingList';
import ShoppingListWithProducts from 'widgets/ShoppingList/components/ShoppingListWithProducts/ShoppingListWithProducts';
import styles from './ShoppingListModal.module.scss';

interface Props {
    isModalOpened: boolean;
    isClosing: boolean;
    onClose(event: MouseEvent): void;
}

const ShoppingListModal: FunctionComponent<Props> = ({ isModalOpened, isClosing, onClose }) => {
    const { productsToBuy } = useContext(AppContext);

    const wrapperRef = useRef<HTMLDivElement>(null);
    useClickAway(wrapperRef, (event) => onClose(event as unknown as MouseEvent));

    if (!isModalOpened) {
        return null;
    }

    return (
        <Portal>
            <ModalBackground closing={isClosing} fullScreenAtMobile>
                <div ref={wrapperRef} className={styles.modalWrapper}>
                    {productsToBuy.length > 0 ? <ShoppingListWithProducts /> : <EmptyShoppingList onClose={onClose} />}
                </div>
            </ModalBackground>
        </Portal>
    );
};

export default ShoppingListModal;
