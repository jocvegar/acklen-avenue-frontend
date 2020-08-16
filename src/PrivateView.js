import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./context/auth";

function PrivateView({ component: Component, ...rest }) {
    const { authTokens } = useAuth();

    return(
        <Route
            {...rest}
            render={routeProps =>
                authTokens 
                ? (<Component {...routeProps} {...rest} />) 
                : (<Redirect to="/login" />)
            }
        />
    );
}

export default PrivateView;
