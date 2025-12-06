import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { useTelegram } from "@auth/useTelegram";
import SplashScreen from "@layout/SplashScreen";

const Root: React.FC = () => {
  const { isReady } = useTelegram();

  if (!isReady) {
    return <SplashScreen />;
  }

  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);


