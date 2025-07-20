import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/index.js';
import App from './App.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/theme.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
);
