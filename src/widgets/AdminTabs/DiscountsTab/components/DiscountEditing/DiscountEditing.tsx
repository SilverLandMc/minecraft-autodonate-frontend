import { FunctionComponent } from 'react';
import classNames from 'shared/lib/aliases/classNames';
import styles from './DiscountEditing.module.scss';

interface Props {
    className?: string;
}

const DiscountEditing: FunctionComponent<Props> = ({ className }) => {
    return <div className={classNames(styles.discountEditing, [className])}></div>;
};

export default DiscountEditing;
