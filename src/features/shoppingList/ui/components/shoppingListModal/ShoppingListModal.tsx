import { reatomComponent, useAtom } from '@reatom/npm-react';
import { FunctionComponent, MouseEvent, useEffect, useRef } from 'react';
import { useClickAway } from 'react-use';
import { cartStore } from '@/entities/cart';
import { ModalBackground, Portal } from '@/shared/ui';
import { EmptyShoppingList } from './components/emptyShoppingList/EmptyShoppingList';
import { ShoppingListWithProducts } from './components/shoppingListWithProducts/ShoppingListWithProducts';
import styles from './ShoppingListModal.module.scss';

interface Props {
    isModalOpened: boolean;
    isClosing: boolean;
    onClose(event: MouseEvent): void;
}

export const ShoppingListModal: FunctionComponent<Props> = reatomComponent(({ isModalOpened, isClosing, onClose }) => {
    const [productAmountById] = useAtom(cartStore.productAmountById);

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
