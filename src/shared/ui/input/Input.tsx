import { FunctionComponent, InputHTMLAttributes } from 'react';
import classNames from '@/shared/lib/aliases/classNames';
import styles from './Input.module.scss';

export const Input: FunctionComponent<InputHTMLAttributes<HTMLInputElement>> = ({ className, ...props }) => (
    <input className={classNames(styles.input, className)} {...props} />
);
