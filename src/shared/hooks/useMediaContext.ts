import { useContext } from 'react';
import Media, { Breakpoint } from 'app/const/enum/Media';
import { MediaContext } from 'app/providers/MediaProvider';

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

    return { media, breakpoint: getBreakpoint(media) };
};

export default useMediaContext;
