import React, { FunctionComponent } from 'react';
import youtubeIcon from 'shared/assets/youtubeIcon.svg';
import { LinkURL } from '@/app/const/enum/linkURL';
import telegramIcon from '@/shared/assets/telegramIcon.svg';
import { BackgroundColor, ModernButton } from '@/shared/ui';
import Section from '@/shared/ui/section/Section';
import Spacing from '@/shared/ui/spacing/Spacing';
import silverhandPhoto from './images/silverhandPhoto.png';
import styles from './PlayWithBlogger.module.scss';

/**
 * Блок информации о блогере, рекламирующем сервер.
 * Содержит фотографию блогера, блок с ссылками на соцсети на кнопках и короткий рекламный текст из одного параграфа.
 */
export const PlayWithBlogger: FunctionComponent = () => (
    <Section>
        <div className={styles.wrapper}>
            <div className={styles.textBlock}>
                <h3 className={styles.header}>Играй с блогером</h3>

                <Spacing size={12} sizeS={24} />

                <p className={styles.paragraph}>
                    Это не&nbsp;просто сервер, это целый мир приключений, где каждый найдет занятие по&nbsp;душе.
                </p>

                <Spacing size={12} sizeS={24} />

                <p className={styles.paragraph}>
                    От&nbsp;огромных городов до&nbsp;таинственных подземелий, каждый уголок нашего сервера наполнен
                    сюрпризами и&nbsp;захватывающими заданиями, созданными лично SilverHand.
                </p>
            </div>

            <div className={styles.imageBlock}>
                <img className={styles.photo} src={silverhandPhoto} alt="" />

                <div className={styles.buttons}>
                    <ModernButton
                        className={styles.button}
                        background={BackgroundColor.RED}
                        linkUrl={LinkURL.YOUTUBE_CHANNEL}
                    >
                        <img className={styles.youtubeIcon} src={youtubeIcon} alt="YOUTUBE CHANNEL" /> @silver_head
                    </ModernButton>

                    <ModernButton
                        className={styles.button}
                        background={BackgroundColor.RED}
                        linkUrl={LinkURL.TELEGRAM_GROUP}
                    >
                        <img className={styles.vkIcon} src={telegramIcon} alt="TELEGRAM GROUP" /> silverlandfun
                    </ModernButton>
                </div>
            </div>
        </div>
    </Section>
);
