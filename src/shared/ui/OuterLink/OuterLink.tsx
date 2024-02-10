import { FunctionComponent } from 'react';
import { Link, LinkProps } from 'react-router-dom';

const OuterLink: FunctionComponent<LinkProps> = ({ children, to, ...props }) => {
    return (
        <Link to={to} target="_blank" rel="noopener noreferrer" {...props}>
            {children}
        </Link>
    );
};

export default OuterLink;
