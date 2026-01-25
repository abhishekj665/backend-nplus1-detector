import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store/store.jsx";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./redux/store/store.jsx";

createRoot(document.getElementById("root")).render(
  <PersistGate loading={null} persistor={persistor}>
    <Provider store={store}>
      <App />
    </Provider>
    ,
  </PersistGate>,
);
