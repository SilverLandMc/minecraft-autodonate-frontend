import { FunctionComponent, useState } from 'react';
import classNames from 'shared/lib/aliases/classNames';
import butterIcon from './images/butterIcon.svg';
import styles from './ButterMenu.module.scss';
import Portal from 'shared/ui/Portal/Portal';
import ModalBackground from 'shared/ui/ModalBackground/ModalBackground';
import { NavBar } from 'features/NavBar';

interface Props {
    className?: string;
}

const ButterMenu: FunctionComponent<Props> = ({ className }) => {
    const [isOpened, setIsOpened] = useState(false);

    const openModal = () => setIsOpened(true);
    const closeModal = () => setIsOpened(false);

    if (isOpened) {
        return (
            <Portal>
                <ModalBackground onClose={closeModal}>
                    <NavBar />
                </ModalBackground>
            </Portal>
        );
    }

    return (
        <img src={butterIcon} className={classNames(styles.butterMenu, [className])} alt="Меню" onClick={openModal} />
    );
};

export default ButterMenu;
