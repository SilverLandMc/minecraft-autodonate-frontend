// см. src/styles/media.scss
enum Media {
    // region Breakpoints
    XS = 739, // для XS указано максимальное значение
    S = 740,
    M = 1024,
    L = 1440
    // endregion
}

export default Media;

export type Breakpoint = Media.XS | Media.S | Media.M | Media.L;
