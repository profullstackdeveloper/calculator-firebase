import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Center from './components/utils/Center';
import { CircularProgress } from '@mui/material';

const LazyApp = lazy(() => import("./App"));

ReactDOM.render(
  <React.StrictMode>
    <Suspense
      fallback={
        <div className='flex justify-center items-center flex-col h-screen'>
          <CircularProgress />
        </div>
      }
    >
      <LazyApp></LazyApp>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
