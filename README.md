# GSB AlmaU AI Platform

Современный многостраничный сайт для Graduate School of Business AlmaU с AI-ассистентом, RAG и лидогенерацией.

## Возможности
- Next.js App Router + TypeScript + TailwindCSS.
- AI-чат с подсказками, стриминговыми ответами и формой лида.
- RAG на базе pgvector (PostgreSQL).
- Интеграция с Bitrix24 через webhook.
- Админка `/admin` для загрузки файлов и пересборки индекса.
- Логирование аналитики через `/api/track`.

## Быстрый старт (Docker)
1. Создайте `.env` на основе `.env.example`.
2. Запустите сервисы:
   ```bash
   docker compose up --build
   ```
3. После старта выполните ингест:
   ```bash
   docker compose exec app npm run ingest
   ```
4. Откройте `http://localhost:3000`.

## Запуск локально (без Docker)
```bash
npm install
npm run dev
```

## Админка
- URL: `/admin`
- Пароль: `ADMIN_PASSWORD` из `.env`.
- Поддерживаемые форматы: `.md`, `.txt`, `.pdf`.

## Ингест базы знаний
Файлы кладутся в `data/knowledge`. Скрипт:
```bash
npm run ingest
```

## Nginx reverse proxy (пример)
```nginx
server {
  server_name gsb.example.com;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

## Скрипты
- `npm run dev` — локальная разработка.
- `npm run build` — продакшн сборка.
- `npm run ingest` — пересборка индекса.
- `npm run lint` — линтер.
- `npm run typecheck` — проверка типов.
