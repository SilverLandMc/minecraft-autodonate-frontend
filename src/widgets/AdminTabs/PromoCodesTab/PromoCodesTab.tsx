import { FunctionComponent } from 'react';
import classNames from 'shared/lib/aliases/classNames';
import styles from './PromoCodesTab.module.scss';

interface Props {
    className?: string;
}

const PromoCodesTab: FunctionComponent<Props> = ({ className }) => {
    return <div className={classNames(styles.promoCodesTab, [className])}></div>;
};

export default PromoCodesTab;
