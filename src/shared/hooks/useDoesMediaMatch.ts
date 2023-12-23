import useMediaContext from './useMediaContext';
import Media from 'app/const/enum/Media';

const useDoesMediaMatch = (targetMedia: Media): boolean => {
    const { media } = useMediaContext();
    return media.includes(targetMedia);
};

export default useDoesMediaMatch;
