import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Routes, { RouteConfig } from '../routes'

// Permite el lazy loading de los componentes y los carga
function WaitingComponent(Component: React.LazyExoticComponent<React.FunctionComponent<{}>>): any {
    return (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
        <Suspense fallback={<div>Loading...</div>}>
            <Component {...props} />
        </Suspense>
    );
}

const Router: React.FC = () => {
    return (
        <Switch>
            {Routes.map((route: RouteConfig) => {
                return (<Route key={route.name} path={route.path} exact component={WaitingComponent(route.component)} />)
            })}
        </Switch>
    );
}

export default Router;
