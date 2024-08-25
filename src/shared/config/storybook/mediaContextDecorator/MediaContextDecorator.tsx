import { StoryFn } from '@storybook/react';
import { MediaContextProvider } from 'app/providers/MediaProvider';

export const MediaContextDecorator = (StoryComponent: StoryFn) => (
    <MediaContextProvider>
        <StoryComponent />
    </MediaContextProvider>
);
