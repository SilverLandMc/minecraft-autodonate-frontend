import { useContext } from 'react';
import { Media, Breakpoint } from '@/shared/enums/Media';
import { MediaContext } from '../../app/providers/mediaProvider';

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

export const useMediaContext = () => {
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
