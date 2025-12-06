# Локальный запуск ASKED Store

1. Установить Node.js >= 18 и npm >= 9.

2. Клонировать репозиторий.

3. Установить зависимости:

```bash
npm install
npm install --workspace webapp
npm install --workspace backend
```

4. Создать `.env` файлы (см. README).

5. Запустить:

```bash
npm run dev
```

**Фронт:** http://localhost:5173  
**Бэк:** http://localhost:4000

Для тестирования Telegram Mini App можно:
- использовать ngrok / Render для внешнего URL,
- в BotFather указать WebApp URL на собранный фронт.

