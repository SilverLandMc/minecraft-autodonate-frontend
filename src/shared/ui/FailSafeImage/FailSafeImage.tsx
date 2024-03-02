import { FunctionComponent, HTMLAttributes, useState } from 'react';

interface Props extends HTMLAttributes<HTMLImageElement> {
    src: string;
    fallbackSrc: string;
}

const FailSafeImage: FunctionComponent<Props> = ({ src: rowSrc, fallbackSrc, className, ...props }) => {
    const [src, setSrc] = useState(() => `${__IS_DEV__ ? '' : __PROXY_TARGET__}${rowSrc}` ?? fallbackSrc);

    const onError = () => setSrc(fallbackSrc);

    return <img src={src} className={className} onError={onError} {...props} />;
};

export default FailSafeImage;
