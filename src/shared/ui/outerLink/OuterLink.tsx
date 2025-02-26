import { FunctionComponent } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import styles from './OuterLink.module.scss';

export const OuterLink: FunctionComponent<LinkProps> = ({ children, to, ...props }) => (
    <Link className={styles.link} to={to} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
    </Link>
);
