import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App
      pomodoroTime={5}
      shortRestingTime={2}
      longRestingTime={4}
      numberOfCycles={4}
    />
  </React.StrictMode>,
);
