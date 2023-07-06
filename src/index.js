import React from 'react';
import ReactDOM from 'react-dom/client';
import App, { appRouter } from './App';
import "./index.css"
import { Provider } from 'react-redux';
import store from './utils/store';
import { RouterProvider } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Provider store={store}>
        <RouterProvider router={appRouter}>
            <App />
        </RouterProvider>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
