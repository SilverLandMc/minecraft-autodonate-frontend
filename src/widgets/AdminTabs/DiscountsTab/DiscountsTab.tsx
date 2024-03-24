import { FunctionComponent } from 'react';
import classNames from 'shared/lib/aliases/classNames';
import styles from './DiscountsTab.module.scss';

interface Props {
    className?: string;
}

const DiscountsTab: FunctionComponent<Props> = ({ className }) => {
    return <div className={classNames(styles.discountsTab, [className])}></div>;
};

export default DiscountsTab;
