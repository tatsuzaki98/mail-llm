import React from 'react'
import ReactDOM from 'react-dom/client'
import IndexComponent from '@/components'
import '@/index.css'

const app = () => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <IndexComponent />
    </React.StrictMode>,
  );
}

const development = app;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let kintone: any;
const production = () => kintone.events.on('app.record.index.show', app);

(process.env.NODE_ENV === 'production') ? production() : development();
