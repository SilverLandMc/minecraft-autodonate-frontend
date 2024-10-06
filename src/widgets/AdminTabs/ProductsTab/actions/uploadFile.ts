import Sentry from 'shared/lib/aliases/Sentry';
import createLogger from 'shared/lib/logger/logger';
import { post } from 'shared/lib/request/request';

const logger = createLogger('uploadFile');

interface UploadResponse {
    fileId: string;
}

const uploadFile = async (file: File) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await post<UploadResponse>({
            url: `/admin/file`,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.fileId;
    } catch (error) {
        const message = `uploadFile: failed to upload a file. Error: ${error?.response?.message || error}`;
        logger.error(message);
        Sentry.captureMessage(message, (scope) => scope.setContext('error', { error }));
        throw error;
    }
};

export default uploadFile;
