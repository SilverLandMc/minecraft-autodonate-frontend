import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { BackgroundColor, ModernButton } from '@/shared/ui';
import copyIcon from './images/copyIcon.svg';
import styles from './CopyServerUrlButton.module.scss';

// URL сервера, который отображается в кнопке и копируется в буфер обмена
const DISPLAYED_SERVER_URL = 'play.silverland.fun';
// Время отображения сообщения об успешном копировании адреса сервера в буфер обмена
const NOTIFICATION_DISPLAY_TIME = 5000;

/**
 * Кнопка с адресом сервера в качестве текста.
 *
 * При нажатии:
 * - Скопирует URL сервера в буфер обмена;
 * - На время, регулируемое константой `NOTIFICATION_DISPLAY_TIME`, будет отображать в тексте кнопки сообщение об успешном копировании.
 * @component
 */
export const CopyServerUrlButton: FunctionComponent = () => {
    const [isCopied, setIsCopied] = useState(false);

    const timerRef = useRef<number>();

    const copyUrl = async () => {
        try {
            await navigator.clipboard.writeText(DISPLAYED_SERVER_URL);
            setIsCopied(true);
            timerRef.current = window.setTimeout(() => setIsCopied(false), NOTIFICATION_DISPLAY_TIME);
        } catch {
            setIsCopied(false);
        }
    };

    useEffect(
        () => () => {
            if (!timerRef.current) {
                return;
            }

            clearTimeout(timerRef.current);
        },
        []
    );

    return (
        <ModernButton
            background={BackgroundColor.RED}
            className={styles.button}
            onClick={isCopied ? undefined : copyUrl}
        >
            <img src={copyIcon} alt="Скопировать" />
            {isCopied ? 'URL скопирован!' : DISPLAYED_SERVER_URL}
        </ModernButton>
    );
};
