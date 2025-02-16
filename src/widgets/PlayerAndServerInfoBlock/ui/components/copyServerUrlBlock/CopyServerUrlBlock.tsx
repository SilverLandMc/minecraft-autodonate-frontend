import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { BackgroundColor, ModernButton } from '@/shared/ui';
import styles from './CopyServerUrlBlock.module.scss';

const DISPLAYED_SERVER_URL = 'play.silverland.fun';
const NOTIFICATION_DISPLAY_TIME = 5000;

interface Props {
    className?: string;
}

const CopyServerUrlBlock: FunctionComponent<Props> = ({ className }) => {
    const [isCopied, setIsCopied] = useState(false);

    const timerRef = useRef<number>();

    const copyUrl = async () => {
        try {
            navigator.clipboard.writeText(DISPLAYED_SERVER_URL);
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
        <ModernButton background={BackgroundColor.RED} className={styles.button} onClick={copyUrl}>
            {isCopied ? 'Успешно!' : DISPLAYED_SERVER_URL}
        </ModernButton>
    );
};

export default CopyServerUrlBlock;
