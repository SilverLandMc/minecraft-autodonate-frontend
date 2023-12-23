import { classNames } from 'shared/lib/classNames/classNames';
import { FunctionComponent } from 'react';
import Section from 'shared/ui/Section/Section';
import silverLandLogo from './images/silverLandLogo.png';
import styles from './Header.module.scss';

interface HeaderProps {
    className?: string;
}

const Header: FunctionComponent<HeaderProps> = ({ className }: HeaderProps) => {
    return (
        <div className={classNames(styles.header, {}, [className])}>
            <Section>
                <img src={silverLandLogo} alt="SilverLand Minecraft server" />
            </Section>
        </div>
    );
};

export default Header;
