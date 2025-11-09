import { ComponentType, PropsWithChildren } from 'react';
import { PathRouteProps } from 'react-router-dom';

export interface RouteDescription extends PathRouteProps {
    layout?: ComponentType<PropsWithChildren>;
}
