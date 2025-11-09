export enum ImageType {
    JPEG = 'image/jpeg',
    JPG = 'image/jpg',
    PNG = 'image/png'
}

export const allowedImageTypes = Object.values(ImageType);

export const acceptImageSetting = '.png, .jpg, .jpeg';
