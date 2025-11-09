import { allowedImageTypes, ImageType } from '@/shared/const/enum/imageType';

export const validateIsFileImage = (file: File) => allowedImageTypes.includes(file.type as ImageType);
