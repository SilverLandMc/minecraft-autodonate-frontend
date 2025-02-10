import { FunctionComponent, MouseEvent, useContext, useState } from 'react';
import { Time } from '@/app/const/enum/Time';
import { AppContext } from '@/app/providers/AppContextProvider';
import ShoppingListModal from '@/widgets/ShoppingList/components/ShoppingListModal/ShoppingListModal';
import { BackgroundColor, ModernButton } from '@/shared/ui';
import cartImage from './images/cartIcon.svg';
import styles from './ShoppingList.module.scss';

const ShoppingList: FunctionComponent = () => {
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

    const { productsToBuy } = useContext(AppContext) ?? {};

    return (
        <>
            <ModernButton background={BackgroundColor.RED} onClick={openModal} className={styles.button}>
                <span className={styles.cartLabel}>{productsToBuy?.length || 'Корзина'}</span>

                <img src={cartImage} className={styles.cartImage} alt="Корзина" />
            </ModernButton>

            <ShoppingListModal isModalOpened={isModalOpened} isClosing={isClosing} onClose={closeModal} />
        </>
    );
};

export default ShoppingList;
