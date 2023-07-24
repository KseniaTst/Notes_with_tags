import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {store} from "./store/store";
import {Provider} from "react-redux";
import { IndexedDB, initDB } from "react-indexed-db-hook";
import {DBConfig} from "./store/DBConfig";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
initDB(DBConfig);

root.render(
    <IndexedDB name="MyDB"
               version={1}
               objectStoresMeta={[
                   {
                       store: "notes",
                       storeConfig: { keyPath: "id", autoIncrement: true },
                       storeSchema: [
                           { name: "id", keypath: "id", options: { unique: true } },
                           { name: "text", keypath: "name", options: { unique: false } },
                           { name: "tag", keypath: "tag", options: { unique: false } },
                       ],
                   },
               ]}
    >
  <Provider store={store}>
    <App />
  </Provider>
    </IndexedDB>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
