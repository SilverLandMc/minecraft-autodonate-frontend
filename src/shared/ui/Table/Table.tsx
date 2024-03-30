import { FunctionComponent, ReactElement } from 'react';
import classNames from 'shared/lib/aliases/classNames';
import styles from './Table.module.scss';

interface RenderProps {
    firstFieldName?: string | string[];
    secondFieldName?: string | string[];
    render?(firstValue?: any, secondValue?: any): ReactElement | string;
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
}) => {
    return (
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
                    {renderProps.map(({ firstFieldName, secondFieldName, render }, index) => {
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

                        return (
                            <div key={index} className={styles.cell}>
                                {render ? render(firstValue, secondValue) : firstValue}
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default Table;
