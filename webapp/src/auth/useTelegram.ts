import { useEffect, useState, useMemo } from "react";

export type TelegramUser = {
  id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  language_code?: string;
};

export type TelegramTheme = {
  bg_color?: string;
  text_color?: string;
  hint_color?: string;
  link_color?: string;
  button_color?: string;
  button_text_color?: string;
};

type TelegramContext = {
  isTelegram: boolean;
  isReady: boolean;
  user: TelegramUser | null;
  themeParams: TelegramTheme;
  expand: () => void;
  close: () => void;
};

const defaultTheme: TelegramTheme = {};

export function useTelegram(): TelegramContext {
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [themeParams, setThemeParams] = useState<TelegramTheme>(defaultTheme);
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
      } catch {
        // ignore
      }

      setIsReady(true);
    } catch (e) {
      console.error("Telegram WebApp init error:", e);
      setIsReady(true);
    }
  }, []);

  const ctx = useMemo<TelegramContext>(
    () => ({
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
        } catch {
          /* ignore */
        }
      },
      close: () => {
        const tg = window.Telegram?.WebApp;
        try {
          if (tg?.close) {
            tg.close();
          }
        } catch {
          /* ignore */
        }
      }
    }),
    [isTelegram, isReady, user, themeParams]
  );

  return ctx;
}
