import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Routes, { RouteConfig } from '../routes'

const fakeAuth = {
    isAuthenticated() {
        return localStorage.getItem('token');
    },
};

// Permite el lazy loading de los componentes y los carga
function WaitingComponent(Component: React.LazyExoticComponent<React.FunctionComponent<{}>>): any {
    return (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
        <Suspense fallback={<div></div>}>
            <Component {...props} />
        </Suspense>
    );
}

const Router: React.FC = () => {
    return (
        <Switch>
            {Routes.map((route: RouteConfig) => {
                if (route.isProtected) {
                    return (<ProtectedRoute key={route.name} path={route.path} exact component={WaitingComponent(route.component)} />)
                } else {
                    return (<Route key={route.name} path={route.path} exact component={WaitingComponent(route.component)} />)
                }
            })}
            <Redirect to="/home" />
        </Switch>
    );
}

export class ProtectedRoute extends Route {
    public render() {
        if (!fakeAuth.isAuthenticated()) {
            const renderComponent = () => (<Redirect to={{ pathname: '/login' }} />);
            return <Route {...this.props} component={renderComponent} render={undefined} />;
        } else {
            return <Route {...this.props} />;
        }
    }
}

export default Router;
