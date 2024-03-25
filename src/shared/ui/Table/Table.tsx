import { FunctionComponent, ReactElement } from 'react';
import classNames from 'shared/lib/aliases/classNames';
import styles from './Table.module.scss';

interface RenderProps {
    fieldName: string | string[];
    render?(value: any): ReactElement;
}

interface Props {
    columnNames: string[];
    items: any[];
    renderProps: RenderProps[];
    gridTemplateColumns?: string;
}

const Table: FunctionComponent<Props> = ({
    columnNames,
    items,
    renderProps,
    gridTemplateColumns = new Array(columnNames.length).fill('1fr').join(' ')
}) => {
    return (
        <>
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
                    {renderProps.map(({ fieldName, render }) => {
                        if (typeof fieldName === 'string') {
                            return (
                                <div key={fieldName} className={styles.cell}>
                                    {render ? render(item[fieldName]) : item[fieldName]}
                                </div>
                            );
                        }

                        const value = fieldName.reduce(
                            (accumulatorObject, fieldName) => accumulatorObject[fieldName],
                            item
                        );

                        return (
                            <div key={fieldName[0]} className={styles.cell}>
                                {render ? render(value) : value}
                            </div>
                        );
                    })}
                </div>
            ))}
        </>
    );
};

export default Table;
