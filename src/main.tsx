// libraries
import React from 'react';
import ReactDOM from 'react-dom/client';
import Loadable from "@loadable/component";
import {BrowserRouter} from "react-router-dom";
import {ErrorBoundary} from "react-error-boundary";
import App from './App.tsx';

// modules
import Tooltip from "@/modules/Tooltip.tsx";

// pages
const Server = Loadable(() => import('@/pages/blank/server'));

// providers
import QueryProvider from "@/providers/QueryProvider.tsx";
import ThemeProvider from "@/providers/ThemeProvider.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.Fragment>
        {/* @ts-ignore */}
        <ErrorBoundary FallbackComponent={<Server/>}>
            <BrowserRouter>
                <QueryProvider>
                    <ThemeProvider>
                        <App/>

                        <Tooltip/>
                    </ThemeProvider>
                </QueryProvider>
            </BrowserRouter>
        </ErrorBoundary>
    </React.Fragment>,
);
