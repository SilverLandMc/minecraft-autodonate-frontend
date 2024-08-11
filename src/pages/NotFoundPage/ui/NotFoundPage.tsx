import { FunctionComponent } from 'react';
import troubledManImage from 'shared/assets/troubledMan.png';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage: FunctionComponent = () => {
    return (
        <div className={styles.wrapper}>
            <img className={styles.troubledManImage} src={troubledManImage} alt="Произошла ошибка" />

            <h1>Упс</h1>

            <p>Кажется, такой страницы не существует</p>
        </div>
    );
};
