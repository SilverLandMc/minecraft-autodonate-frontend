import { FunctionComponent } from 'react';
import { ProductOutDto } from '@/app/types/api/apiTypes';
import chestImage from '@/shared/assets/chest.png';
import { FailSafeImage } from '@/shared/ui';
import styles from './ProductCard.module.scss';

interface Props {
    product: Required<ProductOutDto>;
}

export const ProductCard: FunctionComponent<Props> = ({ product }) => {
    const { id, name, description, imagePath } = product;

    return (
        <div className={styles.card}>
            <FailSafeImage className={styles.image} src={imagePath} fallbackSrc={chestImage} />
        </div>
    );
};
