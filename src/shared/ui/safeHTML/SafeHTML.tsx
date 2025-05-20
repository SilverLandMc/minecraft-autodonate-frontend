import DOMPurify from 'dompurify';
import { FunctionComponent } from 'react';
import styles from './SafeHTML.module.scss';

interface Props {
    rawHTML?: string | null;
}

/**
 * Компонент для безопасного рендера HTML, получаемого с бэкенда.
 *
 * Очищает "сырой" HTML с помощью DOMPurify для безопасности и возвращает `div` с установленным в качестве `dangerouslySetInnerHTML`
 * очищенным HTML. Для контейнера применяется стилизация пунктов списков, заставляющая их учитывать padding'и родительских
 * контейнеров.
 *
 * @param rawHTML - "Сырой" HTML.
 */
export const SafeHTML: FunctionComponent<Props> = ({ rawHTML }) => {
    if (!rawHTML) {
        return <span>-</span>;
    }

    const cleanHtml = DOMPurify.sanitize(rawHTML);

    return <div className={styles.container} dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
};
