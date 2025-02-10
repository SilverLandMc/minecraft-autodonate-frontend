import { ButtonHTMLAttributes, FunctionComponent } from 'react';
import classNames from 'shared/lib/aliases/classNames';
import styles from './ModernButton.module.scss';

export const enum BackgroundColor {
    BLACK = 'black',
    RED = 'red',
    MAGENTA = 'magenta',
    GREEN = 'green',
    ORANGE = 'orange',
    TRANSPARENT = 'transparent'
}

export const enum OutlineColor {
    RED = 'red'
}

const styleByBackgroundMap: Record<BackgroundColor, string> = {
    [BackgroundColor.BLACK]: styles.blackBackground,
    [BackgroundColor.RED]: styles.redBackground,
    [BackgroundColor.MAGENTA]: styles.magentaBackground,
    [BackgroundColor.GREEN]: styles.greenBackground,
    [BackgroundColor.ORANGE]: styles.orangeBackground,
    [BackgroundColor.TRANSPARENT]: styles.transparentBackground
};

const styleByOutlineMap: Record<OutlineColor, string> = {
    [OutlineColor.RED]: styles.redOutline
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    background: BackgroundColor;
    outline?: OutlineColor;
    className?: string;
}

export const ModernButton: FunctionComponent<Props> = ({ background, outline, children, className, ...props }) => {
    const backgroundStyle = styleByBackgroundMap[background];
    const outlineStyle = outline ? styleByOutlineMap[outline] : undefined;

    return (
        <button
            className={classNames(styles.button, backgroundStyle, outlineStyle, className)}
            type="button"
            {...props}
        >
            {children}
        </button>
    );
};
