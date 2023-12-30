import { FunctionComponent } from 'react';
import useMediaContext from 'shared/hooks/useMediaContext';
import Media from 'app/const/enum/Media';

// см. enums/Media.ts
interface Props {
    className?: string;
    size: number;
    sizeS?: number;
    sizeM?: number;
    sizeL?: number;
}

const Spacing: FunctionComponent<Props> = ({ className, size, sizeS = size, sizeM = sizeS, sizeL = sizeM }) => {
    const { breakpoint } = useMediaContext();
    let height = size;

    if (breakpoint === Media.S) {
        height = sizeS;
    }

    if (breakpoint === Media.M) {
        height = sizeM;
    }

    if (breakpoint === Media.L) {
        height = sizeL;
    }

    return <div className={className} style={{ height, minHeight: height }} />;
};

export default Spacing;
