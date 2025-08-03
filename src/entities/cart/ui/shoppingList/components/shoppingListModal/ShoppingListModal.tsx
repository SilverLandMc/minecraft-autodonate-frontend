import { observer } from 'mobx-react-lite';
import { FunctionComponent, MouseEvent, useEffect, useRef } from 'react';
import { useClickAway } from 'react-use';
import { ModalBackground, Portal } from '@/shared/ui';
import { cartStore } from '../../../../model/store/cartStore';
import { EmptyShoppingList } from './components/emptyShoppingList/EmptyShoppingList';
import ShoppingListWithProducts from './components/shoppingListWithProducts/ShoppingListWithProducts';
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

    useEffect(() => {
        // Предотвращаем скролл контента основной страницы
        document.body.style.overflow = isModalOpened ? 'hidden' : 'auto';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isModalOpened]);

    if (!isModalOpened) {
        return null;
    }

    return (
        <Portal>
            <ModalBackground closing={isClosing}>
                <div ref={wrapperRef} className={styles.modalWrapper}>
                    {Object.keys(productAmountById).length ? (
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
