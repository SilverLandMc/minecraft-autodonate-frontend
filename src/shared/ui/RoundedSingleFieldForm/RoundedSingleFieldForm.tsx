import { FunctionComponent } from 'react';
import classNames from 'shared/lib/aliases/classNames';
import styles from './RoundedSingleFieldForm.module.scss';

interface Props {
    className?: string;
    placeholderText?: string;
    confirmationText?: string;
    onConfirm?(): void;
}

const RoundedSingleFieldForm: FunctionComponent<Props> = ({
    className,
    placeholderText = 'Введите значение',
    confirmationText = 'Продолжить',
    onConfirm
}) => {
    return (
        <div className={classNames(styles.roundedUnifiedForm, [className])}>
            <input type="text" className={styles.input} placeholder={placeholderText} />
            <button className={styles.button} onClick={onConfirm}>
                {confirmationText}
            </button>
        </div>
    );
};

export default RoundedSingleFieldForm;
