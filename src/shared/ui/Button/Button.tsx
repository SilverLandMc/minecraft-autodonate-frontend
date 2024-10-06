import { ButtonHTMLAttributes, FunctionComponent } from 'react';
import classNames from 'shared/lib/aliases/classNames';
import styles from './Button.module.scss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
}

const Button: FunctionComponent<Props> = ({ className, children, ...props }) => (
    <button type="button" className={classNames(styles.button, [className])} {...props}>
        {children}
    </button>
);

export default Button;
