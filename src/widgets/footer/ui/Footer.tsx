import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes, RoutePath } from '@/shared/config/routeConfig/routeConfig';
import { LinkURL } from '@/shared/enums/linkURL';
import { Section, Spacing } from '@/shared/ui';
import { OuterLink } from '@/shared/ui';
import discordIcon from './images/discordIcon.svg';
import tgIcon from './images/tgIcon.svg';
import vkIcon from './images/vkIcon.svg';
import youTubeIcon from './images/youTubeIcon.svg';
import styles from './Footer.module.scss';

export const Footer: FunctionComponent = () => {
    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <>
            <Section className={styles.textureWrapper}>
                <Spacing className={styles.texture} size={117} />
            </Section>

            <Spacing size={48} />

            <Section className={styles.contentWrapper}>
                <div>
                    <Link to={RoutePath[AppRoutes.TERMS_OF_SERVICE]} className={styles.link} onClick={scrollToTop}>
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
                    <OuterLink to={LinkURL.YOUTUBE_CHANNEL}>
                        <img className={styles.icon} src={youTubeIcon} alt="youTube" />
                    </OuterLink>

                    <OuterLink to={LinkURL.DISCORD_CHANNEL}>
                        <img className={styles.icon} src={discordIcon} alt="discord" />
                    </OuterLink>

                    <OuterLink to={LinkURL.VK_CONTACTS}>
                        <img className={styles.icon} src={vkIcon} alt="vk" />
                    </OuterLink>

                    <OuterLink to={LinkURL.TELEGRAM_GROUP}>
                        <img className={styles.icon} src={tgIcon} alt="telegram" />
                    </OuterLink>
                </div>
            </Section>

            <Spacing size={24} sizeS={32} sizeL={72} />
        </>
    );
};
