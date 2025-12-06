# Архитектура ASKED Store

## Общая схема

- **webapp** — Vite + React + TS, Telegram Mini App UI.
- **backend** — Node + Express + TS, API + интеграции.
- **shared** — общие типы и утилиты (пока минимальный).

Фронт и бэк общаются по HTTP:
- публичные роуты: `/catalog`, `/orders`, `/limited/check`, `/home`, `/health`
- админские роуты: `/admin/*` (только с токеном и Telegram id)

## Основные модули backend

- `orders` — создание заказов, статусы, статистика.
- `limited` — проверка промокодов и цифровых пропусков.
- `admin` — CRUD по товарам, контенту главной, промокодам.
- `files` — загрузка и выдача файлов (uploads + /files/* статика).
- `notifications` — отправка сообщений в Telegram бот.

## Основные модули webapp

- `layout` — RootLayout, SplashScreen, BottomNav, header, burger menu.
- `screens`:
  - `Home` — баннеры, топ-товары, акции, галерея, соцсети.
  - `Catalog` — список товаров, карточка товара, фильтры.
  - `Cart` — корзина + переход к оформлению заказа.
  - `Checkout` — форма оформления заказа.
  - `Limited` — Limited Access карта и секретные дропы.
  - `Admin` — вкладки админки.
- `auth/useTelegram` — интеграция с Telegram WebApp SDK.
- `state/cart` — состояние корзины.

## Telegram Mini App

Инициализация идёт через `useTelegram`, который:
- вызывает `Telegram.WebApp.ready()`;
- расширяет окно до full-screen (`expand`);
- берёт пользователя из `initDataUnsafe.user`;
- применяет тему Telegram, если нужно;
- управляет `BackButton`.

