import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import {BrowserRouter} from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

// pages
import ServerErrorPage from "@/pages/error/server";

// providers
import QueryProvider from "@/providers/QueryProvider.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.Fragment>
        <ErrorBoundary FallbackComponent={<ServerErrorPage/>}>
            <BrowserRouter>
                <QueryProvider>
                    <App/>
                </QueryProvider>
            </BrowserRouter>
        </ErrorBoundary>
    </React.Fragment>,
);
