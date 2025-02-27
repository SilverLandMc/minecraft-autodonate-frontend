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

export interface ModernButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    background: BackgroundColor;
    outline?: OutlineColor;
    className?: string;
    linkUrl?: string;
}

export const ModernButton: FunctionComponent<ModernButtonProps> = ({
    background,
    outline,
    children,
    className,
    linkUrl,
    ...props
}) => {
    const backgroundStyle = styleByBackgroundMap[background];
    const outlineStyle = outline ? styleByOutlineMap[outline] : undefined;

    const onClick = linkUrl ? () => window.open(linkUrl, '_blank', 'noopener noreferrer') : props.onClick;

    return (
        <button
            className={classNames(styles.button, backgroundStyle, outlineStyle, className)}
            type="button"
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};
