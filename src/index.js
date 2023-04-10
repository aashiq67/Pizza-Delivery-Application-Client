//REACT MODULES
import React from 'react';
import ReactDOM from 'react-dom/client';

// MODULE COMPONENTS
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

// COMPONENTS
import './index.css';
import App from './App';
import UserDashboard from './components/User/UserDashboard';
import AdminDashboard from './components/Admin/AdminDashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        {/* <React.StrictMode> */}
            <Provider store={store}>
                <App />
                {/* <UserDashboard /> */}
            </Provider>
        {/* </React.StrictMode> */}
    </BrowserRouter>
);
