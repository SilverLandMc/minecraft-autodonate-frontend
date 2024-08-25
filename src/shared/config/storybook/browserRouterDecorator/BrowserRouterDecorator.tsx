import { StoryFn } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

export const BrowserRouterDecorator = (StoryComponent: StoryFn) => (
    <BrowserRouter>
        <StoryComponent />
    </BrowserRouter>
);
