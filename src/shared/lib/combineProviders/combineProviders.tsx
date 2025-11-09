import React, { ComponentProps, ComponentType, PropsWithChildren } from 'react';

export const combineProviders = (
    ...components: ComponentType<PropsWithChildren<any>>[]
): ComponentType<PropsWithChildren<any>> =>
    components.reduce(
        (AccumulatedComponents, CurrentComponent) =>
            ({ children }: ComponentProps<ComponentType<PropsWithChildren<any>>>) => (
                <AccumulatedComponents>
                    <CurrentComponent>{children}</CurrentComponent>
                </AccumulatedComponents>
            ),

        ({ children }) => <>{children}</>
    );
