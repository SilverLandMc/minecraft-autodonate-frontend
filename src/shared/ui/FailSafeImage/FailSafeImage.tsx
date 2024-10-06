import { FunctionComponent, HTMLAttributes, useState, useEffect } from 'react';

interface Props extends HTMLAttributes<HTMLImageElement> {
    src: string;
    fallbackSrc: string;
}

const FailSafeImage: FunctionComponent<Props> = ({ src: rawSrc, fallbackSrc, className, ...props }) => {
    const [src, setSrc] = useState<string | null>(null);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        // Обновляем src при изменении rawSrc
        const fetchImage = async () => {
            const imageUrl = `${__IS_DEV__ ? '' : __PROXY_TARGET__}${rawSrc}`;
            try {
                // eslint-disable-next-line compat/compat
                const response = await fetch(imageUrl);

                if (response.ok) {
                    // Если ответ успешный, создаём объект URL из Blob
                    const blob = await response.blob();
                    const objectURL = URL.createObjectURL(blob);
                    setSrc(objectURL);
                } else {
                    // Если не получилось загрузить, показываем fallback
                    setSrc(fallbackSrc);
                    setIsError(true);
                }
            } catch (error) {
                // Обработка ошибок сети
                setSrc(fallbackSrc);
                setIsError(true);
            }
        };

        fetchImage();
    }, [rawSrc, fallbackSrc]);

    if (isError && !src) {
        return <img src={fallbackSrc} className={className} {...props} alt="" />;
    }

    return <img src={src || fallbackSrc} className={className} {...props} alt="" />;
};

export default FailSafeImage;
