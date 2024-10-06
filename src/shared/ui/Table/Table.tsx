import { FunctionComponent, ReactElement } from 'react';
import classNames from 'shared/lib/aliases/classNames';
import styles from './Table.module.scss';

/* eslint-disable react/no-array-index-key */

// Принимает до трёх названий полей - "плоских" или в виде массива ключей для вложенных объектов.
// Если не передан метод render, вернёт значение поля с ключом firstFieldName, проигнорировав прочие
interface RenderProps {
    firstFieldName?: string | string[];
    secondFieldName?: string | string[];
    thirdFieldName?: string | string[];
    render?(firstValue?: any, secondValue?: any, thirdValue?: any): ReactElement | string;
}

interface Props {
    columnNames: string[];
    items: any[];
    renderProps: RenderProps[];
    gridTemplateColumns?: string;
    className?: string;
}

const Table: FunctionComponent<Props> = ({
    columnNames,
    items,
    renderProps,
    gridTemplateColumns = new Array(columnNames.length).fill('1fr').join(' '),
    className
}) => (
    <div className={className}>
        <div className={classNames(styles.tableRow, styles.roundedTop)} style={{ gridTemplateColumns }}>
            {columnNames.map((columnName) => (
                <div key={columnName} className={styles.bold}>
                    {columnName}
                </div>
            ))}
        </div>

        {items.map((item, index) => (
            <div
                key={index}
                className={classNames(styles.tableRow, {
                    [styles.roundedBottom]: index === items.length - 1
                })}
                style={{ gridTemplateColumns }}
            >
                {renderProps.map(({ firstFieldName, secondFieldName, thirdFieldName, render }, index) => {
                    if (!firstFieldName) {
                        return (
                            <div key={index} className={styles.cell}>
                                {render()}
                            </div>
                        );
                    }

                    const firstValue =
                        typeof firstFieldName === 'string'
                            ? item[firstFieldName]
                            : firstFieldName.reduce(
                                  (accumulatorObject, fieldName) => accumulatorObject[fieldName],
                                  item
                              );

                    const secondValue =
                        secondFieldName &&
                        (typeof secondFieldName === 'string'
                            ? item[secondFieldName]
                            : secondFieldName.reduce(
                                  (accumulatorObject, fieldName) => accumulatorObject[fieldName],
                                  item
                              ));

                    const thirdValue =
                        thirdFieldName &&
                        (typeof thirdFieldName === 'string'
                            ? item[thirdFieldName]
                            : thirdFieldName.reduce(
                                  (accumulatorObject, fieldName) => accumulatorObject[fieldName],
                                  item
                              ));

                    return (
                        <div key={index} className={styles.cell}>
                            {render ? render(firstValue, secondValue, thirdValue) : firstValue}
                        </div>
                    );
                })}
            </div>
        ))}
    </div>
);

export default Table;
