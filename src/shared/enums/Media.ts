// см. src/styles/media.scss
export enum Media {
    // region Breakpoints
    XS = 799, // для XS указано максимальное значение
    S = 800,
    M = 1024,
    L = 1440
    // endregion
}

export type Breakpoint = Media.XS | Media.S | Media.M | Media.L;
