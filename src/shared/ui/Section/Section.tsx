import { FunctionComponent, PropsWithChildren } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import styles from './Section.module.scss';

interface SectionProps extends PropsWithChildren<any> {
    className?: string;
}

const Section: FunctionComponent<SectionProps> = ({ className, children }: SectionProps) => {
    return <div className={classNames(styles.section, {}, [className])}>{children}</div>;
};

export default Section;
