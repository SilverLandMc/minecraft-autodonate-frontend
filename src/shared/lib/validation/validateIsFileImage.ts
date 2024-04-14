import { allowedImageTypes, ImageType } from 'shared/const/enum/imageType';

const validateIsFileImage = (file: File) => allowedImageTypes.includes(file.type as ImageType);

export default validateIsFileImage;
