import Media, { Breakpoint } from 'app/const/enum/Media';
import { MediaContext } from 'app/providers/MediaProvider';
import { useContext } from 'react';

const getBreakpoint = (media: Media[]): Breakpoint => {
    switch (true) {
        case media.includes(Media.L):
            return Media.L;
        case media.includes(Media.M):
            return Media.M;
        case media.includes(Media.S):
            return Media.S;
        default:
            return Media.XS;
    }
};

const useMediaContext = () => {
    const { media } = useContext(MediaContext);

    if (!media) {
        throw new Error('useMediaContext: "media" value from MediaContext is unexpectedly falsy');
    }

    const breakpoint = getBreakpoint(media);

    const isLargeDesktop = breakpoint === Media.L;
    const isMediumDesktop = breakpoint === Media.M;
    const isTablet = breakpoint === Media.S;
    const isMobile = breakpoint === Media.XS;

    return {
        /** all matched media */
        media,
        /** max matched media */
        breakpoint,

        /** Media.L */
        isLargeDesktop,
        /** Media.M */
        isMediumDesktop,
        /** Media.S */
        isTablet,
        /** Media.XS */
        isMobile,

        /** Media.L or Media.M */
        isDesktop: isLargeDesktop || isMediumDesktop
    };
};

export default useMediaContext;
