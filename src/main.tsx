import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import {BrowserRouter} from "react-router-dom";

// providers
import QueryProvider from "@/providers/QueryProvider.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <QueryProvider>
                <App/>
            </QueryProvider>
        </BrowserRouter>
    </React.StrictMode>,
);
