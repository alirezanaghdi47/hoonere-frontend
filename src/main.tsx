import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import {BrowserRouter} from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

// pages
import ServerErrorPage from "@/pages/error/server";

// providers
import QueryProvider from "@/providers/QueryProvider.tsx";
import ThemeProvider from "@/providers/ThemeProvider.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.Fragment>
        <ErrorBoundary FallbackComponent={<ServerErrorPage/>}>
            <BrowserRouter>
                <QueryProvider>
                    <ThemeProvider>
                        <App/>
                    </ThemeProvider>
                </QueryProvider>
            </BrowserRouter>
        </ErrorBoundary>
    </React.Fragment>,
);
