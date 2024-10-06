import Media from 'app/const/enum/Media';
import useMediaContext from './useMediaContext';

const useDoesMediaMatch = (targetMedia: Media): boolean => {
    const { media } = useMediaContext();
    return media.includes(targetMedia);
};

export default useDoesMediaMatch;
