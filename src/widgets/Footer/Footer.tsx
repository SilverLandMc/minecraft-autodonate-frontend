import { FunctionComponent } from 'react';
import classNames from 'shared/lib/aliases/classNames';
import styles from './Footer.module.scss';
import Section from 'shared/ui/Section/Section';
import Spacing from 'shared/ui/spacing/Spacing';
import { Link } from 'react-router-dom';
import { AppRoutes, RoutePath } from 'shared/config/routeConfig/routeConfig';
import OuterLink from 'shared/ui/OuterLink/OuterLink';
import { LinkURL } from 'app/const/enum/LinkURL';

interface Props {
    className?: string;
}

const Footer: FunctionComponent<Props> = ({ className }) => {
    return (
        <footer className={classNames(styles.footer, [className])}>
            <Spacing size={15} />

            <Section className={styles.section}>
                <div className={styles.innerRowWrapper}>
                    <div className={styles.declarationBlock}>
                        silverland.fun никоим образом не&nbsp;связан с&nbsp;Mojang AB.
                        <br />
                        Все средства идут на&nbsp;поддержку и&nbsp;развитие сервера.
                    </div>

                    <div className={styles.termsOfServiceBlock}>
                        <Link to={RoutePath[AppRoutes.TERMS_OF_SERVICE]} className={styles.link}>
                            Условия использования
                        </Link>
                        |
                        <OuterLink to={LinkURL.CONTACTS} className={styles.link}>
                            Контакты
                        </OuterLink>
                    </div>
                </div>
            </Section>

            <Spacing size={15} />
        </footer>
    );
};

export default Footer;
