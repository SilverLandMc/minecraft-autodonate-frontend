import { FunctionComponent } from 'react';
import { Link, LinkProps } from 'react-router-dom';

export const OuterLink: FunctionComponent<LinkProps> = ({ children, to, ...props }) => (
    <Link to={to} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
    </Link>
);
