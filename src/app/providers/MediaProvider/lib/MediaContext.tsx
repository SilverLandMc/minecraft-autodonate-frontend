import { createContext } from 'react';
import Media from 'app/const/enum/Media';

export interface MediaContextState {
    media: Media[];
}
// undefined для удобства выброса исключения в хуках
// не может быть ситуации, когда в media undefined при нормальной работе SPA
const MediaContext = createContext<MediaContextState>({ media: undefined! });

export default MediaContext;
