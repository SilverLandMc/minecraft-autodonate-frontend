import type { StoryContext, StoryFn } from '@storybook/react';

export const withCustomWrapper = (Story: StoryFn, context: StoryContext) => {
    return (
        <div style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
            <Story {...context} />
        </div>
    );
};
