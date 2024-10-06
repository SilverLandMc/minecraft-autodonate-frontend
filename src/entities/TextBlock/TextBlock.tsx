import { FunctionComponent, PropsWithChildren } from 'react';
import classNames from 'shared/lib/aliases/classNames';
import Section from 'shared/ui/Section/Section';
import styles from './TextBlock.module.scss';

interface Props extends PropsWithChildren {
    className?: string;
}

const TextBlock: FunctionComponent<Props> = ({ children, className }) => (
    <Section className={styles.section}>
        <div className={classNames(styles.innerWrapper, className)}>{children}</div>
    </Section>
);

export default TextBlock;
