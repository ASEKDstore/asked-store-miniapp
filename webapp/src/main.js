import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { useTelegram } from "@auth/useTelegram";
import SplashScreen from "@layout/SplashScreen";
const Root = () => {
    const { isReady } = useTelegram();
    if (!isReady) {
        return _jsx(SplashScreen, {});
    }
    return (_jsx(BrowserRouter, { children: _jsx(App, {}) }));
};
ReactDOM.createRoot(document.getElementById("root")).render(_jsx(React.StrictMode, { children: _jsx(Root, {}) }));
