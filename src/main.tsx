import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import App from "./App.tsx";
import "./index.css";
import ProviderWrapper from "./views/auth/providerWrapper.tsx";
import { SettingsTabProvider } from "./context/settings.context.tsx";
import { Toaster } from "sonner";
import { CampaignFormProvider } from "./context/createCampaign.context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ProviderWrapper>
      <SettingsTabProvider>
        <CampaignFormProvider>
          <App />
        </CampaignFormProvider>
        <Toaster position="top-right" richColors />
      </SettingsTabProvider>
    </ProviderWrapper>
  </StrictMode>
);
