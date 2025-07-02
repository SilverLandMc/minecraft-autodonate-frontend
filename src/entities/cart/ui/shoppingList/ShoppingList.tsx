import { cartStore } from 'entities/cart';
import { observer } from 'mobx-react-lite';
import { FunctionComponent, MouseEvent, useState } from 'react';
import { Time } from '@/app/const/enum/Time';
import { BackgroundColor, ModernButton } from '@/shared/ui';
import ShoppingListModal from './components/shoppingListModal/ShoppingListModal';
import cartImage from './images/cartIcon.svg';
import styles from './ShoppingList.module.scss';

interface Props {
    simpleButton?: boolean;
}

/**
 * Компонент, предоставляющий кнопку и модальное окно корзины (списка покупок).
 * Кнопка при нажатии открывает модальное окно.
 *
 * Кнопка имеет "простой" режим. С ним текст кнопки просто "Корзина", без него - варьируется в зависимости от наличия
 * товаров в корзине:
 * - текст "Корзина" и иконка корзины - при пустой корзине;
 * - номер числа уникальных товаров в корзине и иконка - при непустой.
 *
 * @param {Props} props - Свойства компонента.
 * @param {boolean} props.simpleButton - флаг включения "простой" кнопки.
 */
export const ShoppingList: FunctionComponent<Props> = observer(({ simpleButton: isSimpleButton }) => {
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
            <ModernButton
                background={BackgroundColor.RED}
                onClick={openModal}
                className={isSimpleButton ? undefined : styles.button}
            >
                {isSimpleButton ? (
                    'Корзина'
                ) : (
                    <>
                        <span className={styles.cartLabel}>{Object.keys(productAmountById).length || 'Корзина'}</span>

                        <img src={cartImage} alt="Корзина" />
                    </>
                )}
            </ModernButton>

            <ShoppingListModal isModalOpened={isModalOpened} isClosing={isClosing} onClose={closeModal} />
        </>
    );
});
