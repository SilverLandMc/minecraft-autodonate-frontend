import { FunctionComponent, InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

export const Input: FunctionComponent<InputHTMLAttributes<HTMLInputElement>> = ({ ...props }) => (
    <input className={styles.input} {...props} />
);
