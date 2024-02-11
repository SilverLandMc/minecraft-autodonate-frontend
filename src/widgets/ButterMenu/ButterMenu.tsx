import { FunctionComponent, MouseEvent, useRef, useState } from 'react';
import classNames from 'shared/lib/aliases/classNames';
import butterIcon from './images/butterIcon.svg';
import Portal from 'shared/ui/Portal/Portal';
import ModalBackground from 'shared/ui/ModalBackground/ModalBackground';
import { NavBar } from 'features/NavBar';
import { useClickAway } from 'react-use';
import { Time } from 'app/const/enum/Time';
import styles from './ButterMenu.module.scss';

const ButterMenu: FunctionComponent = () => {
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const [isClosing, setIsClosing] = useState<boolean>(false);

    const openModal = () => setIsOpened(true);

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
            setIsOpened(false);
        }, Time.MODAL_CLOSE_ANIMATION_DURATION);
    };

    const wrapperRef = useRef<HTMLDivElement>(null);
    useClickAway(wrapperRef, (event) => closeModal(event as unknown as MouseEvent));

    if (isOpened) {
        return (
            <Portal>
                <ModalBackground closing={isClosing}>
                    <div ref={wrapperRef} className={styles.modalWrapper}>
                        <NavBar onClose={closeModal} closing={isClosing} />
                    </div>
                </ModalBackground>
            </Portal>
        );
    }

    return <img src={butterIcon} className={classNames(styles.butterMenu)} alt="Меню" onClick={openModal} />;
};

export default ButterMenu;
