import { StoryFn } from '@storybook/react';

interface Params {
    width?: number;
    height?: number;
}

export const SizedDecorator =
    ({ width, height }: Params) =>
    (StoryComponent: StoryFn) => (
        <div style={{ width: width ? `${width}px` : 'auto', height: height ? `${height}px` : 'auto' }}>
            <StoryComponent />
        </div>
    );
