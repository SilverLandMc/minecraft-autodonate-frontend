# minecraft-silver-frontend

![push status](https://github.com/SilverLandMc/minecraft-silver-frontend/actions/workflows/main.yml/badge.svg?event=push)

Фронтенд-приложение сервера SilverLand.

## Архитектура

Проект использует методологию **[Feature-Sliced Design (FSD)](https://feature-sliced.design/)** для организации кода:

```
src/
├── app/         # Инициализация приложения, глобальные провайдеры, роутинг
├── pages/       # Страницы приложения
├── widgets/     # Композитные блоки для страниц
├── features/    # Фичи бизнес-логики
├── entities/    # Бизнес-сущности
└── shared/      # Переиспользуемый код (UI, utils, API)
```
Соблюдение правил композиции слоёв, слайсов и сегментов обеспечивается конфигурацией eslint.

Path aliases настроены для удобного импорта: `@/app/*`, `@/entities/*`, `@/features/*`, `@/pages/*`, `@/shared/*`, `@/widgets/*`.

## Технологический стек

### Основные технологии

- **React 18.2** - UI библиотека
- **TypeScript 5.3** - типизация
- **Vite 6.3** - бандлер и dev-сервер
- **MobX 6.13** - state management
- **React Router 6.22** - маршрутизация
- **Axios 1.6** - HTTP клиент
- **Sass** - препроцессор стилей

### Тестирование

- **Vitest** - unit-тестирование
- **Testing Library** - тестирование React компонентов
- **Storybook 8.4** - разработка и документация UI компонентов
- **Loki** - визуальное регрессионное тестирование

### Качество кода

- **ESLint** - линтинг JavaScript/TypeScript
- **Stylelint** - линтинг стилей
- **Prettier** - форматирование кода
- **Knip** - поиск неиспользуемого кода
- **Dependency Cruiser** - анализ зависимостей

### Инструменты разработки

- **Sentry** - мониторинг ошибок
- **Swagger TypeScript API** - автогенерация типов из OpenAPI спецификации
- **Git hooks** - автоматическая проверка кода перед коммитом

## Особенности проекта

- **SSR-ready конфигурация** с прокси для API запросов
- **Автоматическая генерация типов** из Swagger документации
- **Визуальное регрессионное тестирование** с отчетами
- **Граф зависимостей** для контроля архитектуры
- **Интеграция с Sentry** для мониторинга продакшена
- **Строгий TypeScript** с noImplicitAny
- **Автоматические проверки** через lint-staged и git hooks

## Запуск проекта

### Требования

- Node.js 18+
- pnpm 9.10+ (рекомендуется) или npm

### Установка и запуск

1. Клонировать репозиторий:
```bash
git clone git@github.com:SilverLandMc/minecraft-silver-frontend.git
cd minecraft-silver-frontend
```

2. Установить зависимости:
```bash
npm install
# или
pnpm install
```

3. (Опционально) Создать файл переменных окружения в папке `environments/.env`:
```env
SENTRY_DSN=https://...ingest.sentry.io/...
STAND_NAME=Имя стенда
RELEASE_NAME=Версия релиза
ENV_NAME=Имя окружения
```

4. Запустить dev-сервер:
```bash
npm run start
```

Приложение будет доступно по адресу `http://localhost:3000`

## Доступные команды

### Разработка

- `npm run start` - запуск dev-сервера
- `npm run build` - продакшен сборка
- `npm run storybook` - запуск Storybook на порту 3010

### Тестирование

- `npm run test` - запуск unit-тестов
- `npm run test:ui` - запуск визуальных тестов
- `npm run test:ui:approve` - подтверждение изменений визуальных тестов

### Проверка кода

- `npm run lint` - проверка всех линтеров (ESLint, Stylelint, TypeScript)
- `npm run eslint:lint` - проверка ESLint
- `npm run stylelint:lint` - проверка Stylelint
- `npm run typescript:lint` - проверка TypeScript
- `npm run knip` - поиск неиспользуемого кода

### Утилиты

- `npm run typescript:swagger` - генерация типов из Swagger
- `npm run generateDependenciesGraph` - генерация графа зависимостей
- `npm run depcruise:archi` - анализ архитектуры проекта
