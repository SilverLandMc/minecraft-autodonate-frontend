import { FunctionComponent, PropsWithChildren } from 'react';
import { classNames } from '@/shared/lib/aliases';
import styles from './Section.module.scss';

interface SectionProps extends PropsWithChildren {
    className?: string;
}

/**
 * Компонент-обёртка, отвечающий за расположение вложенного контента по ширине страницы в соответствии с точками перелома.
 *
 * @param className - Имя класса, применяемого к контейнеру-обёртке.
 * @param children - Вложенный контент.
 */
export const Section: FunctionComponent<SectionProps> = ({ className, children }: SectionProps) => (
    <div className={classNames(styles.section, [className])}>{children}</div>
);
