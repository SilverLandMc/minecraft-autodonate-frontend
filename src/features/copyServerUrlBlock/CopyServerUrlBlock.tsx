import { FunctionComponent, useState } from 'react';
import classNames from 'shared/lib/aliases/classNames';
import styles from './CopyServerUrlBlock.module.scss';

const DISPLAYED_SERVER_URL = 'silverland.fun';

interface Props {
    className?: string;
}

const CopyServerUrlBlock: FunctionComponent<Props> = ({ className }) => {
    const [isCopied, setIsCopied] = useState(false);

    const onCopy = () => {
        navigator.clipboard.writeText(DISPLAYED_SERVER_URL);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 5000);
    };

    return (
        <div className={classNames(styles.wrapper, [className])}>
            <div className={styles.text}>
                Наш URL: <span className={styles.url}>{DISPLAYED_SERVER_URL}</span>
            </div>

            <button className={styles.button} onClick={onCopy}>
                {isCopied ? 'Успешно!' : 'Копировать'}
            </button>
        </div>
    );
};

export default CopyServerUrlBlock;
