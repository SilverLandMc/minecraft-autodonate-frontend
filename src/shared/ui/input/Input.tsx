import { FunctionComponent, InputHTMLAttributes } from 'react';
import classNames from '@/shared/lib/aliases/classNames';
import styles from './Input.module.scss';

interface Props {
    dark?: boolean;
}

export const Input: FunctionComponent<InputHTMLAttributes<HTMLInputElement> & Props> = ({
    className,
    dark: isDark,
    ...props
}) => <input className={classNames(styles.input, className, { [styles.dark]: isDark })} {...props} />;
