import { useEffect, useState, useMemo } from "react";
const defaultTheme = {};
export function useTelegram() {
    const [isReady, setIsReady] = useState(false);
    const [user, setUser] = useState(null);
    const [themeParams, setThemeParams] = useState(defaultTheme);
    const [isTelegram, setIsTelegram] = useState(false);
    useEffect(() => {
        const tg = window.Telegram?.WebApp;
        if (!tg) {
            // не в Telegram — даём fallback, но помечаем isTelegram = false
            setIsTelegram(false);
            setIsReady(true);
            setUser(null);
            setThemeParams(defaultTheme);
            return;
        }
        setIsTelegram(true);
        try {
            tg.ready();
            if (tg.expand) {
                tg.expand();
            }
            // Тема
            if (tg.themeParams) {
                setThemeParams(tg.themeParams);
            }
            // Пользователь
            const unsafeUser = tg.initDataUnsafe?.user;
            if (unsafeUser && unsafeUser.id) {
                setUser({
                    id: unsafeUser.id,
                    username: unsafeUser.username,
                    first_name: unsafeUser.first_name,
                    last_name: unsafeUser.last_name,
                    language_code: unsafeUser.language_code
                });
            }
            // Цвет хедера под dark-тему
            try {
                if (tg.setHeaderColor) {
                    tg.setHeaderColor("#000000");
                }
                if (tg.setBackgroundColor) {
                    tg.setBackgroundColor("#000000");
                }
            }
            catch {
                // ignore
            }
            setIsReady(true);
        }
        catch (e) {
            console.error("Telegram WebApp init error:", e);
            setIsReady(true);
        }
    }, []);
    const ctx = useMemo(() => ({
        isTelegram,
        isReady,
        user,
        themeParams,
        expand: () => {
            const tg = window.Telegram?.WebApp;
            try {
                if (tg?.expand) {
                    tg.expand();
                }
            }
            catch {
                /* ignore */
            }
        },
        close: () => {
            const tg = window.Telegram?.WebApp;
            try {
                if (tg?.close) {
                    tg.close();
                }
            }
            catch {
                /* ignore */
            }
        }
    }), [isTelegram, isReady, user, themeParams]);
    return ctx;
}
