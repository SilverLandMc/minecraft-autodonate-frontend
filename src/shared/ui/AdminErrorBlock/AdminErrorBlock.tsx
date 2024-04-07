import { FunctionComponent } from 'react';
import classNames from 'shared/lib/aliases/classNames';
import styles from './AdminErrorBlock.module.scss';

interface Props {
    text?: string;
    className?: string;
}

const AdminErrorBlock: FunctionComponent<Props> = ({
    text = 'Произошла ошибка. Это всё, что мы знаем.',
    className
}) => <div className={classNames(styles.adminErrorBlock, [className])}>{text}</div>;

export default AdminErrorBlock;
