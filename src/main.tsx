import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { routes } from "./routes/routes.tsx";
import "./index.css";
import { RCLProvider } from "./components/layout/ConfigProvider.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RCLProvider>
        <RouterProvider router={routes} />
      </RCLProvider>
    </Provider>
  </StrictMode>
);
