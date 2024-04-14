import { FunctionComponent } from 'react';
import DOMPurify from 'dompurify';

interface Props {
    rawHTML?: string;
}

const SafelySetInnerHTML: FunctionComponent<Props> = ({ rawHTML }) => {
    if (!rawHTML) {
        return <span>-</span>;
    }

    const cleanHtml = DOMPurify.sanitize(rawHTML);

    return <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
};

export default SafelySetInnerHTML;
