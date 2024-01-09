import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { SoftUIControllerProvider } from "./context";
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
// import Loading from "./components/Loading";
import { Provider } from "react-redux";
import store from "./redux/store/store";
let persistor = persistStore(store);


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        {/* <Suspense fallback={<Loading />}>
          <App />
        </Suspense> */}
        <PersistGate  persistor={persistor}>
          <SoftUIControllerProvider>
            <App />
          </SoftUIControllerProvider>
        </PersistGate>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);


reportWebVitals();

