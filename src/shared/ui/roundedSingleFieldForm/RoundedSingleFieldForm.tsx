import { ChangeEvent, FunctionComponent } from 'react';
import classNames from 'shared/lib/aliases/classNames';
import styles from './RoundedSingleFieldForm.module.scss';

interface Props {
    value?: string;
    className?: string;
    placeholderText?: string;
    buttonText?: string;
    redButton?: boolean;
    readonly?: boolean;
    onChange(value: string): void;
    onButtonClick?(): void;
}

const RoundedSingleFieldForm: FunctionComponent<Props> = ({
    value,
    className,
    placeholderText = 'Введите значение',
    buttonText = 'Продолжить',
    redButton: hasRedButton,
    readonly: isReadonly,
    onChange,
    onButtonClick
}) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <div data-testid="rounded-single-field-form" className={classNames(styles.roundedUnifiedForm, [className])}>
            <input
                type="text"
                value={value}
                onChange={handleChange}
                className={styles.input}
                placeholder={placeholderText}
                readOnly={isReadonly}
            />

            <button
                type="button"
                data-testid="rounded-single-form-button"
                className={classNames(styles.button, { [styles.redButton]: hasRedButton })}
                onClick={onButtonClick}
            >
                {buttonText}
            </button>
        </div>
    );
};

export default RoundedSingleFieldForm;
