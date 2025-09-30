import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { routes } from "./routes/routes.tsx";
import "./index.css";
import { RCLProvider } from "./components/layout/ConfigProvider.tsx";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RCLProvider>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={routes} />
        </PersistGate>
      </RCLProvider>
    </Provider>
  </StrictMode>
);
