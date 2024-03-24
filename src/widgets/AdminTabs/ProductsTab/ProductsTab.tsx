import { FunctionComponent } from 'react';
import classNames from 'shared/lib/aliases/classNames';
import styles from './ProductsTab.module.scss';

interface Props {
    className?: string;
}

const ProductsTab: FunctionComponent<Props> = ({ className }) => {
    return <div className={classNames(styles.productsTab, [className])}></div>;
};

export default ProductsTab;
