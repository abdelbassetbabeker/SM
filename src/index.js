import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store'
import 'semantic-ui-css/semantic.min.css'

import App from './components/App';


const root = ReactDOM.createRoot(document.getElementById('root'));

// Registering Syncfusion license key
// registerLicense('Ngo9BigBOggjHTQxAR8/V1NGaF5cXmpCdkx0RHxbf1xzZFZMY1pbRn5PIiBoS35RdUVkW31fd3FUR2VVU0V2');




root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter >
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals