import { configure } from 'mobx';

export const setupMobx = () =>
    configure({
        enforceActions: 'always',
        computedRequiresReaction: true,
        reactionRequiresObservable: true,
        observableRequiresReaction: true,
        disableErrorBoundaries: __IS_DEV__
    });
