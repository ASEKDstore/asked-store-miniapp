interface TelegramWebApp {
  initData?: string;
  initDataUnsafe?: any;
  colorScheme?: string;
  themeParams?: any;
  ready: () => void;
  setHeaderColor?: (color: string) => void;
  setBackgroundColor?: (color: string) => void;
  close?: () => void;
  expand?: () => void;
  onEvent?: (event: string, func: () => void) => void;
}

interface Window {
  Telegram?: {
    WebApp?: TelegramWebApp;
  };
}

