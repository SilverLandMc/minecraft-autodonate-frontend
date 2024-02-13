import { FunctionComponent, MouseEvent, useContext, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { ProductOutDto } from 'app/types/api/apiTypes';
import chestImage from 'shared/assets/chest.png';
import Button from 'shared/ui/Button/Button';
import Portal from 'shared/ui/Portal/Portal';
import ModalBackground from 'shared/ui/ModalBackground/ModalBackground';
import { useClickAway } from 'react-use';
import { Time } from 'app/const/enum/Time';
import classNames from 'shared/lib/aliases/classNames';
import FailSafeImage from 'shared/ui/FailSafeImage/FailSafeImage';
import { AppContext } from 'app/providers/AppContextProvider';
import trashIcon from './images/trashIcon.svg';
import styles from './ProductCard.module.scss';

interface Props {
    product: ProductOutDto;
}

const ProductCard: FunctionComponent<Props> = ({ product }) => {
    const [isCardModalOpened, setIsCardModalOpened] = useState<boolean>(false);
    const [isClosing, setIsClosing] = useState<boolean>(false);

    const { productsToBuy, addOrIncrementProductToList, deleteProductFromList } = useContext(AppContext);
    const { id: productId, imagePath, name, description, priceWithDiscount, priceWithoutDiscount } = product;
    const isInShoppingList = productsToBuy.some((product) => product.id === productId);
    const buttonText = isInShoppingList ? 'Купить ещё' : 'Купить';

    const openModal = () => setIsCardModalOpened(true);
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
            setIsCardModalOpened(false);
        }, Time.MODAL_CLOSE_ANIMATION_DURATION);
    };

    const addProductToBuyList = () => {
        addOrIncrementProductToList(productId, name, priceWithDiscount ?? priceWithoutDiscount);

        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            setIsCardModalOpened(false);
        }, Time.MODAL_CLOSE_ANIMATION_DURATION);
    };

    const deleteProductFromBuyList = (event: MouseEvent) => {
        event.stopPropagation();
        deleteProductFromList(productId);
    };

    const priceBlock = priceWithDiscount ? (
        <div className={styles.priceBlock}>
            <span className={styles.oldPrice}>{priceWithoutDiscount.toFixed(2)}</span>
            <span>{priceWithDiscount.toFixed(2)} рублей</span>
        </div>
    ) : (
        <span className={styles.priceBlock}>{priceWithoutDiscount.toFixed(2)} рублей</span>
    );

    const wrapperRef = useRef<HTMLDivElement>(null);
    useClickAway(wrapperRef, (event) => closeModal(event as unknown as MouseEvent));

    return (
        <>
            <div className={styles.productCard} onClick={openModal}>
                <FailSafeImage className={styles.productImage} src={imagePath} fallbackSrc={chestImage} />

                <div className={styles.bottomBlock}>
                    <h3 className={styles.productName}>{name}</h3>

                    {priceBlock}

                    <div className={styles.buttonRow}>
                        <Button className={styles.button}>{buttonText}</Button>

                        {isInShoppingList && (
                            <div className={styles.trashIconWrapper} onClick={deleteProductFromBuyList}>
                                <img src={trashIcon} className={styles.trashIcon} alt="" />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {isCardModalOpened && (
                <Portal>
                    <ModalBackground closing={isClosing}>
                        <div ref={wrapperRef} className={styles.modalWrapper}>
                            <div className={classNames(styles.modal, { [styles.isClosing]: isClosing })}>
                                <FailSafeImage
                                    className={styles.productImage}
                                    src={imagePath}
                                    fallbackSrc={chestImage}
                                />

                                <div className={styles.bottomBlock}>
                                    <h3 className={styles.productName}>{name}</h3>

                                    <div className={styles.description}>
                                        <ReactMarkdown children={description} />
                                    </div>

                                    {priceBlock}

                                    <Button className={styles.button} onClick={addProductToBuyList}>
                                        Добавить в корзину
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </ModalBackground>
                </Portal>
            )}
        </>
    );
};

export default ProductCard;
