import React, { FunctionComponent, MouseEvent, useContext, useRef } from 'react';
import ModalBackground from 'shared/ui/ModalBackground/ModalBackground';
import Button from 'shared/ui/Button/Button';
import chestImage from 'shared/assets/chest.png';
import Portal from 'shared/ui/Portal/Portal';
import { useClickAway } from 'react-use';
import { AppContext } from 'app/providers/AppContextProvider';
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
                    {productsToBuy.length > 0 ? (
                        <ShoppingListWithProducts />
                    ) : (
                        <>
                            <h1 className={styles.emptyListSubheader}>Упс.</h1>

                            <div className={styles.emptyListImageBLock}>
                                <img src={chestImage} className={styles.chestImage} alt="Корзина пуста!" />
                                <span className={styles.emptyListDescription}>
                                    В вашей корзине пока что ничего нет!
                                </span>
                            </div>

                            <Button className={styles.button} onClick={onClose}>
                                Вернуться в магазин
                            </Button>
                        </>
                    )}
                </div>
            </ModalBackground>
        </Portal>
    );
};

export default ShoppingListModal;
