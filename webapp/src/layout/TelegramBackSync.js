import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTelegram } from "@auth/useTelegram";
const TelegramBackSync = () => {
    const { isTelegram } = useTelegram();
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        const tg = window.Telegram?.WebApp;
        if (!isTelegram || !tg?.BackButton)
            return;
        const backButton = tg.BackButton;
        const isRoot = location.pathname === "/";
        if (isRoot) {
            backButton.hide();
        }
        else {
            backButton.show();
        }
        const handler = () => {
            navigate("/");
        };
        backButton.onClick(handler);
        return () => {
            backButton.offClick(handler);
        };
    }, [isTelegram, location.pathname, navigate]);
    return null;
};
export default TelegramBackSync;
