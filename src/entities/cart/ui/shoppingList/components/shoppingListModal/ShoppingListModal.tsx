import { observer } from 'mobx-react-lite';
import { FunctionComponent, MouseEvent, useRef } from 'react';
import { useClickAway } from 'react-use';
import { cartStore } from '@/entities/cart';
import ModalBackground from '@/shared/ui/modalBackground/ModalBackground';
import Portal from '@/shared/ui/portal/Portal';
import EmptyShoppingList from '../emptyShoppingList/EmptyShoppingList';
import ShoppingListWithProducts from './components/ShoppingListWithProducts/ShoppingListWithProducts';
import styles from './ShoppingListModal.module.scss';

interface Props {
    isModalOpened: boolean;
    isClosing: boolean;
    onClose(event: MouseEvent): void;
}

const ShoppingListModal: FunctionComponent<Props> = observer(({ isModalOpened, isClosing, onClose }) => {
    const { productAmountById } = cartStore;

    const wrapperRef = useRef<HTMLDivElement>(null);
    useClickAway(wrapperRef, (event) => onClose(event as unknown as MouseEvent));

    if (!isModalOpened) {
        return null;
    }

    return (
        <Portal>
            <ModalBackground closing={isClosing} fullScreenAtMobile>
                <div ref={wrapperRef} className={styles.modalWrapper}>
                    {Object.keys(productAmountById).length > 0 ? (
                        <ShoppingListWithProducts />
                    ) : (
                        <EmptyShoppingList onClose={onClose} />
                    )}
                </div>
            </ModalBackground>
        </Portal>
    );
});

export default ShoppingListModal;
