import { FunctionComponent, useRef, useState } from 'react';
import classNames from 'shared/lib/aliases/classNames';
import butterIcon from './images/butterIcon.svg';
import styles from './ButterMenu.module.scss';
import Portal from 'shared/ui/Portal/Portal';
import ModalBackground from 'shared/ui/ModalBackground/ModalBackground';
import { NavBar } from 'features/NavBar';
import { useClickAway } from 'react-use';

interface Props {
    className?: string;
}

const ButterMenu: FunctionComponent<Props> = ({ className }) => {
    const [isOpened, setIsOpened] = useState(false);

    const openModal = () => setIsOpened(true);
    const closeModal = () => setIsOpened(false);

    const wrapperRef = useRef<HTMLDivElement>(null);
    useClickAway(wrapperRef, () => closeModal());

    if (isOpened) {
        return (
            <Portal>
                <ModalBackground>
                    <div ref={wrapperRef} className={styles.modalWrapper}>
                        <NavBar />
                    </div>
                </ModalBackground>
            </Portal>
        );
    }

    return (
        <img src={butterIcon} className={classNames(styles.butterMenu, [className])} alt="Меню" onClick={openModal} />
    );
};

export default ButterMenu;
