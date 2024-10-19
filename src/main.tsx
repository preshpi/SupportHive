import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import App from "./App.tsx";
import "./index.css";
import ProviderWrapper from "./views/auth/providerWrapper.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProviderWrapper>
      <App />
    </ProviderWrapper>
  </StrictMode>
);
