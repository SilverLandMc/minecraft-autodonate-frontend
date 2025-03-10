import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { LinkURL } from '@/app/const/enum/linkURL';
import { AppRoutes, RoutePath } from '@/shared/config/routeConfig/routeConfig';
import { OuterLink } from '@/shared/ui';
import Section from '@/shared/ui/section/Section';
import Spacing from '@/shared/ui/spacing/Spacing';
import styles from './Footer.module.scss';

export const Footer: FunctionComponent = () => (
    <>
        <Section className={styles.textureWrapper}>
            <Spacing className={styles.texture} size={117} />
        </Section>

        <Spacing size={48} />

        <Section className={styles.contentWrapper}>
            <div>
                <Link to={RoutePath[AppRoutes.TERMS_OF_SERVICE]} className={styles.link}>
                    Условия использования
                </Link>
                <Spacing size={12} sizeM={16} />

                <p className={styles.disclaimer}>
                    silverland.fun никоим образом не&nbsp;связан с&nbsp;Mojang AB.
                    <br />
                    Все средства идут на&nbsp;поддержку и&nbsp;развитие сервера.
                </p>
            </div>

            <div className={styles.socialMediaBlock}>
                <OuterLink to={LinkURL.CONTACTS} className={styles.link}>
                    Контакты
                </OuterLink>
            </div>
        </Section>

        <Spacing size={15} />
    </>
);
