import { FunctionComponent } from 'react';
import { Media } from '@/shared/enums/Media';
import { useMediaContext } from '@/shared/hooks/useMediaContext';

// см. enums/Media.ts
interface Props {
    className?: string;
    size: number;
    sizeS?: number;
    sizeM?: number;
    sizeL?: number;
}

export const Spacing: FunctionComponent<Props> = ({ className, size, sizeS = size, sizeM = sizeS, sizeL = sizeM }) => {
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
