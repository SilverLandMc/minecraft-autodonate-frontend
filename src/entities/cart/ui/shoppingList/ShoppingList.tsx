import { cartStore } from 'entities/cart';
import { observer } from 'mobx-react-lite';
import { FunctionComponent, MouseEvent, useState } from 'react';
import { Time } from '@/app/const/enum/Time';
import { BackgroundColor, ModernButton } from '@/shared/ui';
import ShoppingListModal from './components/shoppingListModal/ShoppingListModal';
import cartImage from './images/cartIcon.svg';
import styles from './ShoppingList.module.scss';

export const ShoppingList: FunctionComponent = observer(() => {
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [isClosing, setIsClosing] = useState<boolean>(false);

    const openModal = () => setIsModalOpened(true);
    const closeModal = (event: MouseEvent) => {
        // useClickAway триггерится на события touchstart и click, из-за чего происходит закрытие и моментальное открытие
        // модального окна, если клик был совершён по области крестика закрытия модалки (а под ней расположен бутерброд)
        // Поэтому ничего не делаем для touchstart
        if (event.type === 'touchstart') {
            return;
        }

        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            setIsModalOpened(false);
        }, Time.MODAL_CLOSE_ANIMATION_DURATION);
    };

    const { productAmountById } = cartStore;

    return (
        <>
            <ModernButton background={BackgroundColor.RED} onClick={openModal} className={styles.button}>
                <span className={styles.cartLabel}>{Object.keys(productAmountById).length || 'Корзина'}</span>

                <img src={cartImage} className={styles.cartImage} alt="Корзина" />
            </ModernButton>

            <ShoppingListModal isModalOpened={isModalOpened} isClosing={isClosing} onClose={closeModal} />
        </>
    );
});
