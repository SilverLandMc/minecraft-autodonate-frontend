import Media from 'app/const/enum/Media';
import { createContext } from 'react';

export interface MediaContextState {
    media: Media[];
}
// undefined для удобства выброса исключения в хуках
// не может быть ситуации, когда в media undefined при нормальной работе SPA
const MediaContext = createContext<MediaContextState>({ media: undefined! });

export default MediaContext;
