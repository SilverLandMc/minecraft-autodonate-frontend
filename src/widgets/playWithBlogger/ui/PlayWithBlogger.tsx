import React, { FunctionComponent } from 'react';
import Section from '@/shared/ui/section/Section';
import Spacing from '@/shared/ui/spacing/Spacing';
import silverhandPhoto from './images/silverhandPhoto.png';
import styles from './PlayWithBlogger.module.scss';

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
            </div>
        </div>
    </Section>
);
