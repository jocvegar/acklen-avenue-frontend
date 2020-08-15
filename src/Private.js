import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./context/auth";

function Private({ component: Component, ...args }) {
    const { authTokens } = useAuth();

    return(
        <Route
            {...args}
            render={props =>
            authTokens ? (
            <Component {...props} />
            ) : (
            <Redirect to="/login" />
            )
        }
        />
    );
}

export default Private;
