import Media from 'app/const/enum/Media';
import MediaContext, { MediaContextState } from 'app/providers/MediaProvider/lib/MediaContext';
import { debounce, isEqual } from 'lodash-es';
import { FunctionComponent, PropsWithChildren, useEffect, useState } from 'react';

const mediaQueriesMap: Record<Media, MediaQueryList> = {
    [Media.XS]: window.matchMedia(`(max-width: ${Media.XS}px)`),
    [Media.S]: window.matchMedia(`(min-width: ${Media.S}px)`),
    [Media.M]: window.matchMedia(`(min-width: ${Media.M}px)`),
    [Media.L]: window.matchMedia(`(min-width: ${Media.L}px)`)
};

const getMedia = (): Media[] =>
    Object.keys(mediaQueriesMap)
        .filter((media) => mediaQueriesMap[media as unknown as Media].matches)
        .map((item) => Number(item));

const MediaContextProvider: FunctionComponent<PropsWithChildren<any>> = ({ children }) => {
    const [contextState, setContextState] = useState<MediaContextState>(() => ({
        media: getMedia()
    }));

    useEffect(() => {
        const handler = debounce(
            () =>
                setContextState((prevState) => {
                    const newMedia = getMedia();
                    if (isEqual(prevState.media, newMedia)) {
                        return prevState;
                    }

                    return { media: newMedia };
                }),
            1000 / 60
        );

        window.addEventListener('resize', handler);
        return () => window.removeEventListener('resize', handler);
    }, []);

    return <MediaContext.Provider value={contextState}>{children}</MediaContext.Provider>;
};

export default MediaContextProvider;
