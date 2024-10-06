import { FunctionComponent, PropsWithChildren } from 'react';
import classNames from 'shared/lib/aliases/classNames';
import styles from './Title.module.scss';

interface Props extends PropsWithChildren {
    className?: string;
}

const Title: FunctionComponent<Props> = ({ className, children }) => (
    <h3 className={classNames(styles.title, [className])}>{children}</h3>
);

export default Title;
