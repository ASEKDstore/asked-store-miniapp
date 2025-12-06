/// <reference types="vite/client" />

export {};

declare global {
  interface TelegramBackButton {
    isVisible: boolean;
    onClick: (cb: () => void) => void;
    offClick: (cb: () => void) => void;
    show: () => void;
    hide: () => void;
  }

  interface TelegramMainButton {
    text: string;
    isVisible: boolean;
    setText: (text: string) => void;
    show: () => void;
    hide: () => void;
    setParams?: (params: Record<string, unknown>) => void;
  }

  interface TelegramThemeParams {
    [key: string]: string | undefined;
    bg_color?: string;
    text_color?: string;
    hint_color?: string;
    link_color?: string;
    button_color?: string;
    button_text_color?: string;
    secondary_bg_color?: string;
  }

  interface TelegramWebApp {
    initData?: string;
    initDataUnsafe?: {
      user?: {
        id: number;
        first_name: string;
        last_name?: string;
        username?: string;
        language_code?: string;
      };
    };
    ready: () => void;
    expand?: () => void;
    close?: () => void;
    themeParams?: TelegramThemeParams;
    colorScheme?: "light" | "dark";
    isExpanded?: boolean;
    viewportHeight?: number;
    BackButton?: TelegramBackButton;
    MainButton?: TelegramMainButton;
  }

  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp;
    };
  }
}
