import { allowedImageTypes, ImageType } from '@/shared/enums/imageType';

export const validateIsFileImage = (file: File) => allowedImageTypes.includes(file.type as ImageType);
